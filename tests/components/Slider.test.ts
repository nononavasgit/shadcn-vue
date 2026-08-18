import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { SliderRoot } from 'reka-ui'

import { Slider, type SliderProps } from '@/components/ui/Slider'
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

describe('Slider', () => {
  describe('props', () => {
    describe('value', () => {
      it.each([
        { input: [25], expected: [25] },
        { input: [20, 80], expected: [20, 80] },
        { input: null, expected: null },
        { input: undefined, expected: [0] },
      ])('passes value=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('value', input)

        expect(wrapper.getComponent(SliderRoot).props('modelValue')).toEqual(expected)
      })
    })

    describe('disabled', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('passes disabled=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('disabled', input)

        expect(wrapper.getComponent(SliderRoot).props('disabled')).toBe(expected)
      })
    })

    describe('orientation', () => {
      it.each([
        { input: 'horizontal', expected: 'horizontal' },
        { input: 'vertical', expected: 'vertical' },
        { input: undefined, expected: 'horizontal' },
      ])('passes orientation=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('orientation', input)

        expect(wrapper.getComponent(SliderRoot).props('orientation')).toBe(expected)
      })
    })

    describe('inverted', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('passes inverted=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('inverted', input)

        expect(wrapper.getComponent(SliderRoot).props('inverted')).toBe(expected)
      })
    })

    describe('min', () => {
      it.each([
        { input: 0, expected: 0 },
        { input: 10, expected: 10 },
        { input: undefined, expected: 0 },
      ])('passes min=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('min', input)

        expect(wrapper.getComponent(SliderRoot).props('min')).toBe(expected)
      })
    })

    describe('max', () => {
      it.each([
        { input: 100, expected: 100 },
        { input: 200, expected: 200 },
        { input: undefined, expected: 100 },
      ])('passes max=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('max', input)

        expect(wrapper.getComponent(SliderRoot).props('max')).toBe(expected)
      })
    })

    describe('step', () => {
      it.each([
        { input: 1, expected: 1 },
        { input: 5, expected: 5 },
        { input: undefined, expected: 1 },
      ])('passes step=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('step', input)

        expect(wrapper.getComponent(SliderRoot).props('step')).toBe(expected)
      })
    })

    describe('minStepsBetweenThumbs', () => {
      it.each([
        { input: 0, expected: 0 },
        { input: 2, expected: 2 },
        { input: undefined, expected: 0 },
      ])(
        'passes minStepsBetweenThumbs=$input to SliderRoot as $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('minStepsBetweenThumbs', input)

          expect(wrapper.getComponent(SliderRoot).props('minStepsBetweenThumbs')).toBe(expected)
        },
      )
    })

    describe('thumbAlignment', () => {
      it.each([
        { input: 'contain', expected: 'contain' },
        { input: 'overflow', expected: 'overflow' },
        { input: undefined, expected: 'contain' },
      ])('passes thumbAlignment=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('thumbAlignment', input)

        expect(wrapper.getComponent(SliderRoot).props('thumbAlignment')).toBe(expected)
      })
    })

    describe('name', () => {
      it.each([
        { input: 'price', expected: 'price' },
        { input: '', expected: '' },
        { input: undefined, expected: undefined },
      ])('passes name=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('name', input)

        expect(wrapper.getComponent(SliderRoot).props('name')).toBe(expected)
      })
    })

    describe('required', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: undefined },
      ])('passes required=$input to SliderRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('required', input)

        expect(wrapper.getComponent(SliderRoot).props('required')).toBe(expected)
      })
    })

    describe('ui', () => {
      const parts = ['track', 'range', 'thumb'] as const

      it.each(parts)('renders ui.%s attrs, class and style', (part) => {
        const resolver = vi.fn(() => ({
          id: `ui-${part}`,
          class: `ui-${part}`,
          style: 'opacity: 0.8',
        }))
        const wrapper = mountSlider({
          props: {
            value: part === 'thumb' ? [20, 80] : [20],
            ui: { [part]: resolver },
          },
        })
        const elements =
          part === 'track'
            ? [wrapper.get('[data-test-slider-track]')]
            : part === 'range'
              ? [wrapper.get('[data-test-slider-range]')]
              : wrapper.findAll('[data-test-slider-thumb]')

        expect(elements).toHaveLength(part === 'thumb' ? 2 : 1)
        elements.forEach((element) => {
          expect(element.attributes('id')).toBe(`ui-${part}`)
          expect(element.classes()).toContain(`ui-${part}`)
          expect(element.attributes('style')).toContain('opacity: 0.8')
        })
      })
    })
  })

  describe('emits', () => {
    it('forwards SliderRoot model updates as update:value', async () => {
      const wrapper = mountSlider({ props: { value: [20] } })

      await wrapper.getComponent(SliderRoot).vm.$emit('update:modelValue', [80])

      expect(wrapper.emitted('update:value')).toEqual([[[80]]])
    })

    it('forwards SliderRoot valueCommit', async () => {
      const wrapper = mountSlider({ props: { value: [20] } })

      await wrapper.getComponent(SliderRoot).vm.$emit('valueCommit', [80])

      expect(wrapper.emitted('valueCommit')).toEqual([[[80]]])
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-slider-root]',
      mount: (attrs) => mountSlider({ attrs }),
    })
  })

  describe('context contract', () => {
    it.each([{ values: [50] }, { values: [20, 80] }, { values: [] }])(
      'passes only values to SliderContext: $values',
      ({ values }) => {
        let context: unknown

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
      },
    )

    it.each([
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
    ])('passes the expected ThumbContext for values=$values', ({ values, expected }) => {
      const contexts: unknown[] = []

      mountSlider({
        props: { value: values },
        slots: {
          thumb: (slotProps) => {
            contexts.push(slotProps)
            return h('span', 'Thumb')
          },
        },
      })

      expect(contexts).toContainEqual(expect.objectContaining(expected))
    })
  })

  describe('slots', () => {
    const slotCases = ['track', 'range', 'thumb'] as const

    it.each(slotCases)('renders the %s slot', (slot) => {
      const wrapper = mountSlider({
        props: { value: slot === 'thumb' ? [20, 80] : [20] },
        slots: {
          [slot]: () => h('span', { 'data-test-slider-slot': slot }, `Slot ${slot}`),
        },
      })

      expect(wrapper.get(`[data-test-slider-slot="${slot}"]`).text()).toContain(`Slot ${slot}`)
    })
  })

})
