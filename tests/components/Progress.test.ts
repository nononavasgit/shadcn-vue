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
import { progressDefaults } from '@/components/ui/Progress/defaults'
import { testAttrs } from '../utils/testAttrs'

function mountProgress(options: MountingOptions<ProgressProps> = {}) {
  return mount(Progress, options)
}

function mountWithProp(prop: keyof ProgressProps, value: unknown) {
  return mountProgress({ props: { [prop]: value } as ProgressProps })
}

describe('Progress', () => {
  describe('props', () => {
    describe('value', () => {
      it.each([
        { input: 0, expected: 0, percentage: 0 },
        { input: 25, expected: 25, percentage: 25 },
        { input: 100, expected: 100, percentage: 100 },
        { input: null, expected: null, percentage: 0 },
        { input: undefined, expected: 0, percentage: 0 },
      ])('passes value=$input to ProgressRoot as $expected', ({ input, expected, percentage }) => {
        const wrapper = mountWithProp('value', input)
        const root = wrapper.getComponent(ProgressRoot)

        expect(root.props('modelValue')).toBe(expected)
        expect(wrapper.get('[data-test-progress-indicator]').attributes('style')).toContain(
          `translateX(-${100 - percentage}%)`,
        )
      })
    })

    describe('max', () => {
      it.each([
        { input: 1, expected: 1 },
        { input: 50, expected: 50 },
        { input: 200, expected: 200 },
        { input: undefined, expected: progressDefaults.max },
      ])('passes max=$input to ProgressRoot as $expected', ({ input, expected }) => {
        const root = mountWithProp('max', input).getComponent(ProgressRoot)

        expect(root.props('max')).toBe(expected)
      })
    })

    describe('getValueLabel', () => {
      it('passes the resolver to ProgressRoot', () => {
        const getValueLabel = vi.fn(() => '50%')
        const root = mountProgress({ props: { getValueLabel } }).getComponent(ProgressRoot)

        expect(root.props('getValueLabel')).toBe(getValueLabel)
      })

      it('uses Reka UI default labeling when omitted', () => {
        const root = mountProgress().getComponent(ProgressRoot)

        expect(root.props('getValueLabel')).toEqual(expect.any(Function))
      })
    })

    describe('getValueText', () => {
      it.each([vi.fn(() => '50 of 100'), undefined])(
        'passes getValueText=$input to ProgressRoot',
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
      it.each([
        { input: '#ff0000', expected: '--progress-color: #ff0000' },
        { input: undefined, expected: undefined },
      ])('applies color=$input', ({ input, expected }) => {
        const root = mountWithProp('color', input).get('[data-test-progress-root]')

        if (expected) expect(root.attributes('style')).toContain(expected)
        else expect(root.attributes('style')).toBeUndefined()
      })

      it('applies the progress color to the indicator and track classes', () => {
        const wrapper = mountProgress({ props: { color: '#ff0000' } })

        expect(wrapper.get('[data-test-progress-root]').classes()).toContain(
          'bg-(--progress-color)/20',
        )
        expect(wrapper.get('[data-test-progress-indicator]').classes()).toContain(
          'bg-(--progress-color)',
        )
      })
    })

    describe('trackColor', () => {
      it('applies the track color to the root background', () => {
        const root = mountWithProp('trackColor', '#0000ff').get('[data-test-progress-root]')

        expect(root.attributes('style')).toContain('--progress-track-color: #0000ff')
        expect(root.classes()).toContain('bg-(--progress-track-color)')
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
      it.each([{input: 0}, {input:  25}, {input: null}] as ProgressValue[])(
        'forwards ProgressRoot value=$input',
        async ({input}) => {
          const wrapper = mountProgress({ props: { value: 10 } })

          await wrapper.getComponent(ProgressRoot).vm.$emit('update:modelValue', input)
          await nextTick()

          expect(wrapper.emitted('update:value')).toEqual([[input]])
        },
      )
    })
  })

  describe('context contract', () => {
    it.each([
      { value: 0 as ProgressValue, max: 100, percentage: 0 },
      { value: 25 as ProgressValue, max: 100, percentage: 25 },
      { value: 50 as ProgressValue, max: 200, percentage: 25 },
      { value: null as ProgressValue, max: 100, percentage: 0 },
    ])('passes value=$value, max=$max and percentage=$percentage', ({ value, max, percentage }) => {
      let context: ProgressContext | undefined

      mountProgress({
        props: { value, max },
        slots: {
          indicator: (slotContext: ProgressContext) => {
            context = slotContext
            return h('span', 'Indicator')
          },
        },
      })

      expect(context).toEqual(expect.objectContaining({ value, max, percentage }))
    })
  })

  describe('slots', () => {
    it('renders the indicator slot', () => {
      const wrapper = mountProgress({
        slots: {
          indicator: () =>
            h('span', { 'data-test-progress-slot': 'indicator' }, 'Custom indicator'),
        },
      })

      expect(wrapper.get('[data-test-progress-slot="indicator"]').text()).toBe('Custom indicator')
      expect(wrapper.find('[data-test-progress-indicator]').exists()).toBe(false)
    })

    it('renders the label slot', () => {
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
  })
})
