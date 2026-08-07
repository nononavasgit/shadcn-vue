<script setup>
import { ref } from 'vue'
import { Timeline } from '@/components/ui'
import { ConfigProvider } from '@/components/provider'

const timelineValue = ref('design')

const timelineItems = [
  {
    value: 'research',
    label: 'Investigación',
    description: 'Definimos los objetivos y recopilamos los requisitos.',
    icon: 'search',
  },
  {
    value: 'design',
    label: 'Diseño',
    description: 'Creamos la propuesta visual y validamos la experiencia.',
    icon: 'save',
  },
  {
    value: 'development',
    label: 'Desarrollo',
    description: 'Implementamos el producto y conectamos sus componentes.',
    icon: 'check',
  },
  {
    value: 'release',
    label: 'Lanzamiento',
    description: 'Publicamos la versión final y medimos sus resultados.',
    icon: 'success',
  },
]

const timelineUI = {
  label: ({ active }) => ({
    class: active ? 'underline underline-offset-4' : undefined,
  }),
}
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto min-h-screen max-w-3xl space-y-8 p-6 md:p-10">
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Timeline examples</h2>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="item in timelineItems"
            :key="item.value"
            class="rounded-md border px-3 py-2 text-sm hover:bg-muted"
            :class="timelineValue === item.value ? 'border-primary text-primary' : undefined"
            @click="timelineValue = item.value"
          >
            {{ item.label }}
          </button>
        </div>

        <Timeline
          v-model:value="timelineValue"
          :items="timelineItems"
          size-indicator="lg"
          color="#7c3aed"
          severity="success"
          :ui="timelineUI"
        />

        <p class="text-sm text-muted-foreground">Paso actual: {{ timelineValue }}</p>
      </section>

      <section class="space-y-4">
        <h3 class="font-medium">Orientación horizontal</h3>

        <Timeline
          :items="timelineItems"
          orientation="horizontal"
          value="development"
          size-indicator="md"
          severity="error"
          reverse
        />
      </section>
    </main>
  </ConfigProvider>
</template>
