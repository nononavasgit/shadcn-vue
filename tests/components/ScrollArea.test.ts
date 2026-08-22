import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar } from 'reka-ui'
import { ScrollArea, type ScrollAreaProps, type ScrollAreaUI } from '@/components/ui/ScrollArea'
import { scrollAreaDefaults } from '@/components/ui/ScrollArea/defaults'
import { testAttrs } from '../utils/testAttrs'

function mountScrollArea(options: MountingOptions<ScrollAreaProps> = {}) {
  return mount(ScrollArea, options)
}

function mountWithProp(prop: keyof ScrollAreaProps, value: unknown) {
  return mountScrollArea({ props: { [prop]: value } as ScrollAreaProps })
}

const passthroughStub = {
  inheritAttrs: false,
  template: '<div v-bind="$attrs"><slot /></div>',
}

function mountWithUi(ui: ScrollAreaUI) {
  return mountScrollArea({
    props: {
      orientation: 'both',
      forceMount: true,
      ui,
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
}

const casesType = [
  { input: 'scroll' as const, expected: 'scroll' },
  { input: 'always' as const, expected: 'always' },
  { input: 'hover' as const, expected: 'hover' },
  { input: 'auto' as const, expected: 'auto' },
  { input: 'glimpse' as const, expected: 'glimpse' },
  { input: undefined, expected: scrollAreaDefaults.type },
]

const casesScrollHideDelay = [
  { input: 0, expected: 0 },
  { input: 1000, expected: 1000 },
  { input: undefined, expected: scrollAreaDefaults.scrollHideDelay },
]

const casesOrientation = [
  {
    input: 'vertical' as const,
    expectedScrollbars: 1,
    expectedOrientations: ['vertical'],
    expectedCorner: false,
  },
  {
    input: 'horizontal' as const,
    expectedScrollbars: 1,
    expectedOrientations: ['horizontal'],
    expectedCorner: false,
  },
  {
    input: 'both' as const,
    expectedScrollbars: 2,
    expectedOrientations: ['vertical', 'horizontal'],
    expectedCorner: true,
  },
  {
    input: undefined,
    expectedScrollbars: 1,
    expectedOrientations: ['vertical'],
    expectedCorner: false,
  },
]

const casesForceMount = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: scrollAreaDefaults.forceMount },
]

describe('ScrollArea', () => {
  describe('props', () => {
    describe('type', () => {
      it.each(casesType)(
        'passes type=$input to ScrollAreaRoot as $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('type', input)

          expect(wrapper.getComponent(ScrollAreaRoot).props('type')).toBe(expected)
        },
      )
    })

    describe('scrollHideDelay', () => {
      it.each(casesScrollHideDelay)(
        'passes scrollHideDelay=$input to ScrollAreaRoot as $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('scrollHideDelay', input)

          expect(wrapper.getComponent(ScrollAreaRoot).props('scrollHideDelay')).toBe(expected)
        },
      )
    })

    describe('orientation', () => {
      it.each(casesOrientation)(
        'renders orientation=$input',
        ({ input, expectedScrollbars, expectedOrientations, expectedCorner }) => {
          const wrapper = mountScrollArea({
            props: { orientation: input, forceMount: true },
            attrs: { style: 'height: 100px; width: 100px' },
            slots: {
              default: () => h('div', { style: 'height: 1000px; width: 1000px' }, 'Content'),
            },
          })

          const scrollbars = wrapper.findAllComponents(ScrollAreaScrollbar)

          expect(scrollbars).toHaveLength(expectedScrollbars)
          expect(scrollbars.map((scrollbar) => scrollbar.props('orientation'))).toEqual(
            expectedOrientations,
          )
          expect(wrapper.findComponent(ScrollAreaCorner).exists()).toBe(expectedCorner)
        },
      )
    })

    describe('forceMount', () => {
      it.each(casesForceMount)(
        'passes forceMount=$input to ScrollAreaScrollbar as $expected',
        ({ input, expected }) => {
          const wrapper = mountScrollArea({ props: { orientation: 'both', forceMount: input } })
          const scrollbars = wrapper.findAllComponents(ScrollAreaScrollbar)

          expect(scrollbars).toHaveLength(2)
          expect(scrollbars.every((scrollbar) => scrollbar.props('forceMount') === expected)).toBe(
            true,
          )
        },
      )
    })

    describe('ui', () => {
      testAttrs({
        text: 'forwards attrs through ui.viewport',
        id: '[data-test-scroll-area-viewport]',
        mount: (attrs) => mountWithUi({ viewport: () => attrs }),
      })

      testAttrs({
        text: 'forwards attrs through ui.verticalScrollbar',
        id: '[data-test-scroll-area-vertical-scrollbar]',
        mount: (attrs) => mountWithUi({ verticalScrollbar: () => attrs }),
      })

      testAttrs({
        text: 'forwards attrs through ui.horizontalScrollbar',
        id: '[data-test-scroll-area-horizontal-scrollbar]',
        mount: (attrs) => mountWithUi({ horizontalScrollbar: () => attrs }),
      })

      testAttrs({
        text: 'forwards attrs through ui.thumbVertical',
        id: '[data-test-scroll-area-vertical-thumb]',
        mount: (attrs) => mountWithUi({ thumbVertical: () => attrs }),
      })

      testAttrs({
        text: 'forwards attrs through ui.thumbHorizontal',
        id: '[data-test-scroll-area-horizontal-thumb]',
        mount: (attrs) => mountWithUi({ thumbHorizontal: () => attrs }),
      })

      testAttrs({
        text: 'forwards attrs through ui.corner',
        id: '[data-test-scroll-area-corner]',
        mount: (attrs) => mountWithUi({ corner: () => attrs }),
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
