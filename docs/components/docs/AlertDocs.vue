<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  Alert,
  type AlertProps,
  type AlertSeverity,
  type AlertVariant,
} from '@/components/ui/Alert'
import type { NormalizeButtonProps } from '@/components/ui/Button'
import type { IconConfig } from '@/components/ui/Icon'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const label = ref('Changes saved')
const description = ref('Your preferences have been updated successfully.')
const iconObjectInput = ref('')
const closeButtonInput = ref('')
const variant = ref<AlertVariant>('soft')
const severity = ref<AlertSeverity>('success')
const color = ref('')
const closable = ref(true)
const decorative = ref(false)
const isAlertVisible = ref(true)

function parseButtonProps(value: string): NormalizeButtonProps | undefined {
  if (!value.trim()) return undefined

  try {
    const parsed: unknown = JSON.parse(value)

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as NormalizeButtonProps
    }
  } catch {
    return undefined
  }

  return undefined
}

function parseIconProps(value: string): IconConfig | undefined {
  if (!value.trim()) return undefined

  try {
    const parsed: unknown = JSON.parse(value)

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as IconConfig
    }
  } catch {
    return undefined
  }

  return undefined
}

const playgroundProps = computed<AlertProps>(() => ({
  label: label.value || undefined,
  description: description.value || undefined,
  icon: parseIconProps(iconObjectInput.value),
  closeButton: parseButtonProps(closeButtonInput.value),
  variant: variant.value,
  severity: severity.value,
  color: color.value || undefined,
  closable: closable.value,
  decorative: decorative.value,
}))

const propRows: ApiTableRow[] = [
  { name: 'label', type: 'string', default: 'undefined', description: 'Titulo del mensaje.' },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Descripcion secundaria del mensaje.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono mostrado junto al mensaje.',
  },
  {
    name: 'closeButton',
    type: 'ButtonConfig',
    typeLink: '/button#button-config',
    default: 'undefined',
    description: 'Props del boton de cierre.',
  },
  {
    name: 'variant',
    type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'",
    default: "'soft'",
    description: 'Variante visual.',
  },
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
    default: "'primary'",
    description: 'Severidad semantica.',
  },
  { name: 'color', type: 'string', default: 'undefined', description: 'Color CSS personalizado.' },
  {
    name: 'closable',
    type: 'boolean',
    default: 'false',
    description: 'Muestra el boton para cerrar el alert.',
  },
  {
    name: 'decorative',
    type: 'boolean',
    default: 'false',
    description: 'Desactiva el rol semantico de alerta.',
  },
  {
    name: 'ui',
    type: '{ label?: () => HTMLAttributes; description?: () => HTMLAttributes; closeButtonContainer?: () => HTMLAttributes }',
    default: 'undefined',
    description: 'Atributos personalizados para las partes internas.',
  },
]

const emitRows: ApiTableRow[] = [
  { name: 'close', type: '[]', default: '-', description: 'Se emite cuando el alert se cierra.' },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'icon',
    type: '-',
    default: '-',
    description: 'Personaliza el icono.',
  },
  {
    name: 'label',
    type: '-',
    default: '-',
    description: 'Personaliza el titulo.',
  },
  {
    name: 'description',
    type: '-',
    default: '-',
    description: 'Personaliza la descripcion.',
  },
  {
    name: 'close',
    type: '{ close: () => void }',
    default: '-',
    description: 'Personaliza el cierre y recibe la funcion para cerrarlo.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Alert</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Mensaje contextual para comunicar estados, avisos y acciones de cierre.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Personaliza el mensaje, la severidad y el cierre.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Alert v-bind="playgroundProps" />
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">label</span>
            <input
              v-model="label"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">description</span>
            <input
              v-model="description"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">icon</span>
            <textarea
              v-model="iconObjectInput"
              rows="4"
              placeholder='{
  "name": "info",
  "size": "md"
}'
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">closeButton</span>
            <textarea
              v-model="closeButtonInput"
              rows="4"
              placeholder='{
  "label": "Dismiss"
}'
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">variant</span>
            <select
              v-model="variant"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="solid">solid</option>
              <option value="outline">outline</option>
              <option value="plain">plain</option>
              <option value="subtle">subtle</option>
              <option value="soft">soft</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">severity</span>
            <select
              v-model="severity"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="primary">primary</option>
              <option value="secondary">secondary</option>
              <option value="warning">warning</option>
              <option value="success">success</option>
              <option value="error">error</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">color</span>
            <input
              v-model="color"
              type="color"
              class="h-9 w-full rounded-md border bg-background p-1"
            />
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="closable" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">closable</span>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="decorative" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">decorative</span>
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
