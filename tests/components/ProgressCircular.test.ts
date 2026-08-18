import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ProgressRoot } from 'reka-ui'

import {
  ProgressCircular,
  type ProgressCircularContext,
  type ProgressCircularProps,
} from '@/components/ui/ProgressCircular'
import type { ProgressValue } from '@/components/ui/Progress'
import { testAttrs } from '../utils/testAttrs'

function mountProgressCircular(options: MountingOptions<ProgressCircularProps> = {}) {
  return mount(ProgressCircular, options)
}

function mountWithProp(prop: keyof ProgressCircularProps, value: unknown) {
  return mountProgressCircular({ props: { [prop]: value } as ProgressCircularProps })
}

const casesValue = [
  { input: 0, expected: 0 },
  { input: 25, expected: 25 },
  { input: 100, expected: 100 },
  { input: null, expected: null },
  { input: undefined, expected: 0 },
]

const casesMaxValues = [
  { input: 1, expected: 1 },
  { input: 50, expected: 50 },
  { input: 200, expected: 200 },
  { input: undefined, expected: 100 },
]

const casesDashOffset = [
  { max: 100, value: 0, thickness: 8 },
  { max: 100, value: 50, thickness: 8 },
  { max: 200, value: 50, thickness: 4 },
  { max: 100, value: null, thickness: 12 },
]

describe('ProgressCircular', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)(
        'passes value=$input to ProgressRoot as $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('value', input)
          const root = wrapper.getComponent(ProgressRoot)

          expect(root.props('modelValue')).toBe(expected)
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
        const root = mountProgressCircular({ props: { getValueLabel } }).getComponent(ProgressRoot)

        expect(root.props('getValueLabel')).toBe(getValueLabel)
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
        const wrapper = mountProgressCircular({ props: { label: input } })
        const label = wrapper.find('[data-test-progress-circular-label]')

        expect(label.exists()).toBe(visible)
        if (visible) expect(label.text()).toBe(expected)
      })
    })

    describe('color', () => {
      it.each([
        { input: '#ff0000', expected: '--progress-circular-color: #ff0000' },
        { input: undefined, expected: undefined },
      ])('applies color=$input', ({ input, expected }) => {
        const root = mountWithProp('color', input).get('[data-test-progress-circular-root]')

        if (expected) expect(root.attributes('style')).toContain(expected)
        else expect(root.attributes('style')).not.toContain('--progress-circular-color')
      })

      it('applies the progress color to the indicator and track classes', () => {
        const wrapper = mountProgressCircular({ props: { color: '#ff0000' } })

        expect(wrapper.get('[data-test-progress-circular-track]').classes()).toContain(
          'stroke-(--progress-circular-color)/20',
        )
        expect(wrapper.get('[data-test-progress-circular-indicator]').classes()).toContain(
          'stroke-(--progress-circular-color)',
        )
      })
    })

    describe('trackColor', () => {
      it('applies the track color to the root and track', () => {
        const wrapper = mountWithProp('trackColor', '#0000ff')

        expect(wrapper.get('[data-test-progress-circular-root]').attributes('style')).toContain(
          '--progress-circular-track-color: #0000ff',
        )
        expect(wrapper.get('[data-test-progress-circular-track]').classes()).toContain(
          'stroke-(--progress-circular-track-color)',
        )
      })
    })

    describe('size', () => {
      it.each([
        { input: 120, expected: '120px' },
        { input: '4rem', expected: '4rem' },
        { input: undefined, expected: '80px' },
      ])('renders size=$input as $expected', ({ input, expected }) => {
        const root = mountWithProp('size', input).get('[data-test-progress-circular-root]')

        expect(root.attributes('style')).toContain(`width: ${expected}`)
        expect(root.attributes('style')).toContain(`height: ${expected}`)
      })
    })

    describe('thickness', () => {
      it.each([
        { input: 4, expected: '4' },
        { input: 12, expected: '12' },
        { input: undefined, expected: '8' },
      ])('renders thickness=$input on track and indicator', ({ input, expected }) => {
        const wrapper = mountWithProp('thickness', input)

        expect(wrapper.get('[data-test-progress-circular-track]').attributes('stroke-width')).toBe(
          expected,
        )
        expect(
          wrapper.get('[data-test-progress-circular-indicator]').attributes('stroke-width'),
        ).toBe(expected)
      })
    })

    describe('dashOffset', () => {
      it.each(casesDashOffset)(
        'calculates dashOffset with max=$max, value=$value and thickness=$thickness',
        ({ max, value, thickness }) => {
          const wrapper = mountProgressCircular({ props: { max, value, thickness } })
          const indicator = wrapper.get('[data-test-progress-circular-indicator]')
          const radius = (100 - thickness) / 2
          const circumference = 2 * Math.PI * radius
          const percentage = value === null ? 0 : Math.min(100, Math.max(0, (value / max) * 100))

          expect(Number(indicator.attributes('stroke-dashoffset'))).toBeCloseTo(
            circumference * (1 - percentage / 100),
          )
        },
      )
    })

    describe('ui', () => {
      testAttrs({
        text: 'forwards attrs, class and style through ui.svg',
        id: '[data-test-progress-circular-svg]',
        mount: (attrs) =>
          mountProgressCircular({
            props: { ui: { svg: () => attrs } },
          }),
      })

      testAttrs({
        text: 'forwards attrs, class and style through ui.track',
        id: '[data-test-progress-circular-track]',
        mount: (attrs) =>
          mountProgressCircular({
            props: { ui: { track: () => attrs } },
          }),
      })

      testAttrs({
        text: 'forwards attrs, class and style through ui.indicator',
        id: '[data-test-progress-circular-indicator]',
        mount: (attrs) =>
          mountProgressCircular({
            props: { ui: { indicator: () => attrs } },
          }),
      })

      testAttrs({
        text: 'forwards attrs, class and style through ui.label',
        id: '[data-test-progress-circular-label]',
        mount: (attrs) =>
          mountProgressCircular({
            props: { label: 'Progress', ui: { label: () => attrs } },
          }),
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-progress-circular-root]',
      mount: (attrs) => mountProgressCircular({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it.each([{ input: 0 }, { input: 25 }, { input: null }] as ProgressValue[])(
        'forwards ProgressRoot value=$input',
        async ({ input }) => {
          const wrapper = mountProgressCircular({ props: { value: 10 } })

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
      let context: ProgressCircularContext | undefined

      mountProgressCircular({
        props: {
          value,
          max,
          ui: {
            indicator: (uiContext: ProgressCircularContext) => {
              context = uiContext
              return {}
            },
          },
        },
      })

      expect(context).toEqual({ value, max, percentage })
    })
  })

  describe('slots', () => {
    it('renders the label slot and replaces the label fallback', () => {
      const wrapper = mountProgressCircular({
        props: { label: 'Fallback', value: 40 },
        slots: {
          label: () =>
            h('span', { 'data-test-progress-circular-slot': 'label' }, `Slot label`),
        },
      })

      expect(wrapper.get('[data-test-progress-circular-slot="label"]').text()).toBe('Slot label')
      expect(wrapper.get('[data-test-progress-circular-label]').text()).not.toContain('Fallback')
    })
  })
})
