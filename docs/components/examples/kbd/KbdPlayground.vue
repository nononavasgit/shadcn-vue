<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Kbd as BaseKbd } from '@/components/ui/Kbd'
import ComponentPlayground from '../../ComponentPlayground.vue'

const sizes = ['sm', 'md', 'lg']
const variants = ['solid', 'outline', 'soft', 'subtle']
const severities = ['primary', 'secondary', 'warning', 'success', 'error']

const state = ref({
  label: 'Ctrl',
  size: 'md',
  variant: 'soft',
  severity: 'secondary',
  color: '',
  defaultSlot: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const props = [
    state.value.label && `label="${state.value.label}"`,
    `size="${state.value.size}"`,
    `variant="${state.value.variant}"`,
    `severity="${state.value.severity}"`,
    state.value.color && `color="${state.value.color}"`,
    state.value.attrs && 'class="shadow-sm" data-state="ready" aria-label="Tecla"',
  ].filter(Boolean)
  const opening = `<Kbd\n  ${props.join('\n  ')}`
  return state.value.defaultSlot
    ? `${opening}\n>\n  <span>${state.value.label}</span>\n</Kbd>`
    : `${opening}\n/>`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Kbd(?=[\s/>])/g, '<PlaygroundKbd')
        .replaceAll('</Kbd>', '</PlaygroundKbd>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'KbdPlaygroundPreview',
        components: { PlaygroundKbd: BaseKbd },
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
    label: 'Ctrl',
    size: 'md',
    variant: 'soft',
    severity: 'secondary',
    color: '',
    defaultSlot: false,
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
    filename="KbdPlayground.vue"
    description="Configura una tecla, sus variantes visuales y el contenido del slot default."
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
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Props</legend>
          <label class="col-span-2 grid gap-1 text-xs"
            >Label<input
              v-model="state.label"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Size<select
              v-model="state.size"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in sizes" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Variant<select
              v-model="state.variant"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in variants" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Severity<select
              v-model="state.severity"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in severities" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="#7c3aed"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slot default</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.defaultSlot" type="checkbox" /> Usar contenido
            personalizado</label
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
