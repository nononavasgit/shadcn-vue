<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Empty } from '@/components/ui/Empty'
import { Icon } from '@/components/ui/Icon'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  label: 'No hay notificaciones',
  description: 'Cuando recibas una, aparecerá aquí.',
  mediaVariant: 'default',
  mediaSlot: true,
  defaultSlot: true,
  labelSlot: false,
  descriptionSlot: false,
  ui: false,
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
    state.value.mediaVariant !== 'default' && `media-variant="${state.value.mediaVariant}"`,
    state.value.ui &&
      `:ui="{ header: () => ({ class: 'rounded-lg border border-primary/30 p-3' }), content: () => ({ class: 'flex-row' }) }" class="border border-primary" data-state="empty" aria-label="Estado vacío"`,
  ].filter(Boolean)
  const slots = [
    state.value.mediaSlot && '  <template #media><Icon name="file" /></template>',
    state.value.labelSlot && '  <template #label><strong>Sin resultados</strong></template>',
    state.value.descriptionSlot &&
      '  <template #description><span>Prueba con otro término.</span></template>',
    state.value.defaultSlot &&
      '  <div class="flex flex-wrap justify-center gap-2"><button type="button" class="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">Crear elemento</button></div>',
  ].filter(Boolean)
  return slots.length
    ? `<Empty${props.length ? `\n  ${props.join('\n  ')}` : ''}>\n${slots.join('\n')}\n</Empty>`
    : `<Empty${props.length ? ` ${props.join(' ')}` : ''} />`
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({ name: 'EmptyPlaygroundPreview', components: { Empty, Icon }, render }),
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
    label: 'No hay notificaciones',
    description: 'Cuando recibas una, aparecerá aquí.',
    mediaVariant: 'default',
    mediaSlot: true,
    defaultSlot: true,
    labelSlot: false,
    descriptionSlot: false,
    ui: false,
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
    filename="EmptyPlayground.vue"
    description="Configura el estado vacío o edita directamente su template."
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
            >Label<input
              v-model="state.label"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Description<textarea
              v-model="state.description"
              rows="2"
              class="resize-none rounded-md border bg-background px-3 py-2 text-sm"
            /></label
          ><label class="grid gap-1 text-xs"
            >Media variant<select
              v-model="state.mediaVariant"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>default</option>
              <option>icon</option>
            </select></label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slots y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.mediaSlot" type="checkbox" /> media</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.defaultSlot" type="checkbox" /> default</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.labelSlot" type="checkbox" /> label</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.descriptionSlot" type="checkbox" /> description</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada (incluye atributos
            HTML)</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
