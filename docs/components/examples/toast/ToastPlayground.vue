<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Toast } from '@/components/ui/Toast'
import ComponentPlayground from '../../ComponentPlayground.vue'

const variants = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const
const severities = ['primary', 'secondary', 'success', 'warning', 'error'] as const
const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const
const swipeDirections = ['up', 'down', 'left', 'right'] as const
const eventNames = [
  'update:open',
  'close',
  'escapeKeyDown',
  'pause',
  'resume',
  'swipeStart',
  'swipeMove',
  'swipeCancel',
  'swipeEnd',
] as const

const state = ref({
  label: 'Cambios guardados',
  description: 'La operación se completó correctamente.',
  variant: 'soft',
  severity: 'success',
  color: '',
  position: 'bottom-right',
  type: 'foreground',
  duration: 5000,
  open: true,
  closable: true,
  disableSwipe: false,
  swipeDirection: 'right',
  swipeThreshold: 50,
  hotkey: 'F8',
  labelHotkey: 'Notificaciones ({hotkey})',
  icon: true,
  closeButton: false,
  closeButtonLabel: 'Cerrar',
  progress: false,
  ui: false,
  defaultSlot: false,
  iconSlot: false,
  labelSlot: false,
  descriptionSlot: false,
  closeSlot: false,
})

const enabledEvents = ref<string[]>(['close', 'update:open'])
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref<Array<{ name: string; detail: string }>>([])
const previewKey = ref(0)
const Preview = shallowRef()

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function eventAttribute(name: string) {
  const kebab = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  return `@${kebab}="logEvent('${name}', $event)"`
}

