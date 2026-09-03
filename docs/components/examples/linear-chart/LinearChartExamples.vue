<script setup lang="ts">
import { ref } from 'vue'
import { LinearChart } from '@/components/ui/LinearChart'
import Example from '../../Example.vue'

type VisitorPoint = { month: string; visitors: number }
type MultiLinePoint = { month: string; sales: number; expenses: number; profit: number }
type MissingDataPoint = { month: string; visitors: number | null | undefined }

const data: VisitorPoint[] = [
  { month: 'Enero', visitors: 186 },
  { month: 'Febrero', visitors: 205 },
  { month: 'Marzo', visitors: 237 },
  { month: 'Abril', visitors: 228 },
  { month: 'Mayo', visitors: 274 },
  { month: 'Junio', visitors: 301 },
]

const x = (point: VisitorPoint) => point.month
const y = (point: VisitorPoint) => point.visitors
const xByIndex = (_point: VisitorPoint, index: number) => index
const yNormalized = (point: VisitorPoint) => point.visitors / 10

const multiLineData: MultiLinePoint[] = [
  { month: 'Enero', sales: 186, expenses: 120, profit: 66 },
  { month: 'Febrero', sales: 205, expenses: 132, profit: 73 },
  { month: 'Marzo', sales: 237, expenses: 145, profit: 92 },
  { month: 'Abril', sales: 228, expenses: 151, profit: 77 },
  { month: 'Mayo', sales: 274, expenses: 164, profit: 110 },
  { month: 'Junio', sales: 301, expenses: 178, profit: 123 },
]

const multiLineX = (point: MultiLinePoint) => point.month
const multiLineY = [
  (point: MultiLinePoint) => point.sales,
  (point: MultiLinePoint) => point.expenses,
  (point: MultiLinePoint) => point.profit,
]
const multiLineColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)']
const selectedSeries = ref<number | null>(null)
const chartEvents = {
  click: (_event: MouseEvent, seriesIndex: number) => {
    selectedSeries.value = seriesIndex
  },
}

const missingData: MissingDataPoint[] = [
  { month: 'Enero', visitors: 186 },
  { month: 'Febrero', visitors: null },
  { month: 'Marzo', visitors: 237 },
  { month: 'Abril', visitors: undefined },
  { month: 'Mayo', visitors: 274 },
  { month: 'Junio', visitors: 301 },
]

const missingDataX = (point: MissingDataPoint) => point.month
const missingDataY = (point: MissingDataPoint) => point.visitors

const sharedCode = `import { LinearChart } from '@/components/ui/LinearChart'

type VisitorPoint = { month: string; visitors: number }

const data: VisitorPoint[] = [
  { month: 'Enero', visitors: 186 },
  { month: 'Febrero', visitors: 205 },
  { month: 'Marzo', visitors: 237 },
  { month: 'Abril', visitors: 228 },
  { month: 'Mayo', visitors: 274 },
  { month: 'Junio', visitors: 301 },
]`

const defaultAccessorsCode = `const x = (point: VisitorPoint) => point.month
const y = (point: VisitorPoint) => point.visitors`

const code = (accessors: string, component: string) => `${sharedCode}

${accessors}

${component}`
const defaultCode = (component: string) => code(defaultAccessorsCode, component)

