<script setup lang="ts">
import { ref } from 'vue'

import { Tooltip, type TooltipProps } from '@/components/ui/Tooltip'

const controlledOpen = ref(false)
const styledTooltipUi: TooltipProps['ui'] = {
  content: ({ open }) => ({
    class: open ? 'border-primary' : undefined,
  }),
  arrow: () => ({ class: 'fill-foreground' }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de usar Tooltip con props planas y slots.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Tooltip básico</h3>
          <p class="text-sm text-muted-foreground">Usa label como contenido de texto.</p>
        </div>
        <Tooltip label="Este es un tooltip básico">
          <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
            Pasa el cursor
          </button>
        </Tooltip>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Posicionamiento</h3>
          <p class="text-sm text-muted-foreground">
            Configura side, align y sideOffset directamente.
          </p>
        </div>
        <Tooltip label="Tooltip a la derecha" side="right" align="start" :side-offset="8">
          <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
            Ver posición
          </button>
        </Tooltip>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Contenido mediante slot</h3>
          <p class="text-sm text-muted-foreground">El slot content sustituye a label.</p>
        </div>
        <Tooltip label="Contenido de fallback">
          <template #default="{ open }">
            <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
              {{ open ? 'Abierto' : 'Cerrado' }}
            </button>
          </template>
          <template #content>
            <span class="font-medium">Contenido enriquecido</span>
            <span class="ml-1 text-success">Hola</span>
          </template>
        </Tooltip>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Apertura controlada</h3>
          <p class="text-sm text-muted-foreground">Usa v-model:open para controlar el estado.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Tooltip v-model:open="controlledOpen" label="Estado controlado">
            <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
              Tooltip controlado
            </button>
          </Tooltip>
          <button
            type="button"
            class="rounded-md border px-3 py-2 text-sm hover:bg-accent"
            @click="controlledOpen = !controlledOpen"
          >
            {{ controlledOpen ? 'Cerrar' : 'Abrir' }}
          </button>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Personalización con ui</h3>
          <p class="text-sm text-muted-foreground">
            Los resolvers reciben el contexto del tooltip.
          </p>
        </div>
        <Tooltip
          label="Tooltip personalizado"
          with-arrow
          :ui="styledTooltipUi"
          :arrow-width="12"
          :arrow-height="6"
        >
          <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
            Con UI personalizada
          </button>
        </Tooltip>
      </div>
    </div>
  </section>
</template>
