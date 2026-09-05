<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Tabs as BaseTabs } from '@/components/ui/Tabs'
import ComponentPlayground from '../../ComponentPlayground.vue'

const orientations = ['horizontal', 'vertical']
const activationModes = ['automatic', 'manual']
const variants = ['default', 'line']
const icons = ['', 'check', 'file', 'folder', 'info', 'save', 'user']
const slotModes = ['none', 'general', 'individual']

function createTabs() {
  return [
    {
      slot: 'overview',
      value: 'overview',
      label: 'Resumen',
      icon: 'folder',
      trailingIcon: '',
      disabled: false,
      forceMount: false,
    },
    {
      slot: 'analytics',
      value: 'analytics',
      label: 'Analítica',
      icon: 'file',
      trailingIcon: '',
      disabled: false,
      forceMount: false,
    },
    {
      slot: 'notifications',
      value: 'notifications',
      label: 'Notificaciones',
      icon: 'info',
      trailingIcon: '',
      disabled: false,
      forceMount: false,
    },
  ]
}

const state = ref({
  value: 'overview',
  orientation: 'horizontal',
  activationMode: 'automatic',
  variant: 'default',
  loop: true,
  unmountOnHide: true,
  tabs: createTabs(),
  ui: false,
  attrs: false,
  triggerSlot: 'none',
  leadingSlot: 'none',
  labelSlot: 'none',
  trailingSlot: 'none',
  contentSlot: 'individual',
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref('')
const previewValue = ref('overview')
const previewKey = ref(0)
const Preview = shallowRef()

function serializeTabs() {
  const tabs = state.value.tabs.map((tab) => ({
    slot: tab.slot,
    value: tab.value,
    ...(tab.label ? { label: tab.label } : {}),
    ...(tab.icon ? { icon: { name: tab.icon } } : {}),
    ...(tab.trailingIcon ? { trailingIcon: { name: tab.trailingIcon } } : {}),
    disabled: tab.disabled,
    forceMount: tab.forceMount,
  }))
  return JSON.stringify(tabs)
    .replaceAll('&', '&amp;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}
function getSlotName(index: number) {
  return String(state.value.tabs[index]?.slot || index + 1).replace(/[^a-zA-Z0-9_-]/g, '-')
}
function generateSlots() {
  const slots: string[] = []
  if (state.value.triggerSlot === 'general')
    slots.push(
      `  <template #trigger="{ tabs }"><span class="text-sm">Secciones ({{ tabs.length }})</span></template>`,
    )
  else if (state.value.triggerSlot === 'individual')
    slots.push(
      `  <template #trigger-${getSlotName(0)}="{ tab }"><span class="font-semibold">{{ tab.label }} principal</span></template>`,
    )
  if (state.value.leadingSlot === 'general')
    slots.push(`  <template #leading><span aria-hidden="true">•</span></template>`)
  else if (state.value.leadingSlot === 'individual')
    slots.push(
      `  <template #leading-${getSlotName(0)}><span aria-hidden="true">★</span></template>`,
    )
  if (state.value.labelSlot === 'general')
    slots.push(`  <template #label><strong>Etiqueta personalizada</strong></template>`)
  else if (state.value.labelSlot === 'individual')
    slots.push(
      `  <template #label-${getSlotName(1)}><span class="font-semibold">Analítica personalizada</span></template>`,
    )
  if (state.value.trailingSlot === 'general')
    slots.push(`  <template #trailing><span aria-hidden="true">→</span></template>`)
  else if (state.value.trailingSlot === 'individual')
    slots.push(
      `  <template #trailing-${getSlotName(2)}><span aria-hidden="true">!</span></template>`,
    )
  if (state.value.contentSlot === 'general')
    slots.push(
      `  <template #content="{ tabs }"><p class="text-sm">Contenido para {{ tabs.length }} pestañas.</p></template>`,
    )
  else if (state.value.contentSlot === 'individual')
    slots.push(
      ...state.value.tabs.map(
        (_, index) => `  <template #content-${getSlotName(index)}="{ tab }">
    <p class="text-sm">Contenido personalizado para {{ tab.label }}.</p>
  </template>`,
      ),
    )
  return slots
}
function generateCode() {
  const props = [
    'v-model:value="value"',
    `orientation="${state.value.orientation}"`,
    `activation-mode="${state.value.activationMode}"`,
    `variant="${state.value.variant}"`,
    `:loop="${state.value.loop}"`,
    `:unmount-on-hide="${state.value.unmountOnHide}"`,
    `:tabs='${serializeTabs()}'`,
    state.value.ui &&
      `:ui="{ root: () => ({ class: 'rounded-xl border p-4' }), list: () => ({ class: 'shadow-sm' }), contentWrapper: () => ({ class: 'rounded-lg border bg-muted/20 p-4' }), trigger: ({ active }) => ({ class: active ? 'font-semibold' : undefined }), label: ({ active }) => ({ class: active ? 'text-primary' : undefined }), content: ({ active }) => ({ class: active ? 'animate-in fade-in-0' : undefined }) }"`,
    state.value.attrs && 'class="rounded-lg border p-3" data-state="ready" aria-label="Secciones"',
    '@update:value="handleUpdate"',
  ].filter(Boolean)
  const slots = generateSlots()
  const opening = `<Tabs\n  ${props.join('\n  ')}`
  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</Tabs>` : `${opening}\n/>`
}
function handleUpdate(value: string | number | undefined) {
  previewValue.value = String(value ?? '')
  eventLog.value = previewValue.value
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Tabs(?=[\s/>])/g, '<PlaygroundTabs')
        .replaceAll('</Tabs>', '</PlaygroundTabs>'),
    )
    previewValue.value = state.value.value
    Preview.value = markRaw(
      defineComponent({
        name: 'TabsPlaygroundPreview',
        components: { PlaygroundTabs: BaseTabs },
        setup: () => ({ value: previewValue, handleUpdate }),
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
    unmountOnHide: true,
    tabs: createTabs(),
    ui: false,
    attrs: false,
    triggerSlot: 'none',
    leadingSlot: 'none',
    labelSlot: 'none',
    trailingSlot: 'none',
    contentSlot: 'individual',
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
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8">
        <div class="grid w-full max-w-2xl gap-4">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Pestaña activa: {{ previewValue }}</span
            ><span v-if="eventLog">update:value: {{ eventLog }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Value<select
              v-model="state.value"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="tab in state.tabs" :key="tab.slot" :value="tab.value">
                {{ tab.label || tab.value }}
              </option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Orientation<select
              v-model="state.orientation"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in orientations" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Activation mode<select
              v-model="state.activationMode"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in activationModes" :key="option">{{ option }}</option>
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
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.loop" type="checkbox" /> Loop</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.unmountOnHide" type="checkbox" /> Unmount on hide</label
          >
          <label class="col-span-2 flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          >
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Tabs</legend>
          <div v-for="tab in state.tabs" :key="tab.slot" class="grid gap-2 rounded-md border p-3">
            <p class="text-xs font-semibold text-muted-foreground">{{ tab.value }}</p>
            <label class="grid gap-1 text-xs"
              >Slot<input
                v-model="tab.slot"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="grid gap-1 text-xs"
              >Value<input
                v-model="tab.value"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="grid gap-1 text-xs"
              >Label<input
                v-model="tab.label"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="grid gap-1 text-xs"
              >Icon<select
                v-model="tab.icon"
                class="rounded-md border bg-background px-2 py-2 text-sm"
              >
                <option v-for="icon in icons" :key="icon" :value="icon">
                  {{ icon || 'none' }}
                </option>
              </select></label
            >
            <label class="grid gap-1 text-xs"
              >Trailing icon<select
                v-model="tab.trailingIcon"
                class="rounded-md border bg-background px-2 py-2 text-sm"
              >
                <option v-for="icon in icons" :key="icon" :value="icon">
                  {{ icon || 'none' }}
                </option>
              </select></label
            >
            <div class="flex flex-wrap gap-3">
              <label class="flex items-center gap-2 text-xs"
                ><input v-model="tab.disabled" type="checkbox" /> Disabled</label
              ><label class="flex items-center gap-2 text-xs"
                ><input v-model="tab.forceMount" type="checkbox" /> Force mount</label
              >
            </div>
          </div>
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slots</legend>
          <label class="grid gap-1 text-xs"
            >Trigger<select
              v-model="state.triggerSlot"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in slotModes" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Leading<select
              v-model="state.leadingSlot"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in slotModes" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Label<select
              v-model="state.labelSlot"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in slotModes" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Trailing<select
              v-model="state.trailingSlot"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in slotModes" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Content<select
              v-model="state.contentSlot"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in slotModes" :key="option">{{ option }}</option>
            </select></label
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
