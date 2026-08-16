import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { createToggleContext, Toggle, type ToggleProps } from '@/components/ui/Toggle'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'
import { testIconProps, testIconSize } from '../utils/testIconProps'

function mountToggle(options: MountingOptions<ToggleProps> = {}) {
  return mount(Toggle, options)
}

describe('Toggle', () => {
  describe('props', () => {
    describe('label', () => {
      it.each([
        { input: 'Notifications', expected: 'Notifications' },
        { input: undefined, expected: '' },
      ])('renders label=$input as "$expected"', ({ input, expected }) => {
        const root = mountToggle({ props: { label: input } }).get('[data-test-toggle-root]')
        expect(root.text()).toBe(expected)
      })
    })

    //** Reka Props */
    describe('value', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('passes value=$input as modelValue=$expected', ({ input, expected }) => {
        const root = mountToggle({ props: { value: input } }).getComponent(
          '[data-test-toggle-root]',
        )

        expect(root.vm.$parent?.$props.modelValue).toBe(expected)
      })
    })

    describe('variant', () => {
      it.each([
        { input: 'outline' as const, expected: ['border', 'bg-transparent'] },
        { input: 'plain' as const, expected: ['bg-transparent'] },
        { input: undefined, expected: ['border', 'bg-transparent'] },
      ])('renders variant=$input', ({ input, expected }) => {
        const root = mountToggle({ props: { variant: input } }).get('[data-test-toggle-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('severity', () => {
      it.each([
        { input: 'default' as const, expected: 'hover:bg-muted' },
        { input: 'primary' as const, expected: 'text-primary' },
        { input: 'secondary' as const, expected: 'text-secondary-foreground' },
        { input: 'warning' as const, expected: 'text-warning' },
        { input: 'success' as const, expected: 'text-success' },
        { input: 'error' as const, expected: 'text-error' },
      ])('renders severity=$input', ({ input, expected }) => {
        const root = mountToggle({ props: { severity: input } }).get('[data-test-toggle-root]')

        expect(root.classes()).toContain(expected)
      })
    })

    describe('size', () => {
      it.each([
        { input: 'xs' as const, expected: ['h-7', 'text-xs'] },
        { input: 'sm' as const, expected: ['h-8', 'text-sm'] },
        { input: 'md' as const, expected: ['h-9', 'text-base'] },
        { input: 'lg' as const, expected: ['h-10', 'text-lg'] },
      ])('renders size=$input', ({ input, expected }) => {
        const root = mountToggle({ props: { size: input } }).get('[data-test-toggle-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    /** Reka prop */
    describe('disabled', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('renders disabled=$input as $expected', ({ input, expected }) => {
        const root = mountToggle({ props: { disabled: input } }).getComponent(
          '[data-test-toggle-root]',
        )

        expect(root.vm.$parent?.$props.disabled).toBe(expected)
      })
    })

    describe('icon', () => {
      testIconProps({
        text: 'passes icon props',
        id: '[data-test-toggle-icon]',
        mount: (input) => mountToggle({ props: { icon: input } }),
      })

      testIconSize({
        text: 'passes Toggle size to icon',
        id: '[data-test-toggle-icon]',
        mount: (size) => mountToggle({ props: { size, icon: 'check' } }),
      })
    })

    describe('trailingIcon', () => {
      testIconProps({
        text: 'passes trailingIcon props',
        id: '[data-test-toggle-trailing-icon]',
        mount: (input) => mountToggle({ props: { trailingIcon: input } }),
      })

      testIconSize({
        text: 'passes Toggle size to trailing icon',
        id: '[data-test-toggle-trailing-icon]',
        mount: (size) => mountToggle({ props: { size, trailingIcon: 'check' } }),
      })
    })

    describe('color', () => {
      testColor({
        text: 'renders color',
        id: '[data-test-toggle-root]',
        varColor: '--toggle-color',
        mount: (color) => mountToggle({ props: { color } }),
      })
    })
  })

  describe('root configuration', () => {
    it('always passes as=button', () => {
      const root = mountToggle().getComponent('[data-test-toggle-root]')

      expect(root.vm.$parent?.$props.as).toBe('button')
    })

    it('always passes asChild=false', () => {
      const root = mountToggle().getComponent('[data-test-toggle-root]')

      expect(root.vm.$parent?.$props.asChild).toBe(false)
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-toggle-root]',
      mount: (attrs) => mountToggle({ attrs }),
    })
  })

  describe('emits', () => {
    it.each([
      { input: { disabled: false, value: false }, expected: [[true]] },
      { input: { disabled: false, value: true }, expected: [[false]] },
      { input: { disabled: true, value: false }, expected: undefined },
      { input: { disabled: true, value: true }, expected: undefined },
    ])(
      'emits valueChange when click with input=$input.value and disabled=$input.disabled',
      async ({ input, expected }) => {
        const toggle = mountToggle({ props: input })

        await toggle.get('[data-test-toggle-root]').trigger('click')

        expect(toggle.emitted('valueChange')).toEqual(expected)
      },
    )

    it.each([
      { input: false, expected: true },
      { input: true, expected: false },
    ])(
      'emits valueChange when value changes externally with input=$input',
      async ({ input, expected }) => {
        const toggle = mountToggle({ props: { value: input } })

        await toggle.setProps({ value: expected })

        expect(toggle.emitted('valueChange')).toEqual([[expected]])
      },
    )
  })

  describe('context contract', () => {
    it.each([
      { input: false, expected: { value: false, state: 'off', pressed: false } },
      { input: true, expected: { value: true, state: 'on', pressed: true } },
    ])('creates value=$input context', ({ input, expected }) => {
      expect(createToggleContext(input)).toEqual(expected)
    })
  })

  describe('slots', () => {
    it.each(['default', 'leading', 'trailing'])('renders the %s slot', (slot) => {
      const toggle = mountToggle({
        props: { value: true },
        slots: {
          [slot]: () => h('span', { [`data-test-toggle-slot-${slot}`]: '' }, `${slot}`),
        },
      })

      expect(toggle.get(`[data-test-toggle-slot-${slot}]`).text()).toBe(slot)
    })

    it('leading and trailing slots replace their fallback icons', () => {
      const toggle = mountToggle({
        props: { icon: 'check', trailingIcon: 'chevronRight' },
        slots: {
          leading: () => h('span', 'Leading'),
          trailing: () => h('span', 'Trailing'),
        },
      })

      expect(toggle.find('[data-test-toggle-icon]').exists()).toBe(false)
      expect(toggle.find('[data-test-toggle-trailing-icon]').exists()).toBe(false)
    })
  })
})
