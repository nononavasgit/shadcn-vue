import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { NumberFieldRoot } from 'reka-ui'

import { NumberField, type NumberFieldProps } from '@/components/ui/NumberField'

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
  { input: undefined, expected: undefined },
  { input: 100, expected: 100 },
  { input: 200, expected: 200 },
  { input: -5, expected: -5 },
]

const casesDisabled = [
  { input: undefined, expected: false },
  { input: true, expected: true },
  { input: false, expected: false },
]

describe('NumberField', () => {
  describe('props', () => {
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
    })
  })
})
