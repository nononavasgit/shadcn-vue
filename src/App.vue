<script setup lang="ts">
import { Kbd } from '@/components/app/Kbd'
import { Tarjeta } from '@/components/app/Tarjeta'
</script>

<template>
  <main class="min-h-screen bg-background text-foreground">
    <div class="mx-auto max-w-4xl space-y-12 px-6 py-12">
      <header class="space-y-2">
        <p class="text-sm font-medium text-muted-foreground">@nonito/ui</p>
        <h1 class="text-3xl font-bold tracking-tight">Alertas</h1>
        <p class="max-w-2xl text-muted-foreground">
          Ejemplos de variantes, paletas, colores personalizados, iconos y cierre.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-xl font-semibold">Teclas</h2>
          <p class="text-sm text-muted-foreground">
            Teclas mediante la prop titulo y el slot predeterminado.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-1">
            <Kbd titulo="Ctrl" />
            <span class="text-sm text-muted-foreground">+</span>
            <Kbd titulo="k" />
          </div>

          <Kbd titulo="Enter" variante="delineado" />
          <Kbd titulo="Esc" variante="suave" tamano="sm" />
          <Kbd titulo="?" variante="sutil" tamano="md"></Kbd>
          <Kbd tamano="lg">Fn</Kbd>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-xl font-semibold">Tarjetas</h2>
          <p class="text-sm text-muted-foreground">
            Cabecera mediante props y contenido personalizado mediante slots.
          </p>
        </div>

        <Tarjeta titulo="Preferencias" descripcion="Configura el comportamiento de tu cuenta." class="max-w-md" :ui="{
          cabecera: { class: 'border-b' },
          contenido: { class: 'space-y-2' },
          pie: { class: 'justify-end border-t' },
        }">
          <template #contenido>
            <p class="text-sm">Los cambios realizados se aplicar�n a todos tus dispositivos.</p>
            <p class="text-sm text-muted-foreground">
              Puedes volver a modificar estas preferencias cuando quieras.
            </p>
          </template>

          <template #pie>
            <button type="button" class="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
              Guardar cambios
            </button>
          </template>
        </Tarjeta>
      </section>
    </div>
  </main>
</template>
