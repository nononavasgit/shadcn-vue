import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import {
  Checkbox,
  createCheckboxContext,
  type CheckboxContext,
  type CheckboxProps,
} from '@/components/ui/Checkbox'
import { testAttrs } from '../utils/testAttrs'

function mountCheckbox(options: MountingOptions<CheckboxProps> = {}) {
  return mount(Checkbox, options)
}

describe('Checkbox', () => {
  describe('props', () => {
    describe('value', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: 'indeterminate' as const, expected: 'indeterminate' },
        { input: undefined, expected: false },
      ])('passes value=$input as modelValue=$expected', ({ input, expected }) => {
        const root = mountCheckbox({ props: { value: input } }).getComponent(
          '[data-test-checkbox-root]',
        )

        expect(root.vm.$parent?.$props.modelValue).toBe(expected)
      })
    })

    describe('trueValue', () => {
      it.each([
        { input: 'yes', expected: 'yes' },
        { input: 1, expected: 1 },
        { input: undefined, expected: true },
      ])('passes trueValue=$input as $expected', ({ input, expected }) => {
        const root = mountCheckbox({ props: { trueValue: input } }).getComponent(
          '[data-test-checkbox-root]',
        )

        expect(root.vm.$parent?.$props.trueValue).toBe(expected)
      })
    })

    describe('falseValue', () => {
      it.each([
        { input: 'no', expected: 'no' },
        { input: 0, expected: 0 },
        { input: undefined, expected: false },
      ])('passes falseValue=$input as $expected', ({ input, expected }) => {
        const root = mountCheckbox({ props: { falseValue: input } }).getComponent(
          '[data-test-checkbox-root]',
        )

        expect(root.vm.$parent?.$props.falseValue).toBe(expected)
      })
    })

    describe('ui.indicator', () => {
      it('passes the indicator UI resolver result to the indicator', () => {
        const checkbox = mountCheckbox({
          props: {
            value: true,
            ui: {
              indicator: ({ state }) => ({
                id: `indicator-${state}`,
                class: 'custom-indicator',
              }),
            },
          },
        })

        const indicator = checkbox.get('[data-test-checkbox-indicator]')

        expect(indicator.attributes('id')).toBe('indicator-true')
        expect(indicator.classes()).toContain('custom-indicator')
      })
    })
  })

  describe('root configuration', () => {
    it('always passes as=button', () => {
      const root = mountCheckbox().getComponent('[data-test-checkbox-root]')

      expect(root.vm.$parent?.$props.as).toBe('button')
    })

    it('always passes asChild=false', () => {
      const root = mountCheckbox().getComponent('[data-test-checkbox-root]')

      expect(root.vm.$parent?.$props.asChild).toBe(false)
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-checkbox-root]',
      mount: (attrs) => mountCheckbox({ attrs }),
    })
  })

  describe('emits', () => {
    const valueChangeCases = [
      { initial: false, next: true, expected: [[true]] },
      { initial: true, next: false, expected: [[false]] },
      { initial: 'indeterminate' as const, next: true, expected: [[true]] },
      { initial: false, next: false, expected: undefined },
    ] as const

    it.each(valueChangeCases)(
      'emits valueChange when updating externally from $initial to $next',
      async ({ initial, next, expected }) => {
        const checkbox = mountCheckbox({ props: { value: initial } })

        await checkbox.setProps({ value: next })

        expect(checkbox.emitted('valueChange')).toEqual(expected)
      },
    )

    it('emits valueChange when clicking an unchecked checkbox', async () => {
      const checkbox = mountCheckbox({ props: { value: false } })

      await checkbox.get('[data-test-checkbox-root]').trigger('click')

      expect(checkbox.emitted('valueChange')).toEqual([[true]])
    })
  })

  describe('context contract', () => {
    it.each([
      { input: false, trueValue: true, expected: { value: false, state: false } },
      { input: true, trueValue: true, expected: { value: true, state: true } },
      {
        input: 'indeterminate' as const,
        trueValue: true,
        expected: { value: 'indeterminate', state: 'indeterminate' },
      },
      { input: 'yes', trueValue: 'yes', expected: { value: 'yes', state: true } },
      { input: 'no', trueValue: 'yes', expected: { value: 'no', state: false } },
    ])('creates value=$input context', ({ input, trueValue, expected }) => {
      expect(createCheckboxContext(input, trueValue)).toEqual(expected satisfies CheckboxContext)
    })
  })

  describe('slots', () => {
    it('renders the indicator slot with value and state context', () => {
      const checkbox = mountCheckbox({
        props: { value: true },
        slots: {
          indicator: (context: CheckboxContext) =>
            h(
              'span',
              { 'data-test-checkbox-slot': '' },
              `${String(context.value)}:${String(context.state)}`,
            ),
        },
      })

      expect(checkbox.get('[data-test-checkbox-slot]').text()).toBe('true:true')
      expect(checkbox.find('[data-test-checkbox-icon]').exists()).toBe(false)
    })

    it('renders the default indicator icon', () => {
      const checkbox = mountCheckbox({ props: { value: true } })

      expect(checkbox.get('[data-test-checkbox-icon]').exists()).toBe(true)
    })
  })
})
