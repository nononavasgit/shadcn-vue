<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  color: '#22c55e',
  size: '3xl',
  position: 'top-right',
  show: true,
  inset: false,
  standalone: false,
  avatar: true,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const updateCount = ref(0)
const previewKey = ref(0)
const Preview = shallowRef()
function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}
function generateCode() {
  const attrs = [
    state.value.color && `color="${escapeAttribute(state.value.color)}"`,
    `size="${state.value.size}"`,
    `position="${state.value.position}"`,
    !state.value.show && ':show="false"',
    state.value.inset && 'inset',
    state.value.standalone && 'standalone',
    state.value.attrs && 'class="ring-2 ring-primary" aria-label="Estado en línea"',
    '@update:show="handleShow"',
  ].filter(Boolean)
  const content = state.value.avatar
    ? '<Avatar label="JD" />'
    : '<span class="flex size-10 items-center justify-center rounded-lg bg-muted text-xs">JD</span>'
  return `<Chip\n  ${attrs.join('\n  ')}\n>\n  ${content}\n</Chip>`
}
function handleShow() {
  updateCount.value++
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({
        name: 'ChipPlaygroundPreview',
        components: { Chip, Avatar },
        setup: () => ({ handleShow }),
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
  state.value = {
    color: '#22c55e',
    size: '3xl',
    position: 'top-right',
    show: true,
    inset: false,
    standalone: false,
    avatar: true,
    attrs: false,
  }
  updateCount.value = 0
  syncFromControls()
}
watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="ChipPlayground.vue"
    description="Configura el chip o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center">
        <div class="grid justify-items-center gap-4">
          <div class="relative inline-flex">
            <component :is="Preview" v-if="Preview" :key="previewKey" />
          </div>
          <p v-if="updateCount" class="text-center text-sm text-muted-foreground">
            update:show emitido {{ updateCount }} vez.
          </p>
        </div>
      </div></template
    >
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="#22c55e"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Size<select
              v-model="state.size"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>3xs</option>
              <option>2xs</option>
              <option>xs</option>
              <option>sm</option>
              <option>md</option>
              <option>lg</option>
              <option>xl</option>
              <option>2xl</option>
              <option>3xl</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Position<select
              v-model="state.position"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>top-right</option>
              <option>bottom-right</option>
              <option>top-left</option>
              <option>bottom-left</option>
            </select></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.show" type="checkbox" /> Show</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slot y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.avatar" type="checkbox" /> Usar Avatar en el slot</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.inset" type="checkbox" /> Inset</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.standalone" type="checkbox" /> Standalone</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
