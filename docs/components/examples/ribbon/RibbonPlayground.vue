<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Card } from '@/components/ui/Card'
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  label: 'Nuevo',
  severity: 'primary',
  color: '',
  position: 'top-right',
  rotate: '',
  zIndex: '20',
  cardLabel: 'Producto destacado',
  cardDescription: 'Una cinta diagonal sobre la tarjeta.',
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function jsString(value: string) {
  return JSON.stringify(value)
}
function generateCode() {
  const item = [
    `label: ${jsString(state.value.label)}`,
    `severity: ${jsString(state.value.severity)}`,
    state.value.color && `color: ${jsString(state.value.color)}`,
    `position: ${jsString(state.value.position)}`,
    state.value.rotate && `rotate: ${state.value.rotate}`,
    state.value.zIndex !== '20' && `zIndex: ${state.value.zIndex}`,
  ].filter(Boolean)
  const attrs =
    state.value.attrs &&
    ' class="rounded-lg border" data-state="featured" aria-label="Producto destacado"'
  return `<Ribbon\n  :ribbons='[{ ${item.join(', ')} }]'${attrs ? `\n  ${attrs.trim()}` : ''}\n>\n  <Card\n    label="${state.value.cardLabel}"
    description="${state.value.cardDescription}"
    class="min-h-40"
  />
</Ribbon>`
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({ name: 'RibbonPlaygroundPreview', components: { Ribbon, Card }, render }),
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
    label: 'Nuevo',
    severity: 'primary',
    color: '',
    position: 'top-right',
    rotate: '',
    zIndex: '20',
    cardLabel: 'Producto destacado',
    cardDescription: 'Una cinta diagonal sobre la tarjeta.',
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
    filename="RibbonPlayground.vue"
    description="Configura la cinta sobre una Card o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center px-8">
        <component :is="Preview" v-if="Preview" :key="previewKey" class="w-full max-w-xl" /></div
    ></template>
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Ribbon</legend>
          <label class="grid gap-1 text-xs"
            >Label<input
              v-model="state.label"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Severity<select
              v-model="state.severity"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>primary</option>
              <option>secondary</option>
              <option>warning</option>
              <option>success</option>
              <option>error</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="#7c3aed"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <p v-if="state.color" class="text-xs text-muted-foreground">
            El color personalizado tiene prioridad sobre severity.
          </p>
          <label class="grid gap-1 text-xs"
            >Position<select
              v-model="state.position"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>top-right</option>
              <option>top-left</option>
              <option>bottom-right</option>
              <option>bottom-left</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Rotate<input
              v-model="state.rotate"
              type="number"
              placeholder="Según position"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >zIndex<input
              v-model="state.zIndex"
              type="number"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Card en el slot</legend>
          <label class="grid gap-1 text-xs"
            >Label<input
              v-model="state.cardLabel"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Description<input
              v-model="state.cardDescription"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
