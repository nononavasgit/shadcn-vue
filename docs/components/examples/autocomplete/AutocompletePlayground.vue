<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef } from 'vue'
import { Autocomplete as BaseAutocomplete } from '@/components/ui/Autocomplete'
import ComponentPlayground from '../../ComponentPlayground.vue'

const initialCode = `<Autocomplete
  :ui="{ anchor: () => ({ class: 'border-primary' }), item: () => ({ class: 'font-medium' }) }"
/>`
const editorCode = ref(initialCode)
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Autocomplete(?=[\s/>])/g, '<PlaygroundAutocomplete')
        .replaceAll('</Autocomplete>', '</PlaygroundAutocomplete>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'AutocompletePlaygroundPreview',
        components: { PlaygroundAutocomplete: BaseAutocomplete },
        render,
      }),
    )
    appliedCode.value = editorCode.value
    previewKey.value++
  } catch (error) {
    editorError.value = error instanceof Error ? error.message : String(error)
  }
}

function reset() {
  editorCode.value = initialCode
  applyCode()
}

applyCode()
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="AutocompletePlayground.vue"
    description="Prueba y edita la composición del Autocomplete y su prop ui."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-80 place-items-center px-8">
        <component :is="Preview" v-if="Preview" :key="previewKey" />
      </div>
    </template>
    <template #controls>
      <p class="text-sm text-muted-foreground">
        Edita el código para probar los resolvers de <code>ui</code>.
      </p>
    </template>
  </ComponentPlayground>
</template>
