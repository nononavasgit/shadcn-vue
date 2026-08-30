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
import { progressCircularDefaults } from '@/components/ui/ProgressCircular/defaults'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountProgressCircular(options: MountingOptions<ProgressCircularProps> = {}) {
  return mount(ProgressCircular, options)
}

function mountWithProp(prop: keyof ProgressCircularProps, value: unknown) {
  return mountProgressCircular({ props: { [prop]: value } as ProgressCircularProps })
}

const casesValue = [
  { input: 0, expected: 0, percentage: 0 },
  { input: 25, expected: 25, percentage: 25 },
  { input: 100, expected: 100, percentage: 100 },
  { input: null, expected: null, percentage: 0 },
  { input: undefined, expected: progressCircularDefaults.value, percentage: 0 },
]

const casesMaxValues = [
  { input: 1, expected: 1 },
  { input: 50, expected: 50 },
  { input: 200, expected: 200 },
  { input: undefined, expected: progressCircularDefaults.max },
]

const casesLabels = [
  { input: 'Uploading', expected: 'Uploading', visible: true },
  { input: '', expected: '', visible: false },
  { input: undefined, expected: undefined, visible: false },
]

const casesSizes = [
  { input: 120, expected: '120px' },
  { input: '4rem', expected: '4rem' },
  { input: undefined, expected: '80px' },
]

const casesThickness = [
  { input: 4, expected: '4' },
  { input: 12, expected: '12' },
  { input: undefined, expected: '8' },
]

