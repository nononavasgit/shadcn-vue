import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Switch, createSwitchContext } from '@/components/ui/Switch'

describe('Switch', () => {
  describe('Props', () => {
    it.each([
      [false, 'false'],
      [true, 'true'],
    ])('Render value %s', (value, ariaChecked) => {
      const root = mount(Switch, {
        props: { value },
      }).get('[data-switch-ui="root"]')

      expect(root.attributes('aria-checked')).toBe(ariaChecked)
    })

    it('Emit trueValue when checked', async () => {
      const wrapper = mount(Switch, {
        props: {
          value: true,
          trueValue: false,
          falseValue: true,
        },
      })

      await wrapper.get('[data-switch-ui="root"]').trigger('click')

      expect(wrapper.emitted('update:value')).toEqual([[false]])
    })

    it('Emit falseValue when unchecked', async () => {
      const wrapper = mount(Switch, {
        props: {
          value: false,
          trueValue: false,
          falseValue: true,
        },
      })

      await wrapper.get('[data-switch-ui="root"]').trigger('click')

      expect(wrapper.emitted('update:value')).toEqual([[true]])
    })

    it('Render HTML Attributes by ui function', () => {
      const value = (name: string) => ({ class: `ui-${name}` })
      const uiValue = (name: string) => () => value(name)

      const wrapper = mount(Switch, {
        props: {
          ui: {
            root: uiValue('root'),
            thumb: uiValue('thumb'),
          },
        },
      })

      expect(wrapper.get('[data-switch-ui="root"]').classes()).toContain('ui-root')
      expect(wrapper.get('[data-switch-ui="thumb"]').classes()).toContain('ui-thumb')
    })
  })

  describe('Slots', () => {
    it('Render thumb slot', () => {
      const thumb = mount(Switch, {
        slots: { thumb: () => h('span', 'test') },
      }).get('[data-switch-slot="thumb"]')

      expect(thumb.get('span').html()).toBe('<span>test</span>')
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const root = mount(Switch, {
        attrs: {
          class: 'custom-switch',
          style: 'opacity: 0.5',
          'data-test': 'notifications-switch',
          'aria-label': 'Notificaciones',
        },
      }).get('[data-switch-ui="root"]')

      expect(root.classes()).toContain('custom-switch')
      expect(root.attributes('style')).toContain('opacity: 0.5')
      expect(root.attributes('data-test')).toBe('notifications-switch')
      expect(root.attributes('aria-label')).toBe('Notificaciones')
    })
  })

  describe('Events', () => {
    it('Emit update:value and valueChange on click', async () => {
      const wrapper = mount(Switch, {
        props: { value: false },
      })

      await wrapper.get('[data-switch-ui="root"]').trigger('click')

      expect(wrapper.emitted('update:value')).toEqual([[true]])
      expect(wrapper.emitted('valueChange')).toEqual([[true]])
    })

    it('Emit valueChange when value prop changes', async () => {
      const wrapper = mount(Switch, {
        props: { value: false },
      })

      await wrapper.setProps({ value: true })

      expect(wrapper.emitted('valueChange')).toEqual([[true]])
    })
  })

  describe('Context', () => {
    const props = {
      trueValue: true,
      falseValue: false,
    } as const

    const context = {
      ...props,
      value: true,
      checked: true,
    }

    it('Switch context', () => {
      expect(
        createSwitchContext({ ...props, ui: { root: () => ({ class: 'ui-root' }) } }, true),
      ).toEqual(context)
    })

    it.each(['root', 'thumb'] as const)('Switch context to ui.%s function', (uiName) => {
      const ui = vi.fn(() => ({ class: `ui-${uiName}` }))

      mount(Switch, {
        props: {
          ...props,
          value: true,
          ui: { [uiName]: ui },
        },
      })

      expect(ui).toHaveBeenCalledWith(context)
    })

    it('Switch context to thumb slot', () => {
      const thumb = vi.fn(() => h('span', 'test'))

      mount(Switch, {
        props: { ...props, value: true },
        slots: { thumb },
      })

      expect(thumb).toHaveBeenCalledWith(context)
    })
  })
})
