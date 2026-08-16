<script setup lang="ts">
import { computed, ref } from 'vue'

import { Toggle, type ToggleProps, type ToggleValue } from '@/components/ui/Toggle'
import type { NormalizeIconProps } from '@/components/ui/Icon'
import { ICONS } from '@/components/ui/Icon/icons'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

type ToggleVariant = 'outline' | 'plain'
type ToggleSeverity = 'default' | 'primary' | 'secondary' | 'warning' | 'success' | 'error'
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg'

const iconNames = Object.keys(ICONS)
const label = ref('Notifications')
const value = ref<ToggleValue>(false)
const variant = ref<ToggleVariant>('outline')
const severity = ref<ToggleSeverity>('default')
const size = ref<ToggleSize>('md')
const disabled = ref(false)
const color = ref('')
const icon = ref('')
const iconObjectInput = ref('')
const trailingIcon = ref('')
const trailingIconObjectInput = ref('')

function parseIconProps(input: string): NormalizeIconProps | undefined {
  if (!input.trim()) return undefined

  try {
    const parsed: unknown = JSON.parse(input)

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as NormalizeIconProps
    }
  } catch {
    return undefined
  }

  return undefined
}

const playgroundProps = computed<ToggleProps>(() => ({
  label: label.value || undefined,
  value: value.value,
  variant: variant.value,
  severity: severity.value,
  size: size.value,
  disabled: disabled.value,
  color: color.value || undefined,
  icon: parseIconProps(iconObjectInput.value) ?? (icon.value || undefined),
  trailingIcon: parseIconProps(trailingIconObjectInput.value) ?? (trailingIcon.value || undefined),
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'ToggleValue',
    type: 'boolean',
    description: 'Valor controlado del toggle.',
  },
  {
    name: 'ToggleState',
    type: "'on' | 'off'",
    description: 'Estado semantico derivado del valor.',
  },
  {
    name: 'ToggleContext',
    type: '{ value: ToggleValue; state: ToggleState; pressed: boolean }',
    description: 'Contexto expuesto por los slots.',
  },
  {
    name: 'NormalizeIconProps',
    type: 'string | { name: IconName; ... }',
    typeLink: '/icon',
    description: 'Formato normalizado para los iconos del toggle.',
  },
]

const propRows: ApiTableRow[] = [
  { name: 'value', type: 'ToggleValue', default: 'false', description: 'Estado controlado.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Texto del toggle.' },
  {
    name: 'icon',
    type: 'NormalizeIconProps',
    typeLink: '/icon',
    default: 'undefined',
    description: 'Icono al inicio cuando no se usa el slot leading.',
  },
  {
    name: 'trailingIcon',
    type: 'NormalizeIconProps',
    typeLink: '/icon',
    default: 'undefined',
    description: 'Icono al final cuando no se usa el slot trailing.',
  },
  {
    name: 'variant',
    type: "'outline' | 'plain'",
    default: "'outline'",
    description: 'Variante visual del toggle.',
  },
  {
    name: 'severity',
    type: "'default' | 'primary' | 'secondary' | 'warning' | 'success' | 'error'",
    default: "'default'",
    description: 'Severidad semantica y color del toggle.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Tamano del toggle.',
  },
  { name: 'color', type: 'string', default: 'undefined', description: 'Color CSS personalizado.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita el toggle.' },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: ToggleValue]',
    default: '-',
    description: 'Actualiza el valor controlado.',
  },
  {
    name: 'valueChange',
    type: '[value: ToggleValue]',
    default: '-',
    description: 'Se emite cuando cambia el estado del toggle.',
  },
]

const slotRows: ApiTableRow[] = [
  { name: 'default', type: 'ToggleContext', default: '-', description: 'Contenido principal.' },
  { name: 'leading', type: 'ToggleContext', default: '-', description: 'Contenido al inicio.' },
  { name: 'trailing', type: 'ToggleContext', default: '-', description: 'Contenido al final.' },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Toggle</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Control binario con variantes, iconos y contexto de estado para sus slots.
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
        <p class="text-sm text-muted-foreground">Prueba el estado, las variantes y los iconos.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Toggle v-bind="playgroundProps">
              <template #default="context">
                <span>{{ label }} ({{ context.state }})</span>
              </template>
            </Toggle>
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

          <label class="flex items-center gap-2 text-sm">
            <input v-model="value" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">value</span>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">variant</span>
            <select
              v-model="variant"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="plain">plain</option>
              <option value="outline">outline</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">severity</span>
            <select
              v-model="severity"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="default">default</option>
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
            <span class="font-medium">icon</span>
            <select
              v-model="icon"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Sin icono</option>
              <option v-for="name in iconNames" :key="name" :value="name">{{ name }}</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">icon (objeto)</span>
            <textarea
              v-model="iconObjectInput"
              rows="3"
              placeholder='{"name":"check","size":"sm"}'
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">trailingIcon</span>
            <select
              v-model="trailingIcon"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Sin icono</option>
              <option v-for="name in iconNames" :key="name" :value="name">{{ name }}</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">trailingIcon (objeto)</span>
            <textarea
              v-model="trailingIconObjectInput"
              rows="3"
              placeholder='{"name":"chevronRight","size":"sm"}'
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">color</span>
            <input
              v-model="color"
              type="text"
              placeholder="#7c3aed"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="disabled" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">disabled</span>
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
