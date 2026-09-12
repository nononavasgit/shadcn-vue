<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Listbox as BaseListbox } from '@/components/ui/Listbox'
import ComponentPlayground from '../../ComponentPlayground.vue'

type ListboxState = {
  value: string
  data: 'items' | 'groups' | 'long'
  disabled: boolean
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  severity: 'primary' | 'secondary' | 'error' | 'warning' | 'success'
  color: string
  multiple: boolean
  orientation: 'vertical' | 'horizontal'
  selectionBehavior: 'toggle' | 'replace'
  highlightOnHover: boolean
  required: boolean
  name: string
  search: string
  filter: boolean
  filterMode: 'contains' | 'startWith' | 'endWith'
  filterSensitivity: 'base' | 'accent' | 'case' | 'variant'
  ignoreFilter: boolean
  virtualize: boolean
  virtualizerEstimateSize: number
  virtualizerOverscan: number
  emptyText: string
  noResultsText: string
  ui: boolean
  invalid: boolean
  loadingSlot: boolean
  iconFilterSlot: boolean
  itemSlot: boolean
  itemLeadingSlot: boolean
  itemLabelSlot: boolean
  indicatorSlot: boolean
  groupLabelSlot: boolean
  attrs: boolean
}

const initialState = (): ListboxState => ({
  value: 'apple',
  data: 'items',
  disabled: false,
  size: 'md',
  severity: 'primary',
  color: '',
  multiple: false,
  orientation: 'vertical',
  selectionBehavior: 'toggle',
  highlightOnHover: true,
  required: false,
  name: 'frutas',
  search: '',
  filter: false,
  filterMode: 'contains',
  filterSensitivity: 'base',
  ignoreFilter: false,
  virtualize: false,
  virtualizerEstimateSize: 32,
  virtualizerOverscan: 12,
  emptyText: 'No hay opciones',
  noResultsText: 'Sin resultados',
  ui: false,
  invalid: false,
  loadingSlot: false,
  iconFilterSlot: false,
  itemSlot: false,
  itemLeadingSlot: false,
  itemLabelSlot: false,
  indicatorSlot: false,
  groupLabelSlot: false,
  attrs: false,
})

const state = ref<ListboxState>(initialState())
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

