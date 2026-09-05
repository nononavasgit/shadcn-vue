<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Slider } from '@/components/ui/Slider'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  mode: 'single',
  values: '35',
  min: 0,
  max: 100,
  step: 5,
  orientation: 'horizontal',
  inverted: false,
  minStepsBetweenThumbs: 0,
  thumbAlignment: 'contain',
  name: '',
  disabled: false,
  required: false,
  ui: false,
  trackSlot: false,
  rangeSlot: false,
  thumbSlot: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function values() {
  return state.value.mode === 'range' ? '[25, 75]' : `[${state.value.values || state.value.min}]`
}
function generateCode() {
  const props = [
    'v-model:value="value"',
    `:min="${state.value.min}"`,
    `:max="${state.value.max}"`,
    `:step="${state.value.step}"`,
    state.value.orientation !== 'horizontal' && `orientation="${state.value.orientation}"`,
    state.value.inverted && 'inverted',
    state.value.minStepsBetweenThumbs > 0 &&
      `:min-steps-between-thumbs="${state.value.minStepsBetweenThumbs}"`,
    state.value.thumbAlignment !== 'contain' && `thumb-alignment="${state.value.thumbAlignment}"`,
    state.value.name && `name="${state.value.name}"`,
    state.value.disabled && 'disabled',
    state.value.required && 'required',
    state.value.ui &&
      `:ui="{ track: ({ values }) => ({ class: 'bg-muted' }), range: ({ values }) => ({ class: 'bg-success' }), thumb: ({ first }) => ({ class: first ? 'border-success' : 'border-primary' }) }"`,
    state.value.attrs && 'aria-label="Seleccionar rango" class="data-[state=active]:ring-2"',
    '@value-commit="handleCommit"',
  ].filter(Boolean)
  const slots = [
    state.value.trackSlot &&
      '  <template #track="{ values }"><div class="h-full w-full bg-primary/20" /></template>',
    state.value.rangeSlot &&
      '  <template #range="{ values }"><div class="h-full bg-success" /></template>',
    state.value.thumbSlot &&
      '  <template #thumb="{ value }"><span class="text-[0.5rem] font-bold">{{ value }}</span></template>',
  ].filter(Boolean)
  return `<Slider\n  ${props.join('\n  ')}\n>${slots.length ? `\n${slots.join('\n')}\n` : ''}</Slider>`
}
function handleCommit(value: number[]) {
  eventLog.value = value.join(' – ')
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({
        name: 'SliderPlaygroundPreview',
        components: { Slider },
        setup: () => ({ value: ref(JSON.parse(values())), handleCommit }),
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
    mode: 'single',
    values: '35',
    min: 0,
    max: 100,
    step: 5,
    orientation: 'horizontal',
    inverted: false,
    minStepsBetweenThumbs: 0,
    thumbAlignment: 'contain',
    name: '',
    disabled: false,
    required: false,
    ui: false,
    trackSlot: false,
    rangeSlot: false,
    thumbSlot: false,
    attrs: false,
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
    filename="SliderPlayground.vue"
    description="Configura el slider o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center px-8">
        <div
          :class="state.orientation === 'vertical' ? 'flex h-56 justify-center' : 'w-full max-w-md'"
        >
          <component :is="Preview" v-if="Preview" :key="previewKey" class="w-full" />
        </div>
        <p v-if="eventLog" class="mt-3 font-mono text-xs text-muted-foreground">
          valueCommit: {{ eventLog }}
        </p>
      </div></template
    >
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Valores</legend>
          <label class="grid gap-1 text-xs"
            >Mode<select
              v-model="state.mode"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>single</option>
              <option>range</option>
            </select></label
          ><label v-if="state.mode === 'single'" class="grid gap-1 text-xs"
            >Value<input
              v-model="state.values"
              type="number"
              :min="state.min"
              :max="state.max"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Min<input
              v-model.number="state.min"
              type="number"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Max<input
              v-model.number="state.max"
              type="number"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Step<input
              v-model.number="state.step"
              type="number"
              min="0.1"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Orientation<select
              v-model="state.orientation"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>horizontal</option>
              <option>vertical</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Thumb alignment<select
              v-model="state.thumbAlignment"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>contain</option>
              <option>overflow</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Min steps between thumbs<input
              v-model.number="state.minStepsBetweenThumbs"
              type="number"
              min="0"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Name<input
              v-model="state.name"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.inverted" type="checkbox" /> Inverted</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.required" type="checkbox" /> Required</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">UI, slots y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.trackSlot" type="checkbox" /> Slot track</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.rangeSlot" type="checkbox" /> Slot range</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.thumbSlot" type="checkbox" /> Slot thumb</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
