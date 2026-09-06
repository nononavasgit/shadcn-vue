<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Tooltip as BaseTooltip } from '@/components/ui/Tooltip'
import ComponentPlayground from '../../ComponentPlayground.vue'

const sides = ['top', 'right', 'bottom', 'left']
const alignments = ['start', 'center', 'end']
const positionStrategies = ['absolute', 'fixed']
const stickyOptions = ['partial', 'always']
const updatePositionStrategies = ['optimized', 'always']
const eventNames = ['update:open', 'escapeKeyDown', 'pointerDownOutside'] as const

const state = ref({
  open: false,
  label: 'Información adicional del elemento seleccionado.',
  withArrow: true,
  delayDuration: 0,
  disableHoverableContent: false,
  disableClosingTrigger: false,
  disabled: false,
  ignoreNonKeyboardFocus: false,
  align: 'center',
  alignOffset: 0,
  ariaLabel: '',
  arrowPadding: 0,
  avoidCollisions: true,
  collisionPadding: 0,
  forceMount: false,
  hideWhenDetached: false,
  positionStrategy: 'fixed',
  side: 'top',
  sideOffset: 2,
  sticky: 'partial',
  updatePositionStrategy: 'optimized',
  arrowWidth: 10,
  arrowHeight: 5,
  ui: false,
  contentSlot: false,
})
const enabledEvents = ref<string[]>(['update:open'])
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const previewOpen = ref(false)
const eventLog = ref<Array<{ name: string; detail: string }>>([])
const previewKey = ref(0)
const Preview = shallowRef()

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function escapeHtml(value: string) {
  return escapeAttribute(value).replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function eventAttribute(name: string) {
  const kebab = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  return `@${kebab}="logEvent('${name}', $event)"`
}

function generateCode() {
  const props = [
    'v-model:open="open"',
    `label="${escapeAttribute(state.value.label)}"`,
    `:with-arrow="${state.value.withArrow}"`,
    `:delay-duration="${state.value.delayDuration}"`,
    `:disable-hoverable-content="${state.value.disableHoverableContent}"`,
    `:disable-closing-trigger="${state.value.disableClosingTrigger}"`,
    `:disabled="${state.value.disabled}"`,
    `:ignore-non-keyboard-focus="${state.value.ignoreNonKeyboardFocus}"`,
    `align="${state.value.align}"`,
    `:align-offset="${state.value.alignOffset}"`,
    state.value.ariaLabel && `aria-label="${escapeAttribute(state.value.ariaLabel)}"`,
    `:arrow-padding="${state.value.arrowPadding}"`,
    `:avoid-collisions="${state.value.avoidCollisions}"`,
    `:collision-padding="${state.value.collisionPadding}"`,
    `:force-mount="${state.value.forceMount}"`,
    `:hide-when-detached="${state.value.hideWhenDetached}"`,
    `position-strategy="${state.value.positionStrategy}"`,
    `side="${state.value.side}"`,
    `:side-offset="${state.value.sideOffset}"`,
    `sticky="${state.value.sticky}"`,
    `update-position-strategy="${state.value.updatePositionStrategy}"`,
    `:arrow-width="${state.value.arrowWidth}"`,
    `:arrow-height="${state.value.arrowHeight}"`,
    state.value.ui &&
      `:ui="{ content: ({ open }) => ({ class: open ? 'border-primary' : undefined }), arrow: ({ open }) => ({ class: open ? 'fill-primary' : undefined }) }"`,
    ...enabledEvents.value.map(eventAttribute),
  ].filter(Boolean)

  const slots = [
    `  <template #default="{ open }">
    <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
      {{ open ? 'Ocultar información' : 'Mostrar información' }}
    </button>
  </template>`,
  ]

  if (state.value.contentSlot)
    slots.push(
      `  <template #content="{ open, close }">
    <div class="grid gap-2">
      <strong>{{ open ? 'Tooltip abierto' : 'Tooltip cerrado' }}</strong>
      <span>${escapeHtml(state.value.label)}</span>
      <button type="button" class="justify-self-start text-xs underline" @click="close">
        Cerrar
      </button>
    </div>
  </template>`,
    )

  return `<Tooltip\n  ${props.join('\n  ')}\n>\n${slots.join('\n')}\n</Tooltip>`
}

function logEvent(name: string, payload?: unknown) {
  const detail =
    typeof payload === 'boolean'
      ? String(payload)
      : payload instanceof Event
        ? payload.type
        : payload === undefined
          ? 'sin payload'
          : String(payload)
  eventLog.value.unshift({ name, detail })
  eventLog.value = eventLog.value.slice(0, 8)
}

function applyCode() {
  editorError.value = ''

  try {
    const render = compile(
      editorCode.value
        .replace(/<Tooltip(?=[\s/>])/g, '<PlaygroundTooltip')
        .replaceAll('</Tooltip>', '</PlaygroundTooltip>'),
    )

    previewOpen.value = state.value.open
    Preview.value = markRaw(
      defineComponent({
        name: 'TooltipPlaygroundPreview',
        components: { PlaygroundTooltip: BaseTooltip },
        setup: () => ({ open: previewOpen, logEvent }),
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
    open: false,
    label: 'Información adicional del elemento seleccionado.',
    withArrow: true,
    delayDuration: 0,
    disableHoverableContent: false,
    disableClosingTrigger: false,
    disabled: false,
    ignoreNonKeyboardFocus: false,
    align: 'center',
    alignOffset: 0,
    ariaLabel: '',
    arrowPadding: 0,
    avoidCollisions: true,
    collisionPadding: 0,
    forceMount: false,
    hideWhenDetached: false,
    positionStrategy: 'fixed',
    side: 'top',
    sideOffset: 2,
    sticky: 'partial',
    updatePositionStrategy: 'optimized',
    arrowWidth: 10,
    arrowHeight: 5,
    ui: false,
    contentSlot: false,
  }
  enabledEvents.value = ['update:open']
  previewOpen.value = false
  eventLog.value = []
  syncFromControls()
}

watch([state, enabledEvents], syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="TooltipPlayground.vue"
    description="Configura el tooltip, su posicionamiento, flecha, eventos y slots."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8 py-6">
        <div class="grid justify-items-center gap-4 text-center">
          <p class="text-sm text-muted-foreground">
            Pasa el cursor o enfoca el trigger para abrir el tooltip.
          </p>
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <button
            type="button"
            class="rounded-md border px-3 py-2 text-xs hover:bg-accent"
            @click="previewOpen = !previewOpen"
          >
            {{ previewOpen ? 'Cerrar desde fuera' : 'Abrir desde fuera' }}
          </button>
          <div v-if="eventLog.length" class="rounded-lg border bg-background p-3 text-left">
            <p class="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Eventos
            </p>
            <ol class="grid gap-1 font-mono text-xs">
              <li v-for="(event, index) in eventLog" :key="`${event.name}-${index}`">
                <span class="text-primary">{{ event.name }}</span
                >: {{ event.detail }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </template>

    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Contenido</legend>
          <label class="grid gap-1 text-xs"
            >Label<textarea
              v-model="state.label"
              rows="3"
              class="resize-y rounded-md border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label class="grid gap-1 text-xs"
            >Aria label<input
              v-model="state.ariaLabel"
              placeholder="Descripción accesible"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.open" type="checkbox" /> Open inicial</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.contentSlot" type="checkbox" /> Slot content</label
          >
        </fieldset>

        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Posicionamiento</legend>
          <label class="grid gap-1 text-xs"
            >Side<select
              v-model="state.side"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="value in sides" :key="value">{{ value }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Align<select
              v-model="state.align"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="value in alignments" :key="value">{{ value }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Side offset<input
              v-model.number="state.sideOffset"
              type="number"
              min="0"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Align offset<input
              v-model.number="state.alignOffset"
              type="number"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Position strategy<select
              v-model="state.positionStrategy"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="value in positionStrategies" :key="value">{{ value }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Sticky<select
              v-model="state.sticky"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="value in stickyOptions" :key="value">{{ value }}</option>
            </select></label
          >
        </fieldset>

        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Flecha</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.withArrow" type="checkbox" /> With arrow</label
          ><label class="grid gap-1 text-xs"
            >Width<input
              v-model.number="state.arrowWidth"
              type="number"
              min="0"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Height<input
              v-model.number="state.arrowHeight"
              type="number"
              min="0"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Arrow padding<input
              v-model.number="state.arrowPadding"
              type="number"
              min="0"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>

        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Comportamiento</legend>
          <label class="grid gap-1 text-xs"
            >Delay duration<input
              v-model.number="state.delayDuration"
              type="number"
              min="0"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Collision padding<input
              v-model.number="state.collisionPadding"
              type="number"
              min="0"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Update position strategy<select
              v-model="state.updatePositionStrategy"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="value in updatePositionStrategies" :key="value">{{ value }}</option>
            </select></label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disableHoverableContent" type="checkbox" /> Disable hoverable
            content</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disableClosingTrigger" type="checkbox" /> Disable closing
            trigger</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ignoreNonKeyboardFocus" type="checkbox" /> Ignore non-keyboard
            focus</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.avoidCollisions" type="checkbox" /> Avoid collisions</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.forceMount" type="checkbox" /> Force mount</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.hideWhenDetached" type="checkbox" /> Hide when detached</label
          >
        </fieldset>

        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">UI y eventos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizada</label
          ><label v-for="event in eventNames" :key="event" class="flex items-center gap-2 text-xs"
            ><input v-model="enabledEvents" type="checkbox" :value="event" /> {{ event }}</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
