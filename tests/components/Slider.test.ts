import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { SliderRoot } from 'reka-ui'

import {
  Slider,
  type SliderContext,
  type SliderProps,
  type SliderThumbContext,
  type SliderValue,
} from '@/components/ui/Slider'
import { sliderDefaults } from '@/components/ui/Slider/defaults'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'

vi.stubGlobal(
  'ResizeObserver',
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
)

function mountSlider(options: MountingOptions<SliderProps> = {}) {
  return mount(Slider, {
    global: { plugins: [i18n], ...options.global },
    ...options,
  })
}

function mountWithProp(prop: keyof SliderProps, value: unknown) {
  return mountSlider({ props: { [prop]: value } as SliderProps })
}

function pickThumbContext({ values, index, value, first, last }: SliderThumbContext) {
  return { values, index, value, first, last }
}

const casesValue = [
  { input: [25], expected: [25] },
  { input: [20, 80], expected: [20, 80] },
  { input: null, expected: null },
  { input: undefined, expected: sliderDefaults.value },
]

const casesBoolean = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesOrientation = [
  { input: 'horizontal' as const, expected: 'horizontal', class: 'items-center' },
  { input: 'vertical' as const, expected: 'vertical', class: 'flex-col' },
  { input: undefined, expected: sliderDefaults.orientation, class: 'items-center' },
]

const casesMin = [
  { input: 0, expected: 0 },
  { input: 10, expected: 10 },
  { input: undefined, expected: sliderDefaults.min },
]

const casesMax = [
  { input: 100, expected: 100 },
  { input: 200, expected: 200 },
  { input: undefined, expected: sliderDefaults.max },
]

const casesStep = [
  { input: 1, expected: 1 },
  { input: 5, expected: 5 },
  { input: undefined, expected: sliderDefaults.step },
]

const casesMinStepsBetweenThumbs = [
  { input: 0, expected: 0 },
  { input: 2, expected: 2 },
  { input: undefined, expected: sliderDefaults.minStepsBetweenThumbs },
]

const casesThumbAlignment = [
  { input: 'contain' as const, expected: 'contain' },
  { input: 'overflow' as const, expected: 'overflow' },
  { input: undefined, expected: sliderDefaults.thumbAlignment },
]

const casesName = [
  { input: 'price', expected: 'price' },
  { input: '', expected: '' },
  { input: undefined, expected: undefined },
]

const casesRequired = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: undefined },
]

const casesEmittedValues = [
  { input: [80] as SliderValue },
  { input: [20, 80] as SliderValue },
  { input: null as SliderValue },
]

const casesCommittedValues = [{ input: [80] }, { input: [20, 80] }]

const casesSliderContext = [{ values: [50] }, { values: [20, 80] }, { values: [] }]

const casesThumbContext = [
  {
    values: [50],
    expected: { values: [50], index: 0, value: 50, first: true, last: true },
  },
  {
    values: [20, 80],
    expected: { values: [20, 80], index: 0, value: 20, first: true, last: false },
  },
  {
    values: [20, 80],
    expected: { values: [20, 80], index: 1, value: 80, first: false, last: true },
  },
]

