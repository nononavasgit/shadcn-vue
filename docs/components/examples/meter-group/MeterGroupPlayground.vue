<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { MeterGroup as BaseMeterGroup } from '@/components/ui/MeterGroup'
import ComponentPlayground from '../../ComponentPlayground.vue'

type MeterGroupState = {
  data: 'storage' | 'usage' | 'over-max' | 'no-labels'
  max: number
  orientation: 'horizontal' | 'vertical'
  size: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  status: boolean
  ui: boolean
  statusSlot: boolean
  itemSlot: boolean
  itemLeadingSlot: boolean
  itemLabelSlot: boolean
  itemTrailingSlot: boolean
  attrs: boolean
}

const initialState = (): MeterGroupState => ({
  data: 'storage',
  max: 100,
  orientation: 'horizontal',
  size: 'md',
  status: true,
  ui: false,
  statusSlot: false,
  itemSlot: false,
  itemLeadingSlot: false,
  itemLabelSlot: false,
  itemTrailingSlot: false,
  attrs: false,
})

const state = ref<MeterGroupState>(initialState())
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

const storageItems = [
  { label: 'System', value: 19, color: '#2563eb', icon: { name: 'file' } },
  { label: 'Apps', value: 6, color: '#7c3aed', icon: { name: 'fileText' } },
  { label: 'Documents', value: 9, color: '#db2777', icon: { name: 'fileSpreadsheet' } },
  { label: 'Multimedia', value: 33, color: '#ea580c', icon: { name: 'image' } },
]

const usageItems = [
  { label: 'Usado', value: 42, color: '#0891b2', icon: { name: 'upload' } },
  { label: 'Disponible', value: 58, color: '#cbd5e1', icon: { name: 'save' } },
]

const overMaxItems = [
  { label: 'Completado', value: 72, color: '#16a34a' },
  { label: 'Pendiente', value: 38, color: '#f59e0b' },
]

const noLabelsItems = [
  { value: 24, color: '#2563eb' },
  { value: 18, color: '#7c3aed' },
  { value: 31, color: '#db2777' },
]

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll("'", '&#39;')
}

function itemsForState() {
  if (state.value.data === 'usage') return usageItems
  if (state.value.data === 'over-max') return overMaxItems
  if (state.value.data === 'no-labels') return noLabelsItems
  return storageItems
}

function generateCode() {
  const slots = [
    state.value.statusSlot && [
      '  <template #status="{ percentage }">',
      '    <span class="text-xs font-semibold">{{ Math.round(percentage) }}% utilizado</span>',
      '  </template>',
    ],
    state.value.itemSlot && [
      '  <template #item="{ item, index, percentage }">',
      '    <span class="flex items-center justify-between gap-4 rounded-md bg-muted/50 px-2 py-1">',
      '      <span>{{ index + 1 }}. {{ item.label }}</span>',
      '      <span class="text-xs tabular-nums">{{ Math.round(percentage) }}%</span>',
      '    </span>',
      '  </template>',
    ],
    state.value.itemLeadingSlot && [
      '  <template #item-leading="{ item }">',
      '    <span',
      '      class="size-2 shrink-0 rounded-full"',
      '      :style="{ backgroundColor: item.color }"',
      '      aria-hidden="true"',
      '    />',
      '  </template>',
    ],
    state.value.itemLabelSlot && [
      '  <template #item-label="{ item }">',
      '    <span class="truncate font-medium">{{ item.label }}</span>',
      '  </template>',
    ],
    state.value.itemTrailingSlot && [
      '  <template #item-trailing="{ percentage }">',
      '    <span class="shrink-0 text-xs tabular-nums text-primary">',
      '      {{ Math.round(percentage) }}%',
      '    </span>',
      '  </template>',
    ],
  ]
    .filter(Boolean)
    .flat()

  const attrs = [
    `:items='${escapeAttribute(JSON.stringify(itemsForState()))}'`,
    `:max="${state.value.max}"`,
    `orientation="${state.value.orientation}"`,
    `size="${state.value.size}"`,
    `:status="${state.value.status}"`,
    state.value.ui &&
      `:ui="{ status: ({ percentage }) => ({ class: percentage >= 60 ? 'text-primary' : 'text-warning' }), meter: () => ({ class: 'shadow-sm' }), list: () => ({ class: 'gap-2' }), item: ({ item }) => ({ class: item.color ? 'rounded-md px-2 py-1 hover:bg-muted' : undefined }), label: () => ({ class: 'font-medium' }), leading: () => ({ class: 'ring-2 ring-current/20' }), trailing: () => ({ class: 'text-primary' }) }"`,
    state.value.attrs && 'class="border border-primary p-3"',
    state.value.attrs && 'aria-label="Distribución de almacenamiento"',
  ].filter(Boolean)

  const component = `<MeterGroup\n  ${attrs.join('\n  ')}${slots.length ? '\n>' : '\n/>'}`
  return slots.length ? `${component}\n${slots.join('\n')}\n</MeterGroup>` : component
}

function applyCode() {
  editorError.value = ''

  try {
    const render = compile(
      editorCode.value
        .replace(/<MeterGroup(?=[\s/>])/g, '<PlaygroundMeterGroup')
        .replaceAll('</MeterGroup>', '</PlaygroundMeterGroup>'),
    )

    Preview.value = markRaw(
      defineComponent({
        name: 'MeterGroupPlaygroundPreview',
        components: { PlaygroundMeterGroup: BaseMeterGroup },
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
  syncFromControls()
}

watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="MeterGroupPlayground.vue"
    description="Configura los items, la orientación, los estilos y los slots del medidor segmentado."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-64 place-items-center px-8 py-6">
        <div class="w-full max-w-2xl">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
        </div>
      </div>
    </template>

    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Items
            <select v-model="state.data" class="rounded-md border bg-background px-3 py-2 text-sm">
              <option value="storage">Almacenamiento con iconos</option>
              <option value="usage">Usado y disponible</option>
              <option value="over-max">Total superior a max</option>
              <option value="no-labels">Solo segmentos</option>
            </select>
          </label>
          <label class="grid gap-1 text-xs"
            >Max<input
              v-model.number="state.max"
              type="number"
              min="1"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Orientation
            <select
              v-model="state.orientation"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="horizontal">horizontal</option>
              <option value="vertical">vertical</option>
            </select>
          </label>
          <label class="grid gap-1 text-xs"
            >Size
            <select v-model="state.size" class="rounded-md border bg-background px-3 py-2 text-sm">
              <option v-for="size in ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']" :key="size">
                {{ size }}
              </option>
            </select>
          </label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.status" type="checkbox" /> Mostrar status</label
          >
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">UI y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> Personalización ui</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos raíz</label
          >
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slots</legend>
          <p class="text-xs text-muted-foreground">
            El slot item reemplaza el contenido completo de cada fila y tiene prioridad sobre sus
            slots secundarios.
          </p>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.statusSlot" type="checkbox" /> status</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemSlot" type="checkbox" /> item</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemLeadingSlot" type="checkbox" /> item-leading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemLabelSlot" type="checkbox" /> item-label</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemTrailingSlot" type="checkbox" /> item-trailing</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
