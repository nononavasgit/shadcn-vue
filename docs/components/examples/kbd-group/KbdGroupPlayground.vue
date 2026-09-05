<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Kbd, KbdGroup as BaseKbdGroup } from '@/components/ui/Kbd'
import ComponentPlayground from '../../ComponentPlayground.vue'

const sizes = ['sm', 'md', 'lg']
const variants = ['solid', 'outline', 'soft', 'subtle']
const severities = ['primary', 'secondary', 'warning', 'success', 'error']

function createKeys() {
  return [
    { label: 'Ctrl', size: 'md', variant: 'soft', severity: 'secondary' },
    { label: 'S', size: 'md', variant: 'soft', severity: 'secondary' },
  ]
}

const state = ref({
  keys: createKeys(),
  separator: '+',
  ariaLabel: 'Atajo para guardar',
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function serializeKey(key: (typeof state.value.keys)[number]) {
  return `<Kbd label="${key.label}" size="${key.size}" variant="${key.variant}" severity="${key.severity}" />`
}

function generateCode() {
  const props = [
    `aria-label="${state.value.ariaLabel}"`,
    state.value.attrs && 'class="rounded-md border p-2" data-state="ready"',
  ].filter(Boolean)
  const children = state.value.keys
    .map((key, index) =>
      index
        ? `  <span class="text-muted-foreground">${state.value.separator}</span>\n  ${serializeKey(key)}`
        : `  ${serializeKey(key)}`,
    )
    .join('\n')
  return `<KbdGroup\n  ${props.join('\n  ')}\n>\n${children}\n</KbdGroup>`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<KbdGroup(?=[\s/>])/g, '<PlaygroundKbdGroup')
        .replaceAll('</KbdGroup>', '</PlaygroundKbdGroup>')
        .replace(/<Kbd(?=[\s/>])/g, '<PlaygroundKbd')
        .replaceAll('</Kbd>', '</PlaygroundKbd>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'KbdGroupPlaygroundPreview',
        components: { PlaygroundKbdGroup: BaseKbdGroup, PlaygroundKbd: Kbd },
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
    keys: createKeys(),
    separator: '+',
    ariaLabel: 'Atajo para guardar',
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
    filename="KbdGroupPlayground.vue"
    description="Combina teclas Kbd para representar un atajo completo."
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
          <legend class="mb-1 text-sm font-semibold">Grupo</legend>
          <label class="grid gap-1 text-xs"
            >Separador<input
              v-model="state.separator"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Aria label<input
              v-model="state.ariaLabel"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> class, data-state</label
          >
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Teclas</legend>
          <div
            v-for="(key, index) in state.keys"
            :key="index"
            class="grid grid-cols-2 gap-2 rounded-md border p-3"
          >
            <label class="col-span-2 grid gap-1 text-xs"
              >Label<input
                v-model="key.label"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="grid gap-1 text-xs"
              >Size<select
                v-model="key.size"
                class="rounded-md border bg-background px-2 py-2 text-sm"
              >
                <option v-for="option in sizes" :key="option">{{ option }}</option>
              </select></label
            >
            <label class="grid gap-1 text-xs"
              >Variant<select
                v-model="key.variant"
                class="rounded-md border bg-background px-2 py-2 text-sm"
              >
                <option v-for="option in variants" :key="option">{{ option }}</option>
              </select></label
            >
            <label class="col-span-2 grid gap-1 text-xs"
              >Severity<select
                v-model="key.severity"
                class="rounded-md border bg-background px-2 py-2 text-sm"
              >
                <option v-for="option in severities" :key="option">{{ option }}</option>
              </select></label
            >
          </div>
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
