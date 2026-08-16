import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { AspectRatio, type AspectRatioProps } from '@/components/ui/AspectRatio'

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
    it('forwards arbitrary attrs, class and style to root', () => {
      const root = mountAspectRatio({
        attrs: {
          id: 'preview',
          'aria-label': 'Preview',
          class: 'custom-ratio',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-aspect-ratio-root]')

      expect(root.attributes('id')).toBe('preview')
      expect(root.attributes('aria-label')).toBe('Preview')
      expect(root.classes()).toContain('custom-ratio')
      expect(root.attributes('style')).toContain('opacity: 0.5')
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
