<script setup lang="ts">
import { Card, type CardProps } from '@/components/ui/Card'

const styledCardUi: CardProps['ui'] = {
  header: () => ({ class: 'bg-muted/40 rounded-t-xl py-4' }),
  content: () => ({ class: 'py-2' }),
  footer: () => ({ class: 'justify-between border-t pt-4' }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de combinar contenido, acciones y slots en una tarjeta.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Tarjeta básica</h3>
          <p class="text-sm text-muted-foreground">Usa label y description como encabezado.</p>
        </div>
        <Card label="Preferencias de cuenta" description="Administra los datos de tu perfil.">
          <p class="text-sm text-muted-foreground">
            Mantén tu información actualizada para disfrutar de una mejor experiencia.
          </p>
        </Card>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Con acción y footer</h3>
          <p class="text-sm text-muted-foreground">Añade controles y metadatos con slots.</p>
        </div>
        <Card
          label="Actualización disponible"
          description="Hay una nueva versión lista para instalar."
        >
          <template #action>
            <button type="button" class="rounded-md border px-2.5 py-1.5 text-xs hover:bg-accent">
              Detalles
            </button>
          </template>
          <p class="text-sm text-muted-foreground">
            La actualización incluye mejoras de rendimiento.
          </p>
          <template #footer>
            <div class="flex w-full items-center justify-between gap-3">
              <span class="text-xs text-muted-foreground">v2.4.0</span>
              <button
                type="button"
                class="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
              >
                Instalar
              </button>
            </div>
          </template>
        </Card>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slots personalizados</h3>
          <p class="text-sm text-muted-foreground">
            Reemplaza el texto del encabezado cuando lo necesites.
          </p>
        </div>
        <Card>
          <template #label>
            <span class="flex items-center gap-2">
              Equipo de trabajo
              <span class="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                >3 miembros</span
              >
            </span>
          </template>
          <template #description>
            <span>Personas con acceso a este proyecto.</span>
          </template>
          <div class="flex -space-x-2">
            <span
              class="grid size-8 place-items-center rounded-full border-2 border-card bg-blue-100 text-xs font-medium text-blue-700"
              >LM</span
            >
            <span
              class="grid size-8 place-items-center rounded-full border-2 border-card bg-amber-100 text-xs font-medium text-amber-700"
              >AR</span
            >
            <span
              class="grid size-8 place-items-center rounded-full border-2 border-card bg-emerald-100 text-xs font-medium text-emerald-700"
              >NS</span
            >
          </div>
        </Card>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Personalización con ui</h3>
          <p class="text-sm text-muted-foreground">Ajusta las partes internas con resolvers.</p>
        </div>
        <Card
          label="Resumen semanal"
          description="Datos de los últimos siete días."
          :ui="styledCardUi"
        >
          <div class="grid gap-1">
            <span class="text-2xl font-semibold">+24,8%</span>
            <span class="text-xs text-emerald-600">12% más que la semana anterior</span>
          </div>
          <template #footer>
            <span class="text-xs text-muted-foreground">Actualizado hace 5 min</span>
            <button type="button" class="ml-auto text-sm font-medium text-primary hover:underline">
              Ver informe
            </button>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>
