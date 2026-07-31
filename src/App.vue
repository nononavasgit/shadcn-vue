<script setup lang="ts">
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/Breadcrumb'

const basicItems: BreadcrumbItem[] = [
  { id: 'home', label: 'Inicio', to: '/', icon: 'chevronLeft' },
  { id: 'components', label: 'Componentes', to: '/components' },
  { id: 'breadcrumb', label: 'Breadcrumb' },
]

const longPathItems: BreadcrumbItem[] = [
  { id: 'home', label: 'Inicio', to: '/' },
  { id: 'ellipsis', ellipsis: true },
  { id: 'library', label: 'Biblioteca', to: '/library' },
  { id: 'document', label: 'Documento actual' },
]

const contextualItems: BreadcrumbItem[] = [
  { id: 'workspace', label: 'Espacio de trabajo', to: '/workspace', icon: 'info' },
  { id: 'project', label: 'Proyecto Atlas', to: '/workspace/atlas', icon: 'save' },
  { id: 'settings', label: 'Configuracion', icon: { name: 'warning', size: 'sm' } },
]
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Breadcrumb</h1>
      <p class="text-muted-foreground">
        Ejemplos con items, iconos, elipsis, UI contextual y slots personalizados.
      </p>
    </header>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Uso basico</h2>
        <p class="text-sm text-muted-foreground">
          El ultimo elemento sin destino representa la pagina actual.
        </p>
      </div>

      <Breadcrumb :items="basicItems" />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Ruta larga con elipsis</h2>
        <p class="text-sm text-muted-foreground">
          Un item con <code>ellipsis</code> resume niveles intermedios.
        </p>
      </div>

      <Breadcrumb
        :items="longPathItems"
        :ui="{
          root: { 'aria-label': 'Ruta del documento' },
          list: { class: 'rounded-lg bg-muted/50 px-3 py-2' },
          ellipsis: { title: 'Niveles intermedios' },
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">UI contextual</h2>
        <p class="text-sm text-muted-foreground">
          Cada zona puede recibir una funcion con el item, indice y estado.
        </p>
      </div>

      <Breadcrumb
        :items="contextualItems"
        :ui="{
          root: { class: 'rounded-lg border p-3' },
          list: { class: 'gap-2' },
          item: ({ last }) => ({ class: last ? 'font-semibold' : '' }),
          link: ({ first }) => ({
            class: first ? 'text-primary' : 'text-muted-foreground',
            title: first ? 'Volver al inicio del espacio' : undefined,
          }),
          page: { class: 'rounded-md bg-primary/10 px-2 py-1 text-primary' },
          icon: ({ last }) => ({ class: last ? 'text-warning' : 'opacity-70' }),
          separator: ({ index }) => ({ class: index === 0 ? 'text-primary' : '' }),
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slots globales</h2>
        <p class="text-sm text-muted-foreground">
          Personalizacion compartida de iconos, separadores y elipsis.
        </p>
      </div>

      <Breadcrumb :items="longPathItems">
        <template #ellipsis>
          <button type="button" class="rounded-md border px-2 py-0.5 text-xs">Mas</button>
        </template>

        <template #separator>
          <span class="text-muted-foreground/50">/</span>
        </template>
      </Breadcrumb>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slots individuales</h2>
        <p class="text-sm text-muted-foreground">
          Los slots con el id del item tienen prioridad sobre los slots globales.
        </p>
      </div>

      <Breadcrumb :items="basicItems">
        <template #icon-home>
          <span
            class="grid size-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground"
          >
            H
          </span>
        </template>

        <template #item-breadcrumb="{ item }">
          <span class="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
            {{ item.label }}
          </span>
        </template>

        <template #separator-components>
          <span class="font-bold text-primary">:</span>
        </template>
      </Breadcrumb>
    </section>
  </main>
</template>
