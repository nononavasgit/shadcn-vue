<script setup lang="ts">
import { ref } from 'vue'

import { ProgressCircular, type ProgressCircularProps } from '@/components/ui/ProgressCircular'

const controlledValue = ref(65)
const styledProgressCircularUi: ProgressCircularProps['ui'] = {
  svg: () => ({ class: 'drop-shadow-sm' }),
  indicator: () => ({ class: 'stroke-success' }),
  label: () => ({ class: 'text-success' }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de usar ProgressCircular con estados y personalización interna.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Progreso básico</h3>
          <p class="text-sm text-muted-foreground">Usa un valor entre cero y el máximo.</p>
        </div>
        <div class="flex items-center gap-4">
          <ProgressCircular :value="40" />
          <ProgressCircular :value="80" size="5rem" thickness="6" />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Estado indeterminado</h3>
          <p class="text-sm text-muted-foreground">Usa null cuando no se conoce el porcentaje.</p>
        </div>
        <ProgressCircular :value="null" class="animate-pulse" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Etiqueta y colores</h3>
          <p class="text-sm text-muted-foreground">
            Combina label, color y trackColor para mostrar más contexto.
          </p>
        </div>
        <div class="flex items-center gap-4">
          <ProgressCircular
            :value="controlledValue"
            label="Cargando"
            color="#2563eb"
            track-color="#dbeafe"
          />
          <input v-model.number="controlledValue" type="range" min="0" max="100" />
          <output class="w-10 text-right text-sm tabular-nums">{{ controlledValue }}%</output>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Personalización con ui</h3>
          <p class="text-sm text-muted-foreground">Personaliza svg, indicator y label.</p>
        </div>
        <ProgressCircular :value="75" label="Completado" :ui="styledProgressCircularUi" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4 md:col-span-2">
        <div>
          <h3 class="font-medium">Slot label</h3>
          <p class="text-sm text-muted-foreground">
            Personaliza la etiqueta central usando el contexto del progreso.
          </p>
        </div>
        <ProgressCircular :value="65" label="65%">
          <template #label="{ percentage }">
            <span class="text-xs font-semibold text-success">{{ percentage }}%</span>
          </template>
        </ProgressCircular>
      </div>
    </div>
  </section>
</template>
