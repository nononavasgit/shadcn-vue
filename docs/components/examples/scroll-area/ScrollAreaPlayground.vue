<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { ScrollArea } from '@/components/ui/ScrollArea'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  type: 'hover',
  orientation: 'vertical',
  scrollHideDelay: 600,
  forceMount: false,
  ui: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const attrs = [
    state.value.type !== 'hover' && `type="${state.value.type}"`,
    state.value.orientation !== 'vertical' && `orientation="${state.value.orientation}"`,
    state.value.scrollHideDelay !== 600 && `:scroll-hide-delay="${state.value.scrollHideDelay}"`,
    state.value.forceMount && 'force-mount',
    state.value.ui &&
      `:ui="{ viewport: () => ({ class: 'scroll-smooth' }), verticalScrollbar: () => ({ class: 'bg-primary/5' }), horizontalScrollbar: () => ({ class: 'bg-primary/5' }), thumbVertical: () => ({ class: 'bg-primary/60' }), thumbHorizontal: () => ({ class: 'bg-primary/60' }), corner: () => ({ class: 'bg-primary/20' }) }"`,
    state.value.attrs && 'class="rounded-md border bg-muted/20" aria-label="Contenido desplazable"',
  ].filter(Boolean)
  const content =
    state.value.orientation === 'both'
      ? '<div class="grid h-[480px] w-[720px] gap-2 p-3"><span v-for="row in 12" :key="row" class="rounded border bg-background p-2 text-sm">Fila de contenido {{ row }}</span></div>'
      : state.value.orientation === 'horizontal'
        ? '<div class="flex h-24 w-[720px] items-center gap-2 p-3"><span v-for="item in 12" :key="item" class="rounded border bg-background p-2 text-sm">Elemento {{ item }}</span></div>'
        : '<div class="grid min-h-[480px] gap-2 p-3"><span v-for="item in 12" :key="item" class="rounded border bg-background p-2 text-sm">Fila de contenido {{ item }}</span></div>'
  return `<ScrollArea${attrs.length ? `\n  ${attrs.join('\n  ')}` : ''}>\n  ${content}\n</ScrollArea>`
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({ name: 'ScrollAreaPlaygroundPreview', components: { ScrollArea }, render }),
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
    type: 'hover',
    orientation: 'vertical',
    scrollHideDelay: 600,
    forceMount: false,
    ui: false,
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
    filename="ScrollAreaPlayground.vue"
    description="Configura el área desplazable o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center px-8">
        <div class="h-48 w-full max-w-md">
          <component
            :is="Preview"
            v-if="Preview"
            :key="previewKey"
            class="h-full w-full rounded-md border bg-muted/20"
          />
        </div></div
    ></template>
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Type<select
              v-model="state.type"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>scroll</option>
              <option>always</option>
              <option>hover</option>
              <option>auto</option>
              <option>glimpse</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Orientation<select
              v-model="state.orientation"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>vertical</option>
              <option>horizontal</option>
              <option>both</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Scroll hide delay<input
              v-model.number="state.scrollHideDelay"
              type="number"
              min="0"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.forceMount" type="checkbox" /> Force mount</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">UI y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
