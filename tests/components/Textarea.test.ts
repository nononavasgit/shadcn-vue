import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Textarea, type TextareaProps } from '@/components/ui/Textarea'
import { testAttrs } from '../utils/testAttrs'

function mountTextarea(options: MountingOptions<TextareaProps> = {}) {
  return mount(Textarea, options)
}

const casesValue = [
  { input: 'Description', expected: 'Description' },
  { input: '', expected: '' },
  { input: undefined, expected: '' },
]

describe('Textarea', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)('renders value=$input as "$expected"', ({ input, expected }) => {
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
    describe('update:value', () => {
      it('emits the updated value when the user edits the textarea', async () => {
        const wrapper = mountTextarea({ props: { value: '' } })

        await wrapper.get('[data-test-textarea-root]').setValue('Updated value')

        expect(wrapper.emitted('update:value')).toEqual([['Updated value']])
      })
    })
  })
})
