<script setup lang="ts">
import { computed, ref } from 'vue'

import { Time, type TimeContext, type TimeProps } from '@/components/ui/Time'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const datetime = ref('2024-01-15T00:00:00.000Z')
const locale = ref('es-ES')
const formatInput = ref(JSON.stringify({ year: 'numeric', month: 'long', day: 'numeric' }, null, 2))

const format = computed<Intl.DateTimeFormatOptions | undefined>(() => {
  try {
    const parsed = JSON.parse(formatInput.value)

    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : undefined
  } catch {
    return undefined
  }
})

const playgroundProps = computed<TimeProps>(() => ({
  datetime: datetime.value,
  locale: locale.value,
  format: format.value,
}))

const propRows: ApiTableRow[] = [
  {
    name: 'datetime',
    type: 'DateValue',
    default: '-',
    description: 'Fecha que se representa y se usa para el atributo datetime.',
  },
  {
    name: 'locale',
    type: 'string | string[]',
    default: 'locale del navegador',
    description: 'Locale usado para formatear la fecha.',
  },
  {
    name: 'format',
    type: 'Intl.DateTimeFormatOptions',
    default: 'undefined',
    description: 'Opciones nativas de Intl.DateTimeFormat.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'TimeContext',
    typeLink: '#time-context',
    default: '-',
    description: 'Contenido personalizado. Recibe la fecha formateada como date.',
  },
]

const exposeRows: ApiTableRow[] = []

const contextRows: ApiTableRow[] = [
  {
    name: 'date',
    type: 'string',
    description: 'Fecha formateada según locale y format.',
  },
]

function renderSlot(context: TimeContext) {
  return `Fecha: ${context.date}`
}
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Time</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Representa una fecha semantica con formato localizado y contexto para el slot.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">Cambia la fecha, el locale y su formato.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Time v-bind="playgroundProps">
              <template #default="context">
                <span class="font-medium">{{ renderSlot(context) }}</span>
              </template>
            </Time>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">datetime</span>
            <input
              v-model="datetime"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">locale</span>
            <input
              v-model="locale"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">format</span>
            <textarea
              v-model="formatInput"
              rows="6"
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
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
      <ApiTable id="time-context" title="TimeContext" :rows="contextRows" />
    </div>
  </section>
</template>
