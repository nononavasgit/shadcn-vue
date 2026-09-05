<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import ComponentPlayground from '../../ComponentPlayground.vue'

const sizes = ['sm', 'md', 'lg']
const variants = ['solid', 'outline', 'plain', 'subtle', 'soft']
const severities = ['primary', 'secondary', 'warning', 'success', 'error']
const state = ref({
  label: 'Activo',
  size: 'md',
  variant: 'solid',
  severity: 'primary',
  color: '',
  icon: false,
  trailingIcon: false,
  defaultSlot: false,
  leadingSlot: false,
  trailingSlot: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function generateCode() {
  const attributes = [
    `label="${escapeAttribute(state.value.label)}"`,
    `size="${state.value.size}"`,
    `variant="${state.value.variant}"`,
    `severity="${state.value.severity}"`,
    state.value.color && `color="${escapeAttribute(state.value.color)}"`,
    state.value.icon && `:icon="{ name: 'check' }"`,
    state.value.trailingIcon && `:trailing-icon="{ name: 'chevronRight' }"`,
    state.value.attrs && 'class="uppercase" data-state="active" aria-label="Estado activo"',
  ].filter(Boolean)
  const slots = [
    state.value.defaultSlot && '  <template #default>Contenido personalizado</template>',
    state.value.leadingSlot &&
      '  <template #leading><Icon name="check" aria-hidden="true" /></template>',
    state.value.trailingSlot &&
      '  <template #trailing><Icon name="chevronRight" aria-hidden="true" /></template>',
  ].filter(Boolean)
  return slots.length
    ? `<Badge\n  ${attributes.join('\n  ')}\n>\n${slots.join('\n')}\n</Badge>`
    : `<Badge ${attributes.join(' ')} />`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({ name: 'BadgePlaygroundPreview', components: { Badge, Icon }, render }),
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
    label: 'Activo',
    size: 'md',
    variant: 'solid',
    severity: 'primary',
    color: '',
    icon: false,
    trailingIcon: false,
    defaultSlot: false,
    leadingSlot: false,
    trailingSlot: false,
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
    filename="BadgePlayground.vue"
    description="Configura el badge o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview
      ><div class="grid min-h-84 place-items-center">
        <component :is="Preview" v-if="Preview" :key="previewKey" /></div
    ></template>
    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Contenido</legend>
          <label class="grid gap-1 text-xs"
            >Label<input
              v-model="state.label"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.icon" type="checkbox" /> Icon</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.trailingIcon" type="checkbox" /> Trailing icon</label
          >
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Apariencia</legend>
          <label class="grid gap-1 text-xs"
            >Size<select
              v-model="state.size"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="size in sizes" :key="size">{{ size }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Variant<select
              v-model="state.variant"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="variant in variants" :key="variant">{{ variant }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Severity<select
              v-model="state.severity"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="severity in severities" :key="severity">{{ severity }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="#7c3aed"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slots</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.defaultSlot" type="checkbox" /> default</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.leadingSlot" type="checkbox" /> leading</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.trailingSlot" type="checkbox" /> trailing</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
