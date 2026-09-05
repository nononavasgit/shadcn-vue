<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Card } from '@/components/ui/Card'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  label: 'Resumen semanal',
  description: 'Datos de los últimos siete días.',
  ui: false,
  defaultSlot: true,
  headerSlot: false,
  labelSlot: false,
  descriptionSlot: false,
  actionSlot: true,
  footerSlot: true,
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
    state.value.label && `label="${escapeAttribute(state.value.label)}"`,
    state.value.description && `description="${escapeAttribute(state.value.description)}"`,
    state.value.ui &&
      `:ui="{ label: () => ({ class: 'text-primary' }), content: () => ({ class: 'bg-muted/20 py-2' }), footer: () => ({ class: 'justify-between border-t pt-4' }) }"`,
    state.value.attrs &&
      'class="ring-2 ring-primary ring-offset-2" data-state="active" aria-label="Resumen semanal"',
  ].filter(Boolean)
  const slots = [
    state.value.headerSlot &&
      '  <template #header><strong>Encabezado personalizado</strong></template>',
    state.value.labelSlot &&
      '  <template #label><span class="text-primary">Equipo de trabajo</span></template>',
    state.value.descriptionSlot &&
      '  <template #description><span class="text-primary">Sincronizado hace un momento</span></template>',
    state.value.defaultSlot &&
      '  <ul class="grid gap-2 text-sm"><li>Nuevo acceso al proyecto</li><li>Perfil actualizado</li></ul>',
    state.value.actionSlot &&
      '  <template #action><button type="button" class="rounded-md border px-2 py-1 text-xs">Detalles</button></template>',
    state.value.footerSlot &&
      '  <template #footer><span class="text-xs text-muted-foreground">Actualizado hace 5 min</span></template>',
  ].filter(Boolean)
  return slots.length
    ? `<Card${props.length ? `\n  ${props.join('\n  ')}` : ''}>\n${slots.join('\n')}\n</Card>`
    : `<Card${props.length ? ` ${props.join(' ')}` : ''} />`
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({ name: 'CardPlaygroundPreview', components: { Card }, render }),
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
    label: 'Resumen semanal',
    description: 'Datos de los últimos siete días.',
    ui: false,
    defaultSlot: true,
    headerSlot: false,
    labelSlot: false,
    descriptionSlot: false,
    actionSlot: true,
    footerSlot: true,
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
    filename="CardPlayground.vue"
    description="Configura la tarjeta o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center p-2">
        <component :is="Preview" v-if="Preview" :key="previewKey" class="w-full max-w-md" />
      </div>
    </template>
    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Contenido</legend>
          <label class="grid gap-1 text-xs"
            >Label<input
              v-model="state.label"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Description<textarea
              v-model="state.description"
              rows="2"
              class="resize-none rounded-md border bg-background px-3 py-2 text-sm"
            />
          </label>
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Props y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slots</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.defaultSlot" type="checkbox" /> default</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.headerSlot" type="checkbox" /> header</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.labelSlot" type="checkbox" /> label</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.descriptionSlot" type="checkbox" /> description</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.actionSlot" type="checkbox" /> action</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.footerSlot" type="checkbox" /> footer</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
