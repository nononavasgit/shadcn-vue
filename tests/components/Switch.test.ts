import { describe, expect, it } from 'vitest'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { h } from 'vue'
import { Switch, createSwitchContext, type SwitchContext } from '@/components/ui/Switch'
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

    describe('ui', () => {
      it('passes the resolver result to thumb', () => {
        const switchWrapper = mountSwitch({
          props: {
            value: true,
            ui: {
              thumb: () => ({
                id: `thumb`,
                class: 'custom-thumb',
              }),
            },
          },
        })

        const thumb = switchWrapper.get('[data-test-switch-thumb]')

        expect(thumb.attributes('id')).toBe('thumb')
        expect(thumb.classes()).toContain('custom-thumb')
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-switch-root]',
      mount: (attrs) => mountSwitch({ attrs }),
    })
  })

  describe('context contract', () => {
    it.each([
      {
        value: false,
        trueValue: true,
        falseValue: false,
        expected: { value: false, checked: false, ui: undefined },
      },
      {
        value: 1,
        trueValue: 1,
        falseValue: 0,
        expected: { value: 1, checked: true, ui: undefined },
      },
      {
        value: 'off',
        trueValue: 'on',
        falseValue: 'off',
        expected: { value: 'off', checked: false, ui: undefined },
      },
    ] as const)('creates value=$value context', ({ value, trueValue, falseValue, expected }) => {
      expect(
        createSwitchContext({
          value,
          props: { trueValue, falseValue },
        }),
      ).toEqual(expected satisfies SwitchContext)
    })
  })

  describe('slots', () => {
    it('renders the thumb slot', () => {
      const switchWrapper = mountSwitch({
        props: { value: 'on', trueValue: 'on', falseValue: 'off' },
        slots: {
          thumb: () => h('span', { 'data-test-switch-slot': '' }, `ok`),
        },
      })

      expect(switchWrapper.get('[data-test-switch-slot]').text()).toBe('ok')
    })
  })
})
