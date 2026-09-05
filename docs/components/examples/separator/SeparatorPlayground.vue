<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Separator } from '@/components/ui/Separator'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({ orientation: 'horizontal', decorative: true, slot: false, attrs: false })
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const attributes = [
    state.value.orientation !== 'horizontal' && `orientation="${state.value.orientation}"`,
    !state.value.decorative && ':decorative="false"',
    state.value.attrs && 'class="bg-primary" aria-label="Separador de contenido"',
  ].filter(Boolean)
  return state.value.slot
    ? `<Separator${attributes.length ? `\n  ${attributes.join('\n  ')}` : ''}>\n  <span class="sr-only">Fin de la sección</span>\n</Separator>`
    : `<Separator${attributes.length ? ` ${attributes.join(' ')}` : ''} />`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({ name: 'SeparatorPlaygroundPreview', components: { Separator }, render }),
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
  state.value = { orientation: 'horizontal', decorative: true, slot: false, attrs: false }
  syncFromControls()
}
watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="SeparatorPlayground.vue"
    description="Configura el separador o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8">
        <div
          v-if="state.orientation === 'vertical'"
          class="flex h-10 items-center justify-center gap-4"
        >
          <span class="text-sm">Anterior</span>
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <span class="text-sm">Siguiente</span>
        </div>
        <div v-else class="w-full max-w-md">
          <span class="mb-3 block text-center text-sm">Contenido separado</span>
          <component :is="Preview" v-if="Preview" :key="previewKey" />
        </div>
      </div>
    </template>
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
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.decorative" type="checkbox" /> Decorative</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slot y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.slot" type="checkbox" /> default</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
