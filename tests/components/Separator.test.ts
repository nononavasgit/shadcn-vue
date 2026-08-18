import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Separator as RekaSeparator } from 'reka-ui'

import { Separator, type SeparatorProps } from '@/components/ui/Separator'
import { separatorDefaults } from '@/components/ui/Separator/defaults'
import { testAttrs } from '../utils/testAttrs'

function mountSeparator(options: MountingOptions<SeparatorProps> = {}) {
  return mount(Separator, options)
}

function mountWithProp(prop: keyof SeparatorProps, value: unknown) {
  return mountSeparator({ props: { [prop]: value } as SeparatorProps })
}

describe('Separator', () => {
  describe('props', () => {
    describe('orientation', () => {
      it.each([
        { input: 'horizontal', expected: 'horizontal' },
        { input: 'vertical', expected: 'vertical' },
        { input: undefined, expected: separatorDefaults.orientation },
      ])('passes orientation=$input to Reka Separator as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('orientation', input)

        expect(wrapper.getComponent(RekaSeparator).props('orientation')).toBe(expected)
      })
    })

    describe('decorative', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: separatorDefaults.decorative },
      ])('passes decorative=$input to Reka Separator as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('decorative', input)

        expect(wrapper.getComponent(RekaSeparator).props('decorative')).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-separator-root]',
      mount: (attrs) => mountSeparator({ attrs }),
    })
  })

  describe('slots', () => {
    it('renders the default slot', () => {
      const separator = mountSeparator({
        slots: {
          default: () => h('span', { 'data-test-separator-content': '' }, 'Content'),
        },
      })

      expect(separator.get('[data-test-separator-content]').text()).toBe('Content')
    })
  })
})
