<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Link as BaseLink } from '@/components/ui/Link'
import ComponentPlayground from '../../ComponentPlayground.vue'

const destinations = ['internal', 'external', 'none']
const variants = ['solid', 'outline', 'plain', 'subtle', 'soft', 'link']
const severities = ['primary', 'secondary', 'warning', 'success', 'error']
const sizes = ['xs', 'sm', 'md', 'lg']
const icons = ['', 'arrowRight', 'chevronRight', 'externalLink', 'file', 'info']

const state = ref({
  destination: 'internal',
  internalTo: '/button',
  externalTo: 'https://example.com',
  replace: false,
  label: 'Ir a Button',
  variant: 'link',
  severity: 'primary',
  size: 'md',
  rounded: false,
  square: false,
  raised: false,
  color: '',
  icon: 'chevronRight',
  trailingIcon: '',
  defaultSlot: false,
  leadingSlot: false,
  trailingSlot: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const clickLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function getDestination() {
  if (state.value.destination === 'internal') return state.value.internalTo
  if (state.value.destination === 'external') return state.value.externalTo
  return ''
}

function generateSlots() {
  const slots: string[] = []
  if (state.value.leadingSlot)
    slots.push(`  <template #leading><span aria-hidden="true">→</span></template>`)
  if (state.value.defaultSlot) slots.push(`  <template #default>Contenido personalizado</template>`)
  if (state.value.trailingSlot)
    slots.push(`  <template #trailing><span aria-hidden="true">↗</span></template>`)
  return slots
}

function generateCode() {
  const destination = getDestination()
  const props = [
    destination && `to="${destination}"`,
    `:replace="${state.value.replace}"`,
    state.value.label && `label="${state.value.label}"`,
    `variant="${state.value.variant}"`,
    `severity="${state.value.severity}"`,
    `size="${state.value.size}"`,
    `:rounded="${state.value.rounded}"`,
    `:square="${state.value.square}"`,
    `:raised="${state.value.raised}"`,
    state.value.color && `color="${state.value.color}"`,
    state.value.icon && `:icon="{ name: '${state.value.icon}' }"`,
    state.value.trailingIcon && `:trailing-icon="{ name: '${state.value.trailingIcon}' }"`,
    state.value.attrs && 'class="rounded-lg" data-state="ready" aria-label="Navegación"',
    '@click="logClick"',
  ].filter(Boolean)
  const slots = generateSlots()
  const opening = `<Link\n  ${props.join('\n  ')}`
  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</Link>` : `${opening}\n/>`
}

function logClick(event: MouseEvent) {
  event.preventDefault()
  clickLog.value = `click: ${getDestination() || 'sin destino'}`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replace(/<Link(?=[\s/>])/g, '<PlaygroundLink')
        .replaceAll('</Link>', '</PlaygroundLink>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'LinkPlaygroundPreview',
        components: { PlaygroundLink: BaseLink },
        setup: () => ({ logClick }),
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
    destination: 'internal',
    internalTo: '/button',
    externalTo: 'https://example.com',
    replace: false,
    label: 'Ir a Button',
    variant: 'link',
    severity: 'primary',
    size: 'md',
    rounded: false,
    square: false,
    raised: false,
    color: '',
    icon: 'chevronRight',
    trailingIcon: '',
    defaultSlot: false,
    leadingSlot: false,
    trailingSlot: false,
    attrs: false,
  }
  clickLog.value = ''
  syncFromControls()
}

watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="LinkPlayground.vue"
    description="Configura el destino, el aspecto heredado de Button y los slots del enlace."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8 py-6">
        <div class="grid justify-items-center gap-4">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <div class="grid gap-1 text-center text-xs text-muted-foreground">
            <span>Destino: {{ getDestination() || 'sin destino' }}</span>
            <span v-if="clickLog">{{ clickLog }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Props del enlace</legend>
          <label class="grid gap-1 text-xs"
            >Destino<select
              v-model="state.destination"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in destinations" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="flex items-center gap-2 self-end text-sm"
            ><input v-model="state.replace" type="checkbox" /> Replace</label
          >
          <label v-if="state.destination === 'internal'" class="col-span-2 grid gap-1 text-xs"
            >To interno<input
              v-model="state.internalTo"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label v-if="state.destination === 'external'" class="col-span-2 grid gap-1 text-xs"
            >URL externa<input
              v-model="state.externalTo"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="col-span-2 grid gap-1 text-xs"
            >Label<input
              v-model="state.label"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Props heredadas de Button</legend>
          <label class="grid gap-1 text-xs"
            >Variant<select
              v-model="state.variant"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in variants" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Severity<select
              v-model="state.severity"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in severities" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Size<select
              v-model="state.size"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in sizes" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="#7c3aed"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Icono<select
              v-model="state.icon"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="icon in icons" :key="icon" :value="icon">{{ icon || 'none' }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Trailing icon<select
              v-model="state.trailingIcon"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="icon in icons" :key="icon" :value="icon">{{ icon || 'none' }}</option>
            </select></label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.rounded" type="checkbox" /> Rounded</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.square" type="checkbox" /> Square</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.raised" type="checkbox" /> Raised</label
          >
        </fieldset>
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slots</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.defaultSlot" type="checkbox" /> Default</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.leadingSlot" type="checkbox" /> Leading</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.trailingSlot" type="checkbox" /> Trailing</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Atributos HTML</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> class, data-state y aria-label</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
