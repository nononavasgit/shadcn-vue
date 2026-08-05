<script setup lang="ts">
import { ref } from 'vue'
import { Collapsible } from '@/components/ui/Collapsible'
import { Panel } from '@/components/ui/Panel'

const collapsibleOpen = ref(false)
const panelOpen = ref(false)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-2xl space-y-8 p-6 md:p-10">
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold">Collapsible y Panel</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos controlados con contextos compartidos entre UI y slots.
        </p>
      </div>

      <div class="space-y-3 rounded-lg border p-5">
        <Collapsible
          v-model:open="collapsibleOpen"
          :ui="{
            content: ({ open }) => ({
              class: ['pt-3 text-sm text-muted-foreground', open && 'animate-in fade-in'],
            }),
          }"
        >
          <button class="rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted">
            {{ collapsibleOpen ? 'Ocultar detalles' : 'Mostrar detalles' }}
          </button>
          <template #content>
            Este contenido usa directamente los componentes Collapsible de Reka.
          </template>
        </Collapsible>
      </div>

      {{ panelOpen }}
      <Panel
        v-model:open="panelOpen"
        label="ConfiguraciÃ³n del proyecto"
        icon="info"
        severity="primary"
        variant="subtle"
        :collapsible="false"
        :ui="{
          label: ({ open }) => ({ class: open ? 'text-violet-500' : undefined }),
        }"
      >
        <template #default="{ open }">
          Estado actual del panel: {{ open ? 'abierto' : 'cerrado' }}.
        </template>
      </Panel>
    </section>
  </main>
</template>
