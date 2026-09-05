<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { FieldSet } from '@/components/ui/FieldSet'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  legend: 'Datos de contacto',
  description: '¿Cómo podemos comunicarnos contigo?',
  legendVariant: 'legend',
  defaultSlot: true,
  legendSlot: false,
  descriptionSlot: false,
  ui: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}
function generateCode() {
  const props = [
    state.value.legend && `legend="${escapeAttribute(state.value.legend)}"`,
    state.value.description && `description="${escapeAttribute(state.value.description)}"`,
    state.value.legendVariant !== 'legend' && `legend-variant="${state.value.legendVariant}"`,
    state.value.ui &&
      `:ui="{ legend: () => ({ class: 'text-primary' }), group: () => ({ class: 'gap-3 rounded-md border border-dashed p-3' }) }"`,
    state.value.attrs &&
      'class="rounded-lg border p-4" data-state="ready" aria-label="Datos de contacto"',
  ].filter(Boolean)
  const slots = [
    state.value.legendSlot &&
      '  <template #legend><span class="text-primary">Preferencias de notificación</span></template>',
    state.value.descriptionSlot &&
      '  <template #description><span>Elige cómo quieres recibir las novedades.</span></template>',
    state.value.defaultSlot &&
      '  <label class="grid gap-1.5 text-sm"><span class="font-medium">Correo electrónico</span><input type="email" placeholder="tu@ejemplo.com" class="h-9 rounded-md border bg-background px-3 text-sm" /></label>',
  ].filter(Boolean)
  return slots.length
    ? `<FieldSet${props.length ? `\n  ${props.join('\n  ')}` : ''}>\n${slots.join('\n')}\n</FieldSet>`
    : `<FieldSet${props.length ? ` ${props.join(' ')}` : ''} />`
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({ name: 'FieldSetPlaygroundPreview', components: { FieldSet }, render }),
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
    legend: 'Datos de contacto',
    description: '¿Cómo podemos comunicarnos contigo?',
    legendVariant: 'legend',
    defaultSlot: true,
    legendSlot: false,
    descriptionSlot: false,
    ui: false,
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
    filename="FieldSetPlayground.vue"
    description="Configura el grupo de campos o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center">
        <component :is="Preview" v-if="Preview" :key="previewKey" class="w-full max-w-xl" /></div
    ></template>
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Contenido</legend>
          <label class="grid gap-1 text-xs"
            >Legend<input
              v-model="state.legend"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Description<textarea
              v-model="state.description"
              rows="2"
              class="resize-none rounded-md border bg-background px-3 py-2 text-sm"
            /></label
          ><label class="grid gap-1 text-xs"
            >Legend variant<select
              v-model="state.legendVariant"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>legend</option>
              <option>label</option>
            </select></label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slots y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.defaultSlot" type="checkbox" /> default</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.legendSlot" type="checkbox" /> legend</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.descriptionSlot" type="checkbox" /> description</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
