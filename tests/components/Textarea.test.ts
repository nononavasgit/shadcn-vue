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
    const valueChangeCases = [
      { initial: '', next: 'Updated', expected: [['Updated']] },
      { initial: 'Updated', next: '', expected: [['']] },
      { initial: 'Same', next: 'Same', expected: undefined },
    ] as const

    it.each(valueChangeCases)(
      'checks valueChange when editing from $initial to $next',
      async ({ initial, next, expected }) => {
        const textarea = mountTextarea({ props: { value: initial } })

        await textarea.get('[data-test-textarea-root]').setValue(next)

        expect(textarea.emitted('valueChange')).toEqual(expected)
      },
    )

    it.each(valueChangeCases)(
      'checks valueChange when updating externally from $initial to $next',
      async ({ initial, next, expected }) => {
        const textarea = mountTextarea({ props: { value: initial } })

        await textarea.setProps({ value: next })

        expect(textarea.emitted('valueChange')).toEqual(expected)
      },
    )
  })
})
