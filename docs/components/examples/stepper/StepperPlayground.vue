<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Stepper as BaseStepper } from '@/components/ui/Stepper'
import ComponentPlayground from '../../ComponentPlayground.vue'

const orientations = ['horizontal', 'vertical']
const icons = ['', 'check', 'file', 'save', 'user']
const slotModes = ['none', 'general', 'individual']
const contentModes = ['none', 'general', 'individual']

function createSteps() {
  return [
    {
      slot: 'account',
      step: 1,
      label: 'Cuenta',
      description: 'Datos personales',
      icon: 'user',
      content: 'Completa tu nombre, correo y datos de contacto.',
      disabled: false,
      completed: false,
    },
    {
      slot: 'shipping',
      step: 2,
      label: 'Envío',
      description: 'Dirección de entrega',
      icon: 'file',
      content: 'Selecciona una dirección y el método de envío.',
      disabled: false,
      completed: false,
    },
    {
      slot: 'payment',
      step: 3,
      label: 'Pago',
      description: 'Método de pago',
      icon: 'save',
      content: 'Introduce los datos de pago y revisa el pedido.',
      disabled: false,
      completed: false,
    },
    {
      slot: 'confirmation',
      step: 4,
      label: 'Confirmación',
      description: 'Pedido completado',
      icon: 'check',
      content: 'El pedido está listo para ser confirmado.',
      disabled: false,
      completed: false,
    },
  ]
}

