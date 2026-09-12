import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DropdownMenuRoot, DropdownMenuTrigger } from 'reka-ui'

import { DropdownMenu, type DropdownMenuProps } from '@/components/ui/DropdownMenu'

const casesModal = [
  { name: 'normal true', input: true, expected: true },
  { name: 'normal false', input: false, expected: false },
  { name: 'límite undefined', input: undefined, expected: true },
]

const casesOpen = [
  { name: 'normal abierto', input: true, expected: true },
  { name: 'normal cerrado', input: false, expected: false },
  { name: 'límite undefined', input: undefined, expected: false },
]

const casesDisabled = [
  { name: 'normal deshabilitado', input: true, expected: true },
  { name: 'normal habilitado', input: false, expected: false },
  { name: 'límite undefined', input: undefined, expected: false },
]

function mountDropdownMenu(options: MountingOptions<DropdownMenuProps> = {}) {
  return mount(DropdownMenu, options)
}

describe('DropdownMenu', () => {
  describe('props', () => {
    describe('modal', () => {
      it.each(casesModal)('pasa $name a DropdownMenuRoot', ({ input, expected }) => {
        const wrapper = mountDropdownMenu({ props: { modal: input } })

        expect(wrapper.getComponent(DropdownMenuRoot).props('modal')).toBe(expected)
      })
    })

    describe('open', () => {
      it.each(casesOpen)('pasa $name a DropdownMenuRoot', ({ input, expected }) => {
        const wrapper = mountDropdownMenu({ props: { open: input } })

        expect(wrapper.getComponent(DropdownMenuRoot).props('open')).toBe(expected)
      })
    })

    describe('disabled', () => {
      it.each(casesDisabled)('pasa $name a DropdownMenuTrigger', ({ input, expected }) => {
        const wrapper = mountDropdownMenu({ props: { disabled: input } })

        expect(wrapper.getComponent(DropdownMenuTrigger).props('disabled')).toBe(expected)
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el contenido personalizado del trigger', () => {
        const wrapper = mountDropdownMenu({
          slots: {
            default: () => h('span', { 'data-test-dropdown-menu-slot': 'default' }, 'Abrir'),
          },
        })

        expect(wrapper.get('[data-test-dropdown-menu-slot="default"]').text()).toBe('Abrir')
      })
    })
  })
})
