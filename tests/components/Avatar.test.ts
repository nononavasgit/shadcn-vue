import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'

import { Avatar, type AvatarProps } from '@/components/ui/Avatar'

function mountAvatar(options: MountingOptions<AvatarProps> = {}) {
  return mount(Avatar, options)
}

describe('Avatar', () => {
  describe('props', () => {
    describe('size', () => {
      it.each([
        { input: 'xs' as const, expected: ['size-6', 'text-xs'] },
        { input: 'sm' as const, expected: ['size-8', 'text-sm'] },
        { input: 'md' as const, expected: ['size-10', 'text-base'] },
        { input: 'lg' as const, expected: ['size-12', 'text-lg'] },
        { input: undefined, expected: ['size-10', 'text-base'] },
      ])('renders size=$input', ({ input, expected }) => {
        const root = mountAvatar({ props: { size: input } }).get('[data-test-avatar-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('shape', () => {
      it.each([
        { input: 'rounded' as const, expected: 'rounded-full' },
        { input: 'square' as const, expected: 'rounded-none' },
        { input: undefined, expected: 'rounded-full' },
      ])('renders shape=$input', ({ input, expected }) => {
        const root = mountAvatar({ props: { shape: input } }).get('[data-test-avatar-root]')

        expect(root.classes()).toContain(expected)
      })
    })

    describe('src', () => {
      it('renders image attributes', () => {
        const avatar = mountAvatar({
          props: { src: 'avatar.png' },
        })
        const image = avatar.get('[data-test-avatar-image]')

        expect(image.attributes('src')).toBe('avatar.png')
      })
    })

    describe('delayMs', () => {
      it('passes delayMs to AvatarFallback', async () => {
        vi.useFakeTimers()

        try {
          const avatar = mountAvatar({ props: { delayMs: 300 } })

          vi.advanceTimersByTime(300)
          await nextTick()

          expect(avatar.getComponent('[data-test-avatar-fallback]').props('delayMs')).toBe(300)
        } finally {
          vi.useRealTimers()
        }
      })
    })

    describe('label', () => {
      it.each([
        { input: 'AL', expected: 'AL' },
        { input: undefined, expected: '' },
      ])('renders label=$input in AvatarFallback', ({ input, expected }) => {
        expect(mountAvatar({ props: { label: input } }).text()).toBe(expected)
      })
    })

    describe('icon', () => {
      it.each([
        { input: 'user' as const, expected: { name: 'user' } },
        {
          input: { name: 'info' as const, size: 'sm' as const, color: '#ff0000' },
          expected: { name: 'info', size: 'sm', color: '#ff0000' },
        },
      ])('renders icon=$input', ({ input, expected }) => {
        const icon = mountAvatar({ props: { icon: input } }).getComponent('[data-test-avatar-icon]')

        expect(icon.props()).toEqual(expect.objectContaining(expected))
      })

      it('does not render an icon without icon', () => {
        expect(mountAvatar().find('[data-test-avatar-icon]').exists()).toBe(false)
      })
    })
  })

  describe('internal props', () => {
    it('uses the fixed root configuration', () => {
      const root = mountAvatar().getComponent('[data-test-avatar-root]')

      expect(root.props('as')).toBe('span')
      expect(root.props('asChild')).toBe(false)
    })

    it('uses the fixed image configuration', () => {
      const image = mountAvatar({ props: { src: 'avatar.png' } }).getComponent(
        '[data-test-avatar-image]',
      )

      expect(image.props('as')).toBe('img')
      expect(image.props('asChild')).toBe(false)
    })

    it('uses the fixed fallback configuration', () => {
      const fallback = mountAvatar().getComponent('[data-test-avatar-fallback]')

      expect(fallback.props('as')).toBe('div')
      expect(fallback.props('asChild')).toBe(false)
    })
  })

  describe('attrs', () => {
    it.each([
      { input: { src: undefined, label: undefined, icon: undefined }, expected: 'fallback' },
      { input: { src: undefined, label: 'AL', icon: undefined }, expected: 'fallback' },
      { input: { src: undefined, label: undefined, icon: 'user' }, expected: 'fallback' },
      { input: { src: undefined, label: 'AL', icon: 'user' }, expected: 'fallback' },
      { input: { src: 'avatar.png', label: undefined, icon: undefined }, expected: 'image' },
      { input: { src: 'avatar.png', label: 'AL', icon: undefined }, expected: 'image' },
      { input: { src: 'avatar.png', label: undefined, icon: 'user' }, expected: 'image' },
      { input: { src: 'avatar.png', label: 'AL', icon: 'user' }, expected: 'image' },
    ] as const)('forwards attrs to Avatar$expected for $input', ({ input, expected }) => {
      const avatar = mountAvatar({
        props: input,
        attrs: {
          id: 'avatar-part',
          class: 'custom-part',
          style: 'opacity: 0.5',
        },
      })
      const part = avatar.get(`[data-test-avatar-${expected}]`)

      expect(part.attributes('id')).toBe('avatar-part')
      expect(part.classes()).toContain('custom-part')
      expect(part.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('slots', () => {
    it('renders the fallback slot', () => {
      const avatar = mountAvatar({
        slots: { fallback: () => h('span', { 'data-test-avatar-slot': '' }, 'Custom fallback') },
      })

      expect(avatar.get('[data-test-avatar-slot]').text()).toBe('Custom fallback')
    })
  })
})
