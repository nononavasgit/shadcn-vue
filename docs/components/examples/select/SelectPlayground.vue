<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Select as BaseSelect } from '@/components/ui/Select'
import ComponentPlayground from '../../ComponentPlayground.vue'

type SelectState = {
  value: string
  data: 'items' | 'groups' | 'long'
  disabled: boolean
  loading: boolean
  placeholder: string
  ui: boolean
  invalid: boolean
  loadingSlot: boolean
  valueSlot: boolean
  iconSlot: boolean
  itemSlot: boolean
  itemLeadingSlot: boolean
  itemLabelSlot: boolean
  indicatorSlot: boolean
  groupLabelSlot: boolean
  scrollUpSlot: boolean
  scrollDownSlot: boolean
  attrs: boolean
}

const initialState = (): SelectState => ({
  value: 'apple',
  data: 'items',
  disabled: false,
  loading: false,
  placeholder: 'Elige una opción',
  ui: false,
  invalid: false,
  loadingSlot: false,
  valueSlot: false,
  iconSlot: false,
  itemSlot: false,
  itemLeadingSlot: false,
  itemLabelSlot: false,
  indicatorSlot: false,
  groupLabelSlot: false,
  scrollUpSlot: false,
  scrollDownSlot: false,
  attrs: false,
})

const state = ref<SelectState>(initialState())
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

const items = [
  { value: 'apple', label: 'Manzana', icon: { name: 'info' } },
  { value: 'banana', label: 'Plátano', icon: { name: 'warning' } },
  { value: 'orange', label: 'Naranja', disabled: true },
  { value: 'help', label: 'Ayuda', icon: { name: 'circleHelp' } },
]

const groups = [
  {
    label: 'Frutas',
    items: [
      { value: 'apple', label: 'Manzana' },
      { value: 'banana', label: 'Plátano' },
    ],
  },
  {
    label: 'Verduras',
    items: [
      { value: 'carrot', label: 'Zanahoria' },
      { value: 'pepper', label: 'Pimiento' },
    ],
  },
]

const longItems = Array.from({ length: 24 }, (_, index) => ({
  value: index + 1,
  label: `Opción larga ${index + 1}`,
}))

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function generateSlots() {
  const slots: string[] = []

  if (state.value.loadingSlot)
    slots.push(
      '  <template #loading>',
      '    <span class="text-xs text-muted-foreground">Cargando opciones...</span>',
      '  </template>',
    )
  if (state.value.valueSlot)
    slots.push(
      '  <template #value="{ value }">',
      '    <span class="font-medium text-primary">Seleccionado: {{ value }}</span>',
      '  </template>',
    )
  if (state.value.iconSlot)
    slots.push(
      '  <template #icon>',
      '    <span class="text-xs text-primary" aria-hidden="true">⌄</span>',
      '  </template>',
    )
  if (state.value.itemSlot)
    slots.push(
      '  <template #item="{ item, selected }">',
      '    <span :class="selected ? \'font-semibold text-primary\' : undefined">',
      '      {{ item.label }}',
      '    </span>',
      '  </template>',
    )
  if (state.value.itemLeadingSlot)
    slots.push(
      '  <template #item-leading="{ item }">',
      '    <span class="size-2 rounded-full bg-primary" aria-hidden="true" />',
      '    <span class="sr-only">Opción {{ item.label }}</span>',
      '  </template>',
    )
  if (state.value.itemLabelSlot)
    slots.push(
      '  <template #item-label="{ item, selected }">',
      '    <span :class="selected ? \'font-semibold text-primary\' : undefined">',
      '      {{ item.label }} (label)',
      '    </span>',
      '  </template>',
    )
  if (state.value.indicatorSlot)
    slots.push(
      '  <template #indicator>',
      '    <span class="text-primary" aria-hidden="true">✓</span>',
      '  </template>',
    )
  if (state.value.groupLabelSlot)
    slots.push(
      '  <template #group-label="{ group }">',
      '    <span class="font-semibold text-primary">{{ group.label }}</span>',
      '  </template>',
    )
  if (state.value.scrollUpSlot)
    slots.push(
      '  <template #scroll-up>',
      '    <span class="text-xs text-primary" aria-hidden="true">↑ Más arriba</span>',
      '  </template>',
    )
  if (state.value.scrollDownSlot)
    slots.push(
      '  <template #scroll-down>',
      '    <span class="text-xs text-primary" aria-hidden="true">↓ Más abajo</span>',
      '  </template>',
    )
  return slots
}

