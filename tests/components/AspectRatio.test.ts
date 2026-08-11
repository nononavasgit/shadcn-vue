import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { AspectRatio, createAspectRatioContext } from '@/components/ui/AspectRatio'

describe('AspectRatio', () => {
  describe('Props', () => {
    it('Render default ratio', () => {
      const root = mount(AspectRatio).get('[data-aspect-ratio-ui="root"]')

      expect(root.element.parentElement?.getAttribute('style')).toContain('padding-bottom: 100%')
    })

    it.each([
      [16 / 9, '56.25%'],
      [4 / 3, '75%'],
      [2, '50%'],
    ])('Render ratio %s', (ratio, expectedPadding) => {
      const root = mount(AspectRatio, {
        props: { ratio },
      }).get('[data-aspect-ratio-ui="root"]')

      expect(root.element.parentElement?.getAttribute('style')).toContain(
        `padding-bottom: ${expectedPadding}`,
      )
    })

    it('Render as', () => {
      const root = mount(AspectRatio, {
        props: { as: 'section' },
      }).get('[data-aspect-ratio-ui="root"]')

      expect(root.element.tagName).toBe('SECTION')
    })

    it('Render asChild', () => {
      const root = mount(AspectRatio, {
        props: { asChild: true },
        slots: { default: () => h('article', 'Contenido') },
      }).get('[data-aspect-ratio-ui="root"]')

      expect(root.element.tagName).toBe('ARTICLE')
      expect(root.text()).toBe('Contenido')
    })

    it('Render HTML Attributes by ui', () => {
      const root = mount(AspectRatio, {
        props: {
          ui: { root: { class: 'ui-root' } },
        },
      }).get('[data-aspect-ratio-ui="root"]')

      expect(root.classes()).toContain('ui-root')
    })

    it('Render HTML Attributes by ui function', () => {
      const root = mount(AspectRatio, {
        props: {
          ui: { root: () => ({ class: 'ui-root' }) },
        },
      }).get('[data-aspect-ratio-ui="root"]')

      expect(root.classes()).toContain('ui-root')
    })
  })

  describe('Slots', () => {
    it('Render default slot', () => {
      const root = mount(AspectRatio, {
        slots: { default: () => h('span', 'test') },
      }).get('[data-aspect-ratio-slot="default"]')

      expect(root.get('span').html()).toBe('<span>test</span>')
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const root = mount(AspectRatio, {
        attrs: {
          class: 'custom-aspect-ratio',
          style: 'opacity: 0.5',
          'data-test': 'media-aspect-ratio',
        },
      }).get('[data-aspect-ratio-ui="root"]')

      expect(root.classes()).toEqual(
        expect.arrayContaining(['relative', 'w-full', 'custom-aspect-ratio']),
      )
      expect(root.attributes('style')).toContain('opacity: 0.5')
      expect(root.attributes('data-test')).toBe('media-aspect-ratio')
    })
  })

  describe('Context', () => {
    it('AspectRatio context', () => {
      const context = createAspectRatioContext({
        as: 'section',
        asChild: false,
        ratio: 16 / 9,
        ui: { root: { class: 'ui-root' } },
      })

      expect(context).toEqual({
        as: 'section',
        asChild: false,
        ratio: 16 / 9,
        aspect: 16 / 9,
      })
    })

    it('AspectRatio context to ui.root function', () => {
      const root = vi.fn(() => ({ class: 'ui-root' }))

      mount(AspectRatio, {
        props: {
          as: 'section',
          asChild: false,
          ratio: 16 / 9,
          ui: { root },
        },
      })

      expect(root).toHaveBeenCalledWith({
        as: 'section',
        asChild: false,
        ratio: 16 / 9,
        aspect: 16 / 9,
      })
    })

    it('AspectRatio context to default slot', () => {
      const slot = vi.fn(() => h('span', 'test'))

      mount(AspectRatio, {
        props: {
          as: 'section',
          asChild: false,
          ratio: 16 / 9,
        },
        slots: { default: slot },
      })

      expect(slot).toHaveBeenCalledWith({
        as: 'section',
        asChild: false,
        ratio: 16 / 9,
        aspect: 16 / 9,
      })
    })
  })
})
