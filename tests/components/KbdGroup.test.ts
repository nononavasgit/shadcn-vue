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
  describe('raíz', () => {
    it.each(casesRootClasses)('renderiza la clase %s', (className) => {
      expect(mountKbdGroup().get('[data-test-kbd-group-root]').classes()).toContain(className)
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-kbd-group-root]',
      mount: (attrs) => mountKbdGroup({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot predeterminado', () => {
        const group = mountKbdGroup({
          slots: {
            default: () => h('span', { 'data-test-kbd-group-slot': '' }, 'Atajo'),
          },
        })

        expect(group.get('[data-test-kbd-group-slot]').text()).toBe('Atajo')
      })
    })
  })
})
