<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Bubble } from '@/components/ui/Bubble'
import ComponentPlayground from '../../ComponentPlayground.vue'

const aligns = ['start', 'end']
const variants = ['solid', 'outline', 'plain', 'subtle', 'soft', 'muted']
const severities = ['primary', 'secondary', 'warning', 'success', 'error']
const elements = ['div', 'button', 'a']
const state = ref({
  as: 'div',
  asChild: false,
  align: 'start',
  variant: 'solid',
  severity: 'primary',
  color: '',
  reactionSide: 'bottom',
  reactionAlign: 'end',
  reactions: true,
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
    `as="${state.value.as}"`,
    state.value.asChild && 'as-child',
    `align="${state.value.align}"`,
    `variant="${state.value.variant}"`,
    `severity="${state.value.severity}"`,
    state.value.color && `color="${state.value.color}"`,
    `side-reaction="${state.value.reactionSide}"`,
    `align-reaction="${state.value.reactionAlign}"`,
    state.value.ui &&
      `:ui="{ root: () => ({ class: 'ring-2 ring-primary' }), reactions: () => ({ class: 'bg-primary text-primary-foreground' }) }"`,
    state.value.attrs && 'aria-label="Mensaje conversacional"',
  ].filter(Boolean)
  const reactions = state.value.reactions
    ? '\n  <template #reactions><span>👍</span></template>'
    : ''
  const content = state.value.asChild
    ? '\n  <a href="#bubble">Mensaje de ejemplo</a>\n'
    : '\n  Mensaje de ejemplo\n'
  return `<Bubble ${attrs.join(' ')}>${reactions}${content}</Bubble>`
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({
        name: 'BubblePlaygroundPreview',
        components: { Bubble },
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
    as: 'div',
    asChild: false,
    align: 'start',
    variant: 'solid',
    severity: 'primary',
    color: '',
    reactionSide: 'bottom',
    reactionAlign: 'end',
    reactions: true,
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
    filename="BubblePlayground.vue"
    description="Configura la alineacion, variante y reacciones de la burbuja."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center p-8">
        <div class="flex w-full max-w-md flex-col gap-8">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
        </div></div
    ></template>
    <template #controls
      ><div class="grid gap-5">
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >As<select v-model="state.as" class="rounded-md border bg-background px-2 py-2 text-sm">
              <option v-for="option in elements" :key="option">{{ option }}</option>
            </select></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.asChild" type="checkbox" /> As child</label
          ><label class="grid gap-1 text-xs"
            >Align<select
              v-model="state.align"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in aligns" :key="option">{{ option }}</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Variant<select
              v-model="state.variant"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in variants" :key="option">{{ option }}</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Severity<select
              v-model="state.severity"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in severities" :key="option">{{ option }}</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="#7c3aed"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="grid gap-1 text-xs"
            >Reactions side<select
              v-model="state.reactionSide"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>top</option>
              <option>bottom</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Reactions align<select
              v-model="state.reactionAlign"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>start</option>
              <option>end</option>
            </select></label
          ><label class="col-span-2 flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slots y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.reactions" type="checkbox" /> Reactions</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div></template
    >
  </ComponentPlayground>
</template>
