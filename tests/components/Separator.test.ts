import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Separator as RekaSeparator } from 'reka-ui'

import { Separator, type SeparatorProps } from '@/components/ui/Separator'
import { testAttrs } from '../utils/testAttrs'

function mountSeparator(options: MountingOptions<SeparatorProps> = {}) {
  return mount(Separator, options)
}

function mountWithProp(prop: keyof SeparatorProps, value: unknown) {
  return mountSeparator({ props: { [prop]: value } as SeparatorProps })
}

const casesOrientation = [
  { input: 'horizontal', expected: 'horizontal' },
  { input: 'vertical', expected: 'vertical' },
  { input: undefined, expected: 'horizontal' },
]

const casesDecorative = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: true },
]

describe('Separator', () => {
  describe('props', () => {
    describe('orientation', () => {
      it.each(casesOrientation)(
        'pasa orientation=$input a Reka Separator como $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('orientation', input)

          expect(wrapper.getComponent(RekaSeparator).props('orientation')).toBe(expected)
        },
      )
    })

    describe('decorative', () => {
      it.each(casesDecorative)(
        'pasa decorative=$input a Reka Separator como $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('decorative', input)

          expect(wrapper.getComponent(RekaSeparator).props('decorative')).toBe(expected)
        },
      )
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-separator-root]',
      mount: (attrs) => mountSeparator({ attrs }),
    })
  })

  describe('slots', () => {
    it('renderiza el slot predeterminado', () => {
      const separator = mountSeparator({
        slots: {
          default: () => h('span', { 'data-test-separator-content': '' }, 'Contenido'),
        },
      })

      expect(separator.get('[data-test-separator-content]').text()).toBe('Contenido')
    })
  })
})
