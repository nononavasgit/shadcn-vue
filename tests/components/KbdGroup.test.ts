import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { KbdGroup, type KbdGroupProps } from '@/components/ui/Kbd'
import { testAttrs } from '../utils/testAttrs'

function mountKbdGroup(options: MountingOptions<KbdGroupProps> = {}) {
  return mount(KbdGroup, options)
}

const casesRootClasses = ['inline-flex', 'items-center', 'gap-1']

describe('KbdGroup', () => {
  describe('root', () => {
    it.each(casesRootClasses)('renders the %s class', (className) => {
      expect(mountKbdGroup().get('[data-test-kbd-group-root]').classes()).toContain(className)
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-kbd-group-root]',
      mount: (attrs) => mountKbdGroup({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
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
})
