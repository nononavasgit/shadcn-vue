import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Icon, normalizeIconProps, type IconProps } from '@/components/ui/Icon'

function mountIcon(options: MountingOptions<IconProps> = {}) {
  return mount(Icon, { props: { name: 'check' }, ...options })
}

describe('Icon', () => {
  describe('props', () => {
    describe('name', () => {
      it.each([
        { input: 'check' as const, expected: 'lucide-check' },
        { input: 'chevronRight' as const, expected: 'lucide-chevron-right' },
        { input: 'error' as const, expected: 'lucide-circle-alert' },
      ])('renders name=$input', ({ input, expected }) => {
        const root = mountIcon({ props: { name: input } }).get('[data-test-icon-root]')

        expect(root.classes()).toContain(expected)
      })
    })

    describe('size', () => {
      it.each([
        { input: 'xs' as const, expected: 'size-3' },
        { input: 'sm' as const, expected: 'size-4' },
        { input: 'md' as const, expected: 'size-5' },
        { input: 'lg' as const, expected: 'size-6' },
        { input: undefined, expected: 'size-5' },
      ])('renders size=$input', ({ input, expected }) => {
        const root = mountIcon({ props: { name: 'check', size: input } }).get(
          '[data-test-icon-root]',
        )

        expect(root.classes()).toContain(expected)
      })
    })

    describe('color', () => {
      it.each([
        { input: '#ff0000', expected: 'color: rgb(255, 0, 0)' },
        { input: 'currentColor', expected: 'color: currentcolor' },
        { input: undefined, expected: 'color: currentcolor' },
      ])('renders color=$input', ({ input, expected }) => {
        const root = mountIcon({ props: { name: 'check', color: input } }).get(
          '[data-test-icon-root]',
        )

        expect(root.attributes('style')).toContain(expected)
      })
    })
  })

  describe('attrs', () => {
    it('forwards arbitrary attrs to root', () => {
      const root = mountIcon({
        attrs: { id: 'status', role: 'img', 'aria-label': 'Status', 'data-testid': 'icon' },
      }).get('[data-test-icon-root]')

      expect(root.attributes('id')).toBe('status')
      expect(root.attributes('role')).toBe('img')
      expect(root.attributes('aria-label')).toBe('Status')
      expect(root.attributes('data-testid')).toBe('icon')
    })

    it('forwards class and style to root', () => {
      const root = mountIcon({
        attrs: { class: 'custom-icon', style: 'opacity: 0.5' },
      }).get('[data-test-icon-root]')

      expect(root.classes()).toContain('custom-icon')
      expect(root.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('normalizeIconProps contract', () => {
    const onClick = vi.fn()

    it.each([
      { input: 'check' as const, expected: { name: 'check' } },
      {
        input: {
          name: 'error' as const,
          size: 'sm' as const,
          color: '#ff0000',
          class: 'custom-icon',
          'aria-label': 'Error',
          onClick,
        },
        expected: {
          name: 'error',
          size: 'sm',
          color: '#ff0000',
          class: 'custom-icon',
          'aria-label': 'Error',
          onClick,
        },
      },
      { input: undefined, expected: undefined },
      { input: '', expected: undefined },
    ])('normalizes $input', ({ input, expected }) => {
      expect(normalizeIconProps(input)).toEqual(expected)
    })
  })
})
