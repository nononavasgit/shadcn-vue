<script setup lang="ts">
import { ref } from 'vue'

import { Progress, type ProgressProps } from '@/components/ui/Progress'

const controlledValue = ref(35)
const styledProgressUi: ProgressProps['ui'] = {
  indicator: () => ({ class: 'bg-success' }),
  label: () => ({ class: 'text-white' }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de usar Progress con valores determinados e indeterminados.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Progreso básico</h3>
          <p class="text-sm text-muted-foreground">Usa un valor entre cero y el máximo.</p>
        </div>
        <Progress :value="40" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Estado indeterminado</h3>
          <p class="text-sm text-muted-foreground">Usa null cuando no se conoce el porcentaje.</p>
        </div>
        <Progress :value="null" class="animate-pulse" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Etiqueta y colores</h3>
          <p class="text-sm text-muted-foreground">
            Combina label, color y trackColor para mostrar más contexto.
          </p>
        </div>
        <Progress
          :value="controlledValue"
          label="Subiendo archivos"
          color="#2563eb"
          track-color="#dbeafe"
        />
        <div class="flex items-center gap-3">
          <input v-model.number="controlledValue" type="range" min="0" max="100" class="w-full" />
          <output class="w-10 text-right text-sm tabular-nums">{{ controlledValue }}%</output>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Personalización con ui</h3>
          <p class="text-sm text-muted-foreground">Personaliza indicator y label.</p>
        </div>
        <Progress :value="75" label="Completado" :ui="styledProgressUi" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4 md:col-span-2">
        <div>
          <h3 class="font-medium">Slots indicator y label</h3>
          <p class="text-sm text-muted-foreground">
            Reemplaza la barra y la etiqueta usando el contexto del progreso.
          </p>
        </div>
        <Progress :value="65" class="h-5">
          <template #indicator="{ percentage }">
            <div
              class="h-full bg-gradient-to-r from-primary to-success"
              :style="{ width: `${percentage}%` }"
            />
          </template>
          <template #label="{ percentage }">
            <span class="text-xs font-semibold text-white">{{ percentage }}%</span>
          </template>
        </Progress>
      </div>
    </div>
  </section>
</template>
