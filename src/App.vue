<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@/components/app/Progress'

const progress = ref(42)
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-3xl space-y-10">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Progress</h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Barras de progreso con etiqueta centrada y contenido personalizable mediante slots.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Básico</h2>
          <p class="text-sm text-muted-foreground">
            Sin etiqueta mantiene la altura compacta del componente de UI.
          </p>
        </div>

        <Progress :value="35" aria-label="hola" />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Con label</h2>
          <p class="text-sm text-muted-foreground">
            Al indicar label, la barra aumenta su altura y centra el texto.
          </p>
        </div>

        <Progress :value="60" label="60%" />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Progreso reactivo</h2>
          <p class="text-sm text-muted-foreground">
            El valor y la etiqueta se actualizan al mover el control.
          </p>
        </div>

        <Progress :value="progress" :label="`${progress}%`" />

        <input
          v-model.number="progress"
          type="range"
          min="0"
          max="100"
          class="w-full accent-primary"
        />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Max personalizado</h2>
          <p class="text-sm text-muted-foreground">
            El porcentaje se calcula respecto al valor de max.
          </p>
        </div>

        <Progress :value="3" :max="5" label="3 de 5 tareas" />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Slot label</h2>
          <p class="text-sm text-muted-foreground">
            El slot recibe value, max y percentage para construir la etiqueta.
          </p>
        </div>

        <Progress :value="7" :max="10">
          <template #label="{ value, max, percentage }">
            {{ value }}/{{ max }} · {{ Math.round(percentage) }}%
          </template>
        </Progress>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Indeterminado</h2>
          <p class="text-sm text-muted-foreground">
            Un valor null comunica que todavía no se conoce el progreso.
          </p>
        </div>

        <Progress :value="null" label="Preparando…" />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Custom UI</h2>
          <p class="text-sm text-muted-foreground">
            Los nodos root y label pueden personalizarse mediante el objeto ui.
          </p>
        </div>

        <Progress
          :value="75"
          label="Instalando dependencias"
          color="#7c3aed"
          :ui="{
            root: { class: 'h-8 rounded-md bg-secondary/20' },
            label: { class: 'text-sm font-semibold' },
          }"
        />
      </section>
    </div>
  </main>
</template>
