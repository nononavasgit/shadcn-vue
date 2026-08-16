<script setup lang="ts">
import { computed, ref } from 'vue'

import { Avatar, type AvatarProps, type AvatarShape, type AvatarSize } from '@/components/ui/Avatar'
import { ICONS } from '@/components/ui/Icon/icons'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const iconNames = Object.keys(ICONS)

const src = ref('')
const label = ref('AL')
const icon = ref('')
const size = ref<AvatarSize>('md')
const shape = ref<AvatarShape>('rounded')
const delayMsInput = ref('')

const playgroundProps = computed<AvatarProps>(() => ({
  src: src.value || undefined,
  label: label.value || undefined,
  icon: icon.value || undefined,
  size: size.value,
  shape: shape.value,
  delayMs: delayMsInput.value ? Number(delayMsInput.value) : undefined,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'AvatarSize',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    description: 'Escala visual disponible para el avatar.',
  },
  {
    name: 'AvatarShape',
    type: "'rounded' | 'square'",
    description: 'Forma del contenedor del avatar.',
  },
  {
    name: 'NormalizeIconProps',
    type: 'IconName | IconConfig',
    typeLink: '/icon',
    description: 'Nombre del icono o configuracion completa del icono.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'src',
    type: 'string',
    default: "''",
    description: 'URL de la imagen. Se envia al AvatarImage de Reka UI.',
  },
  {
    name: 'size',
    type: 'AvatarSize',
    default: "'md'",
    description: 'Tamano visual del avatar.',
  },
  {
    name: 'shape',
    type: 'AvatarShape',
    default: "'rounded'",
    description: 'Forma del contenedor.',
  },
  {
    name: 'delayMs',
    type: 'number',
    default: 'undefined',
    description: 'Tiempo de espera antes de mostrar el fallback.',
  },
  {
    name: 'icon',
    type: 'NormalizeIconProps',
    typeLink: '/icon',
    default: 'undefined',
    description: 'Icono mostrado cuando no hay imagen.',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Texto mostrado cuando no hay imagen ni icono.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'fallback',
    type: 'Record<string, never>',
    default: '-',
    description: 'Personaliza el contenido mostrado cuando la imagen no esta disponible.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Avatar</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Muestra una imagen, un icono o un texto de fallback dentro de un contenedor consistente.
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
        <p class="text-sm text-muted-foreground">Modifica las props y observa el resultado.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Avatar v-bind="playgroundProps" />
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">src</span>
            <input
              v-model="src"
              type="text"
              placeholder="https://..."
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">label</span>
            <input
              v-model="label"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
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
            <span class="font-medium">shape</span>
            <select
              v-model="shape"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="rounded">rounded</option>
              <option value="square">square</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">delayMs</span>
            <input
              v-model="delayMsInput"
              type="number"
              min="0"
              placeholder="undefined"
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
      <ApiTable title="Slots" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
