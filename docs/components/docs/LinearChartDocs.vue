<script setup lang="ts">
import { linearChartDefaults } from '@/components/ui/LinearChart/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'data',
    type: 'T[]',
    default: '-',
    required: true,
    description: 'Datos que se representan en el chart.',
  },
  {
    name: 'x',
    type: '(datum: T, index: number) => number | string | Date',
    default: '-',
    required: true,
    description: 'Accessor del valor del eje X.',
  },
  {
    name: 'y',
    type: 'Accessor | Accessor[]',
    default: '-',
    required: true,
    description: 'Accessor o accessors de los valores numéricos del eje Y.',
  },
  {
    name: 'events',
    type: 'object',
    default: 'undefined',
    description: 'Callbacks click, mouseover y mouseleave para las líneas.',
  },
  {
    name: 'height',
    type: 'number | string',
    default: String(linearChartDefaults.height),
    description: 'Altura del contenedor de Unovis.',
  },
  {
    name: 'color',
    type: 'string',
    default: linearChartDefaults.color,
    description: 'Color CSS de la línea única o color común de las series.',
  },
  {
    name: 'colors',
    type: 'string[]',
    default: 'undefined',
    description: 'Colores CSS de las series múltiples, en el mismo orden que los accessors de y.',
  },
  {
    name: 'lineWidth',
    type: 'number',
    default: String(linearChartDefaults.lineWidth),
    description: 'Grosor de la línea en píxeles.',
  },
  {
    name: 'lineDashArray',
    type: 'number[]',
    default: 'undefined',
    description: 'Patrón de línea discontinua en formato SVG stroke-dasharray.',
  },
  {
    name: 'curveType',
    type: 'String (basis | basisClosed | basisOpen | bundle | cardinal | cardinalClosed | cardinalOpen | catmullRom | catmullRomClosed | catmullRomOpen | linear | linearClosed | monotoneX | monotoneY | natural | step | stepAfter | stepBefore)',
    default: linearChartDefaults.curveType,
    description: 'Tipo de curva de Unovis.',
  },
  {
    name: 'interpolateMissingData',
    type: 'boolean',
    default: String(linearChartDefaults.interpolateMissingData),
    description: 'Interpola los huecos de datos de todas las series.',
  },
  {
    name: 'fallbackValue',
    type: 'number | null',
    default: 'undefined',
    description: 'Valor que sustituye a los datos ausentes o no numéricos.',
  },
  {
    name: 'highlightOnHover',
    type: 'boolean',
    default: String(linearChartDefaults.highlightOnHover),
    description: 'Resalta la línea al pasar el cursor por encima.',
  },
  {
    name: 'cursor',
    type: 'string',
    default: 'undefined',
    description: 'Cursor CSS que se muestra sobre la línea.',
  },
  {
    name: 'tooltip',
    type: 'boolean',
    default: String(linearChartDefaults.tooltip),
    description: 'Muestra un tooltip con los valores de las series.',
  },
  {
    name: 'crosshair',
    type: 'boolean',
    default: String(linearChartDefaults.crosshair),
    description: 'Muestra una línea vertical y los puntos correspondientes al eje X.',
  },
  {
    name: 'yDomain',
    type: '[number | undefined, number | undefined]',
    default: 'undefined',
    description: 'Límites mínimo y máximo del eje Y.',
  },
  {
    name: 'xTickFormat',
    type: '(value: number | Date, index: number) => string',
    default: 'undefined',
    description: 'Formatea el texto de los ticks del eje X.',
  },
  {
    name: 'yTickFormat',
    type: '(value: number | Date, index: number) => string',
    default: 'undefined',
    description: 'Formatea el texto de los ticks del eje Y.',
  },
  { name: 'xLabel', type: 'string', default: 'undefined', description: 'Etiqueta del eje X.' },
  { name: 'yLabel', type: 'string', default: 'undefined', description: 'Etiqueta del eje Y.' },
  {
    name: 'xNumTicks',
    type: 'number',
    default: 'undefined',
    description: 'Número aproximado de ticks del eje X.',
  },
  {
    name: 'yNumTicks',
    type: 'number',
    default: 'undefined',
    description: 'Número aproximado de ticks del eje Y.',
  },
  {
    name: 'gridLine',
    type: 'boolean',
    default: String(linearChartDefaults.gridLine),
    description: 'Muestra u oculta las líneas de cuadrícula de ambos ejes.',
  },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">LinearChart</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Chart lineal reutilizable basado en Unovis, con datos genéricos y accessors tipados.
      </p>
    </header>

    <ApiTable title="Props" :rows="propRows" />
    <ApiTable title="Emits" :rows="[]" empty-text="Este componente no emite eventos." />
    <ApiTable title="Slots" :rows="[]" empty-text="Este componente no define slots." />
  </section>
</template>
