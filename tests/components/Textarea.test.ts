import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Textarea, type TextareaProps } from '@/components/ui/Textarea'
import { testAttrs } from '../utils/testAttrs'

function mountTextarea(options: MountingOptions<TextareaProps> = {}) {
  return mount(Textarea, options)
}

describe('Textarea', () => {
  describe('props', () => {
    describe('value', () => {
      it.each([
        { input: 'Description', expected: 'Description' },
        { input: 42, expected: '42' },
        { input: undefined, expected: '' },
      ])('renders value=$input as "$expected"', ({ input, expected }) => {
        const root = mountTextarea({ props: { value: input } }).get('[data-test-textarea-root]')

        expect(root.element.value).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-textarea-root]',
      mount: (attrs) => mountTextarea({ attrs }),
    })
  })

  describe('emits', () => {
    it('emits valueChange when edited', async () => {
      const textarea = mountTextarea({ props: { value: '' } })

      await textarea.get('[data-test-textarea-root]').setValue('Updated')

      expect(textarea.emitted('valueChange')).toEqual([['Updated']])
    })

    it.each([
      { input: '', expected: 'First value' },
      { input: 'First value', expected: '' },
    ])(
      'emits valueChange when value=$input changes externally to $expected',
      async ({ input, expected }) => {
        const textarea = mountTextarea({ props: { value: input } })

        await textarea.setProps({ value: expected })

        expect(textarea.emitted('valueChange')).toEqual([[expected]])
      },
    )
  })
})
