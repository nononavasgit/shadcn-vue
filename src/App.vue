<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@/components/app/Progress'
import { ProgressCircular } from '@/components/app/ProgressCircular'

const progreso = ref(42)
</script>

<template>
  <main class="mx-auto max-w-3xl space-y-10 p-8">
    <header class="space-y-2">
      <h1 class="text-2xl font-bold">Ejemplos de Progress</h1>
      <p class="text-muted-foreground">Variantes de uso de la API en español.</p>
    </header>

    <section class="space-y-3">
      <h2 class="font-semibold">Basico</h2>
      <Progress :valor="35" />
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">Con etiqueta</h2>
      <Progress :valor="65" titulo="65 % completado" />
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">Etiqueta mediante slot</h2>
      <Progress :valor="72" :maximo="100">
        <template #titulo="{ valor, maximo, porcentaje }">
          {{ valor }} de {{ maximo }} ({{ Math.round(porcentaje) }} %)
        </template>
      </Progress>
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">Colores personalizados</h2>
      <Progress :valor="80" titulo="Procesando" color="#16a34a" color-pista="#dcfce7" />
    </section>

    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold">Valor reactivo</h2>
        <span class="text-sm text-muted-foreground">{{ progreso }} %</span>
      </div>

      <Progress :valor="progreso">
        <template #titulo="{ porcentaje }">{{ Math.round(porcentaje) }} %</template>
      </Progress>

      <input
        v-model.number="progreso"
        class="w-full"
        type="range"
        min="0"
        max="100"
        aria-label="Cambiar progreso"
      />
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">Estado indeterminado</h2>
      <Progress :valor="null" titulo="Esperando..." />
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">UI personalizada</h2>
      <Progress
        :valor="55"
        titulo="Personalizado"
        :ui="{
          indicador: { class: 'bg-violet-500' },
          titulo: { class: 'font-bold tracking-wide' },
        }"
      />
    </section>
    <header class="space-y-2 border-t pt-10">
      <h1 class="text-2xl font-bold">Ejemplos de ProgressCircular</h1>
      <p class="text-muted-foreground">Variantes de uso de la API en español.</p>
    </header>

    <section class="flex flex-wrap items-center gap-8">
      <div class="space-y-3 text-center">
        <h2 class="font-semibold">Básico</h2>
        <ProgressCircular :valor="35" />
      </div>

      <div class="space-y-3 text-center">
        <h2 class="font-semibold">Con título</h2>
        <ProgressCircular :valor="65" titulo="65 %" />
      </div>

      <div class="space-y-3 text-center">
        <h2 class="font-semibold">Título mediante slot</h2>
        <ProgressCircular :valor="72" :maximo="100">
          <template #titulo="{ valor, maximo, porcentaje }">
            <span class="text-xs">
              {{ valor }}/{{ maximo }}<br />
              {{ Math.round(porcentaje) }} %
            </span>
          </template>
        </ProgressCircular>
      </div>
    </section>

    <section class="flex flex-wrap items-end gap-8">
      <div class="space-y-3 text-center">
        <h2 class="font-semibold">Colores</h2>
        <ProgressCircular :valor="80" titulo="80 %" color="#16a34a" color-pista="#dcfce7" />
      </div>

      <div class="space-y-3 text-center">
        <h2 class="font-semibold">Tamaño y grosor</h2>
        <ProgressCircular :valor="60" titulo="60 %" :tamano="120" :grosor="12" />
      </div>

      <div class="space-y-3 text-center">
        <h2 class="font-semibold">Valor reactivo</h2>
        <ProgressCircular :valor="progreso" :tamano="100">
          <template #titulo="{ porcentaje }">{{ Math.round(porcentaje) }} %</template>
        </ProgressCircular>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">UI personalizada</h2>
      <ProgressCircular
        :valor="55"
        titulo="55 %"
        :ui="{
          indicador: { class: 'stroke-violet-500' },
          pista: { class: 'stroke-violet-100' },
          titulo: { class: 'font-bold text-violet-700' },
        }"
      />
    </section>
  </main>
</template>
