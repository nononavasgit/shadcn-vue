<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Icon } from '@/components/ui/Icon'
import ComponentPlayground from '../../ComponentPlayground.vue'

const iconNames = ['user', 'search', 'check', 'warning', 'success', 'error', 'info', 'save']
const sizes = ['xs', 'sm', 'md', 'lg']

const state = ref({ name: 'user', size: 'md', color: '', attrs: false })
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function generateCode() {
  return `<Icon name="${state.value.name}" size="${state.value.size}"${
    state.value.color ? ` color="${escapeAttribute(state.value.color)}"` : ''
  }${state.value.attrs ? ' class="text-primary" data-state="active" aria-label="Icono"' : ''} />`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({ name: 'IconPlaygroundPreview', components: { Icon }, render }),
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
  state.value = { name: 'user', size: 'md', color: '', attrs: false }
  syncFromControls()
}

watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="IconPlayground.vue"
    description="Configura el icono o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center">
        <component :is="Preview" v-if="Preview" :key="previewKey" /></div
    ></template>
    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Name<select
              v-model="state.name"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="name in iconNames" :key="name">{{ name }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Size<select
              v-model="state.size"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="size in sizes" :key="size">{{ size }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="#16a34a"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
