import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { AspectRatio, type AspectRatioProps } from '@/components/ui/AspectRatio'
import { testAttrs } from '../utils/testAttrs'

function mountAspectRatio(options: MountingOptions<AspectRatioProps> = {}) {
  return mount(AspectRatio, options)
}

describe('AspectRatio', () => {
  describe('props', () => {
    describe('ratio', () => {
      it.each([
        { input: undefined, expected: '100%' },
        { input: 16 / 9, expected: '56.25%' },
        { input: 4 / 3, expected: '75%' },
      ])('renders ratio=$input with padding-bottom: $expected', ({ input, expected }) => {
        const wrapper = mountAspectRatio({ props: { ratio: input } }).get(
          '[data-reka-aspect-ratio-wrapper]',
        )

        expect(wrapper.attributes('style')).toContain(`padding-bottom: ${expected}`)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-aspect-ratio-root]',
      mount: (attrs) => mountAspectRatio({ attrs }),
    })
  })

  describe('slots', () => {
    it('renders the default slot', () => {
      const aspectRatio = mountAspectRatio({
        slots: {
          default: () => h('span', { 'data-test-aspect-ratio-content': '' }, 'Content'),
        },
      })

      expect(aspectRatio.get('[data-test-aspect-ratio-content]').text()).toBe('Content')
    })
  })
})
