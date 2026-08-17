<script setup lang="ts">
import { ref } from 'vue'

import { InputTime } from '@/components/ui/InputTime'

const appointment = ref('09:30')
const reminder = ref('')
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de usar InputTime en formularios de hora.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Hora controlada</h3>
          <p class="text-sm text-muted-foreground">Sincroniza el campo con v-model:value.</p>
        </div>
        <InputTime v-model:value="appointment" aria-label="Hora de la cita" />
        <p class="text-sm text-muted-foreground">Hora seleccionada: {{ appointment }}</p>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Sin reloj nativo</h3>
          <p class="text-sm text-muted-foreground">Oculta el icono del selector del navegador.</p>
        </div>
        <InputTime
          v-model:value="reminder"
          :show-clock="false"
          placeholder="HH:MM"
          aria-label="Hora del recordatorio"
        />
      </div>

      <div class="grid gap-3 rounded-lg border p-4 md:col-span-2">
        <div>
          <h3 class="font-medium">Rango y pasos</h3>
          <p class="text-sm text-muted-foreground">
            Los atributos nativos min, max y step se pasan al input de hora.
          </p>
        </div>
        <InputTime value="12:00" min="09:00" max="18:00" step="900" aria-label="Horario laboral" />
      </div>
    </div>
  </section>
</template>
