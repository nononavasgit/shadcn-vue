<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Alert } from '@/components/ui/Alert'
import { Icon } from '@/components/ui/Icon'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  label: 'Cambios guardados',
  description: 'La operación se completó correctamente.',
  variant: 'soft',
  severity: 'success',
  color: '',
  icon: true,
  closable: false,
  decorative: false,
  ui: false,
  iconSlot: false,
  labelSlot: false,
  descriptionSlot: false,
  closeSlot: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref(0)
const previewKey = ref(0)
const Preview = shallowRef()

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}
function generateCode() {
  const props = [
    state.value.label && `label="${escapeAttribute(state.value.label)}"`,
    state.value.description && `description="${escapeAttribute(state.value.description)}"`,
    `variant="${state.value.variant}"`,
    `severity="${state.value.severity}"`,
    state.value.color && `color="${escapeAttribute(state.value.color)}"`,
    state.value.icon && !state.value.iconSlot && `:icon="{ name: 'info' }"`,
    state.value.closable && 'closable',
    state.value.decorative && 'decorative',
    state.value.ui &&
      `:ui="{ label: () => ({ class: 'uppercase tracking-wide' }), description: () => ({ class: 'italic' }) }"`,
    state.value.attrs && 'class="border-primary" data-state="active" aria-label="Estado activo"',
    '@close="handleClose"',
  ].filter(Boolean)
  const slots = [
    state.value.iconSlot && '  <template #icon><Icon name="info" class="size-4" /></template>',
    state.value.labelSlot &&
      '  <template #label><strong>Etiqueta personalizada</strong></template>',
    state.value.descriptionSlot &&
      '  <template #description><span>Descripción enriquecida</span></template>',
    state.value.closeSlot &&
      '  <template #close="{ close }"><button type="button" @click="close">Descartar</button></template>',
  ].filter(Boolean)
  return slots.length
    ? `<Alert\n  ${props.join('\n  ')}\n>\n${slots.join('\n')}\n</Alert>`
    : `<Alert\n  ${props.join('\n  ')}\n/>`
}
function handleClose() {
  eventLog.value++
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({
        name: 'AlertPlaygroundPreview',
        components: { Alert, Icon },
        setup: () => ({ handleClose }),
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
    label: 'Cambios guardados',
    description: 'La operación se completó correctamente.',
    variant: 'soft',
    severity: 'success',
    color: '',
    icon: true,
    closable: false,
    decorative: false,
    ui: false,
    iconSlot: false,
    labelSlot: false,
    descriptionSlot: false,
    closeSlot: false,
    attrs: false,
  }
  eventLog.value = 0
  syncFromControls()
}
watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="AlertPlayground.vue"
    description="Configura el alert o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center">
        <div class="grid w-full max-w-xl gap-4">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <p v-if="eventLog" class="text-center text-sm text-muted-foreground">
            Evento close emitido {{ eventLog }} vez.
          </p>
        </div>
      </div></template
    >
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
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.icon" type="checkbox" /> Icon</label
          >
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Apariencia</legend>
          <label class="grid gap-1 text-xs"
            >Variant<select
              v-model="state.variant"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>solid</option>
              <option>outline</option>
              <option>plain</option>
              <option>subtle</option>
              <option>soft</option>
            </select></label
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
          ><label class="col-span-2 grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="#7c3aed"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Props, slots y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.closable" type="checkbox" /> Closable</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.decorative" type="checkbox" /> Decorative</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.iconSlot" type="checkbox" /> Slot icon</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.labelSlot" type="checkbox" /> Slot label</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.descriptionSlot" type="checkbox" /> Slot description</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.closeSlot" type="checkbox" /> Slot close</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
