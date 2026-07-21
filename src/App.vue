<script setup lang="ts">
import { Avatar } from '@/components/app/Avatar'

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
          <h2 class="text-xl font-semibold">Avatares</h2>
          <p class="text-sm text-muted-foreground">
            Imagen, fallback de texto, icono, color personalizado y slot fallback.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <Avatar imagen="https://github.com/shadcn.png" alt="hola" titulo="Shadcn" />

          <Avatar titulo="NP" paleta="secundario" alt="hola" />

          <Avatar icono="x" paleta="alerta" :ui="{ icono: { tamano: 'sm', class: 'opacity-80' } }" />

          <Avatar titulo="UI" color="#7c3aed" tamano="sm" />

          <Avatar paleta="primario">
            <template #fallback>
              <span class="font-bold">+3</span>
            </template>
          </Avatar>
        </div>
      </section>
    </div>
  </main>
</template>
