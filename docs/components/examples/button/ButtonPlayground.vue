<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Button as BaseButton } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import ComponentPlayground from '../../ComponentPlayground.vue'

const variants = ['solid', 'outline', 'plain', 'subtle', 'soft', 'link']
const severities = ['primary', 'secondary', 'warning', 'success', 'error']
const sizes = ['xs', 'sm', 'md', 'lg']
const state = ref({
  label: 'Guardar cambios',
  variant: 'solid',
  severity: 'primary',
  size: 'md',
  rounded: false,
  square: false,
  raised: false,
  loading: false,
  color: '',
  icon: false,
  trailingIcon: false,
  as: 'button',
  asChild: false,
  defaultSlot: false,
  leadingSlot: false,
  loadingSlot: false,
  trailingSlot: false,
  attrs: false,
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref<string[]>([])
const previewKey = ref(0)
const Preview = shallowRef()

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function generateCode() {
  const attributes = [
    !state.value.asChild && state.value.as !== 'button' && `as="${state.value.as}"`,
    !state.value.asChild && `label="${escapeAttribute(state.value.label)}"`,
    `variant="${state.value.variant}"`,
    `severity="${state.value.severity}"`,
    `size="${state.value.size}"`,
    state.value.rounded && 'rounded',
    state.value.square && 'square',
    state.value.raised && 'raised',
    state.value.loading && 'loading',
    state.value.color && `color="${escapeAttribute(state.value.color)}"`,
    state.value.icon && `:icon="{ name: 'save' }"`,
    state.value.trailingIcon && `:trailing-icon="{ name: 'chevronRight' }"`,
    state.value.asChild && 'as-child',
    state.value.attrs && 'class="uppercase" data-state="active" aria-label="Accion"',
    '@click="logClick"',
  ].filter(Boolean)
  const slots = [
    state.value.defaultSlot && '  <template #default>Contenido personalizado</template>',
    state.value.leadingSlot &&
      '  <template #leading><Icon name="save" aria-hidden="true" /></template>',
    state.value.loadingSlot && '  <template #loading><span>Cargando...</span></template>',
    state.value.trailingSlot &&
      '  <template #trailing><Icon name="chevronRight" aria-hidden="true" /></template>',
  ].filter(Boolean)
  if (state.value.asChild)
    return `<Button\n  ${attributes.join('\n  ')}\n>\n  <a href="#button-props">${escapeAttribute(state.value.label)}</a>${slots.length ? `\n${slots.join('\n')}` : ''}\n</Button>`
  return slots.length
    ? `<Button\n  ${attributes.join('\n  ')}\n>\n${slots.join('\n')}\n</Button>`
    : `<Button\n  ${attributes.join('\n  ')}\n/>`
}
function logClick() {
  eventLog.value.unshift('click')
  eventLog.value = eventLog.value.slice(0, 6)
}
function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      editorCode.value
        .replaceAll('<Button', '<PlaygroundButton')
        .replaceAll('</Button>', '</PlaygroundButton>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'ButtonPlaygroundPreview',
        components: { PlaygroundButton: BaseButton, Icon },
        setup: () => ({ logClick }),
        render,
      }),
    )
    appliedCode.value = editorCode.value
    eventLog.value = []
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
    label: 'Guardar cambios',
    variant: 'solid',
    severity: 'primary',
    size: 'md',
    rounded: false,
    square: false,
    raised: false,
    loading: false,
    color: '',
    icon: false,
    trailingIcon: false,
    as: 'button',
    asChild: false,
    defaultSlot: false,
    leadingSlot: false,
    loadingSlot: false,
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
    filename="ButtonPlayground.vue"
    description="Configura el boton o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center gap-4">
        <component :is="Preview" v-if="Preview" :key="previewKey" />
        <div v-if="eventLog.length" class="rounded-lg border bg-background p-3 text-left">
          <p class="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Eventos
          </p>
          <ol class="grid gap-1 font-mono text-xs">
            <li v-for="(event, index) in eventLog" :key="`${event}-${index}`">{{ event }}</li>
          </ol>
        </div>
      </div>
    </template>
    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Contenido</legend>
          <label class="grid gap-1 text-xs"
            >Label<input
              v-model="state.label"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.icon" type="checkbox" /> Icon</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.trailingIcon" type="checkbox" /> Trailing icon</label
          >
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Apariencia</legend>
          <label class="grid gap-1 text-xs"
            >Variant<select
              v-model="state.variant"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="variant in variants" :key="variant">{{ variant }}</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Severity<select
              v-model="state.severity"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="severity in severities" :key="severity">{{ severity }}</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Size<select
              v-model="state.size"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="size in sizes" :key="size">{{ size }}</option>
            </select></label
          ><label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="#7c3aed"
              class="rounded-md border bg-background px-3 py-2 text-sm" /></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.rounded" type="checkbox" /> Rounded</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.square" type="checkbox" /> Square</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.raised" type="checkbox" /> Raised</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.loading" type="checkbox" /> Loading</label
          >
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Elemento</legend>
          <label class="grid gap-1 text-xs"
            >As<select
              v-model="state.as"
              :disabled="state.asChild"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>button</option>
              <option>a</option>
              <option>div</option>
            </select></label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.asChild" type="checkbox" /> As child</label
          >
        </fieldset>
        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Slots y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.defaultSlot" type="checkbox" /> default</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.leadingSlot" type="checkbox" /> leading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.loadingSlot" type="checkbox" /> loading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.trailingSlot" type="checkbox" /> trailing</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML personalizados</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
