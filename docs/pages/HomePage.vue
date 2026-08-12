<script setup lang="ts">
import { RouterLink } from 'vue-router'

const components = [
  {
    name: 'Separator',
    path: '/separator',
    description: 'Separa visual o semánticamente grupos de contenido.',
  },
]
</script>

<template>
  <main class="mx-auto max-w-6xl px-6 py-16">
    <section class="max-w-3xl">
      <p class="text-sm font-semibold tracking-wide text-primary uppercase">Documentación</p>
      <h1 class="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Componentes</h1>
      <p class="mt-5 text-lg leading-8 text-muted-foreground">
        Consulta la API, los slots y ejemplos de uso de cada componente de la librería.
      </p>
    </section>

    <section class="mt-12" aria-labelledby="componentes-title">
      <h2 id="componentes-title" class="text-sm font-medium text-muted-foreground">
        Todos los componentes
      </h2>
      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="component in components"
          :key="component.path"
          :to="component.path"
          class="group rounded-xl border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-muted/30"
        >
          <div class="flex items-center justify-between gap-4">
            <h3 class="font-semibold">{{ component.name }}</h3>
            <span class="text-muted-foreground transition-transform group-hover:translate-x-1"
              >→</span
            >
          </div>
          <p class="mt-2 text-sm leading-6 text-muted-foreground">
            {{ component.description }}
          </p>
        </RouterLink>
      </div>
    </section>
  </main>
</template>
