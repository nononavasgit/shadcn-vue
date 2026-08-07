<script setup>
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Progress, ProgressCircular } from '@/components/ui'

const uploadProgress = ref(68)
const taskProgress = ref(3)
const customProgress = ref(42)
const indeterminateProgress = ref(null)
const circularProgress = ref(64)
const circularIndeterminate = ref(null)

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

const circularUI = {
  root: ({ percentage }) => ({
    class: percentage === 100 ? 'rounded-full ring-2 ring-green-500/30' : undefined,
  }),
  label: ({ percentage }) => ({
    class: percentage < 30 ? 'text-muted-foreground' : undefined,
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
      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Progress circular</h2>
        <p class="text-sm text-muted-foreground">
          Variantes circulares con diferentes tamaños, grosores y configuraciones.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-8">
          <div class="space-y-2 text-center">
            <ProgressCircular :model-value="25" size="64px" label="25%" color="#2563eb" />
            <p class="text-sm text-muted-foreground">Pequeño</p>
          </div>
          <div class="space-y-2 text-center">
            <ProgressCircular :model-value="50" size="96px" thickness="10" label="50%" />
            <p class="text-sm text-muted-foreground">Medio</p>
          </div>
          <div class="space-y-2 text-center">
            <ProgressCircular
              :model-value="75"
              size="128px"
              thickness="14"
              label="75%"
              color="#16a34a"
            />
            <p class="text-sm text-muted-foreground">Grande</p>
          </div>
          <div class="space-y-2 text-center">
            <ProgressCircular :model-value="100" size="96px" label="OK" color="#16a34a" />
            <p class="text-sm text-muted-foreground">Completado</p>
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Circular controlado</h2>
        <div class="flex flex-wrap items-center gap-6">
          <ProgressCircular v-model="circularProgress" size="112px" thickness="12" color="#7c3aed">
            <template #label="{ percentage }">{{ Math.round(percentage) }}%</template>
          </ProgressCircular>
          <div class="min-w-56 flex-1 space-y-3">
            <input
              v-model.number="circularProgress"
              type="range"
              min="0"
              max="100"
              class="w-full"
            />
            <p class="text-sm text-muted-foreground">Valor actual: {{ circularProgress }}%</p>
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Colores y track</h2>
        <div class="flex flex-wrap items-center justify-center gap-8">
          <ProgressCircular
            :model-value="68"
            size="96px"
            color="#f97316"
            track-color="#ffedd5"
            label="68%"
          />
          <ProgressCircular
            :model-value="42"
            size="96px"
            color="#db2777"
            track-color="#fce7f3"
            thickness="6"
            label="42%"
          />
          <ProgressCircular
            :model-value="88"
            size="96px"
            color="#0891b2"
            track-color="#cffafe"
            thickness="16"
            label="88%"
          />
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Indeterminado y UI dinámica</h2>
        <div class="flex flex-wrap items-center gap-6">
          <ProgressCircular
            v-model="circularIndeterminate"
            size="96px"
            label="..."
            color="#f97316"
          />
          <ProgressCircular :model-value="72" size="96px" :ui="circularUI" label="72%" />
          <button
            class="rounded-md border px-3 py-2 text-sm hover:bg-muted"
            @click="circularIndeterminate = circularIndeterminate === null ? 40 : null"
          >
            {{ circularIndeterminate === null ? 'Mostrar 40%' : 'Volver a indeterminado' }}
          </button>
        </div>
      </section>
    </main>
  </ConfigProvider>
</template>
