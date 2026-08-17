import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { InputTime, type InputTimeProps } from '@/components/ui/InputTime'
import { testAttrs } from '../utils/testAttrs'

function mountInputTime(options: MountingOptions<InputTimeProps> = {}) {
  return mount(InputTime, options)
}

describe('InputTime', () => {
  describe('props', () => {
    describe('value', () => {
      it.each([
        { input: '09:30', expected: '09:30' },
        { input: '', expected: '' },
        { input: undefined, expected: '' },
      ])('renders value=$input as "$expected"', ({ input, expected }) => {
        const root = mountInputTime({ props: { value: input } }).get('[data-test-input-root]')

        expect(root.element.value).toBe(expected)
        expect(root.attributes('type')).toBe('time')
      })
    })

    describe('showClock', () => {
      it.each([
        { input: true, expected: false },
        { input: false, expected: true },
        { input: undefined, expected: false },
      ])('renders showClock=$input with hidden clock=$expected', ({ input, expected }) => {
        const wrapper = mountInputTime({ props: { showClock: input } })

        expect(wrapper.get('[data-test-input-root]').classes().includes('appearance-none')).toBe(
          expected,
        )
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to the native input',
      id: '[data-test-input-root]',
      mount: (attrs) => mountInputTime({ attrs }),
    })
  })
})
