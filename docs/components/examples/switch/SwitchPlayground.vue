<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Switch as BaseSwitch } from '@/components/ui/Switch'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  mode: 'boolean',
  initial: 'false',
  disabled: false,
  thumbSlot: false,
  ui: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const props = [
    'v-model:value="value"',
    state.value.mode === 'custom' && 'true-value="on" false-value="off"',
    state.value.mode === 'numeric' && ':true-value="1" :false-value="0"',
    state.value.disabled && 'disabled',
    state.value.ui && `:ui="{ thumb: ({ state }) => ({ class: state ? 'bg-emerald-500' : '' }) }"`,
    state.value.attrs && 'class="ring-2 ring-primary" aria-label="Activar opción"',
    '@update:value="handleUpdate"',
  ].filter(Boolean)
  const slot = state.value.thumbSlot
    ? '\n  <template #thumb="{ state }"><span class="text-[0.5rem] font-bold" aria-hidden="true">{{ state ? \'ON\' : \'OFF\' }}</span></template>\n'
    : ''
  return `<Switch\n  ${props.join('\n  ')}\n>${slot}</Switch>`
}
function handleUpdate(value: unknown) {
  eventLog.value = String(value)
}
function initialValue() {
  if (state.value.mode === 'custom') return state.value.initial === 'true' ? 'on' : 'off'
  if (state.value.mode === 'numeric') return state.value.initial === 'true' ? 1 : 0
  return state.value.initial === 'true'
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Switch(?=[\s/>])/g, '<PlaygroundSwitch')
        .replaceAll('</Switch>', '</PlaygroundSwitch>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'SwitchPlaygroundPreview',
        components: { PlaygroundSwitch: BaseSwitch },
        setup: () => ({ value: ref(initialValue()), handleUpdate }),
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
    mode: 'boolean',
    initial: 'false',
    disabled: false,
    thumbSlot: false,
    ui: false,
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
    filename="SwitchPlayground.vue"
    description="Configura el switch o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center">
        <div class="grid justify-items-center gap-3">
          <div class="flex items-center gap-3">
            <component :is="Preview" v-if="Preview" :key="previewKey" /><span class="text-sm"
              >Opción activa</span
            >
          </div>
          <p v-if="eventLog" class="font-mono text-xs text-muted-foreground">
            value: {{ eventLog }}
          </p>
        </div>
      </div></template
    >
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Valor</legend>
          <label class="grid gap-1 text-xs"
            >Mode<select
              v-model="state.mode"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option value="boolean">boolean</option>
              <option value="custom">on / off</option>
              <option value="numeric">1 / 0</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Initial value<select
              v-model="state.initial"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slot y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.thumbSlot" type="checkbox" /> Slot thumb</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
