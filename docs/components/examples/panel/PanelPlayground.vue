<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Panel } from '@/components/ui/Panel'
import { Icon } from '@/components/ui/Icon'
import ComponentPlayground from '../../ComponentPlayground.vue'

const initial = {
  label: 'Detalles del pedido',
  variant: 'soft',
  severity: 'primary',
  color: '',
  open: false,
  collapsible: true,
  icon: true,
  ui: false,
  labelSlot: false,
  iconSlot: false,
  arrowsSlot: false,
}
const state = ref({ ...initial })
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()
function generateCode() {
  const props = [
    `label="${state.value.label}"`,
    `variant="${state.value.variant}"`,
    `severity="${state.value.severity}"`,
    state.value.color && `color="${state.value.color}"`,
    state.value.open && 'open',
    !state.value.collapsible && ':collapsible="false"',
    state.value.icon && !state.value.iconSlot && `:icon="{ name: 'info' }"`,
    state.value.ui &&
      `:ui="{ label: () => ({ class: 'text-primary' }), content: () => ({ class: 'bg-muted/20' }) }"`,
  ].filter(Boolean)
  const slots = [
    state.value.iconSlot && '  <template #icon><Icon name="info" /></template>',
    state.value.labelSlot && '  <template #label><strong>Pedido personalizado</strong></template>',
    state.value.arrowsSlot &&
      `  <template #arrows="{ open }"><span>{{ open ? 'Cerrar' : 'Abrir' }}</span></template>`,
    '  <p class="text-sm">Contenido adicional del panel.</p>',
  ].filter(Boolean)
  return `<Panel\n  ${props.join('\n  ')}\n>\n${slots.join('\n')}\n</Panel>`
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Panel(?=[\s/>])/g, '<PlaygroundPanel')
        .replaceAll('</Panel>', '</PlaygroundPanel>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'PanelPlaygroundPreview',
        components: { PlaygroundPanel: Panel, Icon },
        render,
      }),
    )
    appliedCode.value = editorCode.value
    previewKey.value++
  } catch (error) {
    editorError.value = error instanceof Error ? error.message : String(error)
  }
}
function sync() {
  editorCode.value = generateCode()
  applyCode()
}
function reset() {
  state.value = { ...initial }
  sync()
}
watch(state, sync, { deep: true, immediate: true })
</script>
<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="PanelPlayground.vue"
    description="Configura el panel o edita su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center">
        <component :is="Preview" v-if="Preview" :key="previewKey" class="w-full max-w-xl" /></div
    ></template>
    <template #controls
      ><div class="grid gap-4">
        <label class="grid gap-1 text-xs"
          >Label<input
            v-model="state.label"
            class="rounded-md border bg-background px-3 py-2 text-sm"
        /></label>
        <fieldset class="grid gap-2">
          <legend class="text-sm font-semibold">Props</legend>
          <label><input v-model="state.open" type="checkbox" /> Open</label
          ><label><input v-model="state.collapsible" type="checkbox" /> Collapsible</label
          ><label><input v-model="state.icon" type="checkbox" /> Icon</label
          ><label><input v-model="state.ui" type="checkbox" /> UI personalizada</label>
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-2">
          <label class="grid gap-1 text-xs"
            >Variant<select
              v-model="state.variant"
              class="rounded-md border bg-background px-2 py-1"
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
              class="rounded-md border bg-background px-2 py-1"
            >
              <option>primary</option>
              <option>secondary</option>
              <option>warning</option>
              <option>success</option>
              <option>error</option>
            </select></label
          >
          <label class="col-span-2 grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="#7c3aed"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="text-sm font-semibold">Slots</legend>
          <label><input v-model="state.iconSlot" type="checkbox" /> icon</label
          ><label><input v-model="state.labelSlot" type="checkbox" /> label</label
          ><label><input v-model="state.arrowsSlot" type="checkbox" /> arrows</label>
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
