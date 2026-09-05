<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Splitter } from '@/components/ui/Splitter'
import ComponentPlayground from '../../ComponentPlayground.vue'

const state = ref({
  direction: 'horizontal',
  firstSize: 50,
  secondSize: 50,
  keyboardResizeBy: 5,
  autoSaveId: '',
  tabindex: 0,
  disabled: false,
  customSlots: true,
  ui: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  const props = [
    `:items="[{ id: 'main', slot: 'main', defaultSize: ${state.value.firstSize}, minSize: 20 }, { id: 'side', slot: 'side', defaultSize: ${state.value.secondSize}, minSize: 20, collapsible: true, collapsedSize: 5 }]"`,
    state.value.direction !== 'horizontal' && `direction="${state.value.direction}"`,
    `:keyboard-resize-by="${state.value.keyboardResizeBy}"`,
    state.value.autoSaveId && `auto-save-id="${state.value.autoSaveId}"`,
    `:tabindex="${state.value.tabindex}"`,
    state.value.disabled && 'disabled',
    ':hit-area-margins="{ mouse: 10, touch: 10 }"',
    state.value.ui &&
      `:ui="{ panel: ({ first }) => ({ class: first ? 'bg-muted/20' : 'bg-primary/5' }), resizeHandle: () => ({ class: 'bg-primary/20' }) }"`,
    state.value.attrs && 'class="rounded-md border" aria-label="Paneles redimensionables"',
    '@layout="handleLayout"',
    '@collapse="handleCollapse"',
    '@expand="handleExpand"',
    '@resize="handleResize"',
  ].filter(Boolean)
  const slots = state.value.customSlots
    ? `\n  <template #panel-main="{ index, layout }">\n    <div class="grid h-full place-items-center p-4 text-sm">Panel principal · {{ index + 1 }} · {{ layout.length }} paneles</div>\n  </template>\n  <template #panel-side>\n    <div class="grid h-full place-items-center bg-muted/40 p-4 text-sm">Panel lateral</div>\n  </template>\n  <template #handle>\n    <span class="h-8 w-1 rounded-full bg-border" />\n  </template>\n`
    : ''
  return `<Splitter\n  ${props.join('\n  ')}\n>${slots}</Splitter>`
}
function handleLayout(layout: number[]) {
  eventLog.value = `layout: ${layout.map((size) => `${Math.round(size)}%`).join(' · ')}`
}
function handleCollapse() {
  eventLog.value = 'collapse'
}
function handleExpand() {
  eventLog.value = 'expand'
}
function handleResize(size: number) {
  eventLog.value = `resize: ${Math.round(size)}%`
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({
        name: 'SplitterPlaygroundPreview',
        components: { Splitter },
        setup: () => ({ handleLayout, handleCollapse, handleExpand, handleResize }),
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
    direction: 'horizontal',
    firstSize: 50,
    secondSize: 50,
    keyboardResizeBy: 5,
    autoSaveId: '',
    tabindex: 0,
    disabled: false,
    customSlots: true,
    ui: false,
    attrs: false,
  }
  eventLog.value = ''
  syncFromControls()
}
watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="SplitterPlayground.vue"
    description="Configura los paneles redimensionables o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center px-8">
        <div
          :class="state.direction === 'vertical' ? 'h-64 w-full max-w-xl' : 'h-56 w-full max-w-xl'"
        >
          <component
            :is="Preview"
            v-if="Preview"
            :key="previewKey"
            class="h-full w-full overflow-hidden rounded-md border bg-muted/20"
          />
        </div>
        <p v-if="eventLog" class="mt-3 font-mono text-xs text-muted-foreground">{{ eventLog }}</p>
      </div></template
    >
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Layout</legend>
          <label class="grid gap-1 text-xs"
            >Direction<select
              v-model="state.direction"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>horizontal</option>
              <option>vertical</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Panel principal<input
              v-model.number="state.firstSize"
              type="number"
              min="20"
              max="80"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Panel lateral<input
              v-model.number="state.secondSize"
              type="number"
              min="20"
              max="80"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Keyboard resize by<input
              v-model.number="state.keyboardResizeBy"
              type="number"
              min="1"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Auto save id<input
              v-model="state.autoSaveId"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Props, slots y eventos</legend>
          <label class="grid gap-1 text-xs"
            >Tabindex<input
              v-model.number="state.tabindex"
              type="number"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.customSlots" type="checkbox" /> Slots de paneles y handle</label
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
