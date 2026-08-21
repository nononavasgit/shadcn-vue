import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Label, type LabelProps } from '@/components/ui/Label'
import { testAttrs } from '../utils/testAttrs'

function mountLabel(options: MountingOptions<LabelProps> = {}) {
  return mount(Label, options)
}

describe('Label', () => {
  describe('props', () => {
    describe('for', () => {
      it.each([
        { input: 'email', expected: 'email' },
        { input: undefined, expected: undefined },
      ])('renders for=$input as $expected', ({ input, expected }) => {
        const root = mountLabel({ props: { for: input } }).get('[data-test-label-root]')

        expect(root.attributes('for')).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-label-root]',
      mount: (attrs) => mountLabel({ attrs }),
    })
  })

  describe('slots', () => {
    it('renders the default slot', () => {
      const label = mountLabel({
        slots: {
          default: () => h('span', { 'data-test-label-slot': '' }, 'Email address'),
        },
      })

      expect(label.get('[data-test-label-slot]').text()).toBe('Email address')
    })
  })
})
