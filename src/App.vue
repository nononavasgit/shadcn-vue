<script setup>
import { ref } from 'vue'
import { Tooltip } from '@/components/ui'
import { ConfigProvider } from '@/components/provider'

const tooltipOpen = ref(false)

const tooltipUI = {
  root: ({ open }) => ({
    class: open ? 'text-primary' : undefined,
  }),
  trigger: ({ open }) => ({
    class: open ? 'ring-2 ring-primary/30' : undefined,
  }),
  content: ({ open }) => ({
    class: open ? 'border-primary/50' : undefined,
  }),
  arrow: ({ open }) => ({
    class: open ? 'fill-primary' : undefined,
  }),
}
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto min-h-screen max-w-2xl space-y-8 p-6 md:p-10">
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Tooltip examples</h2>

        <div class="space-y-2">
          <h3 class="font-medium">Básico</h3>

          <Tooltip label="Este es un tooltip básico">
            <button class="rounded-md border px-3 py-2 text-sm hover:bg-muted">
              Pasa el ratón por encima
            </button>
          </Tooltip>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium">Controlado</h3>

          <Tooltip v-model:open="tooltipOpen" label="Tooltip controlado">
            <button class="rounded-md border px-3 py-2 text-sm hover:bg-muted">
              Alternar tooltip
            </button>
          </Tooltip>

          <p class="text-sm text-muted-foreground">
            Estado: {{ tooltipOpen ? 'abierto' : 'cerrado' }}
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <Tooltip default-open label="Se muestra inicialmente abierto">
            <button class="rounded-md border px-3 py-2 text-sm hover:bg-muted">Default open</button>
          </Tooltip>

          <Tooltip :disabled="true" label="Este tooltip está deshabilitado">
            <button class="rounded-md border px-3 py-2 text-sm opacity-50">Deshabilitado</button>
          </Tooltip>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium">UI y slots con contexto</h3>

          <Tooltip label="Contenido personalizado" :ui="tooltipUI">
            <template #default="{ open }">
              <button class="rounded-md border px-3 py-2 text-sm hover:bg-muted">
                {{ open ? 'Tooltip abierto' : 'Tooltip personalizado' }}
              </button>
            </template>

            <template #content="{ open, close }">
              <span>{{ open ? 'Contenido activo' : 'Contenido cerrado' }}</span>
              <button class="ml-2 underline" @click="close">Cerrar</button>
            </template>

            <template #arrow="{ open }">
              <span v-if="open" class="text-primary">◆</span>
            </template>
          </Tooltip>
        </div>
      </section>
    </main>
  </ConfigProvider>
</template>
