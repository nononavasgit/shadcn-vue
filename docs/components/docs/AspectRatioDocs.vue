<script setup lang="ts">
import { computed, ref } from 'vue'

import { AspectRatio, type AspectRatioProps } from '@/components/ui/AspectRatio'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const ratioInput = ref('16/9')

const ratio = computed(() => {
  const [width, height] = ratioInput.value.split('/').map(Number)

  if (width > 0 && height > 0) return width / height

  const numericRatio = Number(ratioInput.value)
  return numericRatio > 0 ? numericRatio : 1
})

const playgroundProps = computed<AspectRatioProps>(() => ({
  ratio: ratio.value,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'AspectRatioRatio',
    type: 'number',
    description: 'Relacion entre el ancho y el alto del contenedor.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'ratio',
    type: 'AspectRatioRatio',
    default: '1',
    description: 'Relacion de aspecto aplicada al contenedor.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Contenido renderizado dentro del contenedor proporcional.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">AspectRatio</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Mantiene una relacion de aspecto estable para el contenido que contiene.
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
        <p class="text-sm text-muted-foreground">
          Cambia la relacion y observa como se adapta el contenedor.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <div class="w-full max-w-md">
              <AspectRatio v-bind="playgroundProps">
                <div
                  class="grid size-full place-items-center rounded-md bg-primary text-primary-foreground"
                >
                  <span class="text-sm font-medium">{{ ratioInput }}</span>
                </div>
              </AspectRatio>
            </div>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">ratio</span>
            <input
              v-model="ratioInput"
              type="text"
              placeholder="16/9"
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
