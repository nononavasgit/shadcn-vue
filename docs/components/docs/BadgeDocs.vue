<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  Badge,
  type BadgeProps,
  type BadgeSeverity,
  type BadgeSize,
  type BadgeVariant,
} from '@/components/ui/Badge'
import { ICONS } from '@/components/ui/Icon/icons'
import type { NormalizeIconProps } from '@/components/ui/Icon'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const iconNames = Object.keys(ICONS)
const label = ref('Status')
const size = ref<BadgeSize>('md')
const variant = ref<BadgeVariant>('solid')
const severity = ref<BadgeSeverity>('primary')
const color = ref('')
const icon = ref('')
const iconObjectInput = ref('')
const trailingIcon = ref('')
const trailingIconObjectInput = ref('')

function parseIconProps(value: string): NormalizeIconProps | undefined {
  if (!value.trim()) return undefined

  try {
    const parsed: unknown = JSON.parse(value)

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as NormalizeIconProps
    }
  } catch {
    return undefined
  }

  return undefined
}

const playgroundProps = computed<BadgeProps>(() => ({
  label: label.value || undefined,
  size: size.value,
  variant: variant.value,
  severity: severity.value,
  color: color.value || undefined,
  icon: parseIconProps(iconObjectInput.value) ?? (icon.value || undefined),
  trailingIcon: parseIconProps(trailingIconObjectInput.value) ?? (trailingIcon.value || undefined),
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'BadgeSize',
    type: "'sm' | 'md' | 'lg'",
    description: 'Tamano del badge.',
  },
  {
    name: 'BadgeVariant',
    type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'",
    description: 'Variante visual.',
  },
  {
    name: 'BadgeSeverity',
    type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
    description: 'Severidad y color semantico.',
  },
]

const propRows: ApiTableRow[] = [
  { name: 'label', type: 'string', default: 'undefined', description: 'Texto del badge.' },
  { name: 'size', type: 'BadgeSize', default: "'md'", description: 'Tamano del badge.' },
  {
    name: 'variant',
    type: 'BadgeVariant',
    default: "'solid'",
    description: 'Variante visual.',
  },
  {
    name: 'severity',
    type: 'BadgeSeverity',
    default: "'primary'",
    description: 'Severidad semantica.',
  },
  { name: 'color', type: 'string', default: 'undefined', description: 'Color CSS personalizado.' },
  {
    name: 'icon',
    type: 'NormalizeIconProps',
    typeLink: '/icon',
    default: 'undefined',
    description: 'Icono al inicio.',
  },
  {
    name: 'trailingIcon',
    type: 'NormalizeIconProps',
    typeLink: '/icon',
    default: 'undefined',
    description: 'Icono al final.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Contenido principal.',
  },
  {
    name: 'leading',
    type: 'Record<string, never>',
    default: '-',
    description: 'Contenido antes del texto.',
  },
  {
    name: 'trailing',
    type: 'Record<string, never>',
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
      <h2 class="text-2xl font-semibold">Badge</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Etiqueta compacta para estados, categorias y metadatos.
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
        <p class="text-sm text-muted-foreground">Configura el contenido y el estilo del badge.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Badge v-bind="playgroundProps" />
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
            <span class="font-medium">size</span>
            <select
              v-model="size"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
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
              rows="4"
              placeholder='{
  "name": "check",
  "size": "sm"
}'
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
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable title="Slots" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
