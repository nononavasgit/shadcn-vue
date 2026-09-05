<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import {
  Tree as BaseTree,
  type TreeItem,
  type TreeKey,
  type TreeModelValue,
} from '@/components/ui/Tree'
import ComponentPlayground from '../../ComponentPlayground.vue'

type TreeState = {
  data: 'files' | 'custom' | 'virtual'
  selected: TreeModelValue
  expanded: TreeKey[]
  multiple: boolean
  selectionBehavior: 'toggle' | 'replace'
  disabled: boolean
  propagateSelect: boolean
  bubbleSelect: boolean
  checkbox: boolean
  getKey: boolean
  getChildren: boolean
  virtual: boolean
  overscan: number
  estimateSize: number
  textContent: boolean
  ui: boolean
  itemSlot: boolean
  itemLeadingSlot: boolean
  chevronSlot: boolean
  checkboxSlot: boolean
  itemLabelSlot: boolean
  attrs: boolean
}

const initialState = (): TreeState => ({
  data: 'files',
  selected: undefined,
  expanded: ['src'],
  multiple: false,
  selectionBehavior: 'toggle',
  disabled: false,
  propagateSelect: false,
  bubbleSelect: false,
  checkbox: false,
  getKey: false,
  getChildren: false,
  virtual: false,
  overscan: 8,
  estimateSize: 32,
  textContent: false,
  ui: false,
  itemSlot: false,
  itemLeadingSlot: false,
  chevronSlot: false,
  checkboxSlot: false,
  itemLabelSlot: false,
  attrs: false,
})

const state = ref<TreeState>(initialState())
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

const fileItems: TreeItem[] = [
  {
    value: 'src',
    label: 'src',
    icon: { name: 'folder' },
    children: [
      {
        value: 'components',
        label: 'components',
        icon: { name: 'folder' },
        children: [
          { value: 'tree-vue', label: 'Tree.vue' },
          { value: 'tree-index', label: 'index.ts' },
        ],
      },
      { value: 'app-vue', label: 'App.vue' },
    ],
  },
  { value: 'package-json', label: 'package.json' },
  { value: 'readme', label: 'README.md', disabled: true },
]

const customItems = [
  {
    value: 'workspace',
    label: 'Workspace',
    directories: [{ value: 'docs', label: 'Docs' }],
    files: [{ value: 'config', label: 'config.ts' }],
  },
]

const virtualItems: TreeItem[] = Array.from({ length: 100 }, (_, index) => ({
  value: `file-${index + 1}`,
  label: `Documento ${index + 1}.md`,
}))

function itemsForState() {
  if (state.value.data === 'custom') return customItems
  if (state.value.data === 'virtual') return virtualItems
  return fileItems
}

function generateSlots() {
  const slots: string[] = []

  if (state.value.itemSlot)
    slots.push(
      '  <template #item="{ item, selected }">',
      '    <span :class="selected ? \'font-semibold text-primary\' : undefined">',
      '      {{ item.label }} (item)',
      '    </span>',
      '  </template>',
    )
  if (state.value.itemLeadingSlot)
    slots.push(
      '  <template #item-leading="{ item }">',
      '    <span class="size-2 rounded-full bg-primary" aria-hidden="true" />',
      '    <span class="sr-only">Nodo {{ item.label }}</span>',
      '  </template>',
    )
  if (state.value.chevronSlot)
    slots.push(
      '  <template #chevron="{ expanded, handleToggle }">',
      '    <button class="size-5 text-primary" type="button" @click.stop="handleToggle">',
      "      {{ expanded ? '⌄' : '›' }}",
      '    </button>',
      '  </template>',
    )
  if (state.value.checkboxSlot)
    slots.push(
      '  <template #checkbox="{ selected, indeterminate, handleSelect }">',
      '    <button class="size-5 text-primary" type="button" @click.stop="handleSelect">',
      "      {{ indeterminate ? '−' : selected ? '☑' : '☐' }}",
      '    </button>',
      '  </template>',
    )
  if (state.value.itemLabelSlot)
    slots.push(
      '  <template #item-label="{ item, level }">',
      '    <span class="font-medium">{{ item.label }} · nivel {{ level }}</span>',
      '  </template>',
    )

  return slots
}

