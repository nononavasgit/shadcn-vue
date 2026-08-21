<script setup lang="ts">
import { computed, ref } from 'vue'

import { Avatar } from '@/components/ui/Avatar'
import { Chip, type ChipPosition, type ChipProps, type ChipSize } from '@/components/ui/Chip'
import { chipDefaults } from '@/components/ui/Chip/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const text = ref<string | number>(3)
const size = ref<ChipSize>(chipDefaults.size)
const position = ref<ChipPosition>(chipDefaults.position)
const color = ref('')
const inset = ref(chipDefaults.inset)
const standalone = ref(chipDefaults.standalone)
const show = ref(true)

const playgroundProps = computed<ChipProps>(() => ({
  text: text.value || undefined,
  size: size.value,
  position: position.value,
  color: color.value || undefined,
  inset: inset.value,
  standalone: standalone.value,
}))

const propRows: ApiTableRow[] = [
  {
    name: 'text',
    type: 'string | number',
    default: 'undefined',
    description: 'Texto o valor mostrado dentro del chip.',
  },
  {
    name: 'color',
    type: 'string',
    default: 'undefined',
    description: 'Cadena CSS o valor hexadecimal.',
  },
  {
    name: 'size',
    type: "'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'",
    default: `'${chipDefaults.size}'`,
    description: 'Tamaño del indicador.',
  },
  {
    name: 'position',
    type: "'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'",
    default: `'${chipDefaults.position}'`,
    description: 'Posición del chip respecto a su contenedor.',
  },
  {
    name: 'inset',
    type: 'boolean',
    default: String(chipDefaults.inset),
    description: 'Mantiene el chip dentro del borde del elemento redondeado.',
  },
  {
    name: 'standalone',
    type: 'boolean',
    default: String(chipDefaults.standalone),
    description: 'Renderiza el chip en posición relativa en lugar de absoluta.',
  },
  {
    name: 'show',
    type: 'boolean',
    default: 'true',
    description: 'Controla la visibilidad mediante v-model:show.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:show',
    type: '(value: boolean) => void',
    description: 'Se emite al actualizar el modelo de visibilidad.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Elemento o contenido sobre el que se coloca el indicador.',
  },
  {
    name: 'content',
    type: 'Record<string, never>',
    default: '-',
    description: 'Contenido personalizado del indicador.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Chip</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Indicador compacto para mostrar valores numéricos o estados sobre otro elemento.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Configura el tamaño, posición, color y comportamiento del indicador.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Chip v-bind="playgroundProps" v-model:show="show">
              <Avatar label="AV" />
            </Chip>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">text</span>
            <input
              v-model="text"
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
              <option value="3xs">3xs</option>
              <option value="2xs">2xs</option>
              <option value="xs">xs</option>
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
              <option value="xl">xl</option>
              <option value="2xl">2xl</option>
              <option value="3xl">3xl</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">position</span>
            <select
              v-model="position"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="top-right">top-right</option>
              <option value="bottom-right">bottom-right</option>
              <option value="top-left">top-left</option>
              <option value="bottom-left">bottom-left</option>
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
            <input v-model="inset" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">inset</span>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="standalone" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">standalone</span>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="show" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">show</span>
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
