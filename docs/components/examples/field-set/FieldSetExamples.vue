<script setup lang="ts">
import { ref } from 'vue'

import { FieldSet, type FieldSetProps } from '@/components/ui/FieldSet'

const notifications = ref({
  email: true,
  push: false,
})

const styledFieldSetUi: FieldSetProps['ui'] = {
  legend: () => ({ class: 'text-primary' }),
  group: () => ({ class: 'gap-3 rounded-md border border-dashed p-3' }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Agrupa controles relacionados con una leyenda, una descripción y contenido personalizado.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Grupo básico</h3>
          <p class="text-sm text-muted-foreground">Usa las props legend y description.</p>
        </div>

        <FieldSet legend="Datos de contacto" description="¿Cómo podemos comunicarnos contigo?">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">Correo electrónico</span>
            <input
              type="email"
              placeholder="tu@ejemplo.com"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">Teléfono</span>
            <input
              type="tel"
              placeholder="+34 600 000 000"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        </FieldSet>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Leyenda personalizada</h3>
          <p class="text-sm text-muted-foreground">Usa slots cuando necesites más contenido.</p>
        </div>

        <FieldSet legend-variant="label">
          <template #legend>
            <span class="flex items-center gap-2">
              Preferencias de notificación
              <span class="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                Opcional
              </span>
            </span>
          </template>
          <template #description>
            <span>Elige cómo quieres recibir las novedades.</span>
          </template>

          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="notifications.email"
              type="checkbox"
              class="size-4 rounded border-input"
            />
            <span>Correo electrónico</span>
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="notifications.push"
              type="checkbox"
              class="size-4 rounded border-input"
            />
            <span>Notificaciones push</span>
          </label>
        </FieldSet>
      </div>

      <div class="grid gap-3 rounded-lg border p-4 md:col-span-2">
        <div>
          <h3 class="font-medium">Personalización con ui</h3>
          <p class="text-sm text-muted-foreground">
            Ajusta las partes internas con resolvers sin necesidad de un contexto.
          </p>
        </div>

        <FieldSet
          legend="Dirección de envío"
          description="La dirección se usará para calcular los gastos de envío."
          :ui="styledFieldSetUi"
        >
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">Dirección</span>
            <input
              type="text"
              placeholder="Calle Mayor, 1"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        </FieldSet>
      </div>
    </div>
  </section>
</template>
