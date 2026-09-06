<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef } from 'vue'
import { Autocomplete as BaseAutocomplete } from '@/components/ui/Autocomplete'
import ComponentPlayground from '../../ComponentPlayground.vue'

const initialCode = `<Autocomplete\n  v-model:value="value"\n  :icon="iconEnabled ? { name: 'search' } : undefined"\n  :auto-focus="autoFocus"\n  :placeholder="placeholder"\n  :disabled="disabled"\n/>`
const uiCode = `  :ui="{ anchor: () => ({ class: 'border-primary' }), item: () => ({ class: 'font-medium' }) }"`
const editorCode = ref(initialCode)
const value = ref('Apple')
const autoFocus = ref(false)
const placeholder = ref('')
const disabled = ref(false)
const iconEnabled = ref(false)
const uiEnabled = ref(false)
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
        setup: () => ({ value, autoFocus, placeholder, disabled, iconEnabled }),
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
  value.value = 'Apple'
  autoFocus.value = false
  placeholder.value = ''
  disabled.value = false
  iconEnabled.value = false
  uiEnabled.value = false
  applyCode()
}

function toggleUi() {
  const lines = editorCode.value.split('\n').filter((line) => !line.includes(':ui='))
  if (uiEnabled.value) lines.splice(lines.length - 1, 0, uiCode)
  editorCode.value = lines.join('\n')
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
      <div class="grid gap-3">
        <label class="grid gap-1 text-sm">
          Valor
          <select v-model="value" class="rounded-md border bg-background px-3 py-2">
            <option value="">Sin valor</option>
            <option value="Apple">Apple</option>
            <option value="Banana">Banana</option>
            <option value="Carrots">Carrots</option>
          </select>
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input v-model="uiEnabled" type="checkbox" @change="toggleUi" />
          Personalizar <code>ui</code>
        </label>
        <label class="grid gap-1 text-sm">
          Placeholder
          <input v-model="placeholder" class="rounded-md border bg-background px-3 py-2" />
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input v-model="autoFocus" type="checkbox" /> Auto focus
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input v-model="disabled" type="checkbox" /> Disabled
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input v-model="iconEnabled" type="checkbox" /> Icono
        </label>
        <p class="text-sm text-muted-foreground">
          Edita el código para probar los resolvers de <code>ui</code>.
        </p>
      </div>
    </template>
  </ComponentPlayground>
</template>
