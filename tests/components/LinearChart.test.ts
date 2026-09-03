import { defineComponent, h, nextTick, toRaw } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { VisAxis, VisCrosshair, VisLine, VisTooltip, VisXYContainer } from '@unovis/vue'

import {
  LinearChart,
  type LinearChartEvents,
  type LinearChartProps,
} from '@/components/ui/LinearChart'

vi.mock('@unovis/vue', () => {
  const createStub = (name: string, props: string[]) =>
    defineComponent({
      name,
      props,
      setup(_, { attrs, slots }) {
        return () => h('div', attrs, slots.default?.())
      },
    })

  return {
    VisAxis: createStub('VisAxis', ['type', 'label', 'numTicks', 'tickFormat', 'gridLine']),
    VisLine: createStub('VisLine', [
      'x',
      'y',
      'curveType',
      'color',
      'lineWidth',
      'lineDashArray',
      'interpolateMissingData',
      'fallbackValue',
      'highlightOnHover',
      'cursor',
      'events',
    ]),
    VisLineSelectors: { line: 'line-selector' },
    VisTooltip: createStub('VisTooltip', []),
    VisCrosshair: createStub('VisCrosshair', ['x', 'y', 'template']),
    VisXYContainer: createStub('VisXYContainer', ['data', 'height', 'yDomain']),
  }
})

type Point = { position: number; label: string; value: number | null | undefined }

const data: Point[] = [
  { position: 0, label: 'A', value: 10 },
  { position: 1, label: 'B', value: null },
  { position: 2, label: 'C', value: 30 },
]

const x = (point: Point) => point.position
const y = (point: Point) => point.value

function mountChart(props: Partial<LinearChartProps<Point>> = {}) {
  return mount(LinearChart, {
    props: {
      data,
      x,
      y,
      ...props,
    },
  })
}

function getComponent<T>(wrapper: VueWrapper, component: T) {
  return wrapper.getComponent(component as never)
}