const casesDashOffset = [
  { max: 100, value: 0, thickness: 8 },
  { max: 100, value: 50, thickness: 8 },
  { max: 200, value: 50, thickness: 4 },
  { max: 100, value: null, thickness: 12 },
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

describe('ProgressCircular', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)(
        'pasa value=$input a ProgressRoot como $expected',
        ({ input, expected, percentage }) => {
          const wrapper = mountWithProp('value', input)
          const root = wrapper.getComponent(ProgressRoot)

          expect(root.props('modelValue')).toBe(expected)
          const indicator = wrapper.get('[data-test-progress-circular-indicator]')
          const radius = (100 - progressCircularDefaults.thickness) / 2
          const circumference = 2 * Math.PI * radius

          expect(Number(indicator.attributes('stroke-dashoffset'))).toBeCloseTo(
            circumference * (1 - percentage / 100),
          )
        },
      )
    })

    describe('max', () => {
      it.each(casesMaxValues)(
        'pasa max=$input a ProgressRoot como $expected',
        ({ input, expected }) => {
          const root = mountWithProp('max', input).getComponent(ProgressRoot)

          expect(root.props('max')).toBe(expected)
        },
      )
    })

    describe('getValueLabel', () => {
      it('pasa el resolver a ProgressRoot', () => {
        const getValueLabel = vi.fn(() => '50%')
        const root = mountProgressCircular({ props: { getValueLabel } }).getComponent(ProgressRoot)

        expect(root.props('getValueLabel')).toBe(getValueLabel)
      })
    })

    describe('getValueText', () => {
      it.each([vi.fn(() => '50 of 100')])('pasa el resolver a ProgressRoot', (input) => {
        const root = mountWithProp('getValueText', input).getComponent(ProgressRoot)

        expect(root.props('getValueText')).toBe(input)
      })
    })

    describe('label', () => {
      it.each(casesLabels)('renderiza label=$input como $expected', ({ input, expected, visible }) => {
        const wrapper = mountProgressCircular({ props: { label: input } })
        const label = wrapper.find('[data-test-progress-circular-label]')

        expect(label.exists()).toBe(visible)
        if (visible) expect(label.text()).toBe(expected)
      })
    })

    describe('color', () => {
      testColor({
        text: 'pasa color a ProgressCircular',
        id: '[data-test-progress-circular-root]',
        varColor: '--progress-circular-color',
        mount: (color) => mountProgressCircular({ props: { color } }),
      })
    })

    describe('trackColor', () => {
      testColor({
        text: 'pasa trackColor a ProgressCircular',
        id: '[data-test-progress-circular-root]',
        varColor: '--progress-circular-track-color',
        mount: (trackColor) => mountProgressCircular({ props: { trackColor } }),
      })
    })

    describe('size', () => {
      it.each(casesSizes)('renderiza size=$input como $expected', ({ input, expected }) => {
        const root = mountWithProp('size', input).get('[data-test-progress-circular-root]')

        expect(root.attributes('style')).toContain(`width: ${expected}`)
        expect(root.attributes('style')).toContain(`height: ${expected}`)
      })
    })

    describe('thickness', () => {
      it.each(casesThickness)(
        'renderiza thickness=$input en el track y el indicador',
        ({ input, expected }) => {
          const wrapper = mountWithProp('thickness', input)

          expect(
            wrapper.get('[data-test-progress-circular-track]').attributes('stroke-width'),
          ).toBe(expected)
          expect(
            wrapper.get('[data-test-progress-circular-indicator]').attributes('stroke-width'),
          ).toBe(expected)
        },
      )
    })

    describe('dashOffset', () => {
      it.each(casesDashOffset)(
        'calcula dashOffset con max=$max, value=$value y thickness=$thickness',
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
        text: 'reenvia attrs, class y style mediante ui.svg',
        id: '[data-test-progress-circular-svg]',
        mount: (attrs) =>
          mountProgressCircular({
            props: { ui: { svg: () => attrs } },
          }),
      })

      testAttrs({
        text: 'reenvia attrs, class y style mediante ui.track',
        id: '[data-test-progress-circular-track]',
        mount: (attrs) =>
          mountProgressCircular({
            props: { ui: { track: () => attrs } },
          }),
      })

      testAttrs({
        text: 'reenvia attrs, class y style mediante ui.indicator',
        id: '[data-test-progress-circular-indicator]',
        mount: (attrs) =>
          mountProgressCircular({
            props: { ui: { indicator: () => attrs } },
          }),
      })

      testAttrs({
        text: 'reenvia attrs, class y style mediante ui.label',
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
      it.each(casesEmittedValues)('reenvia value=$input de ProgressRoot', async ({ input }) => {
        const wrapper = mountProgressCircular({ props: { value: 10 } })

        await wrapper.getComponent(ProgressRoot).vm.$emit('update:modelValue', input)
        await nextTick()

        expect(wrapper.emitted('update:value')).toEqual([[input]])
      })
    })
  })

  describe('context contract', () => {
    it.each(casesContext)(
      'pasa value=$value, max=$max y percentage=$percentage',
      ({ value, max, percentage }) => {
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
      },
    )
  })

  describe('slots', () => {
    describe('label', () => {
      it('renderiza el slot label y sustituye el label alternativo', () => {
        const wrapper = mountProgressCircular({
          props: { label: 'Fallback', value: 40 },
          slots: {
            label: (context: ProgressCircularContext) =>
              h('span', { 'data-test-progress-circular-slot': 'label' }, `${context.percentage}%`),
          },
        })

        expect(wrapper.get('[data-test-progress-circular-slot="label"]').text()).toBe('40%')
        expect(wrapper.get('[data-test-progress-circular-label]').text()).not.toContain('Fallback')
      })

      it('renderiza el slot label sin la prop label', () => {
        const wrapper = mountProgressCircular({
          slots: {
            label: () => h('span', { 'data-test-progress-circular-slot': 'label' }, 'Label personalizado'),
          },
        })

        expect(wrapper.get('[data-test-progress-circular-slot="label"]').text()).toBe(
          'Label personalizado',
        )
        expect(wrapper.get('[data-test-progress-circular-label]').exists()).toBe(true)
      })

      it.each(casesContext)(
        'pasa value=$value, max=$max y percentage=$percentage as slotProps',
        ({ value, max, percentage }) => {
          let context: ProgressCircularContext | undefined

          mountProgressCircular({
            props: { value, max },
            slots: {
              label: (slotContext: ProgressCircularContext) => {
                context = slotContext
                return h('span')
              },
            },
          })

          expect(context).toEqual({ value, max, percentage })
        },
      )
    })
  })
})
