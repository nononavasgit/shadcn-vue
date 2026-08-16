import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Label, type LabelProps } from '@/components/ui/Label'

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
    it('forwards arbitrary attrs, class and style to root', () => {
      const root = mountLabel({
        attrs: {
          id: 'email-label',
          'aria-label': 'Email',
          class: 'custom-label',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-label-root]')

      expect(root.attributes('id')).toBe('email-label')
      expect(root.attributes('aria-label')).toBe('Email')
      expect(root.classes()).toContain('custom-label')
      expect(root.attributes('style')).toContain('opacity: 0.5')
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
