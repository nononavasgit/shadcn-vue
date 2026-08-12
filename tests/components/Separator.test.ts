import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Separator, createSeparatorContext } from '@/components/ui/Separator'

describe('Separator', () => {
  describe('Props', () => {
    it.each(['object', 'function'] as const)('Render HTML Attributes by ui %s', (uiType) => {
      const root =
        uiType === 'function'
          ? () => ({ class: 'ui-root', 'aria-label': 'Separador' })
          : { class: 'ui-root', 'aria-label': 'Separador' }
      const separator = mount(Separator, {
        props: { ui: { root } },
      }).get('[data-separator-ui="root"]')

      expect(separator.classes()).toContain('ui-root')
      expect(separator.attributes('aria-label')).toBe('Separador')
    })
  })

  describe('Slots', () => {
    it('Render default slot', () => {
      const separator = mount(Separator, {
        slots: { default: () => h('span', 'test') },
      }).get('[data-separator-slot="default"]')

      expect(separator.get('span').html()).toBe('<span>test</span>')
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const separator = mount(Separator, {
        attrs: {
          class: 'custom-separator',
          style: 'opacity: 0.5',
          'data-test': 'content-separator',
        },
      }).get('[data-separator-ui="root"]')

      expect(separator.classes()).toEqual(
        expect.arrayContaining(['shrink-0', 'bg-border', 'custom-separator']),
      )
      expect(separator.attributes('style')).toContain('opacity: 0.5')
      expect(separator.attributes('data-test')).toBe('content-separator')
    })
  })

  describe('Context', () => {
    const context = {
      orientation: 'vertical' as const,
      decorative: false,
    }

    it('Separator context', () => {
      expect(
        createSeparatorContext({
          as: 'div',
          asChild: false,
          orientation: 'vertical',
          decorative: false,
          ui: { root: { class: 'ui-root' } },
        }),
      ).toEqual(context)
    })

    it('Separator context to ui.root function', () => {
      const root = vi.fn(() => ({ class: 'ui-root' }))

      mount(Separator, {
        props: {
          orientation: 'vertical',
          decorative: false,
          ui: { root },
        },
      })

      expect(root).toHaveBeenCalledWith(context)
    })

    it('Separator context to default slot', () => {
      const slot = vi.fn(() => 'Separador')

      mount(Separator, {
        props: { orientation: 'vertical', decorative: false },
        slots: { default: slot },
      })

      expect(slot).toHaveBeenCalledWith(context)
    })
  })
})
