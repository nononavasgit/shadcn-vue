<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { InputTime as BaseInputTime } from '@/components/ui/InputTime'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  value: '09:30',
  showClock: true,
  min: '09:00',
  max: '18:00',
  step: '900',
  placeholder: 'HH:MM',
  ariaLabel: 'Hora de la cita',
  disabled: false,
  required: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewValue = ref('09:30')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const props = [
    'v-model:value="value"',
    `:show-clock="${state.value.showClock}"`,
    state.value.min && `min="${state.value.min}"`,
    state.value.max && `max="${state.value.max}"`,
    state.value.step && `step="${state.value.step}"`,
    state.value.placeholder && `placeholder="${state.value.placeholder}"`,
    `aria-label="${state.value.ariaLabel}"`,
    `:disabled="${state.value.disabled}"`,
    `:required="${state.value.required}"`,
    state.value.attrs && 'class="border-primary" data-state="ready"',
  ].filter(Boolean)
  return `<InputTime\n  ${props.join('\n  ')}\n/>`
}

function handleUpdate(value: string) {
  previewValue.value = value
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<InputTime(?=[\s/>])/g, '<PlaygroundInputTime')
        .replaceAll('</InputTime>', '</PlaygroundInputTime>'),
    )
    previewValue.value = state.value.value
    Preview.value = markRaw(
      defineComponent({
        name: 'InputTimePlaygroundPreview',
        components: { PlaygroundInputTime: BaseInputTime },
        setup: () => ({ value: previewValue, handleUpdate }),
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
    value: '09:30',
    showClock: true,
    min: '09:00',
    max: '18:00',
    step: '900',
    placeholder: 'HH:MM',
    ariaLabel: 'Hora de la cita',
    disabled: false,
    required: false,
    attrs: false,
  }
  syncFromControls()
}

watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="InputTimePlayground.vue"
    description="Configura la hora, el rango y los atributos nativos del campo."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8 py-6">
        <div class="grid w-full max-w-md gap-4">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <span class="text-center text-sm text-muted-foreground"
            >Hora seleccionada: {{ previewValue || 'Sin hora' }}</span
          >
        </div>
      </div>
    </template>
    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Props</legend>
          <label class="col-span-2 grid gap-1 text-xs"
            >Value<input
              v-model="state.value"
              type="time"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="col-span-2 flex items-center gap-2 text-sm"
            ><input v-model="state.showClock" type="checkbox" /> Show clock</label
          >
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Atributos de hora</legend>
          <label class="grid gap-1 text-xs"
            >Min<input
              v-model="state.min"
              type="time"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Max<input
              v-model="state.max"
              type="time"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Step (segundos)<input
              v-model="state.step"
              min="1"
              type="number"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Placeholder<input
              v-model="state.placeholder"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Atributos HTML</legend>
          <label class="grid gap-1 text-xs"
            >Aria label<input
              v-model="state.ariaLabel"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.required" type="checkbox" /> Required</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> class y data-state</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
