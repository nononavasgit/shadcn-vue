<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  src: '',
  label: 'AL',
  size: 'md',
  shape: 'rounded',
  icon: false,
  fallback: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}
function generateCode() {
  const attributes = [
    state.value.src && `src="${escapeAttribute(state.value.src)}"`,
    state.value.label && `label="${escapeAttribute(state.value.label)}"`,
    `size="${state.value.size}"`,
    `shape="${state.value.shape}"`,
    state.value.icon && ':icon="{ name: \'user\' }"',
    state.value.attrs && 'class="ring-2 ring-primary ring-offset-2" aria-label="Perfil de usuario"',
  ].filter(Boolean)
  return state.value.fallback
    ? `<Avatar ${attributes.join(' ')}>\n  <template #fallback>\n    <span class="font-semibold">NA</span>\n  </template>\n</Avatar>`
    : `<Avatar ${attributes.join(' ')} />`
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({ name: 'AvatarPlaygroundPreview', components: { Avatar }, render }),
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
    src: '',
    label: 'AL',
    size: 'md',
    shape: 'rounded',
    icon: false,
    fallback: false,
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
    filename="AvatarPlayground.vue"
    description="Configura el avatar o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center">
        <component :is="Preview" v-if="Preview" :key="previewKey" /></div
    ></template>
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Contenido</legend>
          <label class="grid gap-1 text-xs"
            >Label<input
              v-model="state.label"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Src<input
              v-model="state.src"
              placeholder="https://github.com/shadcn.png"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.icon" type="checkbox" /> Icon</label
          >
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Apariencia</legend>
          <label class="grid gap-1 text-xs"
            >Size<select
              v-model="state.size"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>xs</option>
              <option>sm</option>
              <option>md</option>
              <option>lg</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Shape<select
              v-model="state.shape"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>rounded</option>
              <option>square</option>
            </select></label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slots y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.fallback" type="checkbox" /> fallback</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
