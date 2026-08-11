import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Card, createCardContext } from '@/components/ui/Card'

describe('Card', () => {
  describe('Props', () => {
    it('Render label and description', () => {
      const wrapper = mount(Card, {
        props: {
          label: 'Resumen',
          description: 'Datos de la cuenta',
        },
      })

      expect(wrapper.get('[data-card-slot="label"]').text()).toBe('Resumen')
      expect(wrapper.get('[data-card-slot="description"]').text()).toBe('Datos de la cuenta')
    })

    it('No render optional content', () => {
      const wrapper = mount(Card)

      expect(wrapper.find('[data-card-slot="header"]').exists()).toBe(false)
      expect(wrapper.find('[data-card-slot="default"]').exists()).toBe(false)
      expect(wrapper.find('[data-card-slot="footer"]').exists()).toBe(false)
    })

    it('Render HTML Attributes by ui', () => {
      const wrapper = mount(Card, {
        props: {
          label: 'Resumen',
          description: 'Datos de la cuenta',
          ui: {
            root: { class: 'ui-root' },
            header: { class: 'ui-header' },
            label: { class: 'ui-label' },
            description: { class: 'ui-description' },
            action: { class: 'ui-action' },
            content: { class: 'ui-content' },
            footer: { class: 'ui-footer' },
          },
        },
        slots: {
          action: () => h('button', 'Editar'),
          default: () => h('p', 'Contenido'),
          footer: () => h('span', 'Pie'),
        },
      })

      for (const name of [
        'root',
        'header',
        'label',
        'description',
        'action',
        'content',
        'footer',
      ]) {
        expect(wrapper.get(`[data-card-ui="${name}"]`).classes()).toContain(`ui-${name}`)
      }
    })

    it('Render HTML Attributes by ui function', () => {
      const wrapper = mount(Card, {
        props: {
          label: 'Resumen',
          description: 'Datos de la cuenta',
          ui: {
            root: () => ({ class: 'ui-root' }),
            header: () => ({ class: 'ui-header' }),
            label: () => ({ class: 'ui-label' }),
            description: () => ({ class: 'ui-description' }),
            action: () => ({ class: 'ui-action' }),
            content: () => ({ class: 'ui-content' }),
            footer: () => ({ class: 'ui-footer' }),
          },
        },
        slots: {
          action: () => h('button', 'Editar'),
          default: () => h('p', 'Contenido'),
          footer: () => h('span', 'Pie'),
        },
      })

      for (const name of [
        'root',
        'header',
        'label',
        'description',
        'action',
        'content',
        'footer',
      ]) {
        expect(wrapper.get(`[data-card-ui="${name}"]`).classes()).toContain(`ui-${name}`)
      }
    })
  })

  describe('Slots', () => {
    it('Render header and replace label and description', () => {
      const wrapper = mount(Card, {
        props: { label: 'Label', description: 'Description' },
        slots: { header: () => h('span', 'test') },
      })

      expect(wrapper.get('[data-card-slot="header"] > span').html()).toBe('<span>test</span>')
      expect(wrapper.text()).not.toContain('Label')
      expect(wrapper.text()).not.toContain('Description')
    })

    it.each([
      ['label', 'Label'],
      ['description', 'Description'],
    ] as const)('Render %s and replace prop', (slotName, propValue) => {
      const wrapper = mount(Card, {
        props: { [slotName]: propValue },
        slots: { [slotName]: () => h('span', 'test') },
      })

      expect(wrapper.get(`[data-card-slot="${slotName}"] > span`).html()).toBe('<span>test</span>')
      expect(wrapper.text()).not.toContain(propValue)
    })

    it.each(['action', 'default', 'footer'] as const)('Render %s slot', (slotName) => {
      const wrapper = mount(Card, {
        slots: { [slotName]: () => h('span', 'test') },
      })

      expect(wrapper.get(`[data-card-slot="${slotName}"] > span`).html()).toBe('<span>test</span>')
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const card = mount(Card, {
        attrs: {
          class: 'custom-card',
          style: 'opacity: 0.5',
          'data-test': 'account-card',
        },
      }).get('[data-card-ui="root"]')

      expect(card.classes()).toContain('custom-card')
      expect(card.attributes('style')).toContain('opacity: 0.5')
      expect(card.attributes('data-test')).toBe('account-card')
    })
  })

  describe('Context', () => {
    it('Card context', () => {
      const context = createCardContext({
        label: 'Resumen',
        description: 'Datos de la cuenta',
        ui: { root: { class: 'ui-root' } },
      })

      expect(context).toEqual({
        label: 'Resumen',
        description: 'Datos de la cuenta',
      })
    })

    it.each(['root', 'header', 'label', 'description', 'action', 'content', 'footer'] as const)(
      'Card context to ui.%s function',
      (uiName) => {
        const ui = vi.fn(() => ({ class: `ui-${uiName}` }))

        mount(Card, {
          props: {
            label: 'Resumen',
            description: 'Datos de la cuenta',
            ui: { [uiName]: ui },
          },
          slots: {
            action: () => h('button', 'Editar'),
            default: () => h('p', 'Contenido'),
            footer: () => h('span', 'Pie'),
          },
        })

        expect(ui).toHaveBeenCalledWith({
          label: 'Resumen',
          description: 'Datos de la cuenta',
        })
      },
    )

    it.each(['default', 'header', 'label', 'description', 'action', 'footer'] as const)(
      'Card context to %s slot',
      (slotName) => {
        const slot = vi.fn(() => h('span', 'test'))

        mount(Card, {
          props: {
            label: 'Resumen',
            description: 'Datos de la cuenta',
          },
          slots: { [slotName]: slot },
        })

        expect(slot).toHaveBeenCalledWith({
          label: 'Resumen',
          description: 'Datos de la cuenta',
        })
      },
    )
  })
})
