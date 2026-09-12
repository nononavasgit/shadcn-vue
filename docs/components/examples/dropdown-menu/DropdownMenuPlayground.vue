<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { DropdownMenu as BaseDropdownMenu } from '@/components/ui/DropdownMenu'
import ComponentPlayground from '../../ComponentPlayground.vue'

const initialState = () => ({
  open: false,
  modal: true,
  disabled: false,
  customSlot: false,
  attrs: false,
})
const state = ref(initialState())
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const props = [
    'v-model:open="open"',
    !state.value.modal && ':modal="false"',
    state.value.disabled && ':disabled="true"',
    state.value.attrs && 'aria-label="Opciones" class="border-primary"',
  ].filter(Boolean)
  const slot = state.value.customSlot
    ? '\n  <button type="button" class="rounded-full border p-2" aria-label="Opciones">☰</button>\n'
    : '\n  <button type="button" class="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full border bg-white text-grass11 shadow-sm outline-none hover:bg-stone-50 focus:shadow-[0_0_0_2px] focus:shadow-black" aria-label="Opciones">☰</button>\n'
  return `<DropdownMenu${props.length ? `\n  ${props.join('\n  ')}` : ''}>${slot}</DropdownMenu>`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replaceAll('<DropdownMenu', '<PlaygroundDropdownMenu')
        .replaceAll('</DropdownMenu>', '</PlaygroundDropdownMenu>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'DropdownMenuPlaygroundPreview',
        components: { PlaygroundDropdownMenu: BaseDropdownMenu },
        setup: () => ({ open: ref(state.value.open) }),
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
  state.value = initialState()
  syncFromControls()
}
watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="DropdownMenuPlayground.vue"
    description="Prueba el estado y el trigger del menú desplegable."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-48 place-items-center">
        <component :is="Preview" v-if="Preview" :key="previewKey" /></div
    ></template>
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.modal" type="checkbox" /> Modal</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label>
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Contenido y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.customSlot" type="checkbox" /> Trigger personalizado</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
