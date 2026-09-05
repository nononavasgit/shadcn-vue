<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Button as BaseButton } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({ orientation: 'horizontal', size: 'md', attrs: false })
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const attrs = [
    state.value.orientation !== 'horizontal' && `orientation="${state.value.orientation}"`,
    state.value.size !== 'md' && `size="${state.value.size}"`,
    state.value.attrs && 'class="rounded-lg border p-1" data-state="ready" aria-label="Acciones"',
  ].filter(Boolean)
  return `<ButtonGroup${attrs.length ? `\n  ${attrs.join('\n  ')}` : ''}>\n  <Button variant="outline">Anterior</Button>\n  <Button>Siguiente</Button>\n  <Button variant="outline">Finalizar</Button>\n</ButtonGroup>`
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Button(?=[\s/>])/g, '<PlaygroundButton')
        .replaceAll('</Button>', '</PlaygroundButton>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'ButtonGroupPlaygroundPreview',
        components: { ButtonGroup, PlaygroundButton: BaseButton },
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
  state.value = { orientation: 'horizontal', size: 'md', attrs: false }
  syncFromControls()
}
watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="ButtonGroupPlayground.vue"
    description="Configura el grupo de botones o edita directamente su template."
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
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Orientation<select
              v-model="state.orientation"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>horizontal</option>
              <option>vertical</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Size<select
              v-model="state.size"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>xs</option>
              <option>sm</option>
              <option>md</option>
              <option>lg</option>
            </select></label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
