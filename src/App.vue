<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@/components/app/Progress'

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
  </main>
</template>
