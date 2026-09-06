<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Marker } from '@/components/ui/Marker'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({ as: 'div', asChild: false, variant: 'default' })
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const props = [
    state.value.as !== 'div' && `as="${state.value.as}"`,
    state.value.asChild && ':as-child="true"',
    state.value.variant !== 'default' && `variant="${state.value.variant}"`,
  ]
    .filter(Boolean)
    .join(' ')
  return `<Marker${props ? ` ${props}` : ''}>Marker content</Marker>`
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
  state.value = { as: 'div', asChild: false, variant: 'default' }
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
    description="Prueba el elemento raíz y la composición asChild de Marker."
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
          >As<select v-model="state.as" class="rounded-md border bg-background px-2 py-2 text-sm">
            <option>div</option>
            <option>section</option>
            <option>article</option>
          </select></label
        >
        <label class="flex items-center gap-2 text-sm"
          ><input v-model="state.asChild" type="checkbox" /> asChild</label
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
