<script setup>
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Progress } from '@/components/ui'

const uploadProgress = ref(68)
const taskProgress = ref(3)
const customProgress = ref(42)
const indeterminateProgress = ref(null)

const progressUI = {
  root: ({ percentage }) => ({
    class: percentage === 100 ? 'ring-2 ring-green-500/30' : undefined,
  }),
  indicator: ({ percentage }) => ({
    class: percentage >= 75 ? 'bg-green-500' : undefined,
  }),
  label: ({ percentage }) => ({
    class: percentage < 25 ? 'text-foreground' : undefined,
  }),
}

function incrementTask() {
  taskProgress.value = taskProgress.value >= 5 ? 0 : taskProgress.value + 1
}
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto min-h-screen max-w-3xl space-y-10 p-6 md:p-10">
      <header class="space-y-2">
        <h1 class="text-3xl font-semibold">Progress examples</h1>
        <p class="text-muted-foreground">
          Ejemplos de valores, labels, colores, estados y slots personalizados.
        </p>
      </header>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Valores básicos</h2>

        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span>Sin progreso</span>
            <span>0%</span>
          </div>
          <Progress :model-value="0" />
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span>Progreso parcial</span>
            <span>{{ uploadProgress }}%</span>
          </div>
          <Progress v-model="uploadProgress" />
          <input v-model.number="uploadProgress" type="range" min="0" max="100" class="w-full" />
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span>Completado</span>
            <span>100%</span>
          </div>
          <Progress :model-value="100" />
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Labels y contexto</h2>

        <Progress v-model="uploadProgress" label="Subiendo archivos" />

        <Progress :model-value="taskProgress" :max="5" label="Tareas completadas">
          <template #label="{ value, max, percentage }">
            {{ value }} de {{ max }} tareas ({{ Math.round(percentage) }}%)
          </template>
        </Progress>

        <div class="flex items-center gap-3">
          <button class="rounded-md border px-3 py-2 text-sm hover:bg-muted" @click="incrementTask">
            Avanzar tarea
          </button>
          <span class="text-sm text-muted-foreground">{{ taskProgress }} / 5</span>
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Colores</h2>

        <div class="space-y-4">
          <Progress :model-value="72" color="#2563eb" label="Azul personalizado" />
          <Progress
            :model-value="48"
            color="#f97316"
            track-color="#ffedd5"
            label="Naranja con track personalizado"
          />
          <Progress :model-value="86" color="#16a34a" label="Verde completado" />
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Indeterminado</h2>

        <Progress v-model="indeterminateProgress" label="Procesando" />
        <p class="text-sm text-muted-foreground">
          Un valor <code>null</code> representa progreso indeterminado.
        </p>

        <button
          class="rounded-md border px-3 py-2 text-sm hover:bg-muted"
          @click="indeterminateProgress = indeterminateProgress === null ? 35 : null"
        >
          {{ indeterminateProgress === null ? 'Mostrar 35%' : 'Volver a indeterminado' }}
        </button>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">UI dinámica y slot indicator</h2>

        <Progress v-model="customProgress" :ui="progressUI" label="Progreso dinámico">
          <template #indicator="{ percentage }">
            <div
              class="h-full rounded-full bg-violet-600 transition-all"
              :style="{ width: `${percentage}%` }"
            />
          </template>
        </Progress>

        <input v-model.number="customProgress" type="range" min="0" max="100" class="w-full" />
        <p class="text-sm text-muted-foreground">
          El `ui` y los slots reciben el contexto de `Progress`.
        </p>
      </section>
    </main>
  </ConfigProvider>
</template>
