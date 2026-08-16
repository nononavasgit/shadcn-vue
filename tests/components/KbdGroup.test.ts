import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { KbdGroup, type KbdGroupProps } from '@/components/ui/Kbd'

function mountKbdGroup(options: MountingOptions<KbdGroupProps> = {}) {
  return mount(KbdGroup, options)
}

describe('KbdGroup', () => {
  describe('attrs', () => {
    it('forwards arbitrary attrs, class and style to root', () => {
      const root = mountKbdGroup({
        attrs: {
          id: 'shortcut',
          'aria-label': 'Keyboard shortcut',
          class: 'custom-kbd-group',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-kbd-group-root]')

      expect(root.attributes('id')).toBe('shortcut')
      expect(root.attributes('aria-label')).toBe('Keyboard shortcut')
      expect(root.classes()).toContain('custom-kbd-group')
      expect(root.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('slots', () => {
    it('renders the default slot', () => {
      const group = mountKbdGroup({
        slots: {
          default: () => h('span', { 'data-test-kbd-group-slot': '' }, 'Shortcut'),
        },
      })

      expect(group.get('[data-test-kbd-group-slot]').text()).toBe('Shortcut')
    })
  })
})
