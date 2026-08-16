import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Kbd, type KbdProps } from '@/components/ui/Kbd'

function mountKbd(options: MountingOptions<KbdProps> = {}) {
  return mount(Kbd, options)
}

describe('Kbd', () => {
  describe('props', () => {
    describe('label', () => {
      it.each([
        { input: 'Ctrl', expected: 'Ctrl' },
        { input: '', expected: '' },
        { input: undefined, expected: '' },
      ])('renders label=$input as "$expected"', ({ input, expected }) => {
        const root = mountKbd({ props: { label: input } }).get('[data-test-kbd-root]')

        expect(root.text()).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    it('forwards arbitrary attrs, class and style to root', () => {
      const root = mountKbd({
        attrs: {
          id: 'shortcut',
          'aria-label': 'Keyboard shortcut',
          class: 'custom-kbd',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-kbd-root]')

      expect(root.attributes('id')).toBe('shortcut')
      expect(root.attributes('aria-label')).toBe('Keyboard shortcut')
      expect(root.classes()).toContain('custom-kbd')
      expect(root.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('slots', () => {
    it('renders the default slot', () => {
      const kbd = mountKbd({
        slots: {
          default: () => h('span', { 'data-test-kbd-slot': '' }, 'Ctrl+K'),
        },
      })

      expect(kbd.get('[data-test-kbd-slot]').text()).toBe('Ctrl+K')
    })
  })
})
