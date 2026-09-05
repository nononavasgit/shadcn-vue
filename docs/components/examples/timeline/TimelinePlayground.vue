<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Timeline as BaseTimeline } from '@/components/ui/Timeline'
import ComponentPlayground from '../../ComponentPlayground.vue'

const orientations = ['vertical', 'horizontal']
const alignments = ['left', 'right', 'alternate']
const sizes = ['sm', 'md', 'lg', 'xl']
const severities = ['primary', 'secondary', 'warning', 'success', 'error']
const icons = ['', 'check', 'search', 'upload', 'info', 'clock', 'x']
const slotModes = ['none', 'general', 'individual']

function createItems() {
  return [
    {
      value: 'created',
      slot: 'order-created',
      label: 'Pedido creado',
      description: 'Recibimos el pedido y comenzamos a prepararlo.',
      icon: 'check',
    },
    {
      value: 'review',
      slot: 'order-review',
      label: 'En revisión',
      description: 'Estamos verificando los datos del envío.',
      icon: 'search',
    },
    {
      value: 'delivery',
      slot: 'order-delivery',
      label: 'En camino',
      description: 'El paquete saldrá del almacén próximamente.',
      icon: 'upload',
    },
  ]
}

const state = ref({
  value: 'review',
  items: createItems(),
  orientation: 'vertical',
  align: 'right',
  sizeIndicator: 'md',
  color: '',
  severity: 'primary',
  reverse: false,
  ui: false,
  attrs: false,
  headerSlot: 'none',
  labelSlot: 'none',
  descriptionSlot: 'none',
  indicatorSlot: 'none',
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewValue = ref<string | number>('review')
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
  return [`  <template #${name}-${getSlotName(1)}="{ item }">${content}</template>`]
}

function generateSlots() {
  const slots: string[] = []
  if (state.value.headerSlot === 'general')
    slots.push(
      `  <template #header="{ item }"><strong class="text-primary">{{ item.label }} · cabecera</strong></template>`,
    )
  slots.push(
    ...getIndividualSlot(
      state.value.headerSlot,
      'header',
      '<strong class="text-primary">{{ item.label }} personalizada</strong>',
    ),
  )
  if (state.value.labelSlot === 'general')
    slots.push(
      `  <template #label="{ item }"><span class="font-semibold">Evento: {{ item.label }}</span></template>`,
    )
  slots.push(
    ...getIndividualSlot(
      state.value.labelSlot,
      'label',
      '<span class="font-semibold text-primary">{{ item.label }} seleccionado</span>',
    ),
  )
  if (state.value.descriptionSlot === 'general')
    slots.push(
      `  <template #description="{ item }"><span class="text-sm text-muted-foreground">Detalle: {{ item.description }}</span></template>`,
    )
  slots.push(
    ...getIndividualSlot(
      state.value.descriptionSlot,
      'description',
      '<span class="text-sm text-primary">{{ item.description }}</span>',
    ),
  )
  if (state.value.indicatorSlot === 'general')
    slots.push(
      `  <template #indicator="{ index }"><span aria-hidden="true">{{ index + 1 }}</span></template>`,
    )
  slots.push(
    ...getIndividualSlot(
      state.value.indicatorSlot,
      'indicator',
      '<span aria-hidden="true" class="font-bold">R</span>',
    ),
  )
  return slots
}

function generateCode() {
  const props = [
    'v-model:value="value"',
    `:items='${serializeItems()}'`,
    `orientation="${state.value.orientation}"`,
    `align="${state.value.align}"`,
    `size-indicator="${state.value.sizeIndicator}"`,
    state.value.color && `color="${state.value.color}"`,
    `severity="${state.value.severity}"`,
    `:reverse="${state.value.reverse}"`,
    state.value.ui &&
      `:ui="{ root: () => ({ class: 'rounded-lg border p-4' }), item: ({ active }) => ({ class: active ? 'rounded-lg bg-muted/60' : undefined }), content: () => ({ class: 'gap-1' }), header: () => ({ class: 'tracking-wide' }), separator: ({ completed }) => ({ class: completed ? 'opacity-100' : 'opacity-60' }), indicator: ({ active }) => ({ class: active ? 'ring-2 ring-primary/30' : undefined }), label: () => ({ class: 'uppercase' }), description: () => ({ class: 'italic' }) }"`,
    state.value.attrs &&
      'class="border border-primary" data-state="ready" aria-label="Estado del pedido"',
    '@update:value="handleUpdate"',
  ].filter(Boolean)
  const slots = generateSlots()
  const opening = `<Timeline\n  ${props.join('\n  ')}`
  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</Timeline>` : `${opening}\n/>`
}

function handleUpdate(value: string | number) {
  previewValue.value = value
  eventLog.value = String(value)
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Timeline(?=[\s/>])/g, '<PlaygroundTimeline')
        .replaceAll('</Timeline>', '</PlaygroundTimeline>'),
    )
    previewValue.value = state.value.value
    Preview.value = markRaw(
      defineComponent({
        name: 'TimelinePlaygroundPreview',
        components: { PlaygroundTimeline: BaseTimeline },
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
    value: 'review',
    items: createItems(),
    orientation: 'vertical',
    align: 'right',
    sizeIndicator: 'md',
    color: '',
    severity: 'primary',
    reverse: false,
    ui: false,
    attrs: false,
    headerSlot: 'none',
    labelSlot: 'none',
    descriptionSlot: 'none',
    indicatorSlot: 'none',
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
    filename="TimelinePlayground.vue"
    description="Configura la secuencia, sus estados y los slots; selecciona un evento desde los controles de la vista previa."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8 py-6">
        <div class="grid w-full max-w-3xl gap-4">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <button
              v-for="item in state.items"
              :key="item.value"
              type="button"
              class="rounded-md border px-2 py-1"
              @click="previewValue = item.value"
            >
              {{ item.label || item.value }}
            </button>
            <span class="text-muted-foreground">Valor actual: {{ previewValue }}</span>
            <span v-if="eventLog" class="text-muted-foreground">update:value: {{ eventLog }}</span>
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
              <option v-for="item in state.items" :key="item.value" :value="item.value">
                {{ item.label || item.value }}
              </option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Orientación<select
              v-model="state.orientation"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in orientations" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Alineación<select
              v-model="state.align"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in alignments" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Indicador<select
              v-model="state.sizeIndicator"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in sizes" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="#7c3aed"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Severity<select
              v-model="state.severity"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in severities" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.reverse" type="checkbox" /> Reverse</label
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
            <label class="col-span-2 grid gap-1 text-xs"
              >Icono<select
                v-model="item.icon"
                class="rounded-md border bg-background px-2 py-2 text-sm"
              >
                <option v-for="icon in icons" :key="icon" :value="icon">
                  {{ icon || 'none' }}
                </option>
              </select></label
            >
          </div>
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slots</legend>
          <label
            v-for="slot in ['header', 'label', 'description', 'indicator']"
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
