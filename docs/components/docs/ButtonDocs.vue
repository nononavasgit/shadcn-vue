<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  Button,
  type ButtonProps,
  type ButtonSeverity,
  type ButtonSize,
  type ButtonVariant,
} from '@/components/ui/Button'
import type { IconConfig } from '@/components/ui/Icon'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const label = ref('Save changes')
const variant = ref<ButtonVariant>('solid')
const severity = ref<ButtonSeverity>('primary')
const size = ref<ButtonSize>('md')
const rounded = ref(false)
const square = ref(false)
const raised = ref(false)
const loading = ref(false)
const color = ref('')
const iconObjectInput = ref('')
const trailingIconObjectInput = ref('')

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

const playgroundProps = computed<ButtonProps>(() => ({
  label: label.value || undefined,
  variant: variant.value,
  severity: severity.value,
  size: size.value,
  rounded: rounded.value,
  square: square.value,
  raised: raised.value,
  loading: loading.value,
  color: color.value || undefined,
  icon: parseIconProps(iconObjectInput.value),
  trailingIcon: parseIconProps(trailingIconObjectInput.value),
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'ButtonVariant',
    type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft' | 'link'",
    description: 'Estilo visual del boton.',
  },
  {
    name: 'ButtonSeverity',
    type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
    description: 'Nivel semantico y color del boton.',
  },
  {
    name: 'ButtonSize',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    description: 'Tamano del boton.',
  },
  {
    name: 'NormalizeButtonProps',
    type: 'ButtonProps & HTMLAttributes',
    description: 'Props del boton combinadas con atributos HTML y eventos.',
  },
]

const propRows: ApiTableRow[] = [
  { name: 'label', type: 'string', default: 'undefined', description: 'Texto del boton.' },
  {
    name: 'variant',
    type: 'ButtonVariant',
    default: "'solid'",
    description: 'Variante visual.',
  },
  {
    name: 'severity',
    type: 'ButtonSeverity',
    default: "'primary'",
    description: 'Severidad semantica.',
  },
  { name: 'size', type: 'ButtonSize', default: "'md'", description: 'Tamano del boton.' },
  { name: 'rounded', type: 'boolean', default: 'false', description: 'Usa bordes redondeados.' },
  { name: 'square', type: 'boolean', default: 'false', description: 'Usa una forma cuadrada.' },
  { name: 'raised', type: 'boolean', default: 'false', description: 'Aplica sombreado.' },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Muestra el estado de carga.',
  },
  { name: 'color', type: 'string', default: 'undefined', description: 'Color CSS personalizado.' },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon',
    default: 'undefined',
    description: 'Icono al inicio.',
  },
  {
    name: 'trailingIcon',
    type: 'IconConfig',
    typeLink: '/icon',
    default: 'undefined',
    description: 'Icono al final.',
  },
  {
    name: 'as',
    type: 'AsTag | Component',
    default: "'button'",
    description: 'Elemento renderizado.',
  },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Usa el elemento del slot.' },
]

const emitRows: ApiTableRow[] = [
  { name: 'click', type: '[event: PointerEvent]', default: '-', description: 'Click del boton.' },
]

const slotRows: ApiTableRow[] = [
  { name: 'default', type: '-', default: '-', description: 'Contenido principal.' },
  {
    name: 'leading',
    type: '-',
    default: '-',
    description: 'Contenido antes del texto.',
  },
  {
    name: 'loading',
    type: '-',
    default: '-',
    description: 'Contenido del estado de carga.',
  },
  {
    name: 'trailing',
    type: '-',
    default: '-',
    description: 'Contenido despues del texto.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Button</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Accion interactiva con variantes visuales, iconos y estados de carga.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">
          Tipos publicos usados por la API del componente.
        </p>
      </div>
      <ApiTable title="Tipos" :rows="typeRows" />
    </section>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">Prueba las variantes y estados del boton.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Button v-bind="playgroundProps" />
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
              <option value="link">link</option>
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
            <span class="font-medium">size</span>
            <select
              v-model="size"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="xs">xs</option>
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">icon (objeto)</span>
            <textarea
              v-model="iconObjectInput"
              rows="4"
              placeholder='{
  "name": "check",
  "size": "sm"
}'
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">trailingIcon (objeto)</span>
            <textarea
              v-model="trailingIconObjectInput"
              rows="4"
              placeholder='{
  "name": "check",
  "size": "sm"
}'
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
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
            <input v-model="rounded" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">rounded</span>
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input v-model="square" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">square</span>
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input v-model="raised" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">raised</span>
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input v-model="loading" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">loading</span>
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
