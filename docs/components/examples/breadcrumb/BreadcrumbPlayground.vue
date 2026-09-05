<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Breadcrumb as BaseBreadcrumb } from '@/components/ui/Breadcrumb'
import ComponentPlayground from '../../ComponentPlayground.vue'

const icons = ['', 'chevronRight', 'chevronDown', 'minus', 'moreHorizontal', 'arrowRight']

function createItems() {
  return [
    { slot: 'home', label: 'Inicio', to: '/', icon: '', command: false },
    { slot: 'library', label: 'Biblioteca', to: '/library', icon: '', command: false },
    { slot: 'components', label: 'Componentes', to: '/components', icon: '', command: false },
    { slot: 'breadcrumb', label: 'Breadcrumb', to: '', icon: 'check', command: false },
  ]
}

const state = ref({
  items: createItems(),
  ellipsisStart: -1,
  ellipsisEnd: -1,
  ellipsisIcon: 'moreHorizontal',
  separatorIcon: 'chevronRight',
  ui: false,
  attrs: false,
  ellipsisSlot: false,
  separatorSlot: false,
  itemSlot: false,
  itemSpecificSlot: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const commandLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function serializeItems() {
  return `[${state.value.items
    .map((item) => {
      const properties = [
        `slot: ${JSON.stringify(item.slot)}`,
        item.label ? `label: ${JSON.stringify(item.label)}` : '',
        item.to ? `to: ${JSON.stringify(item.to)}` : '',
        item.icon ? `icon: { name: ${JSON.stringify(item.icon)} }` : '',
        item.command
          ? `command: (event) => handleCommand(event, ${JSON.stringify(item.slot)})`
          : '',
      ].filter(Boolean)
      return `{ ${properties.join(', ')} }`
    })
    .join(', ')}]`
}

function generateSlots() {
  const slots: string[] = []
  if (state.value.ellipsisSlot)
    slots.push(
      `  <template #ellipsis="{ items }"><span aria-hidden="true">…</span><span class="sr-only">{{ items.length }} elementos ocultos</span></template>`,
    )
  if (state.value.separatorSlot)
    slots.push(`  <template #separator><span aria-hidden="true">/</span></template>`)
  if (state.value.itemSlot)
    slots.push(
      `  <template #item="{ item, last }"><span :class="last ? 'font-semibold text-foreground' : 'underline'">{{ item.label }}</span></template>`,
    )
  if (state.value.itemSpecificSlot)
    slots.push(
      `  <template #item-${state.value.items[0]?.slot || 'home'}="{ item }"><strong class="text-primary">{{ item.label }} personalizado</strong></template>`,
    )
  return slots
}

function generateCode() {
  const props = [
    `:items='${serializeItems()}'`,
    state.value.ellipsisStart >= 0 && state.value.ellipsisEnd >= state.value.ellipsisStart
      ? `:ellipsis-index="[${state.value.ellipsisStart}, ${state.value.ellipsisEnd}]"`
      : '',
    state.value.ellipsisIcon && `:ellipsis-icon="{ name: '${state.value.ellipsisIcon}' }"`,
    state.value.separatorIcon && `:separator-icon="{ name: '${state.value.separatorIcon}' }"`,
    state.value.ui &&
      `:ui="{ list: () => ({ class: 'rounded-md bg-muted/30 p-2' }), ellipsisContainer: () => ({ class: 'text-primary' }), separatorContainer: () => ({ class: 'px-1' }), item: ({ last }) => ({ class: last ? 'font-semibold' : undefined }) }"`,
    state.value.attrs &&
      'class="rounded-lg border p-3" data-state="ready" aria-label="Ruta de navegación"',
  ].filter(Boolean)
  const slots = generateSlots()
  const opening = `<Breadcrumb\n  ${props.join('\n  ')}`
  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</Breadcrumb>` : `${opening}\n/>`
}

function handleCommand(event: PointerEvent, slot: string) {
  event.preventDefault()
  commandLog.value = `command: ${slot}`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Breadcrumb(?=[\s/>])/g, '<PlaygroundBreadcrumb')
        .replaceAll('</Breadcrumb>', '</PlaygroundBreadcrumb>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'BreadcrumbPlaygroundPreview',
        components: { PlaygroundBreadcrumb: BaseBreadcrumb },
        setup: () => ({ handleCommand }),
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
    items: createItems(),
    ellipsisStart: -1,
    ellipsisEnd: -1,
    ellipsisIcon: 'moreHorizontal',
    separatorIcon: 'chevronRight',
    ui: false,
    attrs: false,
    ellipsisSlot: false,
    separatorSlot: false,
    itemSlot: false,
    itemSpecificSlot: false,
  }
  commandLog.value = ''
  syncFromControls()
}

watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="BreadcrumbPlayground.vue"
    description="Edita los items, comprime la ruta y personaliza sus iconos, slots y atributos."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8 py-6">
        <div class="grid w-full max-w-3xl gap-4">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <span v-if="commandLog" class="text-center text-xs text-muted-foreground">{{
            commandLog
          }}</span>
        </div>
      </div>
    </template>
    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Inicio elipsis<input
              v-model.number="state.ellipsisStart"
              min="-1"
              type="number"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Fin elipsis<input
              v-model.number="state.ellipsisEnd"
              min="-1"
              type="number"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Icono elipsis<select
              v-model="state.ellipsisIcon"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="icon in icons" :key="icon" :value="icon">{{ icon || 'none' }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Icono separador<select
              v-model="state.separatorIcon"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="icon in icons" :key="icon" :value="icon">{{ icon || 'none' }}</option>
            </select></label
          >
          <label class="col-span-2 flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          >
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Items</legend>
          <div
            v-for="item in state.items"
            :key="item.slot"
            class="grid grid-cols-2 gap-2 rounded-md border p-3"
          >
            <label class="grid gap-1 text-xs"
              >Slot<input
                v-model="item.slot"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="grid gap-1 text-xs"
              >Label<input
                v-model="item.label"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="col-span-2 grid gap-1 text-xs"
              >To<input
                v-model="item.to"
                placeholder="/ruta"
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
            <label class="flex items-center gap-2 self-end text-xs"
              ><input v-model="item.command" type="checkbox" /> Command</label
            >
          </div>
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slots</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ellipsisSlot" type="checkbox" /> Ellipsis</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.separatorSlot" type="checkbox" /> Separator</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemSlot" type="checkbox" /> Item</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemSpecificSlot" type="checkbox" /> Item específico</label
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