describe('LinearChart', () => {
  describe('props', () => {
    describe('data', () => {
      it('pasa el array al contenedor', () => {
        const wrapper = mountChart()

        expect(toRaw(getComponent(wrapper, VisXYContainer).props('data'))).toBe(data)
      })

      it.each([
        { name: 'vacío', value: [] },
        { name: 'normal', value: data },
      ])('acepta el dataset $name', ({ value: chartData }) => {
        expect(() => mountChart({ data: chartData })).not.toThrow()
      })

      it('acepta filas con valores null y undefined', () => {
        const nullableData: Point[] = [
          { position: 0, label: 'A', value: null },
          { position: 1, label: 'B', value: undefined },
        ]

        expect(() => mountChart({ data: nullableData })).not.toThrow()
      })

      it('actualiza el contenedor cuando cambia el array', async () => {
        const wrapper = mountChart()
        const nextData = [{ position: 3, label: 'D', value: 40 }]

        await wrapper.setProps({ data: nextData })
        await nextTick()

        expect(toRaw(getComponent(wrapper, VisXYContainer).props('data'))).toBe(nextData)
      })
    })

    describe('x', () => {
      it('conserva la identidad del accessor numérico', () => {
        const wrapper = mountChart()

        expect(getComponent(wrapper, VisLine).props('x')).toBe(x)
      })

      it('normaliza categorías de texto para la escala continua', () => {
        const categoricalData = [
          { label: 'Enero', value: 10 },
          { label: 'Febrero', value: 20 },
        ]
        const categoricalX = (point: (typeof categoricalData)[number]) => point.label

        const wrapper = mountChart({
          data: categoricalData,
          x: categoricalX,
        })
        const line = getComponent(wrapper, VisLine)
        const axis = wrapper.findAllComponents(VisAxis)[0]

        expect(line.props('x')).not.toBe(categoricalX)
        expect(line.props('x')(categoricalData[0], 0)).toBe(0)
        expect(line.props('x')(categoricalData[1], 1)).toBe(1)
        expect(axis.props('tickFormat')?.(0, 0, [0, 1])).toBe('Enero')
        expect(axis.props('tickFormat')?.(1, 1, [0, 1])).toBe('Febrero')
      })

      it('convierte fechas a timestamps y admite un dataset vacío', () => {
        const dateData = [
          { date: new Date('2026-01-01'), value: 10 },
          { date: new Date('2026-01-02'), value: 20 },
        ]
        const dateX = (point: (typeof dateData)[number]) => point.date
        const dateWrapper = mountChart({ data: dateData, x: dateX })
        const emptyWrapper = mountChart({ data: [] })

        expect(getComponent(dateWrapper, VisLine).props('x')(dateData[0], 0)).toBe(
          dateData[0].date.getTime(),
        )
        expect(getComponent(emptyWrapper, VisLine).props('x')).toBe(x)
      })
    })

    describe('y', () => {
      it('pasa y y conserva la identidad del accessor único', () => {
        const wrapper = mountChart()

        expect(getComponent(wrapper, VisLine).props('y')).toBe(y)
      })

      it('pasa múltiples accessors a VisLine', () => {
        const y2 = (point: Point) => (point.value ?? 0) + 5
        const yAccessors = [y, y2]
        const wrapper = mountChart({ y: yAccessors })

        expect(getComponent(wrapper, VisLine).props('y')).toStrictEqual(yAccessors)
      })

      it.each([null, undefined])('admite un valor %s en la serie', (value) => {
        const nullableData = [{ position: 0, value }]
        const nullableY = (point: (typeof nullableData)[number]) => point.value

        expect(() => mountChart({ data: nullableData, y: nullableY })).not.toThrow()
      })
    })

    describe('events', () => {
      it('no pasa configuración cuando no se definen eventos', () => {
        const wrapper = mountChart()

        expect(getComponent(wrapper, VisLine).props('events')).toBeUndefined()
      })

      it('mapea click, mouseover y mouseleave al selector de la línea', () => {
        const click = vi.fn()
        const mouseover = vi.fn()
        const mouseleave = vi.fn()
        const events: LinearChartEvents = { click, mouseover, mouseleave }
        const wrapper = mountChart({ events })
        const lineEvents = getComponent(wrapper, VisLine).props('events') as Record<
          string,
          Record<string, (data: unknown, event: MouseEvent, index: number) => void>
        >
        const event = new MouseEvent('click')

        lineEvents['line-selector'].click(undefined, event, 2)
        lineEvents['line-selector'].mouseover(undefined, event, 2)
        lineEvents['line-selector'].mouseleave(undefined, event, 2)

        expect(click).toHaveBeenCalledWith(event, 2)
        expect(mouseover).toHaveBeenCalledWith(event, 2)
        expect(mouseleave).toHaveBeenCalledWith(event, 2)
      })

      it('solo registra los callbacks definidos', () => {
        const click = vi.fn()
        const wrapper = mountChart({ events: { click } })
        const lineEvents = getComponent(wrapper, VisLine).props('events') as Record<
          string,
          Record<string, unknown>
        >

        expect(Object.keys(lineEvents['line-selector'])).toEqual(['click'])
      })
    })

    describe('height', () => {
      it.each([
        [undefined, 320],
        [320, 320],
        ['24rem', '24rem'],
        [0, 0],
      ])('pasa height=%s como %s', (height, expected) => {
        const wrapper = mountChart({ height })

        expect(getComponent(wrapper, VisXYContainer).props('height')).toBe(expected)
      })
    })

    describe('color', () => {
      it.each([
        [undefined, 'var(--chart-1)'],
        ['#2563eb', '#2563eb'],
        ['', ''],
      ])('pasa color=%s como %s', (color, expected) => {
        const wrapper = mountChart({ color })

        expect(getComponent(wrapper, VisLine).props('color')).toBe(expected)
      })
    })

    describe('colors', () => {
      it('pasa un color por serie a VisLine', () => {
        const colors = ['#2563eb', '#16a34a']
        const wrapper = mountChart({ colors })

        expect(getComponent(wrapper, VisLine).props('color')).toStrictEqual(colors)
      })

      it('prioriza colors sobre color cuando se definen ambos', () => {
        const colors = ['#2563eb', '#16a34a']
        const wrapper = mountChart({ color: '#111827', colors })

        expect(getComponent(wrapper, VisLine).props('color')).toStrictEqual(colors)
      })

      it('pasa un array vacío sin sustituirlo por el color individual', () => {
        const wrapper = mountChart({ colors: [] })

        expect(getComponent(wrapper, VisLine).props('color')).toStrictEqual([])
      })
    })

    describe('lineWidth', () => {
      it.each([
        [undefined, 2],
        [2, 2],
        [0, 0],
        [-1, -1],
      ])('pasa lineWidth=%s como %s', (lineWidth, expected) => {
        const wrapper = mountChart({ lineWidth })

        expect(getComponent(wrapper, VisLine).props('lineWidth')).toBe(expected)
      })
    })

    describe('lineDashArray', () => {
      it.each([
        [undefined, undefined],
        [[], []],
        [
          [8, 4],
          [8, 4],
        ],
      ])('pasa lineDashArray=%j', (lineDashArray, expected) => {
        const wrapper = mountChart({ lineDashArray })

        expect(getComponent(wrapper, VisLine).props('lineDashArray')).toStrictEqual(expected)
      })
    })

    describe('curveType', () => {
      it('usa linear como valor por defecto', () => {
        const wrapper = mountChart({ curveType: undefined })

        expect(getComponent(wrapper, VisLine).props('curveType')).toBe('linear')
      })

      it.each([
        'basis',
        'basisClosed',
        'basisOpen',
        'bundle',
        'cardinal',
        'cardinalClosed',
        'cardinalOpen',
        'catmullRom',
        'catmullRomClosed',
        'catmullRomOpen',
        'linear',
        'linearClosed',
        'monotoneX',
        'monotoneY',
        'natural',
        'step',
        'stepAfter',
        'stepBefore',
      ] as const)('pasa la curva %s a VisLine', (curveType) => {
        const wrapper = mountChart({ curveType })

        expect(getComponent(wrapper, VisLine).props('curveType')).toBe(curveType)
      })
    })

    describe('interpolateMissingData', () => {
      it.each([false, true])('pasa %s a VisLine', (interpolateMissingData) => {
        const wrapper = mountChart({ interpolateMissingData })

        expect(getComponent(wrapper, VisLine).props('interpolateMissingData')).toBe(
          interpolateMissingData,
        )
      })
    })

    describe('fallbackValue', () => {
      it.each([undefined, null, 0, 7])('pasa fallbackValue=%s a VisLine', (fallbackValue) => {
        const wrapper = mountChart({ fallbackValue })

        expect(getComponent(wrapper, VisLine).props('fallbackValue')).toBe(fallbackValue)
      })
    })

    describe('highlightOnHover', () => {
      it.each([false, true])('pasa highlightOnHover=%s a VisLine', (highlightOnHover) => {
        const wrapper = mountChart({ highlightOnHover })

        expect(getComponent(wrapper, VisLine).props('highlightOnHover')).toBe(highlightOnHover)
      })
    })

    describe('cursor', () => {
      it.each([undefined, '', 'crosshair'])('pasa cursor=%s a VisLine', (cursor) => {
        const wrapper = mountChart({ cursor })

        expect(getComponent(wrapper, VisLine).props('cursor')).toBe(cursor)
      })
    })

    describe('tooltip', () => {
      it.each([false, true])('muestra tooltip=%s y su crosshair asociado', (tooltip) => {
        const wrapper = mountChart({ tooltip, crosshair: false })

        expect(wrapper.findComponent(VisTooltip).exists()).toBe(tooltip)
        expect(wrapper.findComponent(VisCrosshair).exists()).toBe(tooltip)
      })

      it('pasa los accessors y un template cuando está activo', () => {
        const wrapper = mountChart({ tooltip: true })
        const crosshair = getComponent(wrapper, VisCrosshair)

        expect(crosshair.props('x')).toBe(x)
        expect(crosshair.props('y')).toBe(y)
        expect(crosshair.props('template')).toEqual(expect.any(Function))
      })
    })

    describe('crosshair', () => {
      it.each([false, true])('muestra crosshair=%s cuando no hay tooltip', (crosshair) => {
        const wrapper = mountChart({ crosshair, tooltip: false })

        expect(wrapper.findComponent(VisCrosshair).exists()).toBe(crosshair)
      })
    })

    describe('yDomain', () => {
      it.each([
        { name: 'omitido', value: undefined },
        { name: 'completo', value: [0, 400] },
        { name: 'sin mínimo', value: [undefined, 400] },
        { name: 'sin máximo', value: [0, undefined] },
      ])('pasa el dominio $name al contenedor', ({ value: yDomain }) => {
        const wrapper = mountChart({ yDomain })

        expect(getComponent(wrapper, VisXYContainer).props('yDomain')).toStrictEqual(yDomain)
      })
    })

    describe('xTickFormat', () => {
      it('mantiene el formateo automático de categorías cuando se omite', () => {
        const categoricalData = [
          { label: 'Enero', value: 10 },
          { label: 'Febrero', value: 20 },
        ]
        const categoricalX = (point: (typeof categoricalData)[number]) => point.label
        const wrapper = mountChart({ data: categoricalData, x: categoricalX })

        expect(wrapper.findAllComponents(VisAxis)[0].props('tickFormat')?.(0, 0, [0, 1])).toBe(
          'Enero',
        )
      })

      it('pasa el callback personalizado al eje X', () => {
        const xTickFormat = (value: number | Date, index: number) => `${value}-${index}`
        const wrapper = mountChart({ xTickFormat })
        const formatter = wrapper.findAllComponents(VisAxis)[0].props('tickFormat')

        expect(formatter).toBe(xTickFormat)
        expect(formatter?.(4, 1, [4])).toBe('4-1')
      })
    })

    describe('yTickFormat', () => {
      it('deja el formatter sin definir cuando se omite', () => {
        const wrapper = mountChart({ yTickFormat: undefined })

        expect(wrapper.findAllComponents(VisAxis)[1].props('tickFormat')).toBeUndefined()
      })

      it('pasa el callback personalizado al eje Y', () => {
        const yTickFormat = (value: number | Date, index: number) => `${value}-${index}`
        const wrapper = mountChart({ yTickFormat })
        const formatter = wrapper.findAllComponents(VisAxis)[1].props('tickFormat')

        expect(formatter).toBe(yTickFormat)
        expect(formatter?.(100, 2, [100])).toBe('100-2')
      })
    })

    describe('xLabel', () => {
      it.each([undefined, '', 'Mes'])('pasa xLabel=%s al eje X', (xLabel) => {
        const wrapper = mountChart({ xLabel })

        expect(wrapper.findAllComponents(VisAxis)[0].props('label')).toBe(xLabel)
      })
    })

    describe('yLabel', () => {
      it.each([undefined, '', 'Visitas'])('pasa yLabel=%s al eje Y', (yLabel) => {
        const wrapper = mountChart({ yLabel })

        expect(wrapper.findAllComponents(VisAxis)[1].props('label')).toBe(yLabel)
      })
    })

    describe('xNumTicks', () => {
      it.each([undefined, 0, 6])('pasa xNumTicks=%s al eje X', (xNumTicks) => {
        const wrapper = mountChart({ xNumTicks })

        expect(wrapper.findAllComponents(VisAxis)[0].props('numTicks')).toBe(xNumTicks)
      })
    })

    describe('yNumTicks', () => {
      it.each([undefined, 0, 5])('pasa yNumTicks=%s al eje Y', (yNumTicks) => {
        const wrapper = mountChart({ yNumTicks })

        expect(wrapper.findAllComponents(VisAxis)[1].props('numTicks')).toBe(yNumTicks)
      })
    })

    describe('gridLine', () => {
      it.each([true, false])('pasa gridLine=%s a ambos ejes', (gridLine) => {
        const wrapper = mountChart({ gridLine })
        const axes = wrapper.findAllComponents(VisAxis)

        expect(axes[0].props('gridLine')).toBe(gridLine)
        expect(axes[1].props('gridLine')).toBe(gridLine)
      })

      it('usa true cuando se omite', () => {
        const wrapper = mountChart({ gridLine: undefined })

        expect(wrapper.findAllComponents(VisAxis)[0].props('gridLine')).toBe(true)
        expect(wrapper.findAllComponents(VisAxis)[1].props('gridLine')).toBe(true)
      })
    })
  })

  describe('attrs', () => {
    it('reenvía attrs, class y style al root', () => {
      const wrapper = mountChart({
        class: 'custom-chart',
        style: { minHeight: '12rem' },
        id: 'monthly-chart',
        'data-test-custom': 'true',
      } as Partial<LinearChartProps<Point>>)
      const root = wrapper.get('[data-test-linear-chart-root]')

      expect(root.attributes('id')).toBe('monthly-chart')
      expect(root.attributes('data-test-custom')).toBe('true')
      expect(root.classes()).toContain('custom-chart')
      expect(root.attributes('style')).toContain('min-height: 12rem')
    })
  })
})
