<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip } from '@/components/app/Tooltip'

const controlledOpen = ref(false)
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-4xl space-y-10">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Tooltip</h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Ejemplos con contenido por prop o slot, posiciones, estado controlado y estilos
          personalizados.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Basic</h2>
          <p class="text-sm text-muted-foreground">
            El slot por defecto es el trigger y la prop content contiene el mensaje.
          </p>
        </div>

        <Tooltip content="Añadir a favoritos">
          <button
            type="button"
            class="rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-muted"
          >
            Favorito
          </button>
        </Tooltip>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Content slot</h2>
          <p class="text-sm text-muted-foreground">
            El slot content permite utilizar contenido enriquecido.
          </p>
        </div>

        <Tooltip side="bottom" :side-offset="8">
          <button
            type="button"
            class="rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-muted"
          >
            Ver información
          </button>

          <template #content>
            <div class="space-y-1">
              <p class="font-medium">Información</p>
              <p class="text-zinc-500">Este contenido procede del slot.</p>
            </div>
          </template>
        </Tooltip>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Placement</h2>
          <p class="text-sm text-muted-foreground">
            El contenido puede aparecer en cualquier lado.
          </p>
        </div>

        <div
          class="flex min-h-40 flex-wrap items-center justify-center gap-4 rounded-xl border border-dashed p-6"
        >
          <Tooltip
            v-for="side in ['top', 'right', 'bottom', 'left'] as const"
            :key="side"
            :content="side"
            :side="side"
          >
            <button
              type="button"
              class="min-w-20 rounded-md border bg-background px-3 py-2 text-sm capitalize shadow-xs hover:bg-muted"
            >
              {{ side }}
            </button>
          </Tooltip>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Controlled state</h2>
          <p class="text-sm text-muted-foreground">Estado gestionado mediante v-model:open.</p>
        </div>

        <div class="flex items-center gap-4">
          <Tooltip v-model:open="controlledOpen" content="Tooltip controlado">
            <button
              type="button"
              class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Pasa el cursor
            </button>
          </Tooltip>

          <span class="text-sm text-muted-foreground">open: {{ controlledOpen }}</span>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Custom UI</h2>
          <p class="text-sm text-muted-foreground">
            El contenido se personaliza desde el objeto ui.
          </p>
        </div>

        <Tooltip
          content="Tooltip personalizado"
          :ui="{
            content: {
              class: 'border-blue-200 bg-blue-50 text-blue-950',
            },
          }"
        >
          <button
            type="button"
            class="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-950"
          >
            Personalizado
          </button>
        </Tooltip>
      </section>
    </div>
  </main>
</template>
