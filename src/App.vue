<script setup lang="ts">
import { ref } from 'vue'
import { HoverCard } from '@/components/ui/HoverCard'
import { Pagination } from '@/components/ui/Pagination'

const basicPaginationPage = ref(3)
const customPaginationPage = ref(6)
const hoverCardOpen = ref(false)
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

    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold">HoverCard</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos básico y personalizado con contenido mostrado al pasar el cursor.
        </p>
      </div>

      <div class="grid gap-4 rounded-lg border p-5 sm:grid-cols-2">
        <div class="space-y-3">
          <h3 class="font-medium">HoverCard básico</h3>
          <HoverCard label="Este contenido se muestra al pasar el cursor.">
            <button class="rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted">
              Pasa el cursor por aquí
            </button>
          </HoverCard>
        </div>

        <div class="space-y-3">
          <h3 class="font-medium">Contenido personalizado</h3>
          <HoverCard v-model:open="hoverCardOpen" :content="{ side: 'right', sideOffset: 8 }">
            <button class="rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted">
              Perfil de usuario
            </button>
            <template #content>
              <div class="space-y-1">
                <p class="font-medium">María García</p>
                <p class="text-sm text-muted-foreground">Diseñadora de producto · Disponible</p>
                <p class="text-xs text-muted-foreground">
                  Estado: {{ hoverCardOpen ? 'abierto' : 'cerrado' }}
                </p>
              </div>
            </template>
          </HoverCard>
        </div>
      </div>
    </section>
  </main>
</template>
