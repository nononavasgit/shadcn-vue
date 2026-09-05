<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  value: 'false',
  customValues: false,
  disabled: false,
  indicatorSlot: false,
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
  const attrs = [
    'v-model:value="value"',
    state.value.customValues && 'true-value="yes" false-value="no"',
    state.value.disabled && 'disabled',
    state.value.ui &&
      `:ui="{ indicator: ({ state }) => ({ class: state === 'indeterminate' ? 'text-warning' : '' }) }"`,
    state.value.attrs && 'class="border-primary" aria-label="Aceptar términos"',
    '@update:value="handleUpdate"',
  ].filter(Boolean)
  const slot = state.value.indicatorSlot
    ? '\n  <template #indicator="{ state }">\n    <span v-if="state === \'indeterminate\'" aria-hidden="true">−</span>\n    <span v-else aria-hidden="true">✓</span>\n  </template>\n'
    : ''
  return `<Checkbox\n  ${attrs.join('\n  ')}\n>${slot}</Checkbox>`
}
function handleUpdate(value: unknown) {
  eventLog.value = String(value)
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({
        name: 'CheckboxPlaygroundPreview',
        components: { Checkbox },
        setup: () => ({
          value: ref(
            state.value.customValues
              ? 'no'
              : state.value.value === 'indeterminate'
                ? 'indeterminate'
                : state.value.value === 'true',
          ),
          handleUpdate,
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
  state.value = {
    value: 'false',
    customValues: false,
    disabled: false,
    indicatorSlot: false,
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
    filename="CheckboxPlayground.vue"
    description="Configura el checkbox o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center">
        <div class="grid justify-items-center gap-3">
          <label class="flex items-center gap-3 text-sm"
            ><component :is="Preview" v-if="Preview" :key="previewKey" /><span
              >Opción seleccionable</span
            ></label
          >
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
            >Initial value<select
              v-model="state.value"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option value="false">false</option>
              <option value="true">true</option>
              <option value="indeterminate">indeterminate</option>
            </select></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.customValues" type="checkbox" /> Usar trueValue / falseValue
            personalizados</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slot y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.indicatorSlot" type="checkbox" /> Slot indicator</label
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
