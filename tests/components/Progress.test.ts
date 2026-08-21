import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ProgressRoot } from 'reka-ui'

import {
  Progress,
  type ProgressContext,
  type ProgressProps,
  type ProgressValue,
} from '@/components/ui/Progress'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountProgress(options: MountingOptions<ProgressProps> = {}) {
  return mount(Progress, options)
}

function mountWithProp(prop: keyof ProgressProps, value: unknown) {
  return mountProgress({ props: { [prop]: value } as ProgressProps })
}

const casesValue = [
  { input: 0, expected: 0, percentage: 0 },
  { input: 25, expected: 25, percentage: 25 },
  { input: 100, expected: 100, percentage: 100 },
  { input: null, expected: null, percentage: 0 },
  { input: undefined, expected: 0, percentage: 0 },
]

const casesMaxValues = [
  { input: 1, expected: 1 },
  { input: 50, expected: 50 },
  { input: 200, expected: 200 },
  { input: undefined, expected: 100 },
]

const casesContext = [
  { value: 0 as ProgressValue, max: 100, percentage: 0 },
  { value: 25 as ProgressValue, max: 100, percentage: 25 },
  { value: 50 as ProgressValue, max: 200, percentage: 25 },
  { value: -25 as ProgressValue, max: 100, percentage: 0 },
  { value: 150 as ProgressValue, max: 100, percentage: 100 },
  { value: null as ProgressValue, max: 100, percentage: 0 },
]

const casesEmittedValues = [
  { input: 0 as ProgressValue },
  { input: 25 as ProgressValue },
  { input: null as ProgressValue },
]

describe('Progress', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)(
        'passes value=$input to ProgressRoot as $expected',
        ({ input, expected, percentage }) => {
          const wrapper = mountWithProp('value', input)
          const root = wrapper.getComponent(ProgressRoot)

          expect(root.props('modelValue')).toBe(expected)
          expect(wrapper.get('[data-test-progress-indicator]').attributes('style')).toContain(
            `translateX(-${100 - percentage}%)`,
          )
        },
      )
    })

    describe('max', () => {
      it.each(casesMaxValues)(
        'passes max=$input to ProgressRoot as $expected',
        ({ input, expected }) => {
          const root = mountWithProp('max', input).getComponent(ProgressRoot)

          expect(root.props('max')).toBe(expected)
        },
      )
    })

    describe('getValueLabel', () => {
      it('passes the resolver to ProgressRoot', () => {
        const getValueLabel = vi.fn(() => '50%')
        const root = mountProgress({ props: { getValueLabel } }).getComponent(ProgressRoot)

        expect(root.props('getValueLabel')).toBe(getValueLabel)
      })
    })

    describe('getValueText', () => {
      it.each([vi.fn(() => '50 of 100')])(
        'passes the resolver to ProgressRoot',
        (input) => {
          const root = mountWithProp('getValueText', input).getComponent(ProgressRoot)

          expect(root.props('getValueText')).toBe(input)
        },
      )
    })

    describe('label', () => {
      it.each([
        { input: 'Uploading', expected: 'Uploading', visible: true },
        { input: '', expected: '', visible: false },
        { input: undefined, expected: undefined, visible: false },
      ])('renders label=$input as $expected', ({ input, expected, visible }) => {
        const wrapper = mountProgress({ props: { label: input } })
        const label = wrapper.find('[data-test-progress-label]')

        expect(label.exists()).toBe(visible)
        if (visible) expect(label.text()).toBe(expected)
      })

      it('adds the label height to the root', () => {
        const root = mountProgress({ props: { label: 'Uploading' } }).get(
          '[data-test-progress-root]',
        )

        expect(root.classes()).toContain('h-4')
      })
    })

    describe('color', () => {
      testColor({
        text: 'passes color to Progress',
        id: '[data-test-progress-root]',
        varColor: '--progress-color',
        mount: (color) => mountProgress({ props: { color } }),
      })
    })

    describe('trackColor', () => {
      testColor({
        text: 'passes trackColor to Progress',
        id: '[data-test-progress-root]',
        varColor: '--progress-track-color',
        mount: (trackColor) => mountProgress({ props: { trackColor } }),
      })
    })

    describe('ui', () => {
      testAttrs({
        text: 'forwards attrs, class and style through ui.indicator',
        id: '[data-test-progress-indicator]',
        mount: (attrs) =>
          mountProgress({
            props: { ui: { indicator: () => attrs } },
          }),
      })

      testAttrs({
        text: 'forwards attrs, class and style through ui.label',
        id: '[data-test-progress-label]',
        mount: (attrs) =>
          mountProgress({
            props: { label: 'Progress', ui: { label: () => attrs } },
          }),
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-progress-root]',
      mount: (attrs) => mountProgress({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it.each(casesEmittedValues)('forwards ProgressRoot value=$input', async ({ input }) => {
        const wrapper = mountProgress({ props: { value: 10 } })

        await wrapper.getComponent(ProgressRoot).vm.$emit('update:modelValue', input)
        await nextTick()

        expect(wrapper.emitted('update:value')).toEqual([[input]])
      })
    })
  })

  describe('context contract', () => {
    it.each(casesContext)(
      'passes value=$value, max=$max and percentage=$percentage',
      ({ value, max, percentage }) => {
        let context: ProgressContext | undefined

        mountProgress({
          props: {
            value,
            max,
            ui: {
              indicator: (uiContext: ProgressContext) => {
                context = uiContext
                return {}
              },
            },
          },
        })

        expect(context).toEqual({ value, max, percentage })
      },
    )
  })

  describe('slots', () => {
    describe('label', () => {
      it('renders the label slot and replaces the label fallback', () => {
        const wrapper = mountProgress({
          props: { label: 'Fallback', value: 40 },
          slots: {
            label: (context: ProgressContext) =>
              h('span', { 'data-test-progress-slot': 'label' }, `${context.percentage}%`),
          },
        })

        expect(wrapper.get('[data-test-progress-slot="label"]').text()).toBe('40%')
        expect(wrapper.get('[data-test-progress-label]').text()).not.toContain('Fallback')
      })

      it('renders the label slot without a label prop', () => {
        const wrapper = mountProgress({
          slots: {
            label: () => h('span', { 'data-test-progress-slot': 'label' }, 'Custom label'),
          },
        })

        expect(wrapper.get('[data-test-progress-slot="label"]').text()).toBe('Custom label')
        expect(wrapper.get('[data-test-progress-label]').exists()).toBe(true)
      })
    })
  })
})
