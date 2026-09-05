<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { AlertDialog as BaseAlertDialog } from '@/components/ui/AlertDialog'
import { Button as BaseButton } from '@/components/ui/Button'
import ComponentPlayground from '../../ComponentPlayground.vue'

const icons = ['', 'warning', 'info', 'success', 'error']
const severities = ['primary', 'secondary', 'success', 'warning', 'error']
const variants = ['default', 'outline', 'plain']
const slotModes = ['none', 'enabled']

const state = ref({
  open: false,
  label: 'Eliminar proyecto',
  description: 'Esta acción no se puede deshacer.',
  icon: 'warning',
  actionLabel: 'Eliminar',
  actionSeverity: 'error',
  cancelLabel: 'Cancelar',
  cancelVariant: 'outline',
  unmountOnHide: true,
  forceMount: false,
  disableOutsidePointerEvents: true,
  ui: false,
  attrs: false,
  contentSlot: 'none',
  headerSlot: 'none',
  labelSlot: 'none',
  descriptionSlot: 'none',
  footerSlot: 'none',
  actionSlot: 'none',
  cancelSlot: 'none',
  exposeClose: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewOpen = ref(false)
const eventLog = ref<string[]>([])
const previewKey = ref(0)
const Preview = shallowRef()

function logEvent(name: string) {
  eventLog.value = [`${name}: recibido`, ...eventLog.value].slice(0, 4)
}

function generateSlots() {
  const slots: string[] = []
  if (state.value.contentSlot === 'enabled')
    slots.push(
      `  <template #content><p class="text-sm">Revisa los datos antes de continuar.</p></template>`,
    )
  if (state.value.headerSlot === 'enabled')
    slots.push(
      `  <template #header><div class="grid gap-2"><strong>Encabezado personalizado</strong><span class="text-sm text-muted-foreground">Texto adicional del encabezado.</span></div></template>`,
    )
  if (state.value.labelSlot === 'enabled')
    slots.push(`  <template #label><span>Etiqueta personalizada</span></template>`)
  if (state.value.descriptionSlot === 'enabled')
    slots.push(
      `  <template #description><span>Descripción con <strong>contenido enriquecido</strong>.</span></template>`,
    )
  if (state.value.footerSlot === 'enabled')
    slots.push(
      `  <template #footer="{ close }"><Button variant="outline" label="Cerrar" @click="close" /></template>`,
    )
  if (state.value.actionSlot === 'enabled')
    slots.push(
      `  <template #action="{ close }"><Button label="Aceptar" @click="close" /></template>`,
    )
  if (state.value.cancelSlot === 'enabled')
    slots.push(
      `  <template #cancel="{ close }"><Button label="No" variant="plain" @click="close" /></template>`,
    )
  return slots
}

function generateCode() {
  const props = [
    'v-model:open="open"',
    `label="${state.value.label}"`,
    `description="${state.value.description}"`,
    state.value.icon && `:icon="{ name: '${state.value.icon}' }"`,
    `:action-button="{ label: '${state.value.actionLabel}', severity: '${state.value.actionSeverity}' }"`,
    `:cancel-button="{ label: '${state.value.cancelLabel}', variant: '${state.value.cancelVariant}' }"`,
    `:unmount-on-hide="${state.value.unmountOnHide}"`,
    `:force-mount="${state.value.forceMount}"`,
    `:disable-outside-pointer-events="${state.value.disableOutsidePointerEvents}"`,
    state.value.ui &&
      `:ui="{ trigger: () => ({ class: 'inline-flex' }), overlay: () => ({ class: 'bg-destructive/20' }), content: () => ({ class: 'border-primary' }), header: () => ({ class: 'text-left' }), label: () => ({ class: 'text-primary' }), description: () => ({ class: 'text-muted-foreground' }), body: () => ({ class: 'bg-muted/20 p-3' }), footer: () => ({ class: 'border-t pt-4' }) }"`,
    state.value.attrs && 'class="contents" data-state="ready" aria-label="Confirmación"',
    '@action="logEvent(\'action\')"',
    '@cancel="logEvent(\'cancel\')"',
    state.value.exposeClose && 'ref="dialogRef"',
  ].filter(Boolean)
  const slots = generateSlots()
  const trigger = '  <Button label="Abrir diálogo" />'
  const exposeContent = state.value.exposeClose
    ? `  <template #content>${
        state.value.contentSlot === 'enabled'
          ? '<p class="text-sm">Revisa los datos antes de continuar.</p>'
          : ''
      }<Button label="Cerrar diálogo" @click="dialogRef?.close()" /></template>`
    : ''
  const allSlots = [
    trigger,
    exposeContent,
    ...slots.filter((slot) => !exposeContent || !slot.includes('#content')),
  ].filter(Boolean)
  const opening = `<AlertDialog\n  ${props.join('\n  ')}`
  return `${opening}\n>\n${allSlots.join('\n')}\n</AlertDialog>`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<AlertDialog(?=[\s/>])/g, '<PlaygroundAlertDialog')
        .replaceAll('</AlertDialog>', '</PlaygroundAlertDialog>')
        .replace(/<Button(?=[\s/>])/g, '<PlaygroundButton')
        .replaceAll('</Button>', '</PlaygroundButton>'),
    )
    previewOpen.value = state.value.open
    Preview.value = markRaw(
      defineComponent({
        name: 'AlertDialogPlaygroundPreview',
        components: {
          PlaygroundAlertDialog: BaseAlertDialog,
          PlaygroundButton: BaseButton,
        },
        setup: () => ({ open: previewOpen, logEvent, dialogRef: ref() }),
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
    label: 'Eliminar proyecto',
    description: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    actionLabel: 'Eliminar',
    actionSeverity: 'error',
    cancelLabel: 'Cancelar',
    cancelVariant: 'outline',
    unmountOnHide: true,
    forceMount: false,
    disableOutsidePointerEvents: true,
    ui: false,
    attrs: false,
    contentSlot: 'none',
    headerSlot: 'none',
    labelSlot: 'none',
    descriptionSlot: 'none',
    footerSlot: 'none',
    actionSlot: 'none',
    cancelSlot: 'none',
    exposeClose: false,
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
    filename="AlertDialogPlayground.vue"
    description="Configura el diálogo de confirmación, sus botones y slots; ábrelo desde la vista previa."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8 py-6">
        <div class="grid justify-items-center gap-4">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <div class="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
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
            >Action severity<select
              v-model="state.actionSeverity"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="severity in severities" :key="severity">{{ severity }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Action label<input
              v-model="state.actionLabel"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Cancel variant<select
              v-model="state.cancelVariant"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="variant in variants" :key="variant">{{ variant }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Cancel label<input
              v-model="state.cancelLabel"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.open" type="checkbox" /> Open initially</label
          >
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Comportamiento</legend>
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
          <label class="col-span-2 flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          >
          <label class="col-span-2 flex items-center gap-2 text-sm"
            ><input v-model="state.exposeClose" type="checkbox" /> Probar expose.close</label
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
              'action',
              'cancel',
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
