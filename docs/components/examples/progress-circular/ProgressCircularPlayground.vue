<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { ProgressCircular as BaseProgressCircular } from '@/components/ui/ProgressCircular'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  value: 65,
  indeterminate: false,
  max: 100,
  label: 'Cargando',
  color: '#2563eb',
  trackColor: '#dbeafe',
  size: '80',
  thickness: 8,
  ui: false,
  slot: false,
  getValueLabel: false,
  getValueText: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function getSizeAttribute() {
  const size = state.value.size.trim()

  if (!size) return ''

  return /^\d+(\.\d+)?$/.test(size) ? `:size="${size}"` : `size="${escapeAttribute(size)}"`
}

function generateCode() {
  const attrs = [
    'v-model:value="value"',
    `:max="${state.value.max}"`,
    state.value.label && `label="${escapeAttribute(state.value.label)}"`,
    state.value.color && `color="${escapeAttribute(state.value.color)}"`,
    state.value.trackColor && `track-color="${escapeAttribute(state.value.trackColor)}"`,
    getSizeAttribute(),
    `:thickness="${state.value.thickness}"`,
    state.value.ui &&
      `:ui="{ svg: () => ({ class: 'drop-shadow-sm' }), track: () => ({ class: 'stroke-primary/20' }), indicator: () => ({ class: 'stroke-success' }), label: () => ({ class: 'text-success' }) }"`,
    state.value.getValueLabel &&
      `:get-value-label="(value, max) => value === null ? 'Progreso en curso' : value + ' de ' + max"`,
    state.value.getValueText &&
      `:get-value-text="(value, max) => value === null ? 'Cargando' : Math.round((value / max) * 100) + '% completado'"`,
    '@update:value="handleUpdate"',
  ].filter(Boolean)

  const slots = state.value.slot
    ? [
        '  <template #label="{ percentage }">',
        '    <span class="text-xs font-semibold text-success">{{ Math.round(percentage) }}%</span>',
        '  </template>',
      ]
    : []

  return slots.length
    ? `<ProgressCircular\n  ${attrs.join('\n  ')}\n>\n${slots.join('\n')}\n</ProgressCircular>`
    : `<ProgressCircular\n  ${attrs.join('\n  ')}\n/>`
}

function handleUpdate(value: number | null) {
  eventLog.value = value === null ? 'null' : String(value)
}

function applyCode() {
  editorError.value = ''

  try {
    const render = compile(
      editorCode.value
        .replace(/<ProgressCircular(?=[\s/>])/g, '<PlaygroundProgressCircular')
        .replaceAll('</ProgressCircular>', '</PlaygroundProgressCircular>'),
    )

    Preview.value = markRaw(
      defineComponent({
        name: 'ProgressCircularPlaygroundPreview',
        components: { PlaygroundProgressCircular: BaseProgressCircular },
        setup: () => ({
          value: ref(state.value.indeterminate ? null : state.value.value),
          handleUpdate,
        }),
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
  state.value = {
    value: 65,
    indeterminate: false,
    max: 100,
    label: 'Cargando',
    color: '#2563eb',
    trackColor: '#dbeafe',
    size: '80',
    thickness: 8,
    ui: false,
    slot: false,
    getValueLabel: false,
    getValueText: false,
  }
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
    filename="ProgressCircularPlayground.vue"
    description="Configura el progreso circular o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center px-8">
        <div class="grid justify-items-center gap-3">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <p v-if="eventLog" class="text-sm text-muted-foreground">update:value: {{ eventLog }}</p>
        </div>
      </div></template
    >
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Value<input
              v-model.number="state.value"
              type="range"
              min="0"
              :max="state.max"
              class="accent-primary"
            /><span class="text-muted-foreground">{{ state.value }}</span></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.indeterminate" type="checkbox" /> Estado indeterminado</label
          ><label class="grid gap-1 text-xs"
            >Max<input
              v-model.number="state.max"
              type="number"
              min="1"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Label<input
              v-model="state.label"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Track color<input
              v-model="state.trackColor"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Size (px o CSS)<input
              v-model="state.size"
              placeholder="80 o 5rem"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Thickness<input
              v-model.number="state.thickness"
              type="number"
              min="1"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slots y accesibilidad</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> Personalización ui</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.slot" type="checkbox" /> Slot label</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.getValueLabel" type="checkbox" /> getValueLabel</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.getValueText" type="checkbox" /> getValueText</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