function generateCode() {
  const props = [
    `label="${escapeAttribute(state.value.label)}"`,
    state.value.description && `description="${escapeAttribute(state.value.description)}"`,
    `variant="${state.value.variant}"`,
    `severity="${state.value.severity}"`,
    state.value.color && `color="${escapeAttribute(state.value.color)}"`,
    `position="${state.value.position}"`,
    `type="${state.value.type}"`,
    `:duration="${state.value.duration}"`,
    'v-model:open="open"',
    !state.value.closable && ':closable="false"',
    state.value.disableSwipe && 'disable-swipe',
    `swipe-direction="${state.value.swipeDirection}"`,
    `:swipe-threshold="${state.value.swipeThreshold}"`,
    `:hotkey='${JSON.stringify(state.value.hotkey.split('+').filter(Boolean))}'`,
    `label-hotkey="${escapeAttribute(state.value.labelHotkey)}"`,
    state.value.icon && !state.value.iconSlot && `:icon="{ name: 'check' }"`,
    state.value.progress && 'progress',
    state.value.closeButton &&
      `:close-button="{ label: '${escapeAttribute(state.value.closeButtonLabel)}', square: false }"`,
    state.value.ui &&
      `:ui="{ root: () => ({ class: 'ring-2 ring-offset-2' }), progress: () => ({ class: 'bg-primary/20' }) }"`,
    ...enabledEvents.value.map(eventAttribute),
  ].filter(Boolean)

  const slots: string[] = []
  if (state.value.defaultSlot) {
    slots.push(
      `  <template #default="{ open, close }">\n    <div class="flex items-center gap-3">\n      <strong>Toast personalizado: {{ open ? 'abierto' : 'cerrado' }}</strong>\n      <button @click="close">Cerrar</button>\n    </div>\n  </template>`,
    )
  } else {
    if (state.value.iconSlot)
      slots.push(`  <template #icon>\n    <span aria-hidden="true">★</span>\n  </template>`)
    if (state.value.labelSlot)
      slots.push(`  <template #label>\n    <strong>Label desde slot</strong>\n  </template>`)
    if (state.value.descriptionSlot)
      slots.push(
        `  <template #description>\n    <span>Descripción desde <em>slot</em></span>\n  </template>`,
      )
    if (state.value.closeSlot)
      slots.push(
        `  <template #close="{ close }">\n    <button aria-label="Cerrar" @click="close">×</button>\n  </template>`,
      )
  }
  const opening = `<Toast\n  ${props.join('\n  ')}`
  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</Toast>` : `${opening}\n/>`
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
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({
        name: 'ToastPlaygroundPreview',
        components: { Toast },
        setup: () => ({ logEvent, open: ref(state.value.open) }),
        render,
      }),
    )
    appliedCode.value = editorCode.value
    previewKey.value++
    eventLog.value = []
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
    label: 'Cambios guardados',
    description: 'La operación se completó correctamente.',
    variant: 'soft',
    severity: 'success',
    color: '',
    position: 'bottom-right',
    type: 'foreground',
    duration: 5000,
    open: true,
    closable: true,
    disableSwipe: false,
    swipeDirection: 'right',
    swipeThreshold: 50,
    hotkey: 'F8',
    labelHotkey: 'Notificaciones ({hotkey})',
    icon: true,
    closeButton: false,
    closeButtonLabel: 'Cerrar',
    progress: false,
    ui: false,
    defaultSlot: false,
    iconSlot: false,
    labelSlot: false,
    descriptionSlot: false,
    closeSlot: false,
  }
  enabledEvents.value = ['close', 'update:open']
  syncFromControls()
}

watch([state, enabledEvents], syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="ToastPlayground.vue"
    description="Configura el toast o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center">
        <div class="grid max-w-md gap-4 text-center">
          <p class="text-sm text-muted-foreground">El Toast se renderiza en su posición real.</p>
          <button
            class="mx-auto rounded-md bg-primary px-4 py-2 text-primary-foreground"
            @click="applyCode"
          >
            Mostrar toast
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
        <component :is="Preview" v-if="Preview" :key="previewKey" />
      </div>
    </template>

    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Contenido</legend>
          <label class="grid gap-1 text-xs"
            >Label<input
              v-model="state.label"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Description<textarea
              v-model="state.description"
              rows="2"
              class="resize-none rounded-md border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.icon" type="checkbox" /> Icon</label
          >
        </fieldset>

        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Apariencia</legend>
          <label class="grid gap-1 text-xs"
            >Variant<select
              v-model="state.variant"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="value in variants" :key="value">{{ value }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Severity<select
              v-model="state.severity"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="value in severities" :key="value">{{ value }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="#7c3aed"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Position<select
              v-model="state.position"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="value in positions" :key="value">{{ value }}</option>
            </select></label
          >
          <label class="col-span-2 flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizado</label
          >
        </fieldset>

        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Comportamiento</legend>
          <label class="grid gap-1 text-xs"
            >Type<select
              v-model="state.type"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option>foreground</option>
              <option>background</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Duration<input
              v-model.number="state.duration"
              type="number"
              min="0"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.open" type="checkbox" /> Open</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.closable" type="checkbox" /> Closable</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disableSwipe" type="checkbox" /> Disable swipe</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.closeButton" type="checkbox" /> Close button config</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.progress" type="checkbox" /> Progress</label
          >
          <label v-if="state.closeButton" class="col-span-2 grid gap-1 text-xs"
            >Close label<input
              v-model="state.closeButtonLabel"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Swipe direction<select
              v-model="state.swipeDirection"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="value in swipeDirections" :key="value">{{ value }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Threshold<input
              v-model.number="state.swipeThreshold"
              type="number"
              min="0"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Accesibilidad</legend>
          <label class="grid gap-1 text-xs"
            >Hotkey<input
              v-model="state.hotkey"
              placeholder="altKey+KeyT"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Label hotkey<input
              v-model="state.labelHotkey"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
        </fieldset>

        <fieldset class="grid grid-cols-2 gap-2">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Slots</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.defaultSlot" type="checkbox" /> default</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.iconSlot" type="checkbox" :disabled="state.defaultSlot" />
            icon</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.labelSlot" type="checkbox" :disabled="state.defaultSlot" />
            label</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.descriptionSlot" type="checkbox" :disabled="state.defaultSlot" />
            description</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.closeSlot" type="checkbox" :disabled="state.defaultSlot" />
            close</label
          >
        </fieldset>

        <fieldset class="grid grid-cols-2 gap-2">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Eventos</legend>
          <label v-for="event in eventNames" :key="event" class="flex items-center gap-2 text-xs"
            ><input v-model="enabledEvents" type="checkbox" :value="event" /> {{ event }}</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
