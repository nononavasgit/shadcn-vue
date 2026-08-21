import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { CheckboxRoot } from 'reka-ui'

import { Checkbox, type CheckboxContext, type CheckboxProps } from '@/components/ui/Checkbox'
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

    describe('trueValue', () => {
      it('defaults to true', () => {
        const root = mountCheckbox().getComponent(CheckboxRoot)

        expect(root.props('trueValue')).toBe(true)
      })
    })

    describe('falseValue', () => {
      it('defaults to false', () => {
        const root = mountCheckbox().getComponent(CheckboxRoot)

        expect(root.props('falseValue')).toBe(false)
      })
    })

    describe('ui.indicator', () => {
      testAttrs({
        text: 'renders ui.indicator attributes',
        id: '[data-test-checkbox-indicator]',
        mount: (attrs) =>
          mountCheckbox({
            props: {
              value: true,
              ui: { indicator: () => attrs },
            },
          }),
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

  describe('emits', () => {
    describe('update:value', () => {
      it.each([
        { value: false, trueValue: true, falseValue: false, expected: true },
        { value: true, trueValue: true, falseValue: false, expected: false },
        { value: 'off', trueValue: 'on', falseValue: 'off', expected: 'on' },
      ])(
        'emits the next value from the root interaction',
        async ({ value, trueValue, falseValue, expected }) => {
          const checkbox = mountCheckbox({ props: { value, trueValue, falseValue } })

          await checkbox.get('[data-test-checkbox-root]').trigger('click')

          expect(checkbox.emitted('update:value')).toEqual([[expected]])
        },
      )
    })
  })

  describe('slots', () => {
    describe('indicator', () => {
      it('renders the indicator slot with state context', () => {
        const checkbox = mountCheckbox({
          props: { value: true },
          slots: {
            indicator: (context: CheckboxContext) =>
              h('span', { 'data-test-checkbox-slot': '' }, String(context.state)),
          },
        })

        expect(checkbox.get('[data-test-checkbox-slot]').text()).toBe('true')
        expect(checkbox.find('[data-test-checkbox-icon]').exists()).toBe(false)
      })

      it('renders the default indicator icon', () => {
        const checkbox = mountCheckbox({ props: { value: true } })

        expect(checkbox.get('[data-test-checkbox-icon]').exists()).toBe(true)
      })
    })
  })
})
