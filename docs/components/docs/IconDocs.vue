<script setup lang="ts">
import { computed, ref } from 'vue'

import { Icon, type IconName, type IconProps, type IconSize } from '@/components/ui/Icon'
import { ICONS } from '@/components/ui/Icon/icons'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const iconNames = Object.keys(ICONS) as IconName[]
const name = ref<IconName>('user')
const size = ref<IconSize>('md')
const color = ref('#2563eb')

const playgroundProps = computed<IconProps>(() => ({
  name: name.value,
  size: size.value,
  color: color.value,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'IconName',
    type: 'keyof typeof ICONS',
    description: 'Nombres de iconos disponibles en la libreria.',
  },
  {
    name: 'IconSize',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    description: 'Escala visual del icono.',
  },
  {
    name: 'IconConfig',
    type: 'IconProps & HTMLAttributes',
    description: 'Configuracion completa del icono y atributos HTML.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'name',
    type: 'IconName',
    required: true,
    description: 'Nombre del icono que se va a renderizar.',
  },
  {
    name: 'size',
    type: 'IconSize',
    default: "'md'",
    description: 'Tamano visual del icono.',
  },
  {
    name: 'color',
    type: 'string',
    default: "'currentColor'",
    description: 'Color CSS aplicado al icono.',
  },
]

const emitRows: ApiTableRow[] = []
const slotRows: ApiTableRow[] = []
const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Icon</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Renderiza un icono Lucide con una API compacta y consistente.
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
        <p class="text-sm text-muted-foreground">Prueba nombres, tamanos y colores.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Icon v-bind="playgroundProps" />
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">name</span>
            <select
              v-model="name"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option v-for="iconName in iconNames" :key="iconName" :value="iconName">
                {{ iconName }}
              </option>
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
      <ApiTable
        title="Slots"
        type-label="slotProps"
        :show-default="false"
        :rows="slotRows"
        empty-text="Este componente no define slots."
      />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
