<script setup lang="ts">
import { ref } from 'vue'
import { Timeline } from '@/components/ui/Timeline'
import type { TimelineItem, TimelineValue } from '@/components/ui/Timeline'

const verticalTimelineValue = ref<TimelineValue>('review')
const horizontalTimelineValue = ref<TimelineValue>('shipping')
const slotsTimelineValue = ref<TimelineValue>('review')

const projectTimelineItems: TimelineItem[] = [
  {
    value: 'briefing',
    label: 'Briefing recibido',
    description: 'Se han definido los objetivos y el alcance del proyecto.',
  },
  {
    value: 'design',
    label: 'Diseno aprobado',
    description: 'La propuesta visual esta lista para pasar a desarrollo.',
  },
  {
    value: 'review',
    label: 'Revision final',
    description: 'Estamos revisando los ultimos detalles antes de publicar.',
  },
  {
    value: 'published',
    label: 'Publicado',
    description: 'El proyecto estara disponible para todos los usuarios.',
  },
]

const orderTimelineItems: TimelineItem[] = [
  {
    value: 'payment',
    label: 'Pago confirmado',
    description: 'El pago se ha procesado correctamente.',
  },
  { value: 'preparing', label: 'Preparando pedido', description: 'El pedido esta en preparacion.' },
  { value: 'shipping', label: 'Enviado', description: 'El paquete esta en camino.' },
  { value: 'delivered', label: 'Entregado', description: 'Se entregara en la direccion indicada.' },
]

const slotsTimelineItems: TimelineItem[] = [
  { value: 'briefing', label: 'Briefing', description: 'Objetivos definidos.' },
  { value: 'design', label: 'Diseno', description: 'Propuesta visual preparada.' },
  { value: 'review', label: 'Revision', description: 'Ultima revision antes de publicar.' },
  { value: 'published', label: 'Publicado', description: 'Disponible para los usuarios.' },
]

// const verticalTimelineUI: TimelineUI = {
//   root: { class: 'group/timeline flex-col gap-0' },
//   item: { class: 'last:pb-0' },
//   header: { class: 'relative min-h-6 flex-1' },
//   label: { class: 'block' },
//   description: { class: 'max-w-lg' },
//   indicator: ({ active }) => ({
//     class: active ? 'ring-4 ring-primary/15' : '',
//   }),
// }

// const horizontalTimelineUI: TimelineUI = {
//   root: { class: 'group/timeline flex-row gap-6 overflow-x-auto pb-4' },
//   item: { class: 'min-w-48' },
//   header: { class: 'relative min-h-6 flex-1' },
//   label: { class: 'block' },
//   description: { class: 'max-w-52' },
// }
</script>

<template>
  <main class="mx-auto min-h-screen max-w-2xl space-y-8 p-6 md:p-10">
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold">Timeline</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos vertical y horizontal con valor activo y estilos personalizados.
        </p>
      </div>

      <div class="space-y-3 rounded-lg border p-5">
        <h3 class="font-medium">Seguimiento del proyecto</h3>
        <Timeline
          v-model:value="verticalTimelineValue"
          :items="projectTimelineItems"
          :ordered="false"
        />
        <p class="text-sm text-muted-foreground">Paso activo: {{ verticalTimelineValue }}</p>
      </div>

      <div class="space-y-3 rounded-lg border p-5">
        <h3 class="font-medium">Estado del pedido</h3>
        <Timeline
          v-model:value="horizontalTimelineValue"
          :items="orderTimelineItems"
          :ordered="false"
          orientation="horizontal"
        />
        <p class="text-sm text-muted-foreground">Estado activo: {{ horizontalTimelineValue }}</p>
      </div>
    </section>
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold">Slots personalizados</h2>
        <p class="text-sm text-muted-foreground">
          Personaliza el encabezado, los indicadores, las etiquetas y las descripciones por paso.
        </p>
      </div>

      <div class="rounded-lg border p-5">
        <Timeline v-model:value="slotsTimelineValue" :items="slotsTimelineItems" :ordered="false">
          <template #header-briefing="{ item, index }">
            <div class="flex flex-col gap-1">
              <span class="text-xs font-medium text-muted-foreground">Paso {{ index + 1 }}</span>
              <span class="font-semibold">{{ item.label }}</span>
            </div>
          </template>

          <template #indicator-briefing="{ index }">
            <span class="text-[10px]">{{ index + 1 }}</span>
          </template>
          <template #indicator-design="{ index, completed }">
            <span class="text-[10px]">{{ completed ? '✓' : index + 1 }}</span>
          </template>
          <template #indicator-review="{ active }">
            <span v-if="active" class="size-1.5 rounded-full bg-current" />
            <span v-else class="text-[10px]">3</span>
          </template>
          <template #indicator-published="{ completed }">
            <span class="text-[10px]">{{ completed ? '✓' : '4' }}</span>
          </template>

          <template #label-review="{ item, active }">
            <div class="flex items-center gap-2">
              <span>{{ item.label }}</span>
              <span
                v-if="active"
                class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
              >
                Actual
              </span>
            </div>
          </template>

          <template #description-review="{ active }">
            <p class="text-sm text-muted-foreground">
              {{ active ? 'Este paso requiere tu aprobacion.' : 'Paso pendiente de revision.' }}
            </p>
          </template>
        </Timeline>
        <p class="mt-4 text-sm text-muted-foreground">Paso activo: {{ slotsTimelineValue }}</p>
      </div>
    </section>
  </main>
</template>
