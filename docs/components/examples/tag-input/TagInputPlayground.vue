<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { TagInput as BaseTagInput } from '@/components/ui/TagInput'
import ComponentPlayground from '../../ComponentPlayground.vue'

const directions = ['ltr', 'rtl']

const state = ref({
  initialTags: 'Vue, Reka UI',
  placeholder: 'Añadir tecnología...',
  delimiter: ',',
  max: 0,
  maxLength: 0,
  duplicate: false,
  disabled: false,
  clearable: true,
  addOnPaste: true,
  addOnTab: true,
  addOnBlur: false,
  autoFocus: false,
  displayValue: false,
  convertValue: false,
  dir: 'ltr',
  id: 'technologies',
  name: 'technologies',
  required: false,
  ui: false,
  attrs: false,
  tagSlot: false,
  clearSlot: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref<string[]>([])
const previewTags = ref<string[]>([])
const previewKey = ref(0)
const Preview = shallowRef()

function getInitialTags() {
  return state.value.initialTags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function logEvent(name: string, payload?: unknown) {
  const value = Array.isArray(payload) ? payload.join(', ') : String(payload ?? '')
  eventLog.value = [`${name}${value ? `: ${value}` : ''}`, ...eventLog.value].slice(0, 4)
}

function handleUpdate(value: string[]) {
  previewTags.value = value
  logEvent('update:value', value)
}

function generateSlots() {
  const slots: string[] = []
  if (state.value.tagSlot)
    slots.push(`  <template #tag="{ value, index }">
    <span>#{{ value }}</span>
    <span class="text-muted-foreground">{{ index + 1 }}</span>
  </template>`)
  if (state.value.clearSlot)
    slots.push(`  <template #clear><span aria-hidden="true">Limpiar</span></template>`)
  return slots
}

function generateCode() {
  const props = [
    'v-model:value="value"',
    `placeholder="${state.value.placeholder}"`,
    `delimiter="${state.value.delimiter}"`,
    `:max="${state.value.max}"`,
    `:duplicate="${state.value.duplicate}"`,
    `:disabled="${state.value.disabled}"`,
    `:clearable="${state.value.clearable}"`,
    `:add-on-paste="${state.value.addOnPaste}"`,
    `:add-on-tab="${state.value.addOnTab}"`,
    `:add-on-blur="${state.value.addOnBlur}"`,
    `:auto-focus="${state.value.autoFocus}"`,
    state.value.maxLength ? `:max-length="${state.value.maxLength}"` : '',
    state.value.displayValue && ':display-value="(value) => `#${value}`"',
    state.value.convertValue && ':convert-value="(value) => value.trim().toLowerCase()"',
    `dir="${state.value.dir}"`,
    `id="${state.value.id}"`,
    `name="${state.value.name}"`,
    `:required="${state.value.required}"`,
    state.value.ui &&
      `:ui="{ root: () => ({ class: 'border-primary bg-primary/5' }), tagItem: ({ index }) => ({ class: index % 2 ? 'bg-primary text-primary-foreground' : undefined }), tagItemText: () => ({ class: 'font-semibold' }), tagItemDelete: () => ({ class: 'hover:text-destructive' }), tagInput: () => ({ class: 'placeholder:text-primary/70' }), tagClear: () => ({ class: 'text-primary' }) }"`,
    state.value.attrs && 'class="shadow-sm" data-state="ready" aria-label="Tecnologías"',
    '@update:value="handleUpdate"',
    '@add-tag="logEvent(\'add-tag\', $event)"',
    '@remove-tag="logEvent(\'remove-tag\', $event)"',
    '@invalid="logEvent(\'invalid\', $event)"',
  ].filter(Boolean)
  const slots = generateSlots()
  const opening = `<TagInput\n  ${props.join('\n  ')}`
  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</TagInput>` : `${opening}\n/>`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<TagInput(?=[\s/>])/g, '<PlaygroundTagInput')
        .replaceAll('</TagInput>', '</PlaygroundTagInput>'),
    )
    previewTags.value = getInitialTags()
    Preview.value = markRaw(
      defineComponent({
        name: 'TagInputPlaygroundPreview',
        components: { PlaygroundTagInput: BaseTagInput },
        setup: () => ({ value: previewTags, handleUpdate, logEvent }),
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
    initialTags: 'Vue, Reka UI',
    placeholder: 'Añadir tecnología...',
    delimiter: ',',
    max: 0,
    maxLength: 0,
    duplicate: false,
    disabled: false,
    clearable: true,
    addOnPaste: true,
    addOnTab: true,
    addOnBlur: false,
    autoFocus: false,
    displayValue: false,
    convertValue: false,
    dir: 'ltr',
    id: 'technologies',
    name: 'technologies',
    required: false,
    ui: false,
    attrs: false,
    tagSlot: false,
    clearSlot: false,
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
    filename="TagInputPlayground.vue"
    description="Añade, elimina y personaliza etiquetas; también puedes editar el template directamente."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8">
        <div class="grid w-full max-w-xl gap-4">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <output class="text-sm text-muted-foreground">
            Etiquetas: {{ previewTags.join(', ') || 'Sin etiquetas' }}
          </output>
          <div v-if="eventLog.length" class="grid gap-1 text-xs text-muted-foreground">
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
            >Etiquetas iniciales (separadas por coma)<input
              v-model="state.initialTags"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="col-span-2 grid gap-1 text-xs"
            >Placeholder<input
              v-model="state.placeholder"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Delimitador<input
              v-model="state.delimiter"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Máximo de etiquetas<input
              v-model.number="state.max"
              min="0"
              type="number"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Máximo de caracteres<input
              v-model.number="state.maxLength"
              min="0"
              type="number"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.duplicate" type="checkbox" /> Permitir duplicados</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.clearable" type="checkbox" /> Clearable</label
          >
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Entrada</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.addOnPaste" type="checkbox" /> Añadir al pegar</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.addOnTab" type="checkbox" /> Añadir con Tab</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.addOnBlur" type="checkbox" /> Añadir al perder foco</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.autoFocus" type="checkbox" /> Auto focus</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.displayValue" type="checkbox" /> displayValue</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.convertValue" type="checkbox" /> convertValue</label
          >
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Atributos</legend>
          <label class="grid gap-1 text-xs"
            >Dirección<select
              v-model="state.dir"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="direction in directions" :key="direction">{{ direction }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >ID<input v-model="state.id" class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Name<input
              v-model="state.name"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.required" type="checkbox" /> Required</label
          >
          <label class="col-span-2 flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> class, data-state y aria-label</label
          >
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">UI y slots</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.tagSlot" type="checkbox" /> Slot tag</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.clearSlot" type="checkbox" /> Slot clear</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
