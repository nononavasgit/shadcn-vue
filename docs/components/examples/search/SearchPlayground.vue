<script setup lang="ts">
import { SearchIcon } from '@lucide/vue'
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Button as BaseButton } from '@/components/ui/Button'
import { Input as BaseInput } from '@/components/ui/Input'
import { Search as BaseSearch } from '@/components/ui/Search'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({ attrs: false })
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const submittedQuery = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const attrs = [
    '@submit.prevent="handleSubmit"',
    'aria-label="Buscar componentes"',
    'class="flex items-center gap-2"',
    state.value.attrs && 'data-state="ready"',
  ].filter(Boolean)
  const leading = '  <template #leading><SearchIcon class="size-4" /></template>\n'
  return `<Search\n  ${attrs.join('\n  ')}\n>\n  <Input\n    v-model:value="query"\n    type="search"\n    placeholder="Buscar componentes"\n  >\n${leading}  </Input>\n  <Button type="submit">Buscar</Button>\n</Search>`
}
function handleSubmit() {
  submittedQuery.value = 'Búsqueda enviada'
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Search(?=[\s/>])/g, '<PlaygroundSearch')
        .replaceAll('</Search>', '</PlaygroundSearch>')
        .replace(/<Button(?=[\s/>])/g, '<PlaygroundButton')
        .replaceAll('</Button>', '</PlaygroundButton>')
        .replace(/<Input(?=[\s/>])/g, '<PlaygroundInput')
        .replaceAll('</Input>', '</PlaygroundInput>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'SearchPlaygroundPreview',
        components: {
          PlaygroundSearch: BaseSearch,
          PlaygroundInput: BaseInput,
          PlaygroundButton: BaseButton,
          SearchIcon,
        },
        setup: () => ({ query: ref(''), handleSubmit }),
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
  state.value = { attrs: false }
  submittedQuery.value = ''
  syncFromControls()
}
watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="SearchPlayground.vue"
    description="Configura el formulario de búsqueda o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center px-8">
        <div class="grid w-full max-w-xl gap-3">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <p v-if="submittedQuery" class="text-sm text-muted-foreground">{{ submittedQuery }}</p>
        </div>
      </div></template
    >
    <template #controls
      ><div class="grid gap-5">
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
