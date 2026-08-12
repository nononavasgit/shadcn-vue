import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Checkbox, createCheckboxContext } from '@/components/ui/Checkbox'

describe('Checkbox', () => {
  describe('Props', () => {
    it('Render HTML Attributes by ui function', () => {
      const value = (name: string) => ({ class: `ui-${name}` })
      const uiValue = (name: string) => () => value(name)
      const wrapper = mount(Checkbox, {
        props: {
          value: true,
          ui: { root: uiValue('root'), indicator: uiValue('indicator') },
        },
      })

      expect(wrapper.get('[data-checkbox-ui="root"]').classes()).toContain('ui-root')
      expect(wrapper.get('[data-checkbox-ui="indicator"]').classes()).toContain('ui-indicator')
    })
  })

  describe('Slots', () => {
    it('Render indicator slot instead of the default icon', () => {
      const indicator = mount(Checkbox, {
        props: { value: true },
        slots: { indicator: () => h('span', 'custom') },
      }).get('[data-checkbox-slot="indicator"]')

      expect(indicator.get('span').text()).toBe('custom')
      expect(indicator.find('svg').exists()).toBe(false)
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const root = mount(Checkbox, {
        attrs: {
          class: 'custom-checkbox',
          style: 'opacity: 0.5',
          'data-test': 'terms-checkbox',
          'aria-label': 'Aceptar términos',
        },
      }).get('[data-checkbox-ui="root"]')

      expect(root.classes()).toContain('custom-checkbox')
      expect(root.attributes('style')).toContain('opacity: 0.5')
      expect(root.attributes('data-test')).toBe('terms-checkbox')
      expect(root.attributes('aria-label')).toBe('Aceptar términos')
    })
  })

  describe('Events', () => {
    it('Emit valueChange when value prop changes', async () => {
      const wrapper = mount(Checkbox, { props: { value: false } })
      await wrapper.setProps({ value: true })

      expect(wrapper.emitted('valueChange')).toEqual([[true]])
    })
  })

  describe('Context', () => {
    const props = {
      trueValue: 'accepted',
      falseValue: 'rejected',
    } as const

    const context = {
      ...props,
      value: 'accepted',
      state: true,
    }

    it.each([
      ['accepted', true],
      ['rejected', false],
      ['indeterminate', 'indeterminate'],
    ] as const)('Create context for value %s', (value, state) => {
      expect(createCheckboxContext(props, value)).toEqual({
        ...props,
        value,
        state,
      })
    })

    it.each(['root', 'indicator'] as const)('Checkbox context to ui.%s function', (uiName) => {
      const ui = vi.fn(() => ({ class: `ui-${uiName}` }))

      mount(Checkbox, {
        props: {
          ...props,
          value: 'accepted',
          ui: { [uiName]: ui },
        },
      })

      expect(ui).toHaveBeenCalledWith(context)
    })

    it('Checkbox context to indicator slot', () => {
      const indicator = vi.fn(() => h('span', 'test'))

      mount(Checkbox, {
        props: { ...props, value: 'accepted' },
        slots: { indicator },
      })

      expect(indicator).toHaveBeenCalledWith(context)
    })
  })
})
