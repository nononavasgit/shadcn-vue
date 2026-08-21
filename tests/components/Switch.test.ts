import { describe, expect, it } from 'vitest'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { h } from 'vue'
import { Switch, type SwitchContext } from '@/components/ui/Switch'
import { SwitchRoot } from 'reka-ui'
import { testAttrs } from '../utils/testAttrs'

function mountSwitch(options: ComponentMountingOptions<typeof Switch> = {}) {
  return mount(Switch, options)
}

describe('Switch', () => {
  describe('props', () => {
    // Reka
    describe('value', () => {
      const valueCases = [
        { input: true, expected: true, trueValue: true, falseValue: false },
        { input: false, expected: false, trueValue: true, falseValue: false },
        { input: undefined, expected: false, trueValue: true, falseValue: false },
        { input: 1, expected: 1, trueValue: 1, falseValue: 0 },
        { input: 0, expected: 0, trueValue: 1, falseValue: 0 },
        { input: undefined, expected: 0, trueValue: 1, falseValue: 0 },
        { input: 'on', expected: 'on', trueValue: 'on', falseValue: 'off' },
        { input: 'off', expected: 'off', trueValue: 'on', falseValue: 'off' },
        { input: undefined, expected: 'off', trueValue: 'on', falseValue: 'off' },
      ]

      it.each(valueCases)(
        'renders value=$input expected modelValue=$input / trueValue=$trueValue / falseValue=$falseValue',
        ({ input, expected, trueValue, falseValue }) => {
          const root = mountSwitch({
            props: { value: input, trueValue, falseValue },
          }).getComponent(SwitchRoot)

          expect(root.props('modelValue')).toBe(expected)
          expect(root.props('trueValue')).toBe(trueValue)
          expect(root.props('falseValue')).toBe(falseValue)
        },
      )
    })

    describe('trueValue', () => {
      it('defaults to true', () => {
        const root = mountSwitch().getComponent(SwitchRoot)

        expect(root.props('trueValue')).toBe(true)
      })
    })

    describe('falseValue', () => {
      it('defaults to false', () => {
        const root = mountSwitch().getComponent(SwitchRoot)

        expect(root.props('falseValue')).toBe(false)
      })
    })

    describe('ui', () => {
      testAttrs({
        text: 'renders ui.thumb attributes',
        id: '[data-test-switch-thumb]',
        mount: (attrs) =>
          mountSwitch({
            props: {
              value: true,
              ui: { thumb: () => attrs },
            },
          }),
      })
    })
  })

  describe('root configuration', () => {
    it('always passes as=button', () => {
      const root = mountSwitch().getComponent(SwitchRoot)

      expect(root.props('as')).toBe('button')
    })

    it('always passes asChild=false', () => {
      const root = mountSwitch().getComponent(SwitchRoot)

      expect(root.props('asChild')).toBe(false)
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-switch-root]',
      mount: (attrs) => mountSwitch({ attrs }),
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
          const switchWrapper = mountSwitch({ props: { value, trueValue, falseValue } })

          await switchWrapper.get('[data-test-switch-root]').trigger('click')

          expect(switchWrapper.emitted('update:value')).toEqual([[expected]])
        },
      )
    })
  })

  describe('slots', () => {
    describe('thumb', () => {
      it.each([
        { value: true, expected: 'true' },
        { value: false, expected: 'false' },
      ])('renders the state context for value=$value', ({ value, expected }) => {
        const switchWrapper = mountSwitch({
          props: { value },
          slots: {
            thumb: (context: SwitchContext) =>
              h('span', { 'data-test-switch-slot': '' }, String(context.state)),
          },
        })

        expect(switchWrapper.get('[data-test-switch-slot]').text()).toBe(expected)
      })
    })
  })
})
