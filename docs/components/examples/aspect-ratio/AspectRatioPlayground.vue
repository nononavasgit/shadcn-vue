<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { AspectRatio } from '@/components/ui/AspectRatio'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({ ratio: '16 / 9', attrs: false })
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const attrs = [
    `:ratio="${state.value.ratio}"`,
    state.value.attrs && 'class="overflow-hidden rounded-lg border" data-state="ready"',
  ].filter(Boolean)
  return `<AspectRatio\n  ${attrs.join('\n  ')}\n>\n  <div class="grid size-full place-items-center rounded-md bg-primary text-primary-foreground">\n    Contenido\n  </div>\n</AspectRatio>`
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({
        name: 'AspectRatioPlaygroundPreview',
        components: { AspectRatio },
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
  state.value = { ratio: '16 / 9', attrs: false }
  syncFromControls()
}
watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="AspectRatioPlayground.vue"
    description="Configura la relación de aspecto o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center px-8">
        <div class="w-full max-w-md">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
        </div></div
    ></template>
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Ratio<select
              v-model="state.ratio"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>16 / 9</option>
              <option>4 / 3</option>
              <option>1</option>
              <option>2</option>
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
