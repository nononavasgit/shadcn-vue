<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Dialog as BaseDialog } from '@/components/ui/Dialog'
import ComponentPlayground from '../../ComponentPlayground.vue'

const icons = ['', 'info', 'warning', 'success', 'error']
const slotModes = ['none', 'enabled']

const state = ref({
  open: false,
  modal: true,
  unmountOnHide: true,
  forceMount: false,
  disableOutsidePointerEvents: true,
  block: false,
  label: 'Editar preferencias',
  description: 'Configura tus preferencias antes de continuar.',
  icon: '',
  closeIcon: 'x',
  showCloseButton: true,
  ui: false,
  attrs: false,
  contentSlot: 'enabled',
  headerSlot: 'none',
  labelSlot: 'none',
  descriptionSlot: 'none',
  footerSlot: 'enabled',
  closeSlot: 'none',
  closeIconSlot: 'none',
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewOpen = ref(false)
const eventLog = ref<string[]>([])
const previewKey = ref(0)
const Preview = shallowRef()

function logEvent(name: string) {
  eventLog.value = [`${name}: recibido`, ...eventLog.value].slice(0, 5)
}

function handleUpdate(value: boolean) {
  previewOpen.value = value
}

function generateSlots() {
  const slots: string[] = []
  if (state.value.contentSlot === 'enabled')
    slots.push(
      `  <template #content="{ close }"><div class="grid gap-3"><p class="text-sm text-muted-foreground">Contenido personalizado del diálogo.</p><button type="button" class="rounded-md border px-3 py-2 text-sm" @click="close">Cerrar desde content</button></div></template>`,
    )
  if (state.value.headerSlot === 'enabled')
    slots.push(
      `  <template #header><div class="grid gap-2"><strong>Header personalizado</strong><span class="text-sm text-muted-foreground">Contenido adicional del encabezado.</span></div></template>`,
    )
  if (state.value.labelSlot === 'enabled')
    slots.push(
      `  <template #label><span class="text-primary">Etiqueta personalizada</span></template>`,
    )
  if (state.value.descriptionSlot === 'enabled')
    slots.push(`  <template #description><span>Descripción enriquecida.</span></template>`)
  if (state.value.footerSlot === 'enabled')
    slots.push(
      `  <template #footer="{ close }"><div class="flex justify-end gap-2"><button type="button" class="rounded-md border px-3 py-2 text-sm" @click="close">Cancelar</button><button type="button" class="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground" @click="close">Guardar</button></div></template>`,
    )
  if (state.value.closeSlot === 'enabled')
    slots.push(
      `  <template #close="{ close }"><button type="button" class="rounded-md border px-2 py-1 text-xs" @click="close">Cerrar</button></template>`,
    )
  if (state.value.closeIconSlot === 'enabled')
    slots.push(`  <template #closeIcon><span aria-hidden="true">×</span></template>`)
  return slots
}

function generateCode() {
  const props = [
    'v-model:open="open"',
    `:modal="${state.value.modal}"`,
    `:unmount-on-hide="${state.value.unmountOnHide}"`,
    `:force-mount="${state.value.forceMount}"`,
    `:disable-outside-pointer-events="${state.value.disableOutsidePointerEvents}"`,
    `:block="${state.value.block}"`,
    `label="${state.value.label}"`,
    `description="${state.value.description}"`,
    state.value.icon && `:icon="{ name: '${state.value.icon}' }"`,
    `:close-icon="{ name: '${state.value.closeIcon}' }"`,
    `:show-close-button="${state.value.showCloseButton}"`,
    state.value.ui &&
      `:ui="{ overlay: ({ open }) => ({ class: open ? 'bg-primary/20' : undefined }), content: ({ open }) => ({ class: open ? 'border-primary' : undefined }), header: () => ({ class: 'text-left' }), label: () => ({ class: 'text-primary' }), description: () => ({ class: 'text-muted-foreground' }), body: () => ({ class: 'bg-muted/20 p-3' }), footer: () => ({ class: 'border-t pt-4' }), close: () => ({ class: 'text-primary' }) }"`,
    state.value.attrs && 'class="contents" data-state="ready" aria-label="Preferencias"',
    '@update:open="handleUpdate"',
    '@show="logEvent(\'show\')"',
    '@close="logEvent(\'close\')"',
    '@escape-key-down="logEvent(\'escape-key-down\')"',
    '@pointer-down-outside="logEvent(\'pointer-down-outside\')"',
    '@focus-outside="logEvent(\'focus-outside\')"',
    '@interact-outside="logEvent(\'interact-outside\')"',
  ].filter(Boolean)
  const slots = generateSlots()
  const opening = `<Dialog\n  ${props.join('\n  ')}`
  return `${opening}\n>\n  <button type="button" class="rounded-md border px-3 py-2 text-sm">Abrir diálogo</button>${
    slots.length ? `\n${slots.join('\n')}` : ''
  }\n</Dialog>`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Dialog(?=[\s/>])/g, '<PlaygroundDialog')
        .replaceAll('</Dialog>', '</PlaygroundDialog>'),
    )
    previewOpen.value = state.value.open
    Preview.value = markRaw(
      defineComponent({
        name: 'DialogPlaygroundPreview',
        components: { PlaygroundDialog: BaseDialog },
        setup: () => ({ open: previewOpen, handleUpdate, logEvent }),
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
    open: false,
    modal: true,
    unmountOnHide: true,
    forceMount: false,
    disableOutsidePointerEvents: true,
    block: false,
    label: 'Editar preferencias',
    description: 'Configura tus preferencias antes de continuar.',
    icon: '',
    closeIcon: 'x',
    showCloseButton: true,
    ui: false,
    attrs: false,
    contentSlot: 'enabled',
    headerSlot: 'none',
    labelSlot: 'none',
    descriptionSlot: 'none',
    footerSlot: 'enabled',
    closeSlot: 'none',
    closeIconSlot: 'none',
  }
  eventLog.value = []
  syncFromControls()
}

watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="DialogPlayground.vue"
    description="Configura el diálogo, prueba su apertura y usa los slots contextuales con close."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8 py-6">
        <div class="grid justify-items-center gap-4">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <div class="grid gap-1 text-center text-xs text-muted-foreground">
            <span>Estado: {{ previewOpen ? 'abierto' : 'cerrado' }}</span>
            <span v-for="event in eventLog" :key="event">{{ event }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Props</legend>
          <label class="col-span-2 grid gap-1 text-xs"
            >Label<input
              v-model="state.label"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="col-span-2 grid gap-1 text-xs"
            >Description<input
              v-model="state.description"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Icono<select
              v-model="state.icon"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="icon in icons" :key="icon" :value="icon">{{ icon || 'none' }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Close icon<input
              v-model="state.closeIcon"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.showCloseButton" type="checkbox" /> Show close button</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.block" type="checkbox" /> Block</label
          >
          <label class="col-span-2 flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          >
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Comportamiento</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.open" type="checkbox" /> Open initially</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.modal" type="checkbox" /> Modal</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.unmountOnHide" type="checkbox" /> Unmount on hide</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.forceMount" type="checkbox" /> Force mount</label
          >
          <label class="col-span-2 flex items-center gap-2 text-sm"
            ><input v-model="state.disableOutsidePointerEvents" type="checkbox" /> Disable outside
            pointer events</label
          >
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Slots</legend>
          <label
            v-for="slot in [
              'content',
              'header',
              'label',
              'description',
              'footer',
              'close',
              'closeIcon',
            ]"
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
