<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { LinearChart as BaseLinearChart } from '@/components/ui/LinearChart'
import ComponentPlayground from '../../ComponentPlayground.vue'

type ChartState = {
  data: 'single' | 'missing' | 'multiple'
  height: number
  color: string
  colors: string
  lineWidth: number
  lineDashArray: string
  curveType: string
  interpolateMissingData: boolean
  fallbackValueEnabled: boolean
  fallbackValue: number | null
  highlightOnHover: boolean
  cursor: string
  tooltip: boolean
  crosshair: boolean
  yDomainEnabled: boolean
  yDomainMin: number
  yDomainMax: number
  xTickFormat: boolean
  yTickFormat: boolean
  xLabel: string
  yLabel: string
  xNumTicks: number
  yNumTicks: number
  gridLine: boolean
  clickEvent: boolean
  mouseoverEvent: boolean
  mouseleaveEvent: boolean
  ariaLabel: string
}

const initialState = (): ChartState => ({
  data: 'single',
  height: 320,
  color: 'var(--chart-1)',
  colors: 'var(--chart-1), var(--chart-2), var(--chart-3)',
  lineWidth: 2,
  lineDashArray: '',
  curveType: 'linear',
  interpolateMissingData: false,
  fallbackValueEnabled: false,
  fallbackValue: 0,
  highlightOnHover: false,
  cursor: '',
  tooltip: false,
  crosshair: false,
  yDomainEnabled: false,
  yDomainMin: 0,
  yDomainMax: 400,
  xTickFormat: false,
  yTickFormat: false,
  xLabel: '',
  yLabel: '',
  xNumTicks: 0,
  yNumTicks: 0,
  gridLine: true,
  clickEvent: false,
  mouseoverEvent: false,
  mouseleaveEvent: false,
  ariaLabel: 'Visitantes por mes',
})

const state = ref<ChartState>(initialState())
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

const singleData = [
  { month: 'Enero', visitors: 186 },
  { month: 'Febrero', visitors: 205 },
  { month: 'Marzo', visitors: 237 },
  { month: 'Abril', visitors: 228 },
  { month: 'Mayo', visitors: 274 },
  { month: 'Junio', visitors: 301 },
]

const missingData = [
  { month: 'Enero', visitors: 186 },
  { month: 'Febrero', visitors: null },
  { month: 'Marzo', visitors: 237 },
  { month: 'Abril', visitors: null },
  { month: 'Mayo', visitors: 274 },
  { month: 'Junio', visitors: 301 },
]

const multipleData = [
  { month: 'Enero', sales: 186, expenses: 120, profit: 66 },
  { month: 'Febrero', sales: 205, expenses: 132, profit: 73 },
  { month: 'Marzo', sales: 237, expenses: 145, profit: 92 },
  { month: 'Abril', sales: 228, expenses: 151, profit: 77 },
  { month: 'Mayo', sales: 274, expenses: 164, profit: 110 },
  { month: 'Junio', sales: 301, expenses: 178, profit: 123 },
]

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll("'", '&#39;')
}

function dataForState() {
  if (state.value.data === 'missing') return missingData
  if (state.value.data === 'multiple') return multipleData
  return singleData
}

function generateCode() {
  const data = escapeAttribute(JSON.stringify(dataForState()))
  const multiple = state.value.data === 'multiple'
  const colors = state.value.colors
    .split(',')
    .map((color) => color.trim())
    .filter(Boolean)
  const lineDashArray = state.value.lineDashArray
    .split(',')
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value) && value >= 0)
  const attrs = [
    `:data='${data}'`,
    ':x="(point) => point.month"',
    multiple
      ? ':y="[(point) => point.sales, (point) => point.expenses, (point) => point.profit]"'
      : ':y="(point) => point.visitors"',
    `:height="${state.value.height}"`,
    state.value.color && !multiple && `color="${escapeAttribute(state.value.color)}"`,
    multiple && colors.length && `:colors='${escapeAttribute(JSON.stringify(colors))}'`,
    `:line-width="${state.value.lineWidth}"`,
    lineDashArray.length && `:line-dash-array="[${lineDashArray.join(', ')}]"`,
    `curve-type="${state.value.curveType}"`,
    state.value.interpolateMissingData && ':interpolate-missing-data="true"',
    state.value.fallbackValueEnabled && `:fallback-value="${state.value.fallbackValue ?? 'null'}"`,
    state.value.highlightOnHover && ':highlight-on-hover="true"',
    state.value.cursor && `cursor="${escapeAttribute(state.value.cursor)}"`,
    state.value.tooltip && ':tooltip="true"',
    state.value.crosshair && ':crosshair="true"',
    state.value.yDomainEnabled &&
      `:y-domain="[${state.value.yDomainMin}, ${state.value.yDomainMax}]"`,
    state.value.xTickFormat && ':x-tick-format="(value) => \'Mes \' + value"',
    state.value.yTickFormat && ':y-tick-format="(value) => String(value) + \' visitantes\'"',
    state.value.xLabel && `x-label="${escapeAttribute(state.value.xLabel)}"`,
    state.value.yLabel && `y-label="${escapeAttribute(state.value.yLabel)}"`,
    state.value.xNumTicks > 0 && `:x-num-ticks="${state.value.xNumTicks}"`,
    state.value.yNumTicks > 0 && `:y-num-ticks="${state.value.yNumTicks}"`,
    !state.value.gridLine && ':grid-line="false"',
    (state.value.clickEvent || state.value.mouseoverEvent || state.value.mouseleaveEvent) &&
      `:events="{ ${[
        state.value.clickEvent &&
          "click: (event, seriesIndex) => handleChartEvent('click', seriesIndex)",
        state.value.mouseoverEvent &&
          "mouseover: (event, seriesIndex) => handleChartEvent('mouseover', seriesIndex)",
        state.value.mouseleaveEvent &&
          "mouseleave: (event, seriesIndex) => handleChartEvent('mouseleave', seriesIndex)",
      ]
        .filter(Boolean)
        .join(', ')} }"`,
    state.value.ariaLabel && `aria-label="${escapeAttribute(state.value.ariaLabel)}"`,
  ].filter(Boolean)

  return `<LinearChart\n  ${attrs.join('\n  ')}\n/>`
}

