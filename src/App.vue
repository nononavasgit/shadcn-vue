<script setup lang="ts">
import { Kbd } from '@/components/app/Kbd'
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
    </div>
  </main>
</template>
