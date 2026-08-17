import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ScrollArea, type ScrollAreaProps } from '@/components/ui/ScrollArea'
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar } from 'reka-ui'
import { testAttrs } from '../utils/testAttrs'

function mountScrollArea(options: MountingOptions<ScrollAreaProps> = {}) {
  return mount(ScrollArea, options)
}

describe('ScrollArea', () => {
  describe('props', () => {
    describe('type', () => {
      it.each([
        { input: 'scroll' as const, expected: 'scroll' },
        { input: 'always' as const, expected: 'always' },
        { input: 'hover' as const, expected: 'hover' },
        { input: 'auto' as const, expected: 'auto' },
        { input: 'glimpse' as const, expected: 'glimpse' },
        { input: undefined, expected: 'hover' },
      ])('passes type=$input to ScrollAreaRoot as $expected', ({ input, expected }) => {
        const wrapper = mountScrollArea({ props: { type: input } })

        expect(wrapper.getComponent(ScrollAreaRoot).props('type')).toBe(expected)
      })
    })

    describe('scrollHideDelay', () => {
      it.each([
        { input: 0, expected: 0 },
        { input: 1000, expected: 1000 },
        { input: undefined, expected: 600 },
      ])('passes scrollHideDelay=$input to ScrollAreaRoot as $expected', ({ input, expected }) => {
        const wrapper = mountScrollArea({ props: { scrollHideDelay: input } })

        expect(wrapper.getComponent(ScrollAreaRoot).props('scrollHideDelay')).toBe(expected)
      })
    })

    describe('orientation', () => {
      it.each([
        { input: 'vertical' as const, expectedScrollbars: 1, expectedCorner: false },
        { input: 'horizontal' as const, expectedScrollbars: 1, expectedCorner: false },
        { input: 'both' as const, expectedScrollbars: 2, expectedCorner: true },
        { input: undefined, expectedScrollbars: 1, expectedCorner: false },
      ])('renders orientation=$input', ({ input, expectedScrollbars, expectedCorner }) => {
        const wrapper = mountScrollArea({
          props: { orientation: input, forceMount: true },
          attrs: { style: 'height: 100px; width: 100px' },
          slots: {
            default: () => h('div', { style: 'height: 1000px; width: 1000px' }, 'Content'),
          },
        })

        expect(wrapper.findAllComponents(ScrollAreaScrollbar)).toHaveLength(expectedScrollbars)
        expect(wrapper.findComponent(ScrollAreaCorner).exists()).toBe(expectedCorner)
      })
    })

    describe('forceMount', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('passes forceMount=$input to ScrollAreaScrollbar as $expected', ({ input, expected }) => {
        const wrapper = mountScrollArea({ props: { forceMount: input } })

        expect(wrapper.getComponent(ScrollAreaScrollbar).props('forceMount')).toBe(expected)
      })
    })

    describe('ui', () => {
      it('applies ui resolvers to the viewport, scrollbars, thumbs and corner', () => {
        const passthroughStub = {
          inheritAttrs: false,
          template: '<div v-bind="$attrs"><slot /></div>',
        }
        const wrapper = mountScrollArea({
          props: {
            orientation: 'both',
            forceMount: true,
            ui: {
              viewport: () => ({ id: 'scroll-area-viewport' }),
              verticalScrollbar: () => ({ id: 'scroll-area-vertical-scrollbar' }),
              horizontalScrollbar: () => ({ id: 'scroll-area-horizontal-scrollbar' }),
              thumbVertical: () => ({ id: 'scroll-area-vertical-thumb' }),
              thumbHorizontal: () => ({ id: 'scroll-area-horizontal-thumb' }),
              corner: () => ({ id: 'scroll-area-corner' }),
            },
          },
          attrs: { style: 'height: 100px; width: 100px' },
          slots: {
            default: () => h('div', { style: 'height: 1000px; width: 1000px' }, 'Content'),
          },
          global: {
            stubs: {
              ScrollAreaScrollbar: passthroughStub,
              ScrollAreaThumb: passthroughStub,
              ScrollAreaCorner: passthroughStub,
            },
          },
        })

        expect(wrapper.get('[data-test-scroll-area-viewport]').attributes('id')).toBe(
          'scroll-area-viewport',
        )
        expect(wrapper.get('[data-test-scroll-area-vertical-scrollbar]').attributes('id')).toBe(
          'scroll-area-vertical-scrollbar',
        )
        expect(wrapper.get('[data-test-scroll-area-horizontal-scrollbar]').attributes('id')).toBe(
          'scroll-area-horizontal-scrollbar',
        )
        expect(wrapper.get('[data-test-scroll-area-vertical-thumb]').attributes('id')).toBe(
          'scroll-area-vertical-thumb',
        )
        expect(wrapper.get('[data-test-scroll-area-horizontal-thumb]').attributes('id')).toBe(
          'scroll-area-horizontal-thumb',
        )
        expect(wrapper.get('[data-test-scroll-area-corner]').attributes('id')).toBe(
          'scroll-area-corner',
        )
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to the root',
      id: '[data-test-scroll-area-root]',
      mount: (attrs) => mountScrollArea({ attrs }),
    })
  })

  describe('slots', () => {
    it('renders the default slot', () => {
      const wrapper = mountScrollArea({
        slots: { default: () => h('span', { 'data-test-scroll-area-slot': '' }, 'Content') },
      })

      expect(wrapper.get('[data-test-scroll-area-slot]').text()).toBe('Content')
    })
  })
})
