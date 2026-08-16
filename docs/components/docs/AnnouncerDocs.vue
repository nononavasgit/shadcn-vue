<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  Announcer,
  type AnnouncerContext,
  type AnnouncerPoliteness,
  type AnnouncerProps,
} from '@/components/ui/Announcer'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const atomic = ref(true)
const message = ref('Cambios guardados correctamente')
const politeness = ref<AnnouncerPoliteness>('polite')
const slotText = ref('')

const playgroundProps = computed<AnnouncerProps>(() => ({
  atomic: atomic.value,
  message: message.value,
  politeness: politeness.value,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'AnnouncerPoliteness',
    type: "'assertive' | 'polite' | 'off'",
    description: 'Nivel de prioridad de la notificacion accesible.',
  },
  {
    name: 'AnnouncerContext',
    type: '{ message: string }',
    description: 'Contexto expuesto al slot default.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'atomic',
    type: 'boolean',
    default: 'true',
    description: 'Indica si el lector de pantalla debe anunciar el contenido completo.',
  },
  {
    name: 'message',
    type: 'string',
    default: "''",
    description: 'Mensaje anunciado cuando no se proporciona contenido en el slot.',
  },
  {
    name: 'politeness',
    type: 'AnnouncerPoliteness',
    default: "'polite'",
    description: 'Configura aria-live y el role semantico del anuncio.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'AnnouncerContext',
    default: '-',
    description: 'Personaliza el contenido y recibe el mensaje mediante slot props.',
  },
]

const exposeRows: ApiTableRow[] = []

function getSlotMessage(context: AnnouncerContext) {
  return slotText.value || context.message
}
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Announcer</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Expone mensajes dinamicos a tecnologias de asistencia mediante aria-live.
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
        <p class="text-sm text-muted-foreground">Cambia el mensaje y la prioridad del anuncio.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Announcer v-bind="playgroundProps">
              <template #default="context">
                <span>{{ getSlotMessage(context) }}</span>
              </template>
            </Announcer>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">message</span>
            <input
              v-model="message"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">slot message</span>
            <input
              v-model="slotText"
              type="text"
              placeholder="Usa el message de props"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="atomic" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">atomic</span>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">politeness</span>
            <select
              v-model="politeness"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="polite">polite</option>
              <option value="assertive">assertive</option>
              <option value="off">off</option>
            </select>
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
