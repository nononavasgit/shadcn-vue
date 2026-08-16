<script setup lang="ts">
import { Kbd, KbdGroup, type KbdGroupProps } from '@/components/ui/Kbd'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const playgroundProps: KbdGroupProps = {}

const typeRows: ApiTableRow[] = [
  {
    name: 'KbdGroupProps',
    type: 'Record<string, never>',
    description: 'El wrapper no define props propias.',
  },
]

const propRows: ApiTableRow[] = []

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Teclas que forman el grupo.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">KbdGroup</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Agrupa varias teclas Kbd para representar atajos completos.
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
        <p class="text-sm text-muted-foreground">Combina teclas para formar un atajo.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <KbdGroup v-bind="playgroundProps">
              <Kbd label="Ctrl" />
              <span class="text-muted-foreground">+</span>
              <Kbd label="K" />
            </KbdGroup>
          </Playground>
        </div>
        <div class="rounded-lg border p-4 text-sm text-muted-foreground">
          KbdGroup no requiere props para combinar varias teclas.
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable
        title="Props"
        :rows="propRows"
        empty-text="Este wrapper no define props propias."
      />
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
