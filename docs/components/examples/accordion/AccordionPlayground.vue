<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Accordion as BaseAccordion } from '@/components/ui/Accordion'
import ComponentPlayground from '../../ComponentPlayground.vue'

const types = ['single', 'multiple']
const icons = ['', 'user', 'info', 'warning', 'folder', 'star', 'check']
const slotModes = ['none', 'general', 'individual']
const dropdownSlotModes = ['none', 'general']

function createItems() {
  return [
    {
      value: 'account',
      slot: 'account',
      label: 'Account settings',
      description: 'Manage your profile, password and notification preferences.',
      icon: 'user',
      disabled: false,
      unmountOnHide: false,
    },
    {
      value: 'security',
      slot: 'security',
      label: 'Security',
      description: 'Review your recent activity and manage security options.',
      icon: 'info',
      disabled: false,
      unmountOnHide: true,
    },
    {
      value: 'billing',
      slot: 'billing',
      label: 'Billing',
      description: 'Update your payment details and view your invoices.',
      icon: 'warning',
      disabled: false,
      unmountOnHide: true,
    },
  ]
}

const state = ref({
  type: 'single',
  value: 'account' as string | string[],
  collapsible: true,
  disabled: false,
  unmountOnHide: true,
  items: createItems(),
  iconDropDownOpen: 'minus',
  iconDropDownClose: 'plus',
  ui: false,
  attrs: false,
  triggerSlot: 'none',
  leadingSlot: 'none',
  labelSlot: 'none',
  contentSlot: 'none',
  iconDropdownSlot: 'none',
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewValue = ref<string | string[] | undefined>('account')
const eventLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function serializeItems() {
  const items = state.value.items.map((item) => ({
    value: item.value,
    ...(item.slot ? { slot: item.slot } : {}),
    ...(item.label ? { label: item.label } : {}),
    ...(item.description ? { description: item.description } : {}),
    ...(item.icon ? { icon: { name: item.icon } } : {}),
    disabled: item.disabled,
    unmountOnHide: item.unmountOnHide,
  }))
  return JSON.stringify(items)
    .replaceAll('&', '&amp;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function getSlotName(index: number) {
  return String(
    state.value.items[index]?.slot || state.value.items[index]?.value || index + 1,
  ).replace(/[^a-zA-Z0-9_-]/g, '-')
}

function getIndividualSlot(mode: string, name: string, content: string) {
  if (mode !== 'individual') return []
  return [`  <template #${name}-${getSlotName(0)}="{ item, open }">${content}</template>`]
}

function generateSlots() {
  const slots: string[] = []
  if (state.value.triggerSlot === 'general')
    slots.push(
      `  <template #trigger="{ item, open }"><span>{{ item.label }} · {{ open ? 'Abierto' : 'Cerrado' }}</span></template>`,
    )
  slots.push(
    ...getIndividualSlot(
      state.value.triggerSlot,
      'trigger',
      '<strong>{{ item.label }} personalizado</strong>',
    ),
  )
  if (state.value.leadingSlot === 'general')
    slots.push(
      `  <template #leading="{ open }"><span aria-hidden="true">{{ open ? '★' : '☆' }}</span></template>`,
    )
  slots.push(
    ...getIndividualSlot(state.value.leadingSlot, 'leading', '<span aria-hidden="true">◆</span>'),
  )
  if (state.value.labelSlot === 'general')
    slots.push(
      `  <template #label="{ item, index }"><span>{{ index + 1 }}. {{ item.label }}</span></template>`,
    )
  slots.push(
    ...getIndividualSlot(
      state.value.labelSlot,
      'label',
      '<span class="font-semibold">{{ item.label }} destacado</span>',
    ),
  )
  if (state.value.contentSlot === 'general')
    slots.push(
      `  <template #content="{ item }"><p class="text-sm">Contenido: {{ item.description }}</p></template>`,
    )
  slots.push(
    ...getIndividualSlot(
      state.value.contentSlot,
      'content',
      '<p class="text-sm">Contenido personalizado para {{ item.label }}.</p>',
    ),
  )
  if (state.value.iconDropdownSlot === 'general')
    slots.push(
      `  <template #iconDropdown="{ open }"><span aria-hidden="true">{{ open ? '−' : '+' }}</span></template>`,
    )
  return slots
}

function generateCode() {
  const props = [
    'v-model:value="value"',
    `type="${state.value.type}"`,
    `:items='${serializeItems()}'`,
    `:collapsible="${state.value.collapsible}"`,
    `:disabled="${state.value.disabled}"`,
    `:unmount-on-hide="${state.value.unmountOnHide}"`,
    `:icon-drop-down-open="{ name: '${state.value.iconDropDownOpen}' }"`,
    `:icon-drop-down-close="{ name: '${state.value.iconDropDownClose}' }"`,
    state.value.ui &&
      `:ui="{ item: ({ open }) => ({ class: open ? 'border-primary' : undefined }), trigger: ({ open }) => ({ class: open ? 'text-primary' : undefined }), content: ({ first }) => ({ 'data-first': first ? 'true' : 'false' }) }"`,
    state.value.attrs &&
      'class="rounded-lg border p-4" data-state="ready" aria-label="Preferencias"',
    '@update:value="handleUpdate"',
  ].filter(Boolean)
  const slots = generateSlots()
  const opening = `<Accordion\n  ${props.join('\n  ')}`
  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</Accordion>` : `${opening}\n/>`
}

function handleUpdate(value: string | string[] | undefined) {
  previewValue.value = value
  eventLog.value = Array.isArray(value) ? value.join(', ') : String(value ?? 'cerrado')
}

function syncPreviewValue() {
  previewValue.value =
    state.value.type === 'multiple'
      ? Array.isArray(state.value.value)
        ? state.value.value
        : [state.value.value]
      : Array.isArray(state.value.value)
        ? state.value.value[0]
        : state.value.value
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Accordion(?=[\s/>])/g, '<PlaygroundAccordion')
        .replaceAll('</Accordion>', '</PlaygroundAccordion>'),
    )
    syncPreviewValue()
    Preview.value = markRaw(
      defineComponent({
        name: 'AccordionPlaygroundPreview',
        components: { PlaygroundAccordion: BaseAccordion },
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
  if (state.value.type === 'multiple' && !Array.isArray(state.value.value))
    state.value.value = [state.value.value]
  if (state.value.type === 'single' && Array.isArray(state.value.value))
    state.value.value = state.value.value[0] || ''
  editorCode.value = generateCode()
  applyCode()
}

function reset() {
  state.value = {
    type: 'single',
    value: 'account',
    collapsible: true,
    disabled: false,
    unmountOnHide: true,
    items: createItems(),
    iconDropDownOpen: 'minus',
    iconDropDownClose: 'plus',
    ui: false,
    attrs: false,
    triggerSlot: 'none',
    leadingSlot: 'none',
    labelSlot: 'none',
    contentSlot: 'none',
    iconDropdownSlot: 'none',
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
    filename="AccordionPlayground.vue"
    description="Configura el acordeón, sus items y slots; abre y cierra las secciones directamente en la vista previa."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8 py-6">
        <div class="grid w-full max-w-2xl gap-4">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <div class="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span
              >Valor actual:
              {{
                Array.isArray(previewValue) ? previewValue.join(', ') : previewValue || 'cerrado'
              }}</span
            >
            <span v-if="eventLog">update:value: {{ eventLog }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Type<select
              v-model="state.type"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in types" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Value<select
              v-model="state.value"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="item in state.items" :key="item.value" :value="item.value">
                {{ item.label || item.value }}
              </option>
            </select></label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.collapsible" type="checkbox" /> Collapsible</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.unmountOnHide" type="checkbox" /> Unmount on hide</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          >
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Items</legend>
          <div
            v-for="item in state.items"
            :key="item.value"
            class="grid grid-cols-2 gap-2 rounded-md border p-3"
          >
            <label class="grid gap-1 text-xs"
              >Value<input
                v-model="item.value"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="grid gap-1 text-xs"
              >Slot<input
                v-model="item.slot"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="col-span-2 grid gap-1 text-xs"
              >Label<input
                v-model="item.label"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="col-span-2 grid gap-1 text-xs"
              >Descripción<input
                v-model="item.description"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="grid gap-1 text-xs"
              >Icono<select
                v-model="item.icon"
                class="rounded-md border bg-background px-2 py-2 text-sm"
              >
                <option v-for="icon in icons" :key="icon" :value="icon">
                  {{ icon || 'none' }}
                </option>
              </select></label
            >
            <div class="grid gap-2 pt-1">
              <label class="flex items-center gap-2 text-xs"
                ><input v-model="item.disabled" type="checkbox" /> Disabled</label
              >
              <label class="flex items-center gap-2 text-xs"
                ><input v-model="item.unmountOnHide" type="checkbox" /> Unmount</label
              >
            </div>
          </div>
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Iconos de apertura</legend>
          <label class="grid gap-1 text-xs"
            >Abierto<input
              v-model="state.iconDropDownOpen"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Cerrado<input
              v-model="state.iconDropDownClose"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slots</legend>
          <label
            v-for="slot in ['trigger', 'leading', 'label', 'content']"
            :key="slot"
            class="grid gap-1 text-xs"
          >
            {{ slot
            }}<select
              v-model="state[`${slot}Slot`]"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in slotModes" :key="option">{{ option }}</option>
            </select>
          </label>
          <label class="grid gap-1 text-xs"
            >iconDropdown<select
              v-model="state.iconDropdownSlot"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in dropdownSlotModes" :key="option">{{ option }}</option>
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
