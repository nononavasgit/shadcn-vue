<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Attachment as BaseAttachment } from '@/components/ui/Attachment'
import { Button as BaseButton } from '@/components/ui/Button'
import ComponentPlayground from '../../ComponentPlayground.vue'

const orientations = ['horizontal', 'vertical']
const sizes = ['xs', 'sm', 'md']
const states = ['idle', 'uploading', 'processing', 'error', 'done']
const mediaVariants = ['icon', 'image']
const icons = ['', 'fileText', 'fileArchive', 'file', 'image', 'upload', 'error', 'check']

const state = ref({
  label: 'report.pdf',
  description: '2.4 MB',
  icon: 'fileText',
  orientation: 'horizontal',
  size: 'md',
  attachmentState: 'idle',
  mediaVariant: 'icon',
  ui: false,
  attrs: false,
  mediaSlot: false,
  labelSlot: false,
  descriptionSlot: false,
  actionsSlot: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateSlots() {
  const slots: string[] = []
  if (state.value.mediaSlot)
    slots.push(
      `  <template #media><div class="grid size-full place-items-center bg-primary text-xs text-primary-foreground">PDF</div></template>`,
    )
  if (state.value.labelSlot)
    slots.push(
      `  <template #label><strong>{{ '${state.value.label}' }} · personalizado</strong></template>`,
    )
  if (state.value.descriptionSlot)
    slots.push(
      `  <template #description><span class="text-primary">{{ '${state.value.description}' }} · PDF</span></template>`,
    )
  if (state.value.actionsSlot)
    slots.push(
      `  <template #actions><Button size="xs" variant="plain" :icon="{ name: 'x' }" aria-label="Eliminar archivo" /></template>`,
    )
  return slots
}

function generateCode() {
  const props = [
    'class="w-full"',
    `label="${state.value.label}"`,
    `description="${state.value.description}"`,
    state.value.icon && `:icon="{ name: '${state.value.icon}' }"`,
    `orientation="${state.value.orientation}"`,
    `size="${state.value.size}"`,
    `state="${state.value.attachmentState}"`,
    `media-variant="${state.value.mediaVariant}"`,
    state.value.ui &&
      `:ui="{ media: () => ({ class: 'bg-primary text-primary-foreground' }), content: () => ({ class: 'gap-1' }), label: () => ({ class: 'uppercase tracking-wide' }), description: () => ({ class: 'text-primary' }), actions: () => ({ class: 'rounded-md bg-muted/50 p-1' }) }"`,
    state.value.attrs && 'data-state="ready" aria-label="Archivo adjunto"',
  ].filter(Boolean)
  const slots = generateSlots()
  const opening = `<Attachment\n  ${props.join('\n  ')}`
  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</Attachment>` : `${opening}\n/>`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Attachment(?=[\s/>])/g, '<PlaygroundAttachment')
        .replaceAll('</Attachment>', '</PlaygroundAttachment>')
        .replace(/<Button(?=[\s/>])/g, '<PlaygroundButton')
        .replaceAll('</Button>', '</PlaygroundButton>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'AttachmentPlaygroundPreview',
        components: {
          PlaygroundAttachment: BaseAttachment,
          PlaygroundButton: BaseButton,
        },
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
    label: 'report.pdf',
    description: '2.4 MB',
    icon: 'fileText',
    orientation: 'horizontal',
    size: 'md',
    attachmentState: 'idle',
    mediaVariant: 'icon',
    ui: false,
    attrs: false,
    mediaSlot: false,
    labelSlot: false,
    descriptionSlot: false,
    actionsSlot: false,
  }
  syncFromControls()
}

watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="AttachmentPlayground.vue"
    description="Configura el archivo, sus variantes visuales, multimedia, acciones y slots."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8 py-6">
        <div class="grid w-full max-w-xl gap-4">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <div
            class="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground"
          >
            <span>Estado: {{ state.attachmentState }}</span>
            <span>Media: {{ state.mediaVariant }}</span>
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
            >Orientación<select
              v-model="state.orientation"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in orientations" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Tamaño<select
              v-model="state.size"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in sizes" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Estado<select
              v-model="state.attachmentState"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in states" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Media variant<select
              v-model="state.mediaVariant"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in mediaVariants" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="col-span-2 flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          >
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slots</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.mediaSlot" type="checkbox" /> Media</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.labelSlot" type="checkbox" /> Label</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.descriptionSlot" type="checkbox" /> Description</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.actionsSlot" type="checkbox" /> Actions</label
          >
          <p class="text-xs text-muted-foreground">
            El slot media se visualiza cuando Media variant es image.
          </p>
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
