import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import {
  ButtonGroup,
  createButtonGroupContext,
  type ButtonGroupContext,
  type ButtonGroupProps,
} from '@/components/ui/ButtonGroup'

function mountButtonGroup(options: MountingOptions<ButtonGroupProps> = {}) {
  return mount(ButtonGroup, options)
}

describe('ButtonGroup', () => {
  describe('props', () => {
    describe('orientation', () => {
      it.each([
        { input: 'horizontal' as const, expected: ['flex-row', 'rounded-l-none', 'border-l-0'] },
        { input: 'vertical' as const, expected: ['flex-col', 'rounded-t-none', 'border-t-0'] },
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
    it('forwards arbitrary attrs, class and style to root', () => {
      const root = mountButtonGroup({
        attrs: {
          id: 'pagination',
          'aria-label': 'Pagination',
          class: 'custom-group',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-button-group-root]')

      expect(root.attributes('id')).toBe('pagination')
      expect(root.attributes('aria-label')).toBe('Pagination')
      expect(root.attributes('role')).toBe('group')
      expect(root.classes()).toContain('custom-group')
      expect(root.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('context contract', () => {
    it.each([
      {
        name: 'default values',
        input: {},
        expected: { orientation: 'horizontal', size: 'md' },
      },
      {
        name: 'configured values',
        input: { orientation: 'vertical' as const, size: 'lg' as const },
        expected: { orientation: 'vertical', size: 'lg' },
      },
    ])('creates the contract with $name', ({ input, expected }) => {
      expect(createButtonGroupContext(input)).toEqual(expected satisfies ButtonGroupContext)
    })
  })

  describe('slots', () => {
    it('renders the default slot', () => {
      const group = mountButtonGroup({
        slots: { default: () => h('button', { 'data-test-button-group-item': '' }, 'Action') },
      })

      expect(group.get('[data-test-button-group-item]').text()).toBe('Action')
    })

    it('passes ButtonGroupContext to the default slot', () => {
      const slot = vi.fn(() => null)

      mountButtonGroup({
        props: { orientation: 'vertical', size: 'lg' },
        slots: { default: slot },
      })

      expect(slot).toHaveBeenCalledWith(
        expect.objectContaining({ orientation: 'vertical', size: 'lg' }),
      )
    })
  })
})
