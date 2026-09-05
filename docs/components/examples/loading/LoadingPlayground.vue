<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Loading } from '@/components/ui/Loading'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  loading: true,
  icon: false,
  iconName: 'spinner',
  defaultSlot: true,
  loadingSlot: false,
  ui: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const props = [
    !state.value.loading && ':loading="false"',
    state.value.icon && `:icon="{ name: '${state.value.iconName}' }"`,
    state.value.ui &&
      `:ui="{ loading: ({ loading }) => ({ class: loading ? 'min-h-24 rounded-lg border border-dashed border-primary/50 bg-primary/5' : '' }), content: () => ({ class: 'rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4' }) }"`,
    state.value.attrs &&
      'class="rounded-lg border bg-muted/20 p-4" aria-label="Cargando contenido"',
  ].filter(Boolean)
  const slots = [
    state.value.loadingSlot &&
      '  <template #loading="{ loading }"><span class="text-sm">Cargando: {{ loading }}</span></template>',
    state.value.defaultSlot &&
      '  <template #default><span class="text-sm font-medium">Contenido cargado</span></template>',
  ].filter(Boolean)
  return slots.length
    ? `<Loading${props.length ? `\n  ${props.join('\n  ')}` : ''}>\n${slots.join('\n')}\n</Loading>`
    : `<Loading${props.length ? ` ${props.join(' ')}` : ''} />`
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({ name: 'LoadingPlaygroundPreview', components: { Loading }, render }),
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
    loading: true,
    icon: false,
    iconName: 'spinner',
    defaultSlot: true,
    loadingSlot: false,
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
    filename="LoadingPlayground.vue"
    description="Configura el estado de carga o edita directamente su template."
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
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.loading" type="checkbox" /> Loading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.icon" type="checkbox" /> Icon personalizado</label
          ><label v-if="state.icon" class="grid gap-1 text-xs"
            >Icon name<input
              v-model="state.iconName"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slots y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.defaultSlot" type="checkbox" /> default</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.loadingSlot" type="checkbox" /> loading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
