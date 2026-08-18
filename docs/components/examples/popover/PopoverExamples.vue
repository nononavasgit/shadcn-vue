<script setup lang="ts">
import { ref } from 'vue'

import { Popover, type PopoverProps } from '@/components/ui/Popover'

const controlledOpen = ref(false)
const styledPopoverUi: PopoverProps['ui'] = {
  content: () => ({ class: 'border-primary' }),
  arrow: () => ({ class: 'fill-primary' }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de usar Popover con props planas y slots.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Popover básico</h3>
          <p class="text-sm text-muted-foreground">Contenido contextual junto a un trigger.</p>
        </div>
        <Popover>
          <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
            Ver información
          </button>
          <template #content>
            <p class="text-sm">Información adicional del elemento seleccionado.</p>
          </template>
        </Popover>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Posicionamiento y flecha</h3>
          <p class="text-sm text-muted-foreground">Configura side, align y showArrow.</p>
        </div>
        <Popover side="right" align="start" :side-offset="8" show-arrow>
          <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
            Abrir a la derecha
          </button>
          <template #content>
            <p class="text-sm">El contenido se posiciona respecto al trigger.</p>
          </template>
        </Popover>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Apertura controlada</h3>
          <p class="text-sm text-muted-foreground">Usa v-model:open desde el exterior.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Popover v-model:open="controlledOpen">
            <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
              Popover controlado
            </button>
            <template #content>
              <p class="text-sm">Estado: {{ controlledOpen ? 'abierto' : 'cerrado' }}</p>
            </template>
          </Popover>
          <button
            type="button"
            class="rounded-md border px-3 py-2 text-sm hover:bg-accent"
            @click="controlledOpen = !controlledOpen"
          >
            {{ controlledOpen ? 'Cerrar' : 'Abrir' }} desde fuera
          </button>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Personalización con ui</h3>
          <p class="text-sm text-muted-foreground">Personaliza content y arrow.</p>
        </div>
        <Popover show-arrow :ui="styledPopoverUi">
          <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
            Popover personalizado
          </button>
          <template #content>
            <p class="text-sm">El borde y la flecha usan resolvers de UI.</p>
          </template>
        </Popover>
      </div>
    </div>
  </section>
</template>