function handleChartEvent(name: string, seriesIndex: number) {
  eventLog.value = `${name} · serie ${seriesIndex + 1}`
}

function applyCode() {
  editorError.value = ''

  try {
    const render = compile(
      editorCode.value
        .replace(/<LinearChart(?=[\s/>])/g, '<PlaygroundLinearChart')
        .replaceAll('</LinearChart>', '</PlaygroundLinearChart>'),
    )

    Preview.value = markRaw(
      defineComponent({
        name: 'LinearChartPlaygroundPreview',
        components: { PlaygroundLinearChart: BaseLinearChart },
        setup: () => ({ handleChartEvent }),
        render,
      }),
    )
    appliedCode.value = editorCode.value
    previewKey.value++
  } catch (error) {
    editorError.value = error instanceof Error ? error.message : String(error)
  }
}

function syncFromControls() {
  editorCode.value = generateCode()
  applyCode()
}

function reset() {
  state.value = initialState()
  eventLog.value = ''
  syncFromControls()
}

watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="LinearChartPlayground.vue"
    description="Configura los datos, las series, los ejes y la interacción del gráfico lineal."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-96 place-items-center px-8 py-6">
        <div class="w-full max-w-3xl">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <p v-if="eventLog" class="mt-3 text-sm text-muted-foreground">Evento: {{ eventLog }}</p>
        </div>
      </div>
    </template>

    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Datos y series</legend>
          <label class="grid gap-1 text-xs"
            >Datos
            <select v-model="state.data" class="rounded-md border bg-background px-3 py-2 text-sm">
              <option value="single">Una serie</option>
              <option value="multiple">Varias series</option>
              <option value="missing">Datos ausentes</option>
            </select>
          </label>
          <label class="grid gap-1 text-xs"
            >Height<input
              v-model.number="state.height"
              type="number"
              min="120"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Colors (varias series)<input
              v-model="state.colors"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Línea</legend>
          <label class="grid gap-1 text-xs"
            >Line width<input
              v-model.number="state.lineWidth"
              type="number"
              min="0"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Line dash array<input
              v-model="state.lineDashArray"
              placeholder="8, 4"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Curve type
            <select
              v-model="state.curveType"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option
                v-for="curve in [
                  'linear',
                  'monotoneX',
                  'basis',
                  'cardinal',
                  'natural',
                  'step',
                  'stepAfter',
                  'stepBefore',
                ]"
                :key="curve"
                :value="curve"
              >
                {{ curve }}
              </option>
            </select>
          </label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.interpolateMissingData" type="checkbox" /> Interpolar datos
            ausentes</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.fallbackValueEnabled" type="checkbox" /> Usar fallback
            value</label
          ><label v-if="state.fallbackValueEnabled" class="grid gap-1 text-xs"
            >Fallback value<input
              v-model.number="state.fallbackValue"
              type="number"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Ejes</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.yDomainEnabled" type="checkbox" /> Fijar yDomain</label
          >
          <div v-if="state.yDomainEnabled" class="grid grid-cols-2 gap-2">
            <label class="grid gap-1 text-xs"
              >Min<input
                v-model.number="state.yDomainMin"
                type="number"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="grid gap-1 text-xs"
              >Max<input
                v-model.number="state.yDomainMax"
                type="number"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
          </div>
          <label class="grid gap-1 text-xs"
            >X label<input
              v-model="state.xLabel"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Y label<input
              v-model="state.yLabel"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <div class="grid grid-cols-2 gap-2">
            <label class="grid gap-1 text-xs"
              >X num ticks<input
                v-model.number="state.xNumTicks"
                type="number"
                min="0"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="grid gap-1 text-xs"
              >Y num ticks<input
                v-model.number="state.yNumTicks"
                type="number"
                min="0"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
          </div>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.gridLine" type="checkbox" /> Grid lines</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.xTickFormat" type="checkbox" /> Formatear ticks X</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.yTickFormat" type="checkbox" /> Formatear ticks Y</label
          >
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Interacción y atributos</legend>
          <label class="grid gap-1 text-xs"
            >Cursor<input
              v-model="state.cursor"
              placeholder="crosshair"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.highlightOnHover" type="checkbox" /> Highlight on hover</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.tooltip" type="checkbox" /> Tooltip</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.crosshair" type="checkbox" /> Crosshair</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.clickEvent" type="checkbox" /> Evento click</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.mouseoverEvent" type="checkbox" /> Evento mouseover</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.mouseleaveEvent" type="checkbox" /> Evento mouseleave</label
          ><label class="grid gap-1 text-xs"
            >aria-label<input
              v-model="state.ariaLabel"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
