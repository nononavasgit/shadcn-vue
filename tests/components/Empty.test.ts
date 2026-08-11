import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Empty, createEmptyContext } from '@/components/ui/Empty'

describe('Empty', () => {
  describe('Props', () => {
    it('Render label and description', () => {
      const wrapper = mount(Empty, {
        props: {
          label: 'Sin resultados',
          description: 'No encontramos elementos que coincidan con tu búsqueda',
        },
      })

      expect(wrapper.get('[data-empty-slot="label"]').text()).toBe('Sin resultados')
      expect(wrapper.get('[data-empty-slot="description"]').text()).toBe(
        'No encontramos elementos que coincidan con tu búsqueda',
      )
    })

    it('No render optional content', () => {
      const wrapper = mount(Empty)

      expect(wrapper.find('[data-empty-ui="header"]').exists()).toBe(false)
      expect(wrapper.find('[data-empty-slot="media"]').exists()).toBe(false)
      expect(wrapper.find('[data-empty-slot="default"]').exists()).toBe(false)
    })

    it.each([
      ['default', []],
      ['icon', ['flex', 'size-10', 'rounded-lg', 'bg-muted']],
    ] as const)('Render mediaVariant %s', (mediaVariant, expectedClasses) => {
      const media = mount(Empty, {
        props: { mediaVariant },
        slots: { media: () => h('span', 'media') },
      }).get('[data-empty-ui="media"]')

      expect(media.attributes('data-variant')).toBe(mediaVariant)
      expect(media.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })

    it.each(['object', 'function'] as const)('Render HTML Attributes by ui %s', (uiType) => {
      const value = (name: string) => ({ class: `ui-${name}` })
      const uiValue = (name: string) => (uiType === 'function' ? () => value(name) : value(name))

      const wrapper = mount(Empty, {
        props: {
          label: 'Sin resultados',
          description: 'Prueba con otros filtros',
          ui: {
            root: uiValue('root'),
            header: uiValue('header'),
            media: uiValue('media'),
            label: uiValue('label'),
            description: uiValue('description'),
            content: uiValue('content'),
          },
        },
        slots: {
          media: () => h('span', 'media'),
          default: () => h('button', 'Limpiar'),
        },
      })

      for (const name of ['root', 'header', 'media', 'label', 'description', 'content']) {
        expect(wrapper.get(`[data-empty-ui="${name}"]`).classes()).toContain(`ui-${name}`)
      }
    })
  })

  describe('Slots', () => {
    it.each([
      ['label', 'Label'],
      ['description', 'Description'],
    ] as const)('Render %s and replace prop', (slotName, propValue) => {
      const wrapper = mount(Empty, {
        props: { [slotName]: propValue },
        slots: { [slotName]: () => h('span', 'test') },
      })

      expect(wrapper.get(`[data-empty-slot="${slotName}"] > span`).html()).toBe('<span>test</span>')
      expect(wrapper.text()).not.toContain(propValue)
    })

    it.each(['media', 'default'] as const)('Render %s slot', (slotName) => {
      const wrapper = mount(Empty, {
        slots: { [slotName]: () => h('span', 'test') },
      })

      expect(wrapper.get(`[data-empty-slot="${slotName}"] > span`).html()).toBe('<span>test</span>')
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const empty = mount(Empty, {
        attrs: {
          class: 'custom-empty',
          style: 'opacity: 0.5',
          'data-test': 'search-empty',
        },
      }).get('[data-empty-ui="root"]')

      expect(empty.classes()).toContain('custom-empty')
      expect(empty.attributes('style')).toContain('opacity: 0.5')
      expect(empty.attributes('data-test')).toBe('search-empty')
    })
  })

  describe('Context', () => {
    it('Empty context', () => {
      const context = createEmptyContext({
        label: 'Sin resultados',
        description: 'Prueba con otros filtros',
        mediaVariant: 'icon',
        ui: { root: { class: 'ui-root' } },
      })

      expect(context).toEqual({
        label: 'Sin resultados',
        description: 'Prueba con otros filtros',
        mediaVariant: 'icon',
      })
    })

    it.each(['root', 'header', 'media', 'label', 'description', 'content'] as const)(
      'Empty context to ui.%s function',
      (uiName) => {
        const ui = vi.fn(() => ({ class: `ui-${uiName}` }))

        mount(Empty, {
          props: {
            label: 'Sin resultados',
            description: 'Prueba con otros filtros',
            mediaVariant: 'icon',
            ui: { [uiName]: ui },
          },
          slots: {
            media: () => h('span', 'media'),
            default: () => h('button', 'Limpiar'),
          },
        })

        expect(ui).toHaveBeenCalledWith({
          label: 'Sin resultados',
          description: 'Prueba con otros filtros',
          mediaVariant: 'icon',
        })
      },
    )

    it.each(['default', 'media', 'label', 'description'] as const)(
      'Empty context to %s slot',
      (slotName) => {
        const slot = vi.fn(() => h('span', 'test'))

        mount(Empty, {
          props: {
            label: 'Sin resultados',
            description: 'Prueba con otros filtros',
            mediaVariant: 'icon',
          },
          slots: { [slotName]: slot },
        })

        expect(slot).toHaveBeenCalledWith({
          label: 'Sin resultados',
          description: 'Prueba con otros filtros',
          mediaVariant: 'icon',
        })
      },
    )
  })
})
