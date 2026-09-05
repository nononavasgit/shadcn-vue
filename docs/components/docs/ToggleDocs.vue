<script setup lang="ts">
import { toggleDefaults } from '@/components/ui/Toggle/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

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
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono al inicio cuando no se usa el slot leading.',
  },
  {
    name: 'trailingIcon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
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

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="toggle-context" title="ToggleContext" :rows="contextRows" />
    </div>
  </section>
</template>
