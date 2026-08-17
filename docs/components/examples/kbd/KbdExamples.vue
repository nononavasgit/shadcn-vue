<script setup lang="ts">
import { ref } from 'vue'

import { Kbd } from '@/components/ui/Kbd'

const customLabel = ref('Esc')
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Muestra teclas individuales con una etiqueta o contenido personalizado.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Etiqueta</h3>
          <p class="text-sm text-muted-foreground">Usa la prop label para teclas de texto.</p>
        </div>
        <div class="flex items-center gap-2">
          <Kbd label="Ctrl" />
          <Kbd label="K" />
          <Kbd label="Enter" />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Contenido personalizado</h3>
          <p class="text-sm text-muted-foreground">El slot default permite contenido dinámico.</p>
        </div>
        <Kbd>{{ customLabel }}</Kbd>
        <input
          v-model="customLabel"
          type="text"
          class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          aria-label="Etiqueta de la tecla"
        />
      </div>
    </div>
  </section>
</template>
