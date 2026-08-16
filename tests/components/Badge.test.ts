import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Badge, type BadgeProps } from '@/components/ui/Badge'

function mountBadge(options: MountingOptions<BadgeProps> = {}) {
  return mount(Badge, options)
}

describe('Badge', () => {
  describe('props', () => {
    describe('label', () => {
      it.each([
        { input: 'Status', expected: 'Status' },
        { input: undefined, expected: '' },
      ])('renders label=$input as "$expected"', ({ input, expected }) => {
        const badge = mountBadge({ props: { label: input } })

        expect(badge.get('[data-test-badge-root]').text()).toBe(expected)
      })
    })

    describe('size', () => {
      it.each([
        { input: 'sm' as const, expected: ['gap-0.5', 'px-0.5', 'text-sm'] },
        { input: 'md' as const, expected: ['gap-1', 'px-1', 'text-base'] },
        { input: 'lg' as const, expected: ['gap-1.5', 'px-2', 'text-lg'] },
      ])('renders size=$input', ({ input, expected }) => {
        const root = mountBadge({ props: { size: input } }).get('[data-test-badge-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('variant', () => {
      it.each([
        {
          input: 'solid' as const,
          expected: ['border-transparent', 'bg-primary', 'text-primary-foreground'],
        },
        {
          input: 'outline' as const,
          expected: ['border', 'border-primary/40', 'bg-transparent', 'text-primary'],
        },
        {
          input: 'plain' as const,
          expected: ['border-transparent', 'bg-transparent', 'text-primary'],
        },
        {
          input: 'subtle' as const,
          expected: ['border', 'border-primary/20', 'bg-primary/10', 'text-primary'],
        },
        {
          input: 'soft' as const,
          expected: ['border-transparent', 'bg-primary/10', 'text-primary'],
        },
      ])('renders variant=$input', ({ input, expected }) => {
        const root = mountBadge({ props: { variant: input } }).get('[data-test-badge-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('severity', () => {
      it.each([
        { input: 'primary' as const, expected: ['bg-primary', 'text-primary-foreground'] },
        { input: 'secondary' as const, expected: ['bg-secondary', 'text-secondary-foreground'] },
        { input: 'warning' as const, expected: ['bg-warning', 'text-warning-foreground'] },
        { input: 'success' as const, expected: ['bg-success', 'text-success-foreground'] },
        { input: 'error' as const, expected: ['bg-error', 'text-error-foreground'] },
      ])('renders severity=$input', ({ input, expected }) => {
        const root = mountBadge({ props: { severity: input } }).get('[data-test-badge-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('color', () => {
      it('applies a custom color', () => {
        const root = mountBadge({ props: { color: '#ff0000' } }).get('[data-test-badge-root]')

        expect(root.attributes('style')).toContain('--badge-color: #ff0000')
        expect(root.attributes('style')).toContain('--badge-color-foreground: #09090b')
        expect(root.classes()).toEqual(
          expect.arrayContaining([
            'bg-(--badge-color)',
            'text-(--badge-color-foreground)',
            'focus-visible:border-(--badge-color)',
          ]),
        )
      })
    })

    describe('icon', () => {
      it.each([
        { input: 'check' as const, expected: 'check' },
        { input: { name: 'error' as const, color: 'green' }, expected: 'error' },
        { input: undefined, expected: undefined },
      ])('renders icon=$input as $expected', ({ input, expected }) => {
        const badge = mountBadge({ props: { icon: input } })
        const icon = badge.findComponent('[data-test-badge-icon]')

        expect(icon.exists()).toBe(expected !== undefined)
        if (expected !== undefined) expect(icon.props('name')).toBe(expected)
      })
    })

    describe('trailingIcon', () => {
      it.each([
        { input: 'chevronRight' as const, expected: 'chevronRight' },
        { input: { name: 'error' as const, color: 'green' }, expected: 'error' },
        { input: undefined, expected: undefined },
      ])('renders trailingIcon=$input as $expected', ({ input, expected }) => {
        const badge = mountBadge({ props: { trailingIcon: input } })
        const icon = badge.findComponent('[data-test-badge-trailing-icon]')

        expect(icon.exists()).toBe(expected !== undefined)
        if (expected !== undefined) expect(icon.props('name')).toBe(expected)
      })
    })

    describe('icon size (icon/trailingIcon)', () => {
      it.each([
        { input: 'sm' as const, expected: 'sm' },
        { input: 'md' as const, expected: 'md' },
        { input: 'lg' as const, expected: 'lg' },
        { input: undefined, expected: 'md' },
      ])('passes Badge size=$input to icons as $expected', ({ input, expected }) => {
        const badge = mountBadge({
          props: {
            size: input,
            icon: 'check',
            trailingIcon: 'chevronRight',
          },
        })

        expect(badge.getComponent('[data-test-badge-icon]').props('size')).toBe(expected)
        expect(badge.getComponent('[data-test-badge-trailing-icon]').props('size')).toBe(expected)
      })

      it('prioritizes icon sizes over Badge size', () => {
        const badge = mountBadge({
          props: {
            size: 'lg',
            icon: { name: 'check', size: 'sm' },
            trailingIcon: { name: 'chevronRight', size: 'md' },
          },
        })

        expect(badge.getComponent('[data-test-badge-icon]').props('size')).toBe('sm')
        expect(badge.getComponent('[data-test-badge-trailing-icon]').props('size')).toBe('md')
      })
    })
  })

  describe('attrs', () => {
    it('forwards arbitrary attrs to root', () => {
      const root = mountBadge({
        attrs: { id: 'status', 'aria-label': 'Status', 'data-testid': 'badge' },
      }).get('[data-test-badge-root]')

      expect(root.attributes('id')).toBe('status')
      expect(root.attributes('aria-label')).toBe('Status')
      expect(root.attributes('data-testid')).toBe('badge')
    })

    it('forwards class and style to root', () => {
      const root = mountBadge({
        attrs: { class: 'custom-badge', style: 'opacity: 0.5' },
      }).get('[data-test-badge-root]')

      expect(root.classes()).toContain('custom-badge')
      expect(root.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('slots', () => {
    const slotCases = [
      { input: 'default' as const, expected: 'default' },
      { input: 'leading' as const, expected: 'leading' },
      { input: 'trailing' as const, expected: 'trailing' },
    ]

    it.each(slotCases)('renders the $input slot', ({ input, expected }) => {
      const badge = mountBadge({
        props: { label: 'Label', icon: 'check', trailingIcon: 'chevronRight' },
        slots: {
          [input]: () => h('span', { 'data-test-badge-slot': expected }, `Slot ${expected}`),
        },
      })

      expect(badge.get(`[data-test-badge-slot="${expected}"]`).text()).toBe(`Slot ${expected}`)
    })

    it('leading and trailing slots replace their fallback icons', () => {
      const badge = mountBadge({
        props: { icon: 'check', trailingIcon: 'chevronRight' },
        slots: {
          leading: () => h('span', 'Leading'),
          trailing: () => h('span', 'Trailing'),
        },
      })

      expect(badge.findComponent('[data-test-badge-icon]').exists()).toBe(false)
      expect(badge.findComponent('[data-test-badge-trailing-icon]').exists()).toBe(false)
    })
  })
})
