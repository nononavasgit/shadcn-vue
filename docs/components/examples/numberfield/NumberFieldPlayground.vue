<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { NumberField as BaseNumberField, numberFieldDefaults } from '@/components/ui/NumberField'
import ComponentPlayground from '../../ComponentPlayground.vue'

type NumberFieldState = {
  id: string | undefined
  name: string | undefined
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant: 'outline' | 'plain' | 'subtle' | 'soft'
  severity: 'primary' | 'secondary' | 'warning' | 'success' | 'error'
  color: string
  increment: boolean
  decrement: boolean
  readonly: boolean
  required: boolean
  step: number
  stepSnapping: boolean
  value: number | null
  locale: string
  min: number
  max: number
  disabled: boolean
  disableWheelChange: boolean
  focusOnChange: boolean
  ui: boolean
  formatOptions: 'default' | 'currency' | 'percent'
}

const initialState = (): NumberFieldState => ({
  id: undefined,
  name: 'quantity',
  size: numberFieldDefaults.size,
  variant: numberFieldDefaults.variant,
  severity: numberFieldDefaults.severity,
  color: '',
  increment: numberFieldDefaults.increment,
  decrement: numberFieldDefaults.decrement,
  readonly: false,
  required: false,
  step: 1,
  stepSnapping: true,
  value: 25,
  locale: 'en-US',
  min: numberFieldDefaults.min,
  max: 100,
  disabled: numberFieldDefaults.disabled,
  disableWheelChange: numberFieldDefaults.disableWheelChange,
  focusOnChange: numberFieldDefaults.focusOnChange,
  ui: false,
  formatOptions: 'default',
})

const formatOptionsPresets = {
  currency: { style: 'currency', currency: 'EUR' },
  percent: { style: 'percent', maximumFractionDigits: 2 },
} as const

const state = ref<NumberFieldState>(initialState())
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  return [
    '<NumberField',
    '  v-model:value="value"',
    state.value.id && `  id="${state.value.id.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`,
    state.value.name &&
      `  name="${state.value.name.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`,
    `  size="${state.value.size}"`,
    `  variant="${state.value.variant}"`,
    `  severity="${state.value.severity}"`,
    state.value.color &&
      `  color="${state.value.color.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`,
    `  :increment="${state.value.increment}"`,
    `  :decrement="${state.value.decrement}"`,
    `  :readonly="${state.value.readonly}"`,
    `  :required="${state.value.required}"`,
    `  :step="${state.value.step}"`,
    `  :step-snapping="${state.value.stepSnapping}"`,
    state.value.locale &&
      `  locale="${state.value.locale.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`,
    `  :min="${state.value.min}"`,
    `  :max="${state.value.max}"`,
    `  :disabled="${state.value.disabled}"`,
    `  :disable-wheel-change="${state.value.disableWheelChange}"`,
    `  :focus-on-change="${state.value.focusOnChange}"`,
    state.value.ui &&
      `  :ui="{ input: () => ({ class: 'text-primary' }), increment: () => ({ class: 'text-primary' }), decrement: () => ({ class: 'text-primary' }) }"`,
    state.value.formatOptions !== 'default' &&
      `  :format-options='${JSON.stringify(formatOptionsPresets[state.value.formatOptions])}'`,
    '/>',
  ]
    .filter(Boolean)
    .join('\n')
}

function applyCode() {
  editorError.value = ''

  try {
    const render = compile(
      editorCode.value
        .replace(/<NumberField(?=[\s/>])/g, '<PlaygroundNumberField')
        .replaceAll('</NumberField>', '</PlaygroundNumberField>'),
    )

    Preview.value = markRaw(
      defineComponent({
        name: 'NumberFieldPlaygroundPreview',
        components: { PlaygroundNumberField: BaseNumberField },
        setup: () => ({ value: ref(state.value.value) }),
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
    filename="NumberFieldPlayground.vue"
    description="Configura los límites, el formato y el comportamiento del campo numérico."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-48 place-items-center px-8 py-6">
        <component :is="Preview" v-if="Preview" :key="previewKey" />
      </div>
    </template>

    <template #controls>
      <fieldset class="grid gap-3">
        <legend class="mb-1 text-sm font-semibold">Props</legend>
        <label class="grid gap-1 text-xs"
          >ID<input v-model="state.id" class="rounded-md border bg-background px-3 py-2 text-sm"
        /></label>
        <label class="grid gap-1 text-xs"
          >Name<input
            v-model="state.name"
            class="rounded-md border bg-background px-3 py-2 text-sm"
            placeholder="quantity"
        /></label>
        <label class="grid gap-1 text-xs"
          >Size
          <select v-model="state.size" class="rounded-md border bg-background px-3 py-2 text-sm">
            <option v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size">{{ size }}</option>
          </select>
        </label>
        <label class="grid gap-1 text-xs"
          >Variant
          <select v-model="state.variant" class="rounded-md border bg-background px-3 py-2 text-sm">
            <option v-for="variant in ['outline', 'plain', 'subtle', 'soft']" :key="variant">
              {{ variant }}
            </option>
          </select>
        </label>
        <label class="grid gap-1 text-xs"
          >Severity
          <select
            v-model="state.severity"
            class="rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option
              v-for="severity in ['primary', 'secondary', 'warning', 'success', 'error']"
              :key="severity"
            >
              {{ severity }}
            </option>
          </select>
        </label>
        <label class="grid gap-1 text-xs"
          >Color<input
            v-model="state.color"
            class="rounded-md border bg-background px-3 py-2 text-sm"
            placeholder="#ff0000"
        /></label>
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.increment" type="checkbox" /> Mostrar increment</label
        >
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.decrement" type="checkbox" /> Mostrar decrement</label
        >
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.readonly" type="checkbox" /> Readonly</label
        >
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.required" type="checkbox" /> Required</label
        >
        <label class="grid gap-1 text-xs"
          >Step<input
            v-model.number="state.step"
            type="number"
            min="0.01"
            step="0.01"
            class="rounded-md border bg-background px-3 py-2 text-sm"
        /></label>
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.stepSnapping" type="checkbox" /> Step snapping</label
        >
        <label class="grid gap-1 text-xs"
          >Value<input
            v-model.number="state.value"
            type="number"
            class="rounded-md border bg-background px-3 py-2 text-sm"
        /></label>
        <label class="grid gap-1 text-xs"
          >Locale<input
            v-model="state.locale"
            class="rounded-md border bg-background px-3 py-2 text-sm"
            placeholder="en-US"
        /></label>
        <label class="grid gap-1 text-xs"
          >Min<input
            v-model.number="state.min"
            type="number"
            class="rounded-md border bg-background px-3 py-2 text-sm"
        /></label>
        <label class="grid gap-1 text-xs"
          >Max<input
            v-model.number="state.max"
            type="number"
            class="rounded-md border bg-background px-3 py-2 text-sm"
        /></label>
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.disabled" type="checkbox" /> Disabled</label
        >
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.disableWheelChange" type="checkbox" /> Disable wheel change</label
        >
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.focusOnChange" type="checkbox" /> Focus on change</label
        >
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
        >
        <label class="grid gap-1 text-xs"
          >Format options
          <select
            v-model="state.formatOptions"
            class="rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="default">Por defecto</option>
            <option value="currency">Moneda (EUR)</option>
            <option value="percent">Porcentaje</option>
          </select>
        </label>
      </fieldset>
    </template>
  </ComponentPlayground>
</template>
