import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Input, type InputProps } from '@/components/ui/Input'
import { testAttrs } from '../utils/testAttrs'

function mountInput(options: MountingOptions<InputProps> = {}) {
  return mount(Input, options)
}

describe('Input', () => {
  describe('props', () => {
    describe('value', () => {
      it.each([
        { input: 'Search term', expected: 'Search term' },
        { input: '', expected: '' },
        { input: undefined, expected: '' },
      ])('renders value=$input as "$expected"', ({ input, expected }) => {
        const root = mountInput({ props: { value: input } }).get('[data-test-input-root]')

        expect(root.element.value).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-input-root]',
      mount: (attrs) => mountInput({ attrs }),
    })
  })
})
