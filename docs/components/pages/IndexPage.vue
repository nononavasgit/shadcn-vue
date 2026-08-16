<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-8">
        <header class="grid gap-2">
          <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Docs</p>
          <h1 class="text-3xl font-semibold">Componentes</h1>
          <p class="max-w-2xl text-sm text-muted-foreground">
            API, tipos y playgrounds interactivos de la libreria.
          </p>
        </header>

        <nav aria-label="Componentes" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <RouterLink
            to="/avatar"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Avatar</h2>
            <p class="text-sm text-muted-foreground">
              Imagen, icono, etiqueta y fallback personalizable.
            </p>
          </RouterLink>

          <RouterLink
            to="/announcer"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Announcer</h2>
            <p class="text-sm text-muted-foreground">
              Mensajes accesibles para tecnologias de asistencia.
            </p>
          </RouterLink>

          <RouterLink
            to="/aspect-ratio"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">AspectRatio</h2>
            <p class="text-sm text-muted-foreground">
              Contenedores con una relacion de aspecto estable.
            </p>
          </RouterLink>

          <RouterLink
            to="/card"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Card</h2>
            <p class="text-sm text-muted-foreground">
              Contenido estructurado con encabezado, acciones y pie.
            </p>
          </RouterLink>

          <RouterLink
            to="/field-set"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">FieldSet</h2>
            <p class="text-sm text-muted-foreground">
              Agrupacion de campos con leyenda y descripcion.
            </p>
          </RouterLink>

          <RouterLink
            to="/icon"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Icon</h2>
            <p class="text-sm text-muted-foreground">
              Iconos Lucide con tamanos y color configurables.
            </p>
          </RouterLink>
        </nav>
      </div>
    </main>
  </DocsLayout>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DocsLayout from '../DocsLayout.vue'
</script>
