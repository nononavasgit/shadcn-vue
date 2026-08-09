<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Label, TimeField } from '@/components/ui'
import type { TimeFieldValue } from '@/components/ui/TimeField'
import { useDates } from '@/composables'

const { createTime } = useDates()

const basicTime = shallowRef(createTime(18, 30, 10))
const twelveHourTime = shallowRef(createTime(14, 45))
const preciseTime = shallowRef(createTime(18, 20, 35))
const constrainedTime = shallowRef(createTime(12))
const emptyTime = ref<TimeFieldValue>()
</script>

<template>
  <ConfigProvider>
    <main class="min-h-screen bg-background px-6 py-12 text-foreground">
      <div class="mx-auto grid max-w-4xl gap-8">
        <header class="space-y-2">
          <h1 class="text-3xl font-bold tracking-tight">TimeField</h1>
          <p class="text-muted-foreground">Ejemplos de entrada de hora con segmentos accesibles.</p>
        </header>

        <section class="grid gap-6 md:grid-cols-2">
          <article class="space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div class="space-y-1">
              <h2 class="font-semibold">Formato de 24 horas</h2>
              <p class="text-sm text-muted-foreground">Horas y minutos.</p>
            </div>

            <div class="grid gap-2">
              <Label for="basic-time">Hora de inicio</Label>
              {{ basicTime }}
              <TimeField
                id="basic-time"
                v-model:value="basicTime"
                :hour-cycle="24"
                granularity="second"
              />
              <code class="text-xs text-muted-foreground">{{ basicTime?.toString() }}</code>
            </div>
          </article>

          <article class="space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div class="space-y-1">
              <h2 class="font-semibold">Formato de 12 horas</h2>
              <p class="text-sm text-muted-foreground">Incluye el segmento AM/PM.</p>
            </div>

            <div class="grid gap-2">
              <Label for="twelve-hour-time">Hora de la cita</Label>
              <TimeField id="twelve-hour-time" v-model:value="twelveHourTime" :hour-cycle="12" />
              <code class="text-xs text-muted-foreground">{{ twelveHourTime.toString() }}</code>
            </div>
          </article>

          <article class="space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div class="space-y-1">
              <h2 class="font-semibold">Con segundos</h2>
              <p class="text-sm text-muted-foreground">Granularidad y pasos de cinco segundos.</p>
            </div>

            <div class="grid gap-2">
              <Label for="precise-time">Hora exacta</Label>
              <TimeField
                id="precise-time"
                v-model:value="preciseTime"
                :hour-cycle="24"
                granularity="second"
                :step="{ second: 5 }"
                step-snapping
              />
              <code class="text-xs text-muted-foreground">{{ preciseTime.toString() }}</code>
            </div>
          </article>

          <article class="space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div class="space-y-1">
              <h2 class="font-semibold">Hora limitada</h2>
              <p class="text-sm text-muted-foreground">Solo admite valores entre 09:00 y 17:00.</p>
            </div>

            <div class="grid gap-2">
              <Label for="constrained-time">Horario laboral</Label>
              <TimeField
                id="constrained-time"
                v-model:value="constrainedTime"
                :hour-cycle="24"
                :min-value="createTime(9)"
                :max-value="createTime(17)"
              />
              <code class="text-xs text-muted-foreground">{{ constrainedTime.toString() }}</code>
            </div>
          </article>

          <article class="space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div class="space-y-1">
              <h2 class="font-semibold">Sin valor inicial</h2>
              <p class="text-sm text-muted-foreground">Los segmentos muestran su placeholder.</p>
            </div>

            <div class="grid gap-2">
              <Label for="empty-time">Hora opcional</Label>
              <TimeField id="empty-time" v-model:value="emptyTime" :hour-cycle="24" />
              <code class="text-xs text-muted-foreground">
                {{ emptyTime?.toString() ?? 'Sin seleccionar' }}
              </code>
            </div>
          </article>

          <article class="space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div class="space-y-1">
              <h2 class="font-semibold">Estados</h2>
              <p class="text-sm text-muted-foreground">Ejemplos deshabilitado y de solo lectura.</p>
            </div>

            <div class="flex flex-wrap gap-3">
              <TimeField :value="createTime(8, 15)" :hour-cycle="24" disabled />
              <TimeField :value="createTime(16, 30)" :hour-cycle="24" readonly />
            </div>
          </article>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
