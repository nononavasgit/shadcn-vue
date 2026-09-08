<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { NumberField as BaseNumberField, numberFieldDefaults } from '@/components/ui/NumberField'
import ComponentPlayground from '../../ComponentPlayground.vue'

type NumberFieldState = {
  min: number
  max: number
  disabled: boolean
}

const initialState = (): NumberFieldState => ({
  min: numberFieldDefaults.min,
  max: 100,
  disabled: numberFieldDefaults.disabled,
})

const state = ref<NumberFieldState>(initialState())
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  return `<NumberField\n  :min="${state.value.min}"\n  :max="${state.value.max}"\n  :disabled="${state.value.disabled}"\n/>`
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
    description="Configura los valores mínimo y máximo o edita directamente su template."
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
      </fieldset>
    </template>
  </ComponentPlayground>
</template>