function generateCode() {
  const virtual = state.value.virtual || state.value.data === 'virtual'
  const props = [
    'v-model:value="selected"',
    'v-model:expanded="expanded"',
    `:items='${JSON.stringify(itemsForState())}'`,
    `:multiple="${state.value.multiple}"`,
    `selection-behavior="${state.value.selectionBehavior}"`,
    `:disabled="${state.value.disabled}"`,
    `:propagate-select="${state.value.propagateSelect}"`,
    `:bubble-select="${state.value.bubbleSelect}"`,
    `:checkbox="${state.value.checkbox}"`,
    state.value.getKey && ':get-key="(item) => item.value"',
    state.value.data === 'custom' &&
      state.value.getChildren &&
      ':get-children="(item) => item.directories ? [...item.directories, ...(item.files ?? [])] : item.children"',
    virtual && ':virtual="true"',
    virtual &&
      `:virtualizer="{ overscan: ${state.value.overscan}, estimateSize: ${state.value.estimateSize}${state.value.textContent ? ', textContent: (item) => String(item.label).toLowerCase()' : ''} }"`,
    state.value.ui &&
      `:ui="{ root: () => ({ class: 'rounded-md' }), item: ({ selected }) => ({ class: selected ? 'ring-1 ring-primary' : undefined }), content: ({ level }) => ({ class: level > 1 ? 'bg-muted/20' : undefined }), chevron: ({ expanded }) => ({ class: expanded ? 'text-primary' : undefined }), leading: ({ item }) => ({ class: item.children ? 'text-primary' : 'text-muted-foreground' }), checkbox: ({ selected }) => ({ class: selected ? 'text-primary' : undefined }), label: ({ level }) => ({ class: level > 1 ? 'text-muted-foreground' : 'font-semibold' }) }"`,
    state.value.attrs &&
      `class="${virtual ? 'max-h-64 overflow-auto ' : ''}rounded-lg border p-2" aria-label="Archivos del proyecto"`,
    '@update:value="handleValueUpdate"',
    '@update:expanded="handleExpandedUpdate"',
  ].filter(Boolean)
  const slots = generateSlots()
  const opening = `<Tree\n  ${props.join('\n  ')}`

  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</Tree>` : `${opening}\n/>`
}

function handleValueUpdate(value: TreeModelValue) {
  eventLog.value = `update:value · ${Array.isArray(value) ? value.join(', ') || '[]' : (value ?? 'undefined')}`
}

function handleExpandedUpdate(expanded: TreeKey[]) {
  eventLog.value = `update:expanded · ${expanded.join(', ') || '[]'}`
}

function applyCode() {
  editorError.value = ''

  try {
    const render = compile(
      editorCode.value
        .replace(/<Tree(?=[\s/>])/g, '<PlaygroundTree')
        .replaceAll('</Tree>', '</PlaygroundTree>'),
    )

    Preview.value = markRaw(
      defineComponent({
        name: 'TreePlaygroundPreview',
        components: { PlaygroundTree: BaseTree },
        setup: () => ({
          selected: ref<TreeModelValue>(state.value.selected),
          expanded: ref<TreeKey[]>(state.value.expanded),
          handleValueUpdate,
          handleExpandedUpdate,
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
    filename="TreePlayground.vue"
    description="Configura la selección, expansión, virtualización, slots y resolvers ui del árbol."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-96 place-items-center px-8 py-6">
        <div class="w-full max-w-2xl">
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
          <legend class="mb-1 text-sm font-semibold">Datos y selección</legend>
          <label class="grid gap-1 text-xs"
            >Datos
            <select v-model="state.data" class="rounded-md border bg-background px-3 py-2 text-sm">
              <option value="files">Árbol de archivos</option>
              <option value="custom">getChildren personalizado</option>
              <option value="virtual">100 nodos planos</option>
            </select>
          </label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.multiple" type="checkbox" /> Selección múltiple</label
          ><label class="grid gap-1 text-xs"
            >Selection behavior
            <select
              v-model="state.selectionBehavior"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="toggle">toggle</option>
              <option value="replace">replace</option>
            </select>
          </label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.checkbox" type="checkbox" /> Checkbox</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.propagateSelect" type="checkbox" /> Propagate select</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.bubbleSelect" type="checkbox" /> Bubble select</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label
          >
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Resolvers y virtualización</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.getKey" type="checkbox" /> getKey</label
          ><label v-if="state.data === 'custom'" class="flex items-center gap-2 text-sm"
            ><input v-model="state.getChildren" type="checkbox" /> getChildren</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.virtual" type="checkbox" /> Virtual</label
          >
          <div v-if="state.virtual || state.data === 'virtual'" class="grid grid-cols-2 gap-2">
            <label class="grid gap-1 text-xs"
              >Overscan<input
                v-model.number="state.overscan"
                type="number"
                min="0"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="grid gap-1 text-xs"
              >Estimate size<input
                v-model.number="state.estimateSize"
                type="number"
                min="1"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
          </div>
          <label
            v-if="state.virtual || state.data === 'virtual'"
            class="flex items-center gap-2 text-sm"
            ><input v-model="state.textContent" type="checkbox" /> textContent</label
          >
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">UI y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> Personalización ui</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML</label
          >
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slots</legend>
          <p class="text-xs text-muted-foreground">
            Los slots globales reciben el contexto del nodo visible.
          </p>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemSlot" type="checkbox" /> item</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemLeadingSlot" type="checkbox" /> item-leading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.chevronSlot" type="checkbox" /> chevron</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.checkboxSlot" type="checkbox" /> checkbox</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemLabelSlot" type="checkbox" /> item-label</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
