import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Toggle } from '@/components/ui/Toggle'

describe('Toggle', () => {
  describe('Props', () => {
    it('Render label', () => {
      const toggle = mount(Toggle, {
        props: { label: 'Bold' },
      }).get('[data-toggle-ui="root"]')

      expect(toggle.text()).toBe('Bold')
    })

    it.each([
      ['xs', 'h-7'],
      ['sm', 'h-8'],
      ['md', 'h-9'],
      ['lg', 'h-10'],
    ] as const)('Render size %s', (size, expectedClass) => {
      const toggle = mount(Toggle, {
        props: { size },
      }).get('[data-toggle-ui="root"]')

      expect(toggle.classes()).toContain(expectedClass)
    })

    it.each([
      ['outline', ['border', 'bg-transparent']],
      ['plain', ['bg-transparent']],
    ] as const)('Render variant %s', (variant, expectedClasses) => {
      const toggle = mount(Toggle, {
        props: { variant },
      }).get('[data-toggle-ui="root"]')

      expect(toggle.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })

    it.each([
      ['default', ['hover:bg-muted', 'data-[state=on]:bg-accent']],
      ['primary', ['text-primary', 'data-[state=on]:bg-primary/20']],
      ['secondary', ['text-secondary-foreground', 'data-[state=on]:bg-secondary/70']],
      ['warning', ['text-warning', 'data-[state=on]:bg-warning/20']],
      ['success', ['text-success', 'data-[state=on]:bg-success/20']],
      ['error', ['text-error', 'data-[state=on]:bg-error/20']],
    ] as const)('Render severity %s', (severity, expectedClasses) => {
      const toggle = mount(Toggle, {
        props: { severity },
      }).get('[data-toggle-ui="root"]')

      expect(toggle.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })

    it('Render custom color', () => {
      const toggle = mount(Toggle, {
        props: { color: '#ff0000' },
      }).get('[data-toggle-ui="root"]')

      expect(toggle.attributes('style')).toContain('--toggle-color: #ff0000')
      expect(toggle.classes()).toEqual(
        expect.arrayContaining([
          'text-(--toggle-color)',
          'focus-visible:border-(--toggle-color)',
          'focus-visible:ring-(--toggle-color)/30',
        ]),
      )
    })

    it('Render icons', () => {
      const wrapper = mount(Toggle, {
        props: { icon: 'check', trailingIcon: 'chevronDown' },
      })

      expect(wrapper.get('[data-toggle="leadingIcon"]').classes()).toContain('lucide-check')
      expect(wrapper.get('[data-toggle="trailingIcon"]').classes()).toContain('lucide-chevron-down')
    })

    it.each(['object', 'function'] as const)('Render HTML Attributes by ui %s', (uiType) => {
      const root =
        uiType === 'function'
          ? () => ({ class: 'ui-root', 'aria-label': 'Bold' })
          : { class: 'ui-root', 'aria-label': 'Bold' }
      const toggle = mount(Toggle, {
        props: { ui: { root } },
      }).get('[data-toggle-ui="root"]')

      expect(toggle.classes()).toContain('ui-root')
      expect(toggle.attributes('aria-label')).toBe('Bold')
    })
  })

  describe('Slots', () => {
    it.each(['default', 'leading', 'trailing'] as const)('Render %s slot', (slotName) => {
      const wrapper = mount(Toggle, {
        props: {
          label: 'Label',
          icon: 'check',
          trailingIcon: 'chevronDown',
        },
        slots: { [slotName]: () => h('span', slotName) },
      })

      expect(wrapper.get(`[data-toggle-slot="${slotName}"]`).text()).toBe(slotName)
      if (slotName === 'default') expect(wrapper.text()).not.toContain('Label')
      if (slotName === 'leading')
        expect(wrapper.find('[data-toggle="leadingIcon"]').exists()).toBe(false)
      if (slotName === 'trailing')
        expect(wrapper.find('[data-toggle="trailingIcon"]').exists()).toBe(false)
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const toggle = mount(Toggle, {
        attrs: {
          class: 'custom-toggle',
          style: 'opacity: 0.5',
          'data-test': 'bold-toggle',
        },
      }).get('[data-toggle-ui="root"]')

      expect(toggle.classes()).toContain('custom-toggle')
      expect(toggle.attributes('style')).toContain('opacity: 0.5')
      expect(toggle.attributes('data-test')).toBe('bold-toggle')
    })
  })

  describe('Events', () => {
    it('Emit valueChange when value changes', async () => {
      const wrapper = mount(Toggle, {
        props: { value: false },
      })

      await wrapper.setProps({ value: true })

      expect(wrapper.emitted('valueChange')).toEqual([[true]])
    })
  })

  describe('Context', () => {
    const props = {
      label: 'Bold',
      icon: 'check',
      trailingIcon: 'chevronDown',
      variant: 'outline',
      severity: 'primary',
      size: 'sm',
      color: '#ff0000',
      disabled: true,
      value: true,
    } as const

    const context = {
      label: props.label,
      icon: props.icon,
      trailingIcon: props.trailingIcon,
      variant: props.variant,
      severity: props.severity,
      size: props.size,
      color: props.color,
      disabled: props.disabled,
      value: true,
      state: 'on',
      pressed: true,
    }

    it('Toggle context to ui.root function', () => {
      const root = vi.fn(() => ({ class: 'ui-root' }))

      mount(Toggle, {
        props: { ...props, ui: { root } },
      })

      expect(root).toHaveBeenCalledWith(context)
    })

    it.each(['default', 'leading', 'trailing'] as const)(
      'Toggle context to %s slot',
      (slotName) => {
        const slot = vi.fn(() => h('span', slotName))

        mount(Toggle, {
          props,
          slots: { [slotName]: slot },
        })

        expect(slot).toHaveBeenCalledWith(context)
      },
    )
  })
})