const longItems = Array.from({ length: 10000 }, (_, index) => ({
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
  if (state.value.iconFilterSlot)
    slots.push(
      '  <template #filter-leading>',
      '    <span class="text-primary" aria-hidden="true">⌕</span>',
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
      '  <template #item-indicator>',
      '    <span class="text-primary" aria-hidden="true">✓</span>',
      '  </template>',
    )
  if (state.value.groupLabelSlot)
    slots.push(
      '  <template #group-label="{ group }">',
      '    <span class="font-semibold text-primary">{{ group.label }}</span>',
      '  </template>',
    )
  return slots
}

function generateCode() {
  const props = [
    'v-model:value="value"',
    `:disabled="${state.value.disabled}"`,
    `size="${state.value.size}"`,
    `severity="${state.value.severity}"`,
    state.value.color && `color="${escapeAttribute(state.value.color)}"`,
    `:loading="${state.value.loading}"`,
    `:multiple="${state.value.multiple}"`,
    `orientation="${state.value.orientation}"`,
    `selection-behavior="${state.value.selectionBehavior}"`,
    `:highlight-on-hover="${state.value.highlightOnHover}"`,
    `:required="${state.value.required}"`,
    `name="${escapeAttribute(state.value.name)}"`,
    `v-model:search="search"`,
    `:filter="${state.value.filter}"`,
    `:filter-config="{ mode: '${state.value.filterMode}', sensitivity: '${state.value.filterSensitivity}' }"`,
    `:ignore-filter="${state.value.ignoreFilter}"`,
    `:virtualize="${state.value.virtualize}"`,
    `:virtualizer-config="{ estimateSize: ${state.value.virtualizerEstimateSize}, overscan: ${state.value.virtualizerOverscan} }"`,
    `:input-filter="{ placeholder: 'Buscar...' }"`,
    `:icon-filter="{ name: 'search' }"`,
    `empty-text="${escapeAttribute(state.value.emptyText)}"`,
    `no-results-text="${escapeAttribute(state.value.noResultsText)}"`,
    state.value.data === 'groups'
      ? `:groups='${JSON.stringify(groups)}'`
      : `:items='${JSON.stringify(state.value.data === 'long' ? longItems : items)}'`,
    state.value.ui &&
      `:ui="{ root: () => ({ class: 'relative' }), content: () => ({ class: 'border-primary' }), loading: () => ({ class: 'text-primary' }), group: ({ group }) => ({ class: group.label === 'Frutas' ? 'bg-muted/30' : undefined }), groupLabel: () => ({ class: 'font-semibold' }), item: ({ selected }) => ({ class: selected ? 'font-semibold' : undefined }), itemLabel: () => ({ class: 'text-sm' }), itemIndicator: ({ selected }) => ({ class: selected ? 'text-primary' : undefined }) }"`,
    state.value.invalid && 'aria-invalid="true"',
    state.value.attrs && 'aria-label="Selecciona una opción"',
    '@update:value="handleValueUpdate"',
    '@update:search="handleSearchUpdate"',
  ].filter(Boolean)
  const slots = generateSlots()
  const opening = `<Listbox\n  ${props.join('\n  ')}`

  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</Listbox>` : `${opening}\n/>`
}

function handleValueUpdate(value: string | number | undefined) {
  eventLog.value = `update:value · ${value ?? 'undefined'}`
}

function handleSearchUpdate(search: string) {
  eventLog.value = `update:search · ${search}`
}

function applyCode() {
  editorError.value = ''

  try {
    const render = compile(
      editorCode.value
        .replace(/<Listbox(?=[\s/>])/g, '<PlaygroundListbox')
        .replaceAll('</Listbox>', '</PlaygroundListbox>'),
    )

    Preview.value = markRaw(
      defineComponent({
        name: 'ListboxPlaygroundPreview',
        components: { PlaygroundListbox: BaseListbox },
        setup: () => ({
          value: ref<string | number | undefined>(state.value.value || undefined),
          search: ref(state.value.search),
          handleValueUpdate,
          handleSearchUpdate,
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
    filename="ListboxPlayground.vue"
    description="Configura los datos, estados, grupos, slots y resolvers ui del listbox."
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
            >Size<select v-model="state.size" class="rounded-md border bg-background px-3 py-2 text-sm">
              <option value="xs">xs</option>
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
              <option value="xl">xl</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Severity<select v-model="state.severity" class="rounded-md border bg-background px-3 py-2 text-sm">
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Color<input v-model="state.color" placeholder="#6366f1" class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          >
          <label class="grid gap-1 text-xs"
            >Valor inicial
            <select v-model="state.value" class="rounded-md border bg-background px-3 py-2 text-sm">
              <option value="">Sin selección</option>
              <option value="apple">apple</option>
              <option value="banana">banana</option>
              <option value="help">help</option>
            </select>
          </label>
          <label class="grid gap-1 text-xs">Name<input v-model="state.name" class="rounded-md border bg-background px-3 py-2 text-sm" /></label>
          <label class="grid gap-1 text-xs">Empty text<input v-model="state.emptyText" class="rounded-md border bg-background px-3 py-2 text-sm" /></label>
          <label class="grid gap-1 text-xs">No results text<input v-model="state.noResultsText" class="rounded-md border bg-background px-3 py-2 text-sm" /></label>
          <label class="grid gap-1 text-xs">Orientation<select v-model="state.orientation" class="rounded-md border bg-background px-3 py-2 text-sm"><option value="vertical">Vertical</option><option value="horizontal">Horizontal</option></select></label>
          <label class="grid gap-1 text-xs">Selection behavior<select v-model="state.selectionBehavior" class="rounded-md border bg-background px-3 py-2 text-sm"><option value="toggle">Toggle</option><option value="replace">Replace</option></select></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.loading" type="checkbox" /> Loading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.multiple" type="checkbox" /> Multiple</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.highlightOnHover" type="checkbox" /> Highlight on hover</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.required" type="checkbox" /> Required</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.filter" type="checkbox" /> Filter</label
          ><label class="grid gap-1 text-xs"
            >Filter mode<select v-model="state.filterMode" class="rounded-md border bg-background px-3 py-2 text-sm">
              <option value="contains">Contains</option>
              <option value="startWith">Starts with</option>
              <option value="endWith">Ends with</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Sensitivity<select v-model="state.filterSensitivity" class="rounded-md border bg-background px-3 py-2 text-sm">
              <option value="base">Base</option>
              <option value="accent">Accent</option>
              <option value="case">Case</option>
              <option value="variant">Variant</option>
            </select></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ignoreFilter" type="checkbox" /> Ignore filter</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.virtualize" type="checkbox" /> Virtualize</label
          ><label class="grid gap-1 text-xs"
            >Estimate size<input v-model.number="state.virtualizerEstimateSize" type="number" min="1" class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Overscan<input v-model.number="state.virtualizerOverscan" type="number" min="0" class="rounded-md border bg-background px-3 py-2 text-sm" /></label
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
            ><input v-model="state.itemSlot" type="checkbox" /> item</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemLeadingSlot" type="checkbox" /> item-leading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.iconFilterSlot" type="checkbox" /> filter-leading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemLabelSlot" type="checkbox" /> item-label</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.indicatorSlot" type="checkbox" /> item-indicator</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.groupLabelSlot" type="checkbox" /> group-label</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>


