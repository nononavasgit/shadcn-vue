<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Label as BaseLabel } from '@/components/ui/Label'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  text: 'Nombre completo',
  inputId: 'full-name',
  useSlot: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const props = [
    `for="${state.value.inputId}"`,
    state.value.attrs && 'class="text-primary" data-state="ready" aria-label="Campo de nombre"',
  ].filter(Boolean)
  const content = state.value.useSlot
    ? `<span class="font-semibold">${state.value.text}</span>`
    : state.value.text
  return `<div class="grid max-w-sm gap-2">\n  <Label\n    ${props.join('\n    ')}\n  >\n    ${content}\n  </Label>\n  <input id="${state.value.inputId}" class="h-9 rounded-md border bg-background px-3 text-sm" />\n</div>`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Label(?=[\s/>])/g, '<PlaygroundLabel')
        .replaceAll('</Label>', '</PlaygroundLabel>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'LabelPlaygroundPreview',
        components: { PlaygroundLabel: BaseLabel },
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
    text: 'Nombre completo',
    inputId: 'full-name',
    useSlot: false,
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
    filename="LabelPlayground.vue"
    description="Asocia una etiqueta con un control y personaliza su contenido."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8 py-6">
        <component :is="Preview" v-if="Preview" :key="previewKey" />
      </div>
    </template>
    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Texto<input
              v-model="state.text"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >For / ID<input
              v-model="state.inputId"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slot default</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.useSlot" type="checkbox" /> Usar contenido personalizado</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Atributos HTML</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> class, data-state y aria-label</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