describe('Slider', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)(
        'passes value=$input to SliderRoot as $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('value', input)

          expect(wrapper.getComponent(SliderRoot).props('modelValue')).toEqual(expected)
        },
      )

      it('provides localized labels for range thumbs', () => {
        const wrapper = mountSlider({ props: { value: [20, 80] } })
        const labels = wrapper
          .findAll('[data-test-slider-thumb]')
          .map((thumb) => thumb.attributes('aria-label'))

        expect(labels).toEqual([i18n.global.t('minimum'), i18n.global.t('maximum')])
      })

      it('shows a grab cursor on thumbs', () => {
        const wrapper = mountSlider({ props: { value: [20] } })
        const thumb = wrapper.get('[data-test-slider-thumb="0"]')

        expect(thumb.classes()).toContain('cursor-grab')
        expect(thumb.classes()).toContain('active:cursor-grabbing')
      })
    })

    describe('disabled', () => {
      it.each(casesBoolean)(
        'passes disabled=$input to SliderRoot as $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('disabled', input)

          expect(wrapper.getComponent(SliderRoot).props('disabled')).toBe(expected)
        },
      )
    })

    describe('orientation', () => {
      it.each(casesOrientation)(
        'passes orientation=$input to SliderRoot as $expected',
        ({ input, expected, class: expectedClass }) => {
          const wrapper = mountWithProp('orientation', input)

          expect(wrapper.getComponent(SliderRoot).props('orientation')).toBe(expected)
          expect(wrapper.get('[data-test-slider-root]').classes()).toContain(expectedClass)
        },
      )
    })

    describe('inverted', () => {
      it.each(casesBoolean)(
        'passes inverted=$input to SliderRoot as $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('inverted', input)

          expect(wrapper.getComponent(SliderRoot).props('inverted')).toBe(expected)
        },
      )
    })

    describe('min', () => {
      it.each(casesMin)('passes min=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('min', input)

        expect(wrapper.getComponent(SliderRoot).props('min')).toBe(expected)
      })
    })

    describe('max', () => {
      it.each(casesMax)('passes max=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('max', input)

        expect(wrapper.getComponent(SliderRoot).props('max')).toBe(expected)
      })
    })

    describe('step', () => {
      it.each(casesStep)('passes step=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('step', input)

        expect(wrapper.getComponent(SliderRoot).props('step')).toBe(expected)
      })
    })

    describe('minStepsBetweenThumbs', () => {
      it.each(casesMinStepsBetweenThumbs)(
        'passes minStepsBetweenThumbs=$input to SliderRoot as $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('minStepsBetweenThumbs', input)

          expect(wrapper.getComponent(SliderRoot).props('minStepsBetweenThumbs')).toBe(expected)
        },
      )
    })

    describe('thumbAlignment', () => {
      it.each(casesThumbAlignment)(
        'passes thumbAlignment=$input to SliderRoot as $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('thumbAlignment', input)

          expect(wrapper.getComponent(SliderRoot).props('thumbAlignment')).toBe(expected)
        },
      )
    })

    describe('name', () => {
      it.each(casesName)('passes name=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('name', input)

        expect(wrapper.getComponent(SliderRoot).props('name')).toBe(expected)
      })
    })

    describe('required', () => {
      it.each(casesRequired)(
        'passes required=$input to SliderRoot as $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('required', input)

          expect(wrapper.getComponent(SliderRoot).props('required')).toBe(expected)
        },
      )
    })

    describe('ui', () => {
      testAttrs({
        text: 'forwards attrs through ui.track',
        id: '[data-test-slider-track]',
        mount: (attrs) => mountSlider({ props: { ui: { track: () => attrs } } }),
      })

      testAttrs({
        text: 'forwards attrs through ui.range',
        id: '[data-test-slider-range]',
        mount: (attrs) => mountSlider({ props: { ui: { range: () => attrs } } }),
      })

      testAttrs({
        text: 'forwards attrs through ui.thumb',
        id: '[data-test-slider-thumb="0"]',
        mount: (attrs) =>
          mountSlider({
            props: { value: [20, 80], ui: { thumb: () => attrs } },
          }),
      })
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it.each(casesEmittedValues)('forwards SliderRoot value=$input', async ({ input }) => {
        const wrapper = mountSlider({ props: { value: [20] } })

        await wrapper.getComponent(SliderRoot).vm.$emit('update:modelValue', input)
        await nextTick()

        expect(wrapper.emitted('update:value')).toEqual([[input]])
      })
    })

    describe('valueCommit', () => {
      it.each(casesCommittedValues)('forwards SliderRoot valueCommit=$input', async ({ input }) => {
        const wrapper = mountSlider({ props: { value: [20] } })

        await wrapper.getComponent(SliderRoot).vm.$emit('valueCommit', input)
        await nextTick()

        expect(wrapper.emitted('valueCommit')).toEqual([[input]])
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-slider-root]',
      mount: (attrs) => mountSlider({ attrs }),
    })
  })

  describe('context contract', () => {
    describe('SliderContext', () => {
      it.each(casesSliderContext)('passes values=$values', ({ values }) => {
        let context: SliderContext | undefined

        mountSlider({
          props: { value: values },
          slots: {
            track: (slotProps) => {
              context = slotProps
              return h('span', 'Track')
            },
          },
        })

        expect(context).toEqual({ values })
      })

      it.each(casesSliderContext)('passes values=$values to the range slot', ({ values }) => {
        let context: SliderContext | undefined

        mountSlider({
          props: { value: values },
          slots: {
            range: (slotProps) => {
              context = slotProps
              return h('span')
            },
          },
        })

        expect(context).toEqual({ values })
      })
    })

    describe('SliderThumbContext', () => {
      it.each(casesThumbContext)(
        'passes the expected context for values=$values at index=$expected.index',
        ({ values, expected }) => {
          const contexts: SliderThumbContext[] = []

          mountSlider({
            props: { value: values },
            slots: {
              thumb: (slotProps: SliderThumbContext) => {
                contexts.push(pickThumbContext(slotProps))
                return h('span')
              },
            },
          })

          expect(contexts).toContainEqual(expected)
        },
      )
    })
  })

  describe('slots', () => {
    describe('track', () => {
      it('renders the slot and replaces the default range', () => {
        const wrapper = mountSlider({
          props: { value: [20] },
          slots: {
            track: () => h('span', { 'data-test-slider-slot': 'track' }, 'Slot track'),
          },
        })

        expect(wrapper.get('[data-test-slider-slot="track"]').text()).toBe('Slot track')
        expect(wrapper.find('[data-test-slider-range]').exists()).toBe(false)
      })

      it('passes the SliderContext as slotProps', () => {
        let context: SliderContext | undefined

        mountSlider({
          props: { value: [20, 80] },
          slots: {
            track: (slotProps: SliderContext) => {
              context = slotProps
              return h('span')
            },
          },
        })

        expect(context).toEqual({ values: [20, 80] })
      })
    })

    describe('range', () => {
      it('renders the slot and replaces the default range', () => {
        const wrapper = mountSlider({
          props: { value: [20] },
          slots: {
            range: () => h('span', { 'data-test-slider-slot': 'range' }, 'Slot range'),
          },
        })

        expect(wrapper.get('[data-test-slider-slot="range"]').text()).toBe('Slot range')
        expect(wrapper.find('[data-test-slider-range]').exists()).toBe(false)
      })

      it('passes the SliderContext as slotProps', () => {
        let context: SliderContext | undefined

        mountSlider({
          props: { value: [20, 80] },
          slots: {
            range: (slotProps: SliderContext) => {
              context = slotProps
              return h('span')
            },
          },
        })

        expect(context).toEqual({ values: [20, 80] })
      })
    })

    describe('thumb', () => {
      it('renders the slot inside every thumb', () => {
        const wrapper = mountSlider({
          props: { value: [20, 80] },
          slots: {
            thumb: (slotProps: SliderThumbContext) =>
              h(
                'span',
                { 'data-test-slider-slot': `thumb-${slotProps.index}` },
                `Slot thumb ${slotProps.value}`,
              ),
          },
        })

        expect(wrapper.get('[data-test-slider-slot="thumb-0"]').text()).toBe('Slot thumb 20')
        expect(wrapper.get('[data-test-slider-slot="thumb-1"]').text()).toBe('Slot thumb 80')
      })

      it('passes the SliderThumbContext as slotProps', () => {
        const contexts: SliderThumbContext[] = []

        mountSlider({
          props: { value: [20, 80] },
          slots: {
            thumb: (slotProps: SliderThumbContext) => {
              contexts.push(pickThumbContext(slotProps))
              return h('span')
            },
          },
        })

        const uniqueContexts = Array.from(
          new Map(contexts.map((context) => [context.index, context])).values(),
        )

        expect(uniqueContexts).toEqual([
          { values: [20, 80], index: 0, value: 20, first: true, last: false },
          { values: [20, 80], index: 1, value: 80, first: false, last: true },
        ])
      })
    })
  })
})
