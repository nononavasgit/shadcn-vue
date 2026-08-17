<script setup lang="ts">
import { ref } from 'vue'

import { Textarea } from '@/components/ui/Textarea'

const controlledValue = ref('Una descripción editable.')
const notes = ref('')
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de usar Textarea en formularios controlados.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Valor controlado</h3>
          <p class="text-sm text-muted-foreground">Sincroniza el contenido con v-model:value.</p>
        </div>
        <Textarea v-model:value="controlledValue" rows="4" aria-label="Descripción" />
        <p class="text-sm text-muted-foreground">{{ controlledValue }}</p>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Placeholder y filas</h3>
          <p class="text-sm text-muted-foreground">
            Configura una ayuda visual y la altura inicial.
          </p>
        </div>
        <Textarea
          v-model:value="notes"
          rows="6"
          placeholder="Escribe tus notas aquí"
          aria-label="Notas"
        />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Deshabilitado</h3>
          <p class="text-sm text-muted-foreground">
            Muestra contenido sin permitir modificaciones.
          </p>
        </div>
        <Textarea
          value="Este contenido no se puede editar."
          rows="4"
          disabled
          aria-label="Contenido deshabilitado"
        />
      </div>
    </div>
  </section>
</template>
