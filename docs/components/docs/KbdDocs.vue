<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  Kbd,
  type KbdProps,
  type KbdSeverity,
  type KbdSize,
  type KbdVariant,
} from '@/components/ui/Kbd'
import { kbdDefaults } from '@/components/ui/Kbd/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const label = ref('Ctrl')
const severity = ref<KbdSeverity>(kbdDefaults.severity)
const size = ref<KbdSize>(kbdDefaults.size)
const variant = ref<KbdVariant>(kbdDefaults.variant)
const color = ref('')

const playgroundProps = computed<KbdProps>(() => ({
  label: label.value || undefined,
  severity: severity.value,
  size: size.value,
  variant: variant.value,
  color: color.value || undefined,
}))

const propRows: ApiTableRow[] = [
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Texto de la tecla o atajo.',
  },
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
    default: kbdDefaults.severity,
    description: 'Severidad semántica usada para colorear la tecla.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: kbdDefaults.size,
    description: 'Tamaño visual de la tecla.',
  },
  {
    name: 'variant',
    type: "'solid' | 'outline' | 'soft' | 'subtle'",
    default: kbdDefaults.variant,
    description: 'Estilo visual de la tecla.',
  },
  {
    name: 'color',
    type: 'string',
    default: 'undefined',
    description: 'Color personalizado de la tecla.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Contenido personalizado de la tecla.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Kbd</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Representa una tecla o un atajo de teclado con un estilo compacto.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Cambia la tecla, el tamaño, la severidad y la variante mostrados.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Kbd v-bind="playgroundProps" />
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">label</span>
            <input
              v-model="label"
              type="text"
              placeholder="Ctrl"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
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
              <option value="soft">soft</option>
              <option value="subtle">subtle</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">color</span>
            <input
              v-model="color"
              type="text"
              placeholder="#2563eb"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
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
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
