<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '@/components/ui/Pagination'

const basicPaginationPage = ref(3)
const customPaginationPage = ref(6)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-2xl space-y-8 p-6 md:p-10">
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold">Pagination</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos básico y personalizado usando directamente los componentes de Reka.
        </p>
      </div>

      <div class="space-y-3 rounded-lg border p-5">
        <h3 class="font-medium">Paginación básica</h3>
        <Pagination
          v-model:page="basicPaginationPage"
          :total="100"
          :items-per-page="10"
          color="#4f4fff"
          size="md"
        />
        <p class="text-center text-sm text-muted-foreground">
          Página {{ basicPaginationPage }} de 10
        </p>
      </div>

      <div class="space-y-3 rounded-lg border p-5">
        <h3 class="font-medium">Controles y slots personalizados</h3>
        <Pagination
          v-model:page="customPaginationPage"
          :total="240"
          :items-per-page="20"
          :sibling-count="1"
          :show-controls="false"
        >
        </Pagination>
        <p class="text-center text-sm text-muted-foreground">
          Mostrando del {{ (customPaginationPage - 1) * 20 + 1 }} al
          {{ Math.min(customPaginationPage * 20, 240) }} de 240 resultados
        </p>
      </div>
    </section>
  </main>
</template>
