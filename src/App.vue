<script setup>
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Timeline } from '@/components/ui'

const timelineValue = ref('design')
const lastValueChange = ref('—')

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
    icon: 'user',
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
  indicator: ({ completed }) => ({
    class: completed ? 'shadow-md' : undefined,
  }),
}

const deliveryItems = [
  {
    value: 1,
    label: 'Pedido recibido',
    description: 'El pedido ha sido registrado.',
    icon: 'check',
  },
  { value: 2, label: 'Preparación', description: 'Estamos preparando el paquete.', icon: 'save' },
  { value: 3, label: 'En camino', description: 'El paquete está en tránsito.', icon: 'search' },
  { value: 4, label: 'Entregado', description: 'El pedido ha sido entregado.', icon: 'success' },
]

function handleValueChange(value) {
  lastValueChange.value = String(value)
}
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
      <header class="space-y-2">
        <h1 class="text-3xl font-semibold">Timeline examples</h1>
        <p class="text-muted-foreground">
          Alineación, orientación, estados, slots y cambios de valor.
        </p>
      </header>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Vertical: align left</h2>
        <Timeline
          v-model:value="timelineValue"
          :items="timelineItems"
          align="left"
          size-indicator="lg"
          severity="success"
          color="#2563eb"
          :ui="timelineUI"
          @value-change="handleValueChange"
        >
          <template #label="{ item, active }">
            <span :class="active ? 'text-primary' : undefined">{{ item.label }}</span>
          </template>
          <template #description="{ item }">
            <span>{{ item.description }}</span>
          </template>
        </Timeline>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="item in timelineItems"
            :key="item.value"
            class="rounded-md border px-3 py-2 text-sm hover:bg-muted"
            type="button"
            @click="timelineValue = item.value"
          >
            {{ item.label }}
          </button>
        </div>
        <p class="text-sm text-muted-foreground">Último valueChange: {{ lastValueChange }}</p>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Vertical: align right</h2>
        <Timeline
          :items="timelineItems"
          value="development"
          align="right"
          size-indicator="md"
          severity="warning"
        />
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Vertical: align alternate</h2>
        <Timeline
          :items="deliveryItems"
          :value="3"
          align="alternate"
          size-indicator="xl"
          color="#7c3aed"
        />
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Horizontal: arriba</h2>
        <Timeline
          :items="timelineItems"
          value="design"
          orientation="horizontal"
          align="left"
          severity="success"
          size-indicator="lg"
        />
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Horizontal: abajo</h2>
        <Timeline
          :items="timelineItems"
          value="development"
          orientation="horizontal"
          align="right"
          severity="error"
          reverse
        />
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Horizontal: alternate</h2>
        <Timeline
          :items="deliveryItems"
          :value="2"
          orientation="horizontal"
          align="alternate"
          color="#0891b2"
          size-indicator="md"
        >
          <template #indicator="{ item, completed }">
            <span :class="completed ? 'font-bold' : undefined">
              {{ item.value }}
            </span>
          </template>
        </Timeline>
      </section>
    </main>
  </ConfigProvider>
</template>