const dataCode = defaultCode(`<LinearChart
  :data="data"
  :x="x"
  :y="y"
/>`)
const multipleLinesCode = `import { LinearChart } from '@/components/ui/LinearChart'

const y = [
  (point: MultiLinePoint) => point.sales,
  (point: MultiLinePoint) => point.expenses,
  (point: MultiLinePoint) => point.profit,
]

const colors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)']

<LinearChart
  :data="multiLineData"
  :x="multiLineX"
  :y="y"
  :colors="colors"
/>`
const interpolateMissingDataCode = `const data = [
  { month: 'Enero', visitors: 186 },
  { month: 'Febrero', visitors: null },
  { month: 'Marzo', visitors: 237 },
]

<LinearChart
  :data="data"
  :x="point => point.month"
  :y="point => point.visitors"
  :interpolate-missing-data="true"
/>`
const fallbackValueCode = `<LinearChart
  :data="missingData"
  :x="missingDataX"
  :y="missingDataY"
  :fallback-value="0"
/>`
const yDomainCode = `<LinearChart
  :data="data"
  :x="x"
  :y="y"
  :y-domain="[0, 400]"
/>`
const highlightOnHoverCode = `<LinearChart
  :data="multiLineData"
  :x="multiLineX"
  :y="multiLineY"
  :colors="multiLineColors"
  :highlight-on-hover="true"
/>`
const cursorCode = `<LinearChart
  :data="data"
  :x="x"
  :y="y"
  cursor="crosshair"
/>`
const tooltipCode = `<LinearChart
  :data="multiLineData"
  :x="multiLineX"
  :y="multiLineY"
  :colors="multiLineColors"
  :tooltip="true"
/>`
const crosshairCode = `<LinearChart
  :data="multiLineData"
  :x="multiLineX"
  :y="multiLineY"
  :colors="multiLineColors"
  :crosshair="true"
/>`
const xTickFormat = (value: number | Date) => `Mes ${data[Math.round(Number(value))]?.month ?? ''}`
const yTickFormat = (value: number | Date) => `${value} visitantes`
const xTickFormatCode = `const xTickFormat = (value: number | Date) =>
  \`Mes \${data[Math.round(Number(value))]?.month ?? ''}\`

<LinearChart
  :data="data"
  :x="x"
  :y="y"
  :x-tick-format="xTickFormat"
/>`
const yTickFormatCode = `const yTickFormat = (value: number | Date) =>
  \`\${value} visitantes\`

<LinearChart
  :data="data"
  :x="x"
  :y="y"
  :y-tick-format="yTickFormat"
/>`
const eventsCode = `import { ref } from 'vue'

const selectedSeries = ref<number | null>(null)
const events = {
  click: (_event: MouseEvent, seriesIndex: number) => {
    selectedSeries.value = seriesIndex
  },
}

<LinearChart
  :data="multiLineData"
  :x="multiLineX"
  :y="multiLineY"
  :colors="multiLineColors"
  :events="events"
/>`
const xCode = code(
  `const xByIndex = (_point: VisitorPoint, index: number) => index
const y = (point: VisitorPoint) => point.visitors`,
  `<LinearChart :data="data" :x="xByIndex" :y="y" />`,
)
const yCode = code(
  `const x = (point: VisitorPoint) => point.month
const yNormalized = (point: VisitorPoint) => point.visitors / 10`,
  `<LinearChart :data="data" :x="x" :y="yNormalized" />`,
)
const heightCode = defaultCode(`<LinearChart
  :data="data"
  :x="x"
  :y="y"
  height="240"
/>`)
const colorCode = defaultCode(`<LinearChart
  :data="data"
  :x="x"
  :y="y"
  color="var(--chart-2)"
/>`)
const lineWidthCode = defaultCode(`<LinearChart
  :data="data"
  :x="x"
  :y="y"
  :line-width="4"
/>`)
const lineDashArrayCode = defaultCode(`<LinearChart
  :data="data"
  :x="x"
  :y="y"
  :line-dash-array="[8, 4]"
/>`)
const curveTypeCode = defaultCode(`<LinearChart
  :data="data"
  :x="x"
  :y="y"
  curve-type="basis"
/>`)
const xLabelCode = defaultCode(`<LinearChart
  :data="data"
  :x="x"
  :y="y"
  x-label="Mes"
/>`)
const yLabelCode = defaultCode(`<LinearChart
  :data="data"
  :x="x"
  :y="y"
  y-label="Visitantes"
/>`)
const xNumTicksCode = defaultCode(`<LinearChart
  :data="data"
  :x="x"
  :y="y"
  :x-num-ticks="4"
/>`)
const yNumTicksCode = defaultCode(`<LinearChart
  :data="data"
  :x="x"
  :y="y"
  :y-num-ticks="4"
/>`)
const gridLineCode = defaultCode(`<LinearChart
  :data="data"
  :x="x"
  :y="y"
  :grid-line="false"
/>`)
const ariaAttributeCode = defaultCode(`<LinearChart
  :data="data"
  :x="x"
  :y="y"
  aria-label="Visitantes por mes"
/>`)
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada prop tiene su propia gráfica y el código utilizado aparece justo debajo. LinearChart no
        define slots ni eventos.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Prop: data"
        description="Colección de datos que se representa."
        :code="dataCode"
      >
        <LinearChart :data="data" :x="x" :y="y" />
      </Example>

      <Example
        title="Múltiples líneas"
        description="Pasa un array de accessors en y y un color para cada serie."
        :code="multipleLinesCode"
      >
        <LinearChart
          :data="multiLineData"
          :x="multiLineX"
          :y="multiLineY"
          :colors="multiLineColors"
        />
      </Example>

      <Example
        title="Prop: events"
        description="Responde al click sobre una línea y muestra la serie seleccionada."
        :code="eventsCode"
      >
        <div class="grid w-full gap-2">
          <LinearChart
            :data="multiLineData"
            :x="multiLineX"
            :y="multiLineY"
            :colors="multiLineColors"
            :events="chartEvents"
          />
          <p v-if="selectedSeries !== null" class="text-center text-sm text-muted-foreground">
            Serie seleccionada: {{ selectedSeries + 1 }}
          </p>
        </div>
      </Example>

      <Example
        title="Prop: interpolateMissingData"
        description="Interpola los huecos de datos entre puntos definidos."
        :code="interpolateMissingDataCode"
      >
        <LinearChart
          :data="missingData"
          :x="missingDataX"
          :y="missingDataY"
          :interpolate-missing-data="true"
        />
      </Example>

      <Example
        title="Prop: fallbackValue"
        description="Sustituye los valores ausentes por 0 y mantiene la línea continua."
        :code="fallbackValueCode"
      >
        <LinearChart :data="missingData" :x="missingDataX" :y="missingDataY" :fallback-value="0" />
      </Example>

      <Example
        title="Prop: yDomain"
        description="Fija los límites mínimo y máximo del eje Y."
        :code="yDomainCode"
      >
        <LinearChart :data="data" :x="x" :y="y" :y-domain="[0, 400]" />
      </Example>

      <Example
        title="Prop: highlightOnHover"
        description="Resalta una línea y atenúa las demás al pasar el cursor por encima."
        :code="highlightOnHoverCode"
      >
        <LinearChart
          :data="multiLineData"
          :x="multiLineX"
          :y="multiLineY"
          :colors="multiLineColors"
          :highlight-on-hover="true"
        />
      </Example>

      <Example
        title="Prop: cursor"
        description="Cambia el cursor que se muestra sobre la línea."
        :code="cursorCode"
      >
        <LinearChart :data="data" :x="x" :y="y" cursor="crosshair" />
      </Example>

      <Example
        title="Prop: tooltip"
        description="Muestra los valores de las series en el punto más cercano."
        :code="tooltipCode"
      >
        <LinearChart
          :data="multiLineData"
          :x="multiLineX"
          :y="multiLineY"
          :colors="multiLineColors"
          :tooltip="true"
        />
      </Example>

      <Example
        title="Prop: crosshair"
        description="Muestra una guía vertical y los puntos de las series."
        :code="crosshairCode"
      >
        <LinearChart
          :data="multiLineData"
          :x="multiLineX"
          :y="multiLineY"
          :colors="multiLineColors"
          :crosshair="true"
        />
      </Example>

      <Example
        title="Prop: xTickFormat"
        description="Personaliza el texto de los ticks del eje X."
        :code="xTickFormatCode"
      >
        <LinearChart :data="data" :x="x" :y="y" :x-tick-format="xTickFormat" />
      </Example>

      <Example
        title="Prop: yTickFormat"
        description="Personaliza el texto de los ticks del eje Y."
        :code="yTickFormatCode"
      >
        <LinearChart :data="data" :x="x" :y="y" :y-tick-format="yTickFormat" />
      </Example>

      <Example title="Prop: x" description="Accessor para el valor del eje X." :code="xCode">
        <LinearChart :data="data" :x="xByIndex" :y="y" />
      </Example>

      <Example title="Prop: y" description="Accessor para el valor del eje Y." :code="yCode">
        <LinearChart :data="data" :x="x" :y="yNormalized" />
      </Example>

      <Example
        title="Prop: height"
        description="Controla la altura del contenedor."
        :code="heightCode"
      >
        <LinearChart :data="data" :x="x" :y="y" height="240" />
      </Example>

      <Example
        title="Prop: color"
        description="Personaliza el color de la línea."
        :code="colorCode"
      >
        <LinearChart :data="data" :x="x" :y="y" color="var(--chart-2)" />
      </Example>

      <Example
        title="Prop: lineWidth"
        description="Ajusta el grosor de la línea."
        :code="lineWidthCode"
      >
        <LinearChart :data="data" :x="x" :y="y" :line-width="4" />
      </Example>

      <Example
        title="Prop: lineDashArray"
        description="Convierte la línea en discontinua usando un patrón SVG."
        :code="lineDashArrayCode"
      >
        <LinearChart :data="data" :x="x" :y="y" :line-dash-array="[8, 4]" />
      </Example>

      <Example
        title="Prop: curveType"
        description="Cambia la interpolación de la línea; por defecto es linear."
        :code="curveTypeCode"
      >
        <LinearChart :data="data" :x="x" :y="y" curve-type="basis" />
      </Example>

      <Example title="Prop: xLabel" description="Añade una etiqueta al eje X." :code="xLabelCode">
        <LinearChart :data="data" :x="x" :y="y" x-label="Mes" />
      </Example>

      <Example title="Prop: yLabel" description="Añade una etiqueta al eje Y." :code="yLabelCode">
        <LinearChart :data="data" :x="x" :y="y" y-label="Visitantes" />
      </Example>

      <Example
        title="Prop: xNumTicks"
        description="Configura el número aproximado de ticks del eje X."
        :code="xNumTicksCode"
      >
        <LinearChart :data="data" :x="x" :y="y" :x-num-ticks="4" />
      </Example>

      <Example
        title="Prop: yNumTicks"
        description="Configura el número aproximado de ticks del eje Y."
        :code="yNumTicksCode"
      >
        <LinearChart :data="data" :x="x" :y="y" :y-num-ticks="4" />
      </Example>

      <Example
        title="Prop: gridLine"
        description="Muestra u oculta las líneas de cuadrícula."
        :code="gridLineCode"
      >
        <LinearChart :data="data" :x="x" :y="y" :grid-line="false" />
      </Example>

      <Example
        title="Atributo: aria-label"
        description="Usa un atributo HTML para describir el gráfico."
        :code="ariaAttributeCode"
      >
        <LinearChart :data="data" :x="x" :y="y" aria-label="Visitantes por mes" />
      </Example>
    </div>
  </section>
</template>