function generateCode() {
  const props = [
    'v-model:value="value"',
    `:disabled="${state.value.disabled}"`,
    `:loading="${state.value.loading}"`,
    `placeholder="${escapeAttribute(state.value.placeholder)}"`,
    state.value.data === 'groups'
      ? `:groups='${JSON.stringify(groups)}'`
      : `:items='${JSON.stringify(state.value.data === 'long' ? longItems : items)}'`,
    state.value.ui &&
      `:ui="{ root: () => ({ class: 'relative' }), trigger: ({ open }) => ({ class: open ? 'border-primary ring-3 ring-primary/20' : undefined }), value: () => ({ class: 'font-medium' }), icon: () => ({ class: 'text-primary' }), content: () => ({ class: 'border-primary' }), viewport: () => ({ class: 'p-1' }), scrollUpButton: () => ({ class: 'text-primary' }), scrollDownButton: () => ({ class: 'text-primary' }), group: ({ group }) => ({ class: group.label === 'Frutas' ? 'bg-muted/30' : undefined }), groupLabel: () => ({ class: 'font-semibold' }), item: ({ selected }) => ({ class: selected ? 'font-semibold' : undefined }), itemText: () => ({ class: 'text-sm' }), indicator: ({ selected }) => ({ class: selected ? 'text-primary' : undefined }) }"`,
    state.value.invalid && 'aria-invalid="true"',
    state.value.attrs && 'aria-label="Selecciona una opción"',
    '@update:value="handleValueUpdate"',
    '@update:open="handleOpenUpdate"',
  ].filter(Boolean)
  const slots = generateSlots()
  const opening = `<Select\n  ${props.join('\n  ')}`

  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</Select>` : `${opening}\n/>`
}

function handleValueUpdate(value: string | number | undefined) {
  eventLog.value = `update:value · ${value ?? 'undefined'}`
}

function handleOpenUpdate(open: boolean) {
  eventLog.value = `update:open · ${open ? 'true' : 'false'}`
}

function applyCode() {
  editorError.value = ''

  try {
    const render = compile(
      editorCode.value
        .replace(/<Select(?=[\s/>])/g, '<PlaygroundSelect')
        .replaceAll('</Select>', '</PlaygroundSelect>'),
    )

    Preview.value = markRaw(
      defineComponent({
        name: 'SelectPlaygroundPreview',
        components: { PlaygroundSelect: BaseSelect },
        setup: () => ({
          value: ref<string | number | undefined>(state.value.value || undefined),
          handleValueUpdate,
          handleOpenUpdate,
        }),
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
  state.value = initialState()
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
    filename="SelectPlayground.vue"
    description="Configura los datos, estados, grupos, slots y resolvers ui del selector."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-64 place-items-center px-8 py-6">
        <div class="w-full max-w-sm">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <p v-if="eventLog" class="mt-3 text-center text-sm text-muted-foreground">
            {{ eventLog }}
          </p>
        </div>
      </div>
    </template>

    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props y datos</legend>
          <label class="grid gap-1 text-xs"
            >Datos
            <select v-model="state.data" class="rounded-md border bg-background px-3 py-2 text-sm">
              <option value="items">Items con iconos</option>
              <option value="groups">Grupos</option>
              <option value="long">Lista larga</option>
            </select>
          </label>
          <label class="grid gap-1 text-xs"
            >Valor inicial
            <select v-model="state.value" class="rounded-md border bg-background px-3 py-2 text-sm">
              <option value="">Sin selección</option>
              <option value="apple">apple</option>
              <option value="banana">banana</option>
              <option value="help">help</option>
            </select>
          </label>
          <label class="grid gap-1 text-xs"
            >Placeholder<input
              v-model="state.placeholder"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.loading" type="checkbox" /> Loading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.invalid" type="checkbox" /> aria-invalid</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML</label
          >
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">UI</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> Personalización ui</label
          >
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slots</legend>
          <p class="text-xs text-muted-foreground">
            En items, los grupos no se muestran; en groups, items se ignora.
          </p>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.loadingSlot" type="checkbox" /> loading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.valueSlot" type="checkbox" /> value</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.iconSlot" type="checkbox" /> icon</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemSlot" type="checkbox" /> item</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemLeadingSlot" type="checkbox" /> item-leading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemLabelSlot" type="checkbox" /> item-label</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.indicatorSlot" type="checkbox" /> indicator</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.groupLabelSlot" type="checkbox" /> group-label</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.scrollUpSlot" type="checkbox" /> scroll-up</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.scrollDownSlot" type="checkbox" /> scroll-down</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
