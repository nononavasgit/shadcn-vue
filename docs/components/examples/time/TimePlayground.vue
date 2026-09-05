<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Time as BaseTime } from '@/components/ui/Time'
import ComponentPlayground from '../../ComponentPlayground.vue'

type TimeState = {
  datetimeMode: 'string' | 'number' | 'date'
  datetime: string
  timestamp: number
  locale: string
  format: 'none' | 'long' | 'numeric' | 'year' | 'date-time'
  slot: boolean
  attrs: boolean
}

const initialState = (): TimeState => ({
  datetimeMode: 'string',
  datetime: '2024-01-15T00:00:00.000Z',
  timestamp: 0,
  locale: 'es-ES',
  format: 'long',
  slot: false,
  attrs: false,
})

const formatPresets = {
  long: { year: 'numeric', month: 'long', day: 'numeric' },
  numeric: { year: 'numeric', month: '2-digit', day: '2-digit' },
  year: { year: 'numeric' },
  'date-time': { dateStyle: 'medium', timeStyle: 'short' },
} as const

const state = ref<TimeState>(initialState())
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function escapeSingleAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll("'", '&#39;')
}

function generateCode() {
  const datetime =
    state.value.datetimeMode === 'number'
      ? `:datetime="${state.value.timestamp}"`
      : state.value.datetimeMode === 'date'
        ? `:datetime="new Date('${escapeSingleAttribute(state.value.datetime)}')"`
        : `datetime="${escapeAttribute(state.value.datetime)}"`
  const props = [
    datetime,
    state.value.locale && `locale="${escapeAttribute(state.value.locale)}"`,
    state.value.format !== 'none' &&
      `:format='${JSON.stringify(formatPresets[state.value.format])}'`,
    state.value.attrs && 'class="font-medium text-primary" aria-label="Fecha formateada"',
  ].filter(Boolean)
  const opening = `<Time\n  ${props.join('\n  ')}`

  if (!state.value.slot) return `${opening}\n/>`

  return `${opening}\n>\n  <template #default="{ date }">\n    <span class="font-medium">Fecha: {{ date }}</span>\n  </template>\n</Time>`
}

function applyCode() {
  editorError.value = ''

  try {
    const render = compile(
      editorCode.value
        .replace(/<Time(?=[\s/>])/g, '<PlaygroundTime')
        .replaceAll('</Time>', '</PlaygroundTime>'),
    )

    Preview.value = markRaw(
      defineComponent({
        name: 'TimePlaygroundPreview',
        components: { PlaygroundTime: BaseTime },
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
  syncFromControls()
}

watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="TimePlayground.vue"
    description="Configura la fecha, su locale, el formato y el contenido del slot."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-48 place-items-center px-8 py-6">
        <div class="grid gap-3 text-center">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <p class="text-xs text-muted-foreground">
            El atributo datetime conserva el valor semántico original.
          </p>
        </div>
      </div>
    </template>

    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Datetime</legend>
          <label class="grid gap-1 text-xs"
            >Tipo de valor
            <select
              v-model="state.datetimeMode"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="string">String ISO</option>
              <option value="number">Timestamp</option>
              <option value="date">Date</option>
            </select>
          </label>
          <label v-if="state.datetimeMode !== 'number'" class="grid gap-1 text-xs"
            >Fecha ISO<input
              v-model="state.datetime"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label v-else class="grid gap-1 text-xs"
            >Timestamp<input
              v-model.number="state.timestamp"
              type="number"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Formato</legend>
          <label class="grid gap-1 text-xs"
            >Locale<input
              v-model="state.locale"
              placeholder="es-ES"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Format
            <select
              v-model="state.format"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="none">Por defecto</option>
              <option value="long">Fecha larga</option>
              <option value="numeric">Fecha numérica</option>
              <option value="year">Solo año</option>
              <option value="date-time">Fecha y hora</option>
            </select>
          </label>
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slot y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.slot" type="checkbox" /> Slot default</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
