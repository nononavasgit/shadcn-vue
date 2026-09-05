<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Announcer as BaseAnnouncer } from '@/components/ui/Announcer'
import ComponentPlayground from '../../ComponentPlayground.vue'

const politenessOptions = ['polite', 'assertive', 'off']

const state = ref({
  message: 'Cambios guardados correctamente',
  atomic: true,
  politeness: 'polite',
  useSlot: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const props = [
    `message="${state.value.message}"`,
    `:atomic="${state.value.atomic}"`,
    `politeness="${state.value.politeness}"`,
    state.value.attrs && 'class="text-sm" data-state="updated" aria-label="Estado del sistema"',
  ].filter(Boolean)
  const opening = `<Announcer\n  ${props.join('\n  ')}`
  if (!state.value.useSlot) return `${opening}\n/>`
  return `${opening}\n>\n  <span class="rounded-md border bg-muted/40 px-3 py-2 text-sm">${state.value.message}</span>\n</Announcer>`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Announcer(?=[\s/>])/g, '<PlaygroundAnnouncer')
        .replaceAll('</Announcer>', '</PlaygroundAnnouncer>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'AnnouncerPlaygroundPreview',
        components: { PlaygroundAnnouncer: BaseAnnouncer },
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
    message: 'Cambios guardados correctamente',
    atomic: true,
    politeness: 'polite',
    useSlot: false,
    attrs: false,
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
    filename="AnnouncerPlayground.vue"
    description="Configura el mensaje anunciado, su prioridad y el contenido visible del slot."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8 py-6">
        <div class="grid w-full max-w-xl justify-items-center gap-4">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <div class="grid gap-1 text-center text-xs text-muted-foreground">
            <span>aria-live: {{ state.politeness }}</span>
            <span
              >role:
              {{
                state.politeness === 'assertive'
                  ? 'alert'
                  : state.politeness === 'polite'
                    ? 'status'
                    : 'sin role'
              }}</span
            >
            <span>aria-atomic: {{ state.atomic }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Message<textarea
              v-model="state.message"
              rows="3"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label class="grid gap-1 text-xs"
            >Politeness<select
              v-model="state.politeness"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in politenessOptions" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.atomic" type="checkbox" /> Atomic</label
          >
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slot default</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.useSlot" type="checkbox" /> Usar contenido visible
            personalizado</label
          >
          <p class="text-xs text-muted-foreground">
            Al activar el slot, sustituye el valor de message y deja de aplicarse sr-only.
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
