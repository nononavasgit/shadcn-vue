<script setup lang="ts">
import { ref } from 'vue'

import { Pagination, type PaginationProps } from '@/components/ui/Pagination'

const basicPage = ref(1)
const customPage = ref(4)

const styledPaginationUi: PaginationProps['ui'] = {
  root: () => ({ class: 'justify-start' }),
  list: () => ({ class: 'gap-2' }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Paginación básica, controles personalizados y personalización con ui.
      </p>
    </div>

    <div class="grid gap-4">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Paginación básica</h3>
          <p class="text-sm text-muted-foreground">95 elementos con 10 elementos por página.</p>
        </div>
        <Pagination v-model:page="basicPage" :total="95" :items-per-page="10" />
        <output class="text-sm text-muted-foreground">Página actual: {{ basicPage }}</output>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slots de controles</h3>
          <p class="text-sm text-muted-foreground">
            Reemplaza los controles anterior y siguiente con contenido propio.
          </p>
        </div>
        <Pagination v-model:page="customPage" :total="120" :items-per-page="10" :show-edges="false">
          <template #previous>
            <span class="px-2 text-sm font-medium">Anterior</span>
          </template>
          <template #next>
            <span class="px-2 text-sm font-medium">Siguiente</span>
          </template>
        </Pagination>
        <output class="text-sm text-muted-foreground">Página actual: {{ customPage }}</output>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Personalización con ui</h3>
          <p class="text-sm text-muted-foreground">
            Ajusta el contenedor y el espacio entre items.
          </p>
        </div>
        <Pagination
          :total="80"
          :items-per-page="10"
          :show-controls="false"
          :ui="styledPaginationUi"
        />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Estado deshabilitado</h3>
          <p class="text-sm text-muted-foreground">
            Deshabilita todos los controles de navegación.
          </p>
        </div>
        <Pagination :total="80" :items-per-page="10" disabled />
      </div>
    </div>
  </section>
</template>
