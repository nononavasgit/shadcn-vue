import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { CheckboxRoot } from 'reka-ui'

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
        { input: true, trueValue: true, falseValue: false, expected: true },
        { input: false, trueValue: true, falseValue: false, expected: false },
        {
          input: 'indeterminate' as const,
          trueValue: true,
          falseValue: false,
          expected: 'indeterminate' as const,
        },
        { input: undefined, trueValue: true, falseValue: false, expected: false },
        { input: 'yes', trueValue: 'yes', falseValue: 'no', expected: 'yes' },
        { input: 'no', trueValue: 'yes', falseValue: 'no', expected: 'no' },
        {
          input: 'indeterminate' as const,
          trueValue: 'yes',
          falseValue: 'no',
          expected: 'indeterminate' as const,
        },
        { input: 'invalid', trueValue: 'yes', falseValue: 'no', expected: 'no' },
      ] as const)('passes value=$input as modelValue=$expected', (inputCase) => {
        const { input, trueValue, falseValue, expected } = inputCase
        const root = mountCheckbox({ props: { value: input, trueValue, falseValue } }).getComponent(
          CheckboxRoot,
        )

        expect(root.props('modelValue')).toBe(expected)
        expect(root.props('trueValue')).toBe(trueValue)
        expect(root.props('falseValue')).toBe(falseValue)
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
      const root = mountCheckbox().getComponent(CheckboxRoot)

      expect(root.props('as')).toBe('button')
    })

    it('always passes asChild=false', () => {
      const root = mountCheckbox().getComponent(CheckboxRoot)

      expect(root.props('asChild')).toBe(false)
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-checkbox-root]',
      mount: (attrs) => mountCheckbox({ attrs }),
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
