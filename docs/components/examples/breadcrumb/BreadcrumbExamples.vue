<script setup lang="ts">
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/Breadcrumb'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Home', to: '/' },
  { slot: 'library', label: 'Library', to: '/library' },
  { slot: 'components', label: 'Components', to: '/components' },
  { slot: 'breadcrumb', label: 'Breadcrumb', icon: { name: 'check' } },
]
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada item se convierte en un Link y el último item representa la página actual.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Ruta completa</h3>
          <p class="text-sm text-muted-foreground">Muestra todos los enlaces de navegación.</p>
        </div>
        <Breadcrumb :items="items" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Ruta comprimida</h3>
          <p class="text-sm text-muted-foreground">Oculta los items intermedios con una elipsis.</p>
        </div>
        <Breadcrumb :items="items" :ellipsis-index="[0, 2]" />
      </div>
    </div>
  </section>
</template>
