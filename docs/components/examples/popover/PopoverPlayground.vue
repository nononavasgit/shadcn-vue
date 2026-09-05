<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Popover as BasePopover } from '@/components/ui/Popover'
import ComponentPlayground from '../../ComponentPlayground.vue'

const alignments = ['start', 'center', 'end']
const sides = ['top', 'right', 'bottom', 'left']
const positionStrategies = ['absolute', 'fixed']
const stickyOptions = ['partial', 'always']
const updatePositionStrategies = ['optimized', 'always']
const eventNames = [
  'update:open',
  'show',
  'close',
  'openAutoFocus',
  'closeAutoFocus',
  'escapeKeyDown',
  'pointerDownOutside',
  'focusOutside',
  'interactOutside',
] as const

const state = ref({
  open: false,
  content: 'Información adicional del elemento seleccionado.',
  modal: false,
  showArrow: true,
  align: 'center',
  alignFlip: true,
  alignOffset: 0,
  arrowPadding: 0,
  avoidCollisions: true,
  collisionPadding: 8,
  disableOutsidePointerEvents: false,
  disableUpdateOnLayoutShift: false,
  forceMount: false,
  hideShiftedArrow: true,
  hideWhenDetached: false,
  positionStrategy: 'fixed',
  prioritizePosition: false,
  side: 'bottom',
  sideFlip: true,
  sideOffset: 4,
  sticky: 'partial',
  updatePositionStrategy: 'optimized',
  arrowWidth: 10,
  arrowHeight: 5,
  arrowRounded: false,
  ui: false,
})
const enabledEvents = ref<string[]>(['update:open', 'show', 'close'])
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref<Array<{ name: string; detail: string }>>([])
const previewKey = ref(0)
const previewOpen = ref(false)
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
    `:modal="${state.value.modal}"`,
    `:show-arrow="${state.value.showArrow}"`,
    `align="${state.value.align}"`,
    `:align-flip="${state.value.alignFlip}"`,
    `:align-offset="${state.value.alignOffset}"`,
    `:arrow-padding="${state.value.arrowPadding}"`,
    `:avoid-collisions="${state.value.avoidCollisions}"`,
    `:collision-padding="${state.value.collisionPadding}"`,
    `:disable-outside-pointer-events="${state.value.disableOutsidePointerEvents}"`,
    `:disable-update-on-layout-shift="${state.value.disableUpdateOnLayoutShift}"`,
    `:force-mount="${state.value.forceMount}"`,
    `:hide-shifted-arrow="${state.value.hideShiftedArrow}"`,
    `:hide-when-detached="${state.value.hideWhenDetached}"`,
    `position-strategy="${state.value.positionStrategy}"`,
    `:prioritize-position="${state.value.prioritizePosition}"`,
    `side="${state.value.side}"`,
    `:side-flip="${state.value.sideFlip}"`,
    `:side-offset="${state.value.sideOffset}"`,
    `sticky="${state.value.sticky}"`,
    `update-position-strategy="${state.value.updatePositionStrategy}"`,
    `:arrow-width="${state.value.arrowWidth}"`,
    `:arrow-height="${state.value.arrowHeight}"`,
    `:arrow-rounded="${state.value.arrowRounded}"`,
    state.value.ui &&
      `:ui="{ content: () => ({ class: 'border-primary' }), arrow: () => ({ class: 'fill-primary' }) }"`,
    ...enabledEvents.value.map(eventAttribute),
  ].filter(Boolean)

  const slots = [
    `  <template #default="{ open }">
    <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
      {{ open ? 'Cerrar información' : 'Ver información' }}
    </button>
  </template>`,
    `  <template #content="{ open, close }">
    <div class="grid gap-3">
      <p class="text-sm">${escapeHtml(state.value.content)}</p>
      <p class="text-xs text-muted-foreground">Estado: {{ open ? 'abierto' : 'cerrado' }}</p>
      <button type="button" class="justify-self-start text-xs underline" @click="close">
        Cerrar
      </button>
    </div>
  </template>`,
  ]

  return `<Popover\n  ${props.join('\n  ')}\n>\n${slots.join('\n')}\n</Popover>`
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
        .replace(/<Popover(?=[\s/>])/g, '<PlaygroundPopover')
        .replaceAll('</Popover>', '</PlaygroundPopover>'),
    )

    previewOpen.value = state.value.open
    Preview.value = markRaw(
      defineComponent({
        name: 'PopoverPlaygroundPreview',
        components: { PlaygroundPopover: BasePopover },
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
    content: 'Información adicional del elemento seleccionado.',
    modal: false,
    showArrow: true,
    align: 'center',
    alignFlip: true,
    alignOffset: 0,
    arrowPadding: 0,
    avoidCollisions: true,
    collisionPadding: 8,
    disableOutsidePointerEvents: false,
    disableUpdateOnLayoutShift: false,
    forceMount: false,
    hideShiftedArrow: true,
    hideWhenDetached: false,
    positionStrategy: 'fixed',
    prioritizePosition: false,
    side: 'bottom',
    sideFlip: true,
    sideOffset: 4,
    sticky: 'partial',
    updatePositionStrategy: 'optimized',
    arrowWidth: 10,
    arrowHeight: 5,
    arrowRounded: false,
    ui: false,
  }
  enabledEvents.value = ['update:open', 'show', 'close']
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
    filename="PopoverPlayground.vue"
    description="Configura el popover o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center">
        <div class="grid gap-4 text-center">
          <p class="text-sm text-muted-foreground">Haz clic en el trigger para abrir el popover.</p>
          <button
            type="button"
            class="mx-auto rounded-md border px-3 py-2 text-sm hover:bg-accent"
            @click="previewOpen = !previewOpen"
          >
            {{ previewOpen ? 'Cerrar desde fuera' : 'Abrir desde fuera' }}
          </button>
          <component :is="Preview" v-if="Preview" :key="previewKey" />
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
            >Content<textarea
              v-model="state.content"
              rows="3"
              class="resize-y rounded-md border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.open" type="checkbox" /> Open inicial</label
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
            ><input v-model="state.showArrow" type="checkbox" /> Show arrow</label
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
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.arrowRounded" type="checkbox" /> Arrow rounded</label
          >
        </fieldset>

        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">Comportamiento</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.modal" type="checkbox" /> Modal</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.alignFlip" type="checkbox" /> Align flip</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.sideFlip" type="checkbox" /> Side flip</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.avoidCollisions" type="checkbox" /> Avoid collisions</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.prioritizePosition" type="checkbox" /> Prioritize position</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.forceMount" type="checkbox" /> Force mount</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.hideShiftedArrow" type="checkbox" /> Hide shifted arrow</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.hideWhenDetached" type="checkbox" /> Hide when detached</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disableOutsidePointerEvents" type="checkbox" /> Disable outside
            pointer events</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disableUpdateOnLayoutShift" type="checkbox" /> Disable layout
            shift updates</label
          ><label class="grid gap-1 text-xs"
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
        </fieldset>

        <fieldset class="grid gap-2">
          <legend class="mb-1 text-sm font-semibold">UI y eventos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizado</label
          ><label v-for="event in eventNames" :key="event" class="flex items-center gap-2 text-xs"
            ><input v-model="enabledEvents" type="checkbox" :value="event" /> {{ event }}</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
