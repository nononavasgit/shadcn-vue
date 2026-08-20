import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { ButtonGroup, type ButtonGroupProps } from '@/components/ui/ButtonGroup'
import { testAttrs } from '../utils/testAttrs'

function mountButtonGroup(options: MountingOptions<ButtonGroupProps> = {}) {
  return mount(ButtonGroup, options)
}

describe('ButtonGroup', () => {
  describe('props', () => {
    describe('orientation', () => {
      it.each([
        { input: 'horizontal' as const, expected: ['flex-row', 'rounded-l-none', 'border-l-0'] },
        { input: 'vertical' as const, expected: ['flex-col', 'rounded-t-none', 'border-t-0'] },
        { input: undefined, expected: ['flex-row', 'rounded-l-none', 'border-l-0'] },
      ])('renders orientation=$input', ({ input, expected }) => {
        const root = mountButtonGroup({ props: { orientation: input } }).get(
          '[data-test-button-group-root]',
        )

        expect(root.classes().join(' ')).toEqual(expect.stringContaining(expected[0]))
        expect(root.classes().join(' ')).toEqual(expect.stringContaining(expected[1]))
        expect(root.classes().join(' ')).toEqual(expect.stringContaining(expected[2]))
      })
    })

    describe('size', () => {
      it.each([
        { input: 'xs' as const, expected: ['h-7', 'px-2.5', 'text-xs'] },
        { input: 'sm' as const, expected: ['h-8', 'px-3', 'text-sm'] },
        { input: 'md' as const, expected: ['h-9', 'px-4', 'text-base'] },
        { input: 'lg' as const, expected: ['h-10', 'px-6', 'text-lg'] },
        { input: undefined, expected: ['h-9', 'px-4', 'text-base'] },
      ])('renders size=$input', ({ input, expected }) => {
        const classes = mountButtonGroup({ props: { size: input } })
          .get('[data-test-button-group-root]')
          .classes()
          .join(' ')

        expect(classes).toEqual(expect.stringContaining(expected[0]))
        expect(classes).toEqual(expect.stringContaining(expected[1]))
        expect(classes).toEqual(expect.stringContaining(expected[2]))
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-button-group-root]',
      mount: (attrs) => mountButtonGroup({ attrs }),
    })

    it('renders the group role on root', () => {
      expect(mountButtonGroup().get('[data-test-button-group-root]').attributes('role')).toBe(
        'group',
      )
    })
  })

  describe('slots', () => {
    it('renders the default slot', () => {
      const group = mountButtonGroup({
        slots: { default: () => h('button', { 'data-test-button-group-item': '' }, 'Action') },
      })

      expect(group.get('[data-test-button-group-item]').text()).toBe('Action')
    })
  })
})
