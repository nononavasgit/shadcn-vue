<script setup lang="ts">
import { Time } from '@/components/ui/Time'
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Representa fechas localizadas y personaliza el contenido del slot.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Fecha localizada</h3>
          <p class="text-sm text-muted-foreground">El formato se adapta al locale indicado.</p>
        </div>
        <Time
          datetime="2024-01-15T00:00:00.000Z"
          locale="es-ES"
          :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
        />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slot personalizado</h3>
          <p class="text-sm text-muted-foreground">
            El slot recibe la fecha ya formateada mediante <code>date</code>.
          </p>
        </div>
        <Time datetime="2024-01-15T00:00:00.000Z" locale="en-US" :format="{ year: 'numeric' }">
          <template #default="{ date }">
            <span class="font-medium">Año: {{ date }}</span>
          </template>
        </Time>
      </div>
    </div>
  </section>
</template>
