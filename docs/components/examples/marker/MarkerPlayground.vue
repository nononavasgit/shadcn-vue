<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Marker } from '@/components/ui/Marker'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  variant: 'default',
  icon: false,
  status: false,
  shimmer: false,
  label: 'Marker content',
  useSlot: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const props = [
    state.value.variant !== 'default' && `variant="${state.value.variant}"`,
    state.value.icon && ':icon="{ name: \'check\' }"',
    state.value.status && ':status="true"',
    state.value.shimmer && ':shimmer="true"',
    !state.value.useSlot && `label="${state.value.label}"`,
  ]
    .filter(Boolean)
    .join(' ')
  return state.value.useSlot
    ? `<Marker${props ? ` ${props}` : ''}>${state.value.label}</Marker>`
    : `<Marker${props ? ` ${props}` : ''} />`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({ name: 'MarkerPlaygroundPreview', components: { Marker }, render }),
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
    variant: 'default',
    icon: false,
    status: false,
    shimmer: false,
    label: 'Marker content',
    useSlot: false,
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
    filename="MarkerPlayground.vue"
    description="Prueba el elemento raíz, sus variantes y el efecto shimmer de Marker."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-40 place-items-center px-8">
        <component :is="Preview" v-if="Preview" :key="previewKey" />
      </div>
    </template>
    <template #controls>
      <div class="grid gap-4">
        <label class="grid gap-1 text-xs"
          >Label<input
            v-model="state.label"
            class="rounded-md border bg-background px-3 py-2 text-sm"
        /></label>
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.icon" type="checkbox" /> Icono</label
        >
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.status" type="checkbox" /> Status</label
        >
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.shimmer" type="checkbox" /> Shimmer</label
        >
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.useSlot" type="checkbox" /> Usar slot default</label
        >
        <label class="grid gap-1 text-xs"
          >Variant<select
            v-model="state.variant"
            class="rounded-md border bg-background px-2 py-2 text-sm"
          >
            <option>default</option>
            <option>border</option>
            <option>separator</option>
          </select></label
        >
      </div>
    </template>
  </ComponentPlayground>
</template>
