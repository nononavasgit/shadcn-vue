<script setup lang="ts">
import { CheckIcon, SearchIcon } from '@lucide/vue'
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Input as BaseInput } from '@/components/ui/Input'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  value: 'Buscar componentes',
  type: 'text',
  placeholder: 'Escribe algo...',
  disabled: false,
  leading: false,
  trailing: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}
function generateCode() {
  const attrs = [
    'v-model:value="value"',
    `type="${state.value.type}"`,
    state.value.placeholder && `placeholder="${escapeAttribute(state.value.placeholder)}"`,
    state.value.disabled && 'disabled',
    state.value.attrs && 'class="border-primary" aria-label="Campo de búsqueda"',
    '@update:value="handleUpdate"',
  ].filter(Boolean)
  const slots = [
    state.value.leading && '  <template #leading><SearchIcon class="size-4" /></template>',
    state.value.trailing &&
      '  <template #trailing><CheckIcon class="size-4 text-primary" /></template>',
  ].filter(Boolean)
  return slots.length
    ? `<Input\n  ${attrs.join('\n  ')}\n>\n${slots.join('\n')}\n</Input>`
    : `<Input\n  ${attrs.join('\n  ')}\n/>`
}
function handleUpdate(value: string) {
  eventLog.value = value
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Input(?=[\s/>])/g, '<PlaygroundInput')
        .replaceAll('</Input>', '</PlaygroundInput>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'InputPlaygroundPreview',
        components: { PlaygroundInput: BaseInput, SearchIcon, CheckIcon },
        setup: () => ({ value: ref(state.value.value), handleUpdate }),
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
    value: 'Buscar componentes',
    type: 'text',
    placeholder: 'Escribe algo...',
    disabled: false,
    leading: false,
    trailing: false,
    attrs: false,
  }
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
    filename="InputPlayground.vue"
    description="Configura el campo de entrada o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center px-8">
        <div class="grid w-full max-w-md gap-3">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <p v-if="eventLog" class="text-sm text-muted-foreground">value: {{ eventLog }}</p>
        </div>
      </div></template
    >
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Value<input
              v-model="state.value"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Type<select
              v-model="state.type"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>text</option>
              <option>email</option>
              <option>password</option>
              <option>search</option>
              <option>tel</option>
              <option>url</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Placeholder<input
              v-model="state.placeholder"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slots y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.leading" type="checkbox" /> leading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.trailing" type="checkbox" /> trailing</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
