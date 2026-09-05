<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Tabs } from '@/components/ui/Tabs'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  value: 'overview',
  orientation: 'horizontal',
  activationMode: 'automatic',
  variant: 'default',
  loop: true,
  unmountOnHide: false,
  disabledTab: false,
  ui: false,
  attrs: false,
  triggerSlot: false,
  leadingSlot: false,
  labelSlot: false,
  trailingSlot: false,
  contentSlot: true,
  dynamicSlots: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const props = [
    'v-model:value="value"',
    `:tabs="[{ slot: 'overview', value: 'overview', label: 'Overview', icon: { name: 'folder' } }, { slot: 'analytics', value: 'analytics', label: 'Analytics', icon: { name: 'fileText' } }, { slot: 'notifications', value: 'notifications', label: 'Notifications', icon: { name: 'info' }, disabled: ${state.value.disabledTab} }]"`,
    state.value.orientation !== 'horizontal' && `orientation="${state.value.orientation}"`,
    state.value.activationMode !== 'automatic' && `activation-mode="${state.value.activationMode}"`,
    state.value.variant !== 'default' && `variant="${state.value.variant}"`,
    !state.value.loop && ':loop="false"',
    state.value.unmountOnHide && 'unmount-on-hide',
    state.value.ui &&
      `:ui="{ contentWrapper: () => ({ class: 'rounded-lg border bg-muted/20 p-4' }), trigger: ({ active }) => ({ class: active ? 'font-semibold' : '' }) }"`,
    state.value.attrs && 'class="rounded-lg border p-3" data-state="ready" aria-label="Secciones"',
    '@update:value="handleUpdate"',
  ].filter(Boolean)
  const slots = [
    state.value.triggerSlot &&
      '  <template #trigger="{ tabs }"><span>Secciones ({{ tabs.length }})</span></template>',
    state.value.leadingSlot && '  <template #leading><span aria-hidden="true">•</span></template>',
    state.value.labelSlot && '  <template #label><strong>Etiqueta</strong></template>',
    state.value.trailingSlot &&
      '  <template #trailing><span aria-hidden="true">→</span></template>',
    state.value.contentSlot &&
      '  <template #content="{ tabs }"><p class="text-sm">Contenido para {{ tabs.length }} pestañas.</p></template>',
    state.value.dynamicSlots &&
      '  <template #trigger-overview="{ tab }"><span class="font-semibold">{{ tab.label }} (principal)</span></template>',
    state.value.dynamicSlots &&
      '  <template #content-analytics="{ tab }"><p class="text-sm">Contenido personalizado para {{ tab.label }}.</p></template>',
  ].filter(Boolean)
  return `<Tabs\n  ${props.join('\n  ')}\n>${slots.length ? `\n${slots.join('\n')}\n` : ''}</Tabs>`
}
function handleUpdate(value: string | number | undefined) {
  eventLog.value = String(value ?? '')
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({
        name: 'TabsPlaygroundPreview',
        components: { Tabs },
        setup: () => ({ value: ref(state.value.value), handleUpdate }),
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
    value: 'overview',
    orientation: 'horizontal',
    activationMode: 'automatic',
    variant: 'default',
    loop: true,
    unmountOnHide: false,
    disabledTab: false,
    ui: false,
    attrs: false,
    triggerSlot: false,
    leadingSlot: false,
    labelSlot: false,
    trailingSlot: false,
    contentSlot: true,
    dynamicSlots: false,
  }
  eventLog.value = ''
  syncFromControls()
}
watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="TabsPlayground.vue"
    description="Configura las pestañas o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center px-8">
        <div :class="state.orientation === 'vertical' ? 'w-full max-w-xl' : 'w-full max-w-xl'">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
        </div>
        <p v-if="eventLog" class="mt-3 font-mono text-xs text-muted-foreground">
          update:value: {{ eventLog }}
        </p>
      </div></template
    >
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Value<select
              v-model="state.value"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>overview</option>
              <option>analytics</option>
              <option>notifications</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Orientation<select
              v-model="state.orientation"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>horizontal</option>
              <option>vertical</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Activation mode<select
              v-model="state.activationMode"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>automatic</option>
              <option>manual</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Variant<select
              v-model="state.variant"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>default</option>
              <option>line</option>
            </select></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.loop" type="checkbox" /> Loop</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.unmountOnHide" type="checkbox" /> Unmount on hide</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabledTab" type="checkbox" /> Deshabilitar Notifications</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">UI, slots y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.triggerSlot" type="checkbox" /> Slot trigger</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.leadingSlot" type="checkbox" /> Slot leading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.labelSlot" type="checkbox" /> Slot label</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.trailingSlot" type="checkbox" /> Slot trailing</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.contentSlot" type="checkbox" /> Slot content</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.dynamicSlots" type="checkbox" /> Slots dinámicos por item</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