const state = ref({
  value: 1,
  orientation: 'horizontal',
  linear: true,
  color: '',
  steps: createSteps(),
  ui: false,
  indicatorSlot: 'none',
  labelSlot: 'none',
  descriptionSlot: 'none',
  contentMode: 'general',
})
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref('')
const previewValue = ref(1)
const previewKey = ref(0)
const Preview = shallowRef()

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function serializeSteps() {
  const steps = state.value.steps.map(({ icon, ...step }) => ({
    ...step,
    ...(icon ? { icon: { name: icon } } : {}),
  }))

  return JSON.stringify(steps)
    .replaceAll('&', '&amp;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function getIndividualSlot(index: number) {
  const step = state.value.steps[index]
  const slot = step?.slot || step?.step || index + 1

  return String(slot).replace(/[^a-zA-Z0-9_-]/g, '-')
}

function generateSlots() {
  const slots: string[] = []

  if (state.value.indicatorSlot === 'general') {
    slots.push(`  <template #indicator="{ item, completed }">
    <span class="text-xs font-bold">{{ completed ? 'OK' : item.step }}</span>
  </template>`)
  } else if (state.value.indicatorSlot === 'individual') {
    slots.push(`  <template #indicator-${getIndividualSlot(0)}>
    <span class="text-xs font-bold">A</span>
  </template>`)
  }

  if (state.value.labelSlot === 'general') {
    slots.push(`  <template #label="{ item, active }">
    <span :class="active ? 'text-primary' : ''">{{ item.label }}</span>
  </template>`)
  } else if (state.value.labelSlot === 'individual') {
    slots.push(`  <template #label-${getIndividualSlot(1)}>
    <span class="text-primary">Etiqueta personalizada</span>
  </template>`)
  }

  if (state.value.descriptionSlot === 'general') {
    slots.push(`  <template #description="{ item }">
    <span class="text-xs italic">{{ item.description }}</span>
  </template>`)
  } else if (state.value.descriptionSlot === 'individual') {
    slots.push(`  <template #description-${getIndividualSlot(2)}>
    <span class="text-xs italic">Descripción personalizada</span>
  </template>`)
  }

  if (state.value.contentMode === 'general') {
    slots.push(`  <template #content="{ item, prevStep, nextStep, isFirstStep, isLastStep }">
    <div class="grid gap-3 rounded-lg border bg-muted/20 p-4">
      <p class="text-sm">{{ item.content }}</p>
      <div class="flex gap-2">
        <button type="button" class="rounded-md border px-3 py-1 text-sm" :disabled="isFirstStep" @click="prevStep">
          Anterior
        </button>
        <button type="button" class="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground" :disabled="isLastStep" @click="nextStep">
          Siguiente
        </button>
      </div>
    </div>
  </template>`)
  } else if (state.value.contentMode === 'individual') {
    slots.push(`  <template #content-${getIndividualSlot(3)}="{ item }">
    <div class="rounded-lg border border-success/40 bg-success/5 p-4 text-sm">
      Contenido individual: {{ item.content }}
    </div>
  </template>`)
  }

  return slots
}

function generateCode() {
  const props = [
    'v-model:value="value"',
    `orientation="${state.value.orientation}"`,
    `:linear="${state.value.linear}"`,
    `:steps='${serializeSteps()}'`,
    state.value.color && `color="${escapeAttribute(state.value.color)}"`,
    state.value.ui &&
      `:ui="{ root: () => ({ class: 'rounded-xl bg-muted/30 p-4' }), list: () => ({ class: 'gap-3' }), item: ({ active }) => ({ class: active ? 'scale-[1.02]' : undefined }), trigger: ({ active }) => ({ class: active ? 'text-primary' : undefined }), indicator: ({ completed }) => ({ class: completed ? 'ring-2 ring-success/40' : undefined }), wrapper: () => ({ class: 'gap-1' }), label: ({ active }) => ({ class: active ? 'text-primary' : undefined }), description: () => ({ class: 'italic' }), separator: ({ completed }) => ({ class: completed ? 'bg-success' : undefined }), content: () => ({ class: 'rounded-lg bg-background p-4 shadow-sm' }) }"`,
    '@update:value="handleUpdate"',
  ].filter(Boolean)

  const slots = generateSlots()
  const opening = `<Stepper\n  ${props.join('\n  ')}`

  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</Stepper>` : `${opening}\n/>`
}

function handleUpdate(value: number | undefined) {
  previewValue.value = value ?? 1
  eventLog.value = value === undefined ? 'undefined' : String(value)
}

function applyCode() {
  editorError.value = ''

  try {
    const render = compile(
      editorCode.value
        .replace(/<Stepper(?=[\s/>])/g, '<PlaygroundStepper')
        .replaceAll('</Stepper>', '</PlaygroundStepper>'),
    )

    previewValue.value = state.value.value
    Preview.value = markRaw(
      defineComponent({
        name: 'StepperPlaygroundPreview',
        components: { PlaygroundStepper: BaseStepper },
        setup: () => ({ value: previewValue, handleUpdate }),
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
    value: 1,
    orientation: 'horizontal',
    linear: true,
    color: '',
    steps: createSteps(),
    ui: false,
    indicatorSlot: 'none',
    labelSlot: 'none',
    descriptionSlot: 'none',
    contentMode: 'general',
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
    filename="StepperPlayground.vue"
    description="Configura el stepper o edita directamente su template."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-84 place-items-center px-8">
        <div class="grid w-full max-w-2xl gap-4">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
              :disabled="previewValue <= 1"
              @click="previewValue--"
            >
              Anterior
            </button>
            <button
              type="button"
              class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
              :disabled="previewValue >= state.steps.length"
              @click="previewValue++"
            >
              Siguiente
            </button>
            <span class="text-sm text-muted-foreground">Paso activo: {{ previewValue }}</span>
            <span v-if="eventLog" class="text-sm text-muted-foreground"
              >update:value: {{ eventLog }}</span
            >
          </div>
        </div>
      </div>
    </template>

    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid grid-cols-2 gap-3">
          <legend class="col-span-2 mb-1 text-sm font-semibold">Props</legend>
          <label class="grid gap-1 text-xs"
            >Value<input
              v-model.number="state.value"
              type="number"
              min="1"
              :max="state.steps.length"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Orientation<select
              v-model="state.orientation"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in orientations" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.linear" type="checkbox" /> Linear</label
          >
          <label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="#7c3aed"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="col-span-2 flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> UI personalizado</label
          >
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Steps</legend>
          <div
            v-for="step in state.steps"
            :key="step.step"
            class="grid gap-2 rounded-md border p-3"
          >
            <p class="text-xs font-semibold text-muted-foreground">Paso {{ step.step }}</p>
            <label class="grid gap-1 text-xs"
              >Slot<input
                v-model="step.slot"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="grid gap-1 text-xs"
              >Label<input
                v-model="step.label"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="grid gap-1 text-xs"
              >Description<input
                v-model="step.description"
                class="rounded-md border bg-background px-3 py-2 text-sm"
            /></label>
            <label class="grid gap-1 text-xs"
              >Content<textarea
                v-model="step.content"
                rows="2"
                class="resize-y rounded-md border bg-background px-3 py-2 text-sm"
              />
            </label>
            <label class="grid gap-1 text-xs"
              >Icon<select
                v-model="step.icon"
                class="rounded-md border bg-background px-2 py-2 text-sm"
              >
                <option v-for="icon in icons" :key="icon" :value="icon">
                  {{ icon || 'none' }}
                </option>
              </select></label
            >
            <div class="flex flex-wrap gap-3">
              <label class="flex items-center gap-2 text-xs"
                ><input v-model="step.disabled" type="checkbox" /> Disabled</label
              ><label class="flex items-center gap-2 text-xs"
                ><input v-model="step.completed" type="checkbox" /> Completed</label
              >
            </div>
          </div>
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slots</legend>
          <label class="grid gap-1 text-xs"
            >Indicator<select
              v-model="state.indicatorSlot"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in slotModes" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Label<select
              v-model="state.labelSlot"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in slotModes" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Description<select
              v-model="state.descriptionSlot"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in slotModes" :key="option">{{ option }}</option>
            </select></label
          >
          <label class="grid gap-1 text-xs"
            >Content<select
              v-model="state.contentMode"
              class="rounded-md border bg-background px-2 py-2 text-sm"
            >
              <option v-for="option in contentModes" :key="option">{{ option }}</option>
            </select></label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
