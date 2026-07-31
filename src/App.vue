<script setup lang="ts">
import { ScrollArea } from '@/components/ui/ScrollArea'

const activities = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  title: `Actividad ${index + 1}`,
  description: `Descripción de la actividad número ${index + 1}.`,
}))

const columns = Array.from({ length: 12 }, (_, index) => `Columna ${index + 1}`)
const rows = Array.from({ length: 20 }, (_, index) => `Fila ${index + 1}`)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">ScrollArea</h1>
      <p class="text-muted-foreground">
        Ejemplos de desplazamiento vertical, horizontal, bidireccional y personalizado.
      </p>
    </header>

    <section class="grid gap-6 md:grid-cols-2">
      <div class="space-y-3 rounded-xl border p-5">
        <div>
          <h2 class="text-lg font-semibold">Vertical</h2>
          <p class="text-sm text-muted-foreground">La barra aparece al interactuar.</p>
        </div>

        <ScrollArea class="h-72 rounded-lg border" type="hover">
          <div class="divide-y p-4">
            <article v-for="activity in activities" :key="activity.id" class="py-3 first:pt-0">
              <h3 class="text-sm font-medium">{{ activity.title }}</h3>
              <p class="text-xs text-muted-foreground">{{ activity.description }}</p>
            </article>
          </div>
        </ScrollArea>
      </div>

      <div class="space-y-3 rounded-xl border p-5">
        <div>
          <h2 class="text-lg font-semibold">Barra permanente</h2>
          <p class="text-sm text-muted-foreground">Usa type always y forceMount.</p>
        </div>

        <ScrollArea class="h-72 rounded-lg border" type="always" force-mount>
          <div class="space-y-2 p-4 pr-6">
            <div
              v-for="activity in activities"
              :key="activity.id"
              class="rounded-md bg-muted/50 p-3 text-sm"
            >
              {{ activity.title }}
            </div>
          </div>
        </ScrollArea>
      </div>
    </section>

    <section class="space-y-4 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Horizontal</h2>
        <p class="text-sm text-muted-foreground">Tarjetas en una única fila.</p>
      </div>

      <ScrollArea class="w-full rounded-lg border" orientation="horizontal" type="always">
        <div class="flex w-max gap-4 p-4 pb-6">
          <article
            v-for="column in columns"
            :key="column"
            class="w-48 shrink-0 rounded-lg border bg-card p-4"
          >
            <div class="mb-8 h-24 rounded-md bg-muted" />
            <h3 class="font-medium">{{ column }}</h3>
            <p class="text-sm text-muted-foreground">Contenido desplazable.</p>
          </article>
        </div>
      </ScrollArea>
    </section>

    <section class="space-y-4 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Ambas direcciones</h2>
        <p class="text-sm text-muted-foreground">Tabla más ancha y alta que el viewport.</p>
      </div>

      <ScrollArea class="h-72 w-full rounded-lg border" orientation="both" type="always">
        <table class="w-[900px] border-collapse text-sm">
          <thead class="bg-muted">
            <tr>
              <th class="sticky left-0 min-w-28 border bg-muted p-3 text-left">Elemento</th>
              <th v-for="column in columns" :key="column" class="min-w-28 border p-3 text-left">
                {{ column }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row">
              <th class="sticky left-0 border bg-background p-3 text-left">{{ row }}</th>
              <td v-for="column in columns" :key="column" class="border p-3">
                {{ row }} / {{ column }}
              </td>
            </tr>
          </tbody>
        </table>
      </ScrollArea>
    </section>

    <section class="space-y-4 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Personalizado mediante ui</h2>
        <p class="text-sm text-muted-foreground">
          Root, viewport, barras, thumbs y esquina personalizados.
        </p>
      </div>

      <ScrollArea
        class="h-64 w-full"
        orientation="both"
        type="always"
        force-mount
        :ui="{
          root: { class: 'rounded-xl border-2 border-primary/30 bg-primary/5' },
          viewport: { class: 'p-4' },
          verticalScrollbar: { class: 'w-3 bg-primary/10' },
          horizontalScrollbar: { class: 'h-3 bg-primary/10' },
          thumbVertical: { class: 'bg-primary' },
          thumbHorizontal: { class: 'bg-primary' },
          corner: { class: 'bg-primary/30' },
        }"
      >
        <div class="grid w-[800px] grid-cols-4 gap-4">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="h-24 rounded-lg border bg-background p-3 text-sm shadow-sm"
          >
            {{ activity.title }}
          </div>
        </div>
      </ScrollArea>
    </section>
  </main>
</template>
