import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Icon, type IconProps } from '@/components/ui/Icon'
import { testAttrs } from '../utils/testAttrs'

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
    testAttrs({
      text: 'forwards attrs, class and style to root',
      id: '[data-test-icon-root]',
      mount: (attrs) => mountIcon({ attrs }),
    })
  })
})
