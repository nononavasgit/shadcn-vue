<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  Toggle,
  type ToggleProps,
  type ToggleSeverity,
  type ToggleSize,
  type ToggleValue,
  type ToggleVariant,
} from '@/components/ui/Toggle'
import { toggleDefaults } from '@/components/ui/Toggle/defaults'
import type { IconConfig } from '@/components/ui/Icon'
import { ICONS } from '@/components/ui/Icon/icons'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const iconNames = Object.keys(ICONS)
const label = ref('Notifications')
const value = ref<ToggleValue>(toggleDefaults.value)
const variant = ref<ToggleVariant>(toggleDefaults.variant)
const severity = ref<ToggleSeverity>(toggleDefaults.severity)
const size = ref<ToggleSize>(toggleDefaults.size)
const disabled = ref(false)
const color = ref('')
const icon = ref('')
const iconObjectInput = ref('')
const trailingIcon = ref('')
const trailingIconObjectInput = ref('')

function parseIconProps(input: string): IconConfig | undefined {
  if (!input.trim()) return undefined

  try {
    const parsed: unknown = JSON.parse(input)

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as IconConfig
    }
  } catch {
    return undefined
  }

  return undefined
}

const playgroundProps = computed<Omit<ToggleProps, 'value'>>(() => ({
  label: label.value || undefined,
  variant: variant.value,
  severity: severity.value,
  size: size.value,
  disabled: disabled.value,
  color: color.value || undefined,
  icon: parseIconProps(iconObjectInput.value) ?? (icon.value ? { name: icon.value } : undefined),
  trailingIcon:
    parseIconProps(trailingIconObjectInput.value) ??
    (trailingIcon.value ? { name: trailingIcon.value } : undefined),
}))

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'boolean',
    default: String(toggleDefaults.value),
    description: 'Estado controlado.',
  },
  { name: 'label', type: 'string', default: 'undefined', description: 'Texto del toggle.' },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon',
    default: 'undefined',
    description: 'Icono al inicio cuando no se usa el slot leading.',
  },
  {
    name: 'trailingIcon',
    type: 'IconConfig',
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
    type: '[value: boolean]',
    default: '-',
    description: 'Actualiza el valor controlado.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'ToggleContext',
    typeLink: '#toggle-context',
    default: '-',
    description: 'Contenido principal.',
  },
  {
    name: 'leading',
    type: 'ToggleContext',
    typeLink: '#toggle-context',
    default: '-',
    description: 'Contenido al inicio.',
  },
  {
    name: 'trailing',
    type: 'ToggleContext',
    typeLink: '#toggle-context',
    default: '-',
    description: 'Contenido al final.',
  },
]

const exposeRows: ApiTableRow[] = []

const contextRows: ApiTableRow[] = [
  { name: 'value', type: 'boolean', description: 'Valor actual del toggle.' },
  { name: 'state', type: "'on' | 'off'", description: 'Estado derivado del valor actual.' },
  { name: 'pressed', type: 'boolean', description: 'Indica si el toggle está pulsado.' },
]
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
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">Prueba el estado, las variantes y los iconos.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Toggle v-model:value="value" v-bind="playgroundProps">
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
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="toggle-context" title="ToggleContext" :rows="contextRows" />
    </div>
  </section>
</template>
