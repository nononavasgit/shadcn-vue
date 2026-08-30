import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { InputTime, type InputTimeProps } from '@/components/ui/InputTime'
import { testAttrs } from '../utils/testAttrs'

function mountInputTime(options: MountingOptions<InputTimeProps> = {}) {
  return mount(InputTime, options)
}

const casesValue = [
  { input: '09:30', expected: '09:30' },
  { input: '', expected: '' },
  { input: undefined, expected: '' },
]

const casesShowClock = [
  { input: true, expected: false },
  { input: false, expected: true },
  { input: undefined, expected: false },
]

describe('InputTime', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)('renderiza value=$input como "$expected"', ({ input, expected }) => {
        const root = mountInputTime({ props: { value: input } }).get('[data-test-input-root]')

        expect(root.element.value).toBe(expected)
        expect(root.attributes('type')).toBe('time')
      })
    })

    describe('showClock', () => {
      it.each(casesShowClock)(
        'renderiza showClock=$input con reloj oculto=$expected',
        ({ input, expected }) => {
          const wrapper = mountInputTime({ props: { showClock: input } })

          expect(wrapper.get('[data-test-input-root]').classes().includes('appearance-none')).toBe(
            expected,
          )
        },
      )
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo al input nativo',
      id: '[data-test-input-root]',
      mount: (attrs) => mountInputTime({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it('emite la hora actualizada cuando el usuario edita el campo', async () => {
        const wrapper = mountInputTime({ props: { value: '' } })

        await wrapper.get('[data-test-input-root]').setValue('14:45')

        expect(wrapper.emitted('update:value')).toEqual([['14:45']])
      })
    })
  })
})
