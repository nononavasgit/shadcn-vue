<script setup lang="ts">
import { computed, ref } from 'vue'

import { MeterGroup, type MeterGroupItem, type MeterGroupProps } from '@/components/ui/MeterGroup'

const storageItems: MeterGroupItem[] = [
  { label: 'System', value: 19, color: '#2563eb', icon: { name: 'file' } },
  { label: 'Apps', value: 6, color: '#7c3aed', icon: { name: 'fileText' } },
  { label: 'Documents', value: 9, color: '#db2777', icon: { name: 'fileSpreadsheet' } },
  { label: 'Multimedia', value: 33, color: '#ea580c', icon: { name: 'image' } },
]

const usage = ref(42)
const usageItems = computed<MeterGroupItem[]>(() => [
  { label: 'Usado', value: usage.value, color: '#0891b2', icon: { name: 'upload' } },
  { label: 'Disponible', value: 100 - usage.value, color: '#cbd5e1', icon: { name: 'save' } },
])

const styledMeterGroupUi: MeterGroupProps['ui'] = {
  status: () => ({ class: 'text-primary' }),
  meter: () => ({ class: 'shadow-sm' }),
  list: () => ({ class: 'gap-2' }),
  item: ({ item }) => ({
    class: item.color ? 'rounded-md px-2 py-1 hover:bg-muted' : undefined,
  }),
  label: () => ({ class: 'font-medium' }),
  leading: () => ({ class: 'ring-2 ring-current/20' }),
  trailing: () => ({ class: 'text-primary' }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de representar una distribución con MeterGroup.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Distribución básica</h3>
          <p class="text-sm text-muted-foreground">Cada item puede definir label, value y color.</p>
        </div>
        <MeterGroup :items="storageItems" status />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Sin indicador total</h3>
          <p class="text-sm text-muted-foreground">
            Oculta el porcentaje superior cuando la leyenda es suficiente.
          </p>
        </div>
        <MeterGroup :items="storageItems" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Total con max personalizado</h3>
          <p class="text-sm text-muted-foreground">
            El total puede superar max; los segmentos se escalan dentro del track.
          </p>
        </div>
        <MeterGroup
          :items="[
            { label: 'Completado', value: 72, color: '#16a34a' },
            { label: 'Pendiente', value: 38, color: '#f59e0b' },
          ]"
          :max="100"
          status
        />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Personalización con ui</h3>
          <p class="text-sm text-muted-foreground">
            Usa el item del contexto para personalizar cada fila.
          </p>
        </div>
        <MeterGroup :items="storageItems" status :ui="styledMeterGroupUi" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4 md:col-span-2">
        <div>
          <h3 class="font-medium">Slots status e item</h3>
          <p class="text-sm text-muted-foreground">
            Usa item para reemplazar una fila completa y sus slots secundarios para ajustar cada
            zona.
          </p>
        </div>
        <MeterGroup :items="usageItems" status>
          <template #status="{ percentage }">
            <span class="text-xs font-semibold">{{ Math.round(percentage) }}% utilizado</span>
          </template>
          <template #item="{ item, index, percentage }">
            <span class="flex items-center justify-between gap-4 rounded-md bg-muted/50 px-2 py-1">
              <span>{{ index + 1 }}. {{ item.label }}</span>
              <span class="text-xs tabular-nums">{{ Math.round(percentage) }}%</span>
            </span>
          </template>
        </MeterGroup>

        <MeterGroup :items="usageItems">
          <template #item-leading="{ item }">
            <span
              class="square size-2 shrink-0"
              :style="{ backgroundColor: item.color }"
              aria-hidden="true"
            />
          </template>
          <template #item-label="{ item }">
            <span class="truncate">{{ item.label }}</span>
          </template>
          <template #item-trailing="{ percentage }">
            <span class="shrink-0 text-xs tabular-nums">{{ Math.round(percentage) }}%</span>
          </template>
        </MeterGroup>
        <input v-model.number="usage" type="range" min="0" max="100" class="w-full" />
      </div>
    </div>
  </section>
</template>
