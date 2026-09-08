import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldRoot } from 'reka-ui'

import {
  NumberField,
  type NumberFieldProps,
  type NumberFieldValue,
} from '@/components/ui/NumberField'

function mountNumberField(options: MountingOptions<NumberFieldProps> = {}) {
  return mount(NumberField, options)
}

const casesMin = [
  { input: undefined, expected: 0 },
  { input: 0, expected: 0 },
  { input: 10, expected: 10 },
  { input: -5, expected: -5 },
]

const casesMax = [
  { input: undefined, expected: 1 },
  { input: 100, expected: 100 },
  { input: 200, expected: 200 },
  { input: -5, expected: -5 },
]

const casesDisabled = [
  { input: undefined, expected: false },
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesDisableWheelChange = [
  { input: undefined, expected: false },
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesFocusOnChange = [
  { input: undefined, expected: true },
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesFormatOptions = [
  { input: undefined, expected: undefined },
  { input: {}, expected: {} },
  {
    input: { style: 'currency', currency: 'EUR' },
    expected: { style: 'currency', currency: 'EUR' },
  },
  {
    input: { style: 'percent', maximumFractionDigits: 2 },
    expected: { style: 'percent', maximumFractionDigits: 2 },
  },
]

const casesId = [
  { input: undefined, expected: undefined },
  { input: 'quantity', expected: 'quantity' },
  { input: 'custom-number-field', expected: 'custom-number-field' },
  { input: '', expected: '' },
]

const casesLocale = [
  { input: undefined, expected: undefined },
  { input: 'en-US', expected: 'en-US' },
  { input: 'es-ES', expected: 'es-ES' },
]

const casesName = [
  { input: undefined, expected: undefined },
  { input: 'quantity', expected: 'quantity' },
  { input: 'amount', expected: 'amount' },
]

const casesReadonly = [
  { input: undefined, expected: undefined },
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesRequired = [
  { input: undefined, expected: undefined },
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesStep = [
  { input: undefined, expected: 1 },
  { input: 1, expected: 1 },
  { input: 0.5, expected: 0.5 },
  { input: 10, expected: 10 },
]

const casesStepSnapping = [
  { input: undefined, expected: true },
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesValue = [
  { input: undefined, expected: undefined },
  { input: null, expected: null },
  { input: 25, expected: 25 },
]

describe('NumberField', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)('pasa value=$input como modelValue=$expected', ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { value: input as NumberFieldValue } })

        expect(wrapper.getComponent(NumberFieldRoot).props('modelValue')).toBe(expected)
      })
    })
    describe('min', () => {
      it.each(casesMin)(
        'pasa min=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { min: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('min')).toBe(expected)
        },
      )
    })

    describe('max', () => {
      it.each(casesMax)(
        'pasa max=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { max: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('max')).toBe(expected)
        },
      )
    })

    describe('disabled', () => {
      it.each(casesDisabled)(
        'pasa disabled=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { disabled: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('disabled')).toBe(expected)
        },
      )

      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
      ])('pasa disabled=$input a increment y decrement', ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { disabled: input } })

        expect(wrapper.getComponent(NumberFieldIncrement).props('disabled')).toBe(expected)
        expect(wrapper.getComponent(NumberFieldDecrement).props('disabled')).toBe(expected)
      })
    })

    describe('disableWheelChange', () => {
      it.each(casesDisableWheelChange)(
        'pasa disableWheelChange=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { disableWheelChange: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('disableWheelChange')).toBe(expected)
        },
      )
    })

    describe('focusOnChange', () => {
      it.each(casesFocusOnChange)(
        'pasa focusOnChange=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { focusOnChange: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('focusOnChange')).toBe(expected)
        },
      )
    })

    describe('formatOptions', () => {
      it.each(casesFormatOptions)(
        'pasa formatOptions=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { formatOptions: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('formatOptions')).toEqual(expected)
        },
      )
    })

    describe('id', () => {
      it.each(casesId)('pasa id=$input a NumberFieldRoot como $expected', ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { id: input } })

        expect(wrapper.getComponent(NumberFieldRoot).props('id')).toBe(expected)
      })
    })

    describe('locale', () => {
      it.each(casesLocale)(
        'pasa locale=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { locale: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('locale')).toBe(expected)
        },
      )
    })

    describe('name', () => {
      it.each(casesName)(
        'pasa name=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { name: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('name')).toBe(expected)
        },
      )
    })
  })

  describe('emits', () => {
    it('reenvía update:modelValue de NumberFieldRoot como update:value', async () => {
      const wrapper = mountNumberField({ props: { value: 10 } })
      const root = wrapper.getComponent(NumberFieldRoot)

      await root.vm.$emit('update:modelValue', 25)

      expect(wrapper.emitted('update:value')).toEqual([[25]])
    })
  })

  describe('readonly', () => {
    it.each(casesReadonly)(
      'pasa readonly=$input a NumberFieldRoot como $expected',
      ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { readonly: input } })

        expect(wrapper.getComponent(NumberFieldRoot).props('readonly')).toBe(expected)
      },
    )
  })

  describe('required', () => {
    it.each(casesRequired)(
      'pasa required=$input a NumberFieldRoot como $expected',
      ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { required: input } })

        expect(wrapper.getComponent(NumberFieldRoot).props('required')).toBe(expected)
      },
    )
  })

  describe('step', () => {
    it.each(casesStep)(
      'pasa step=$input a NumberFieldRoot como $expected',
      ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { step: input } })

        expect(wrapper.getComponent(NumberFieldRoot).props('step')).toBe(expected)
      },
    )
  })

  describe('stepSnapping', () => {
    it.each(casesStepSnapping)(
      'pasa stepSnapping=$input a NumberFieldRoot como $expected',
      ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { stepSnapping: input } })

        expect(wrapper.getComponent(NumberFieldRoot).props('stepSnapping')).toBe(expected)
      },
    )
  })
})
