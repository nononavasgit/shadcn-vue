<script setup lang="ts">
import { Alerta } from '@/components/app/Alerta'

const variantes = ['solido', 'delineado', 'suave', 'sutil'] as const
const paletas = ['primario', 'secundario', 'alerta'] as const
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

      <section class="space-y-6">
        <div>
          <h2 class="text-xl font-semibold">Variantes y paletas</h2>
          <p class="text-sm text-muted-foreground">
            Todas las combinaciones de variante y paleta semántica.
          </p>
        </div>

        <div v-for="variante in variantes" :key="variante" class="space-y-3">
          <h3 class="text-sm font-semibold capitalize">{{ variante }}</h3>

          <div class="grid gap-3">
            <Alerta v-for="paleta in paletas" :key="paleta" :titulo="`${variante} · ${paleta}`"
              descripcion="Este es un mensaje de ejemplo para comprobar el aspecto de la alerta." :variante="variante"
              :paleta="paleta" />
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-xl font-semibold">Colores personalizados</h2>
          <p class="text-sm text-muted-foreground">
            El contraste y los fondos derivados se calculan automáticamente.
          </p>
        </div>

        <div class="grid gap-3">
          <Alerta v-for="variante in variantes" :key="variante" cerrable :titulo="`Color violeta · ${variante}`"
            descripcion="La prop color prevalece sobre la paleta seleccionada." :variante="variante" color="#7c3aed"
            :ui="{
              contenido: {
                class: ['p-2']
              }
            }" />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-xl font-semibold">Iconos y contenido</h2>
          <p class="text-sm text-muted-foreground">
            Uso mediante la prop icono y mediante el slot izquierda.
          </p>
        </div>

        <Alerta titulo="Procesando información" descripcion="El icono se ha proporcionado mediante la prop icono."
          icono="spinner" variante="suave" paleta="primario" />

        <Alerta titulo="Contenido personalizado" descripcion="El elemento de la izquierda procede de un slot."
          variante="sutil" paleta="alerta">
          <template #icono>
            <span
              class="mt-0.5 inline-flex size-4 items-center justify-center rounded-full border border-current text-[10px] font-bold">
              !
            </span>
          </template>
        </Alerta>

        <Alerta titulo="Descripción mediante slot" variante="delineado" paleta="secundario">
          Este contenido sustituye la prop <code>descripcion</code> mediante el slot por defecto.
        </Alerta>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-xl font-semibold">Alertas cerrables</h2>
          <p class="text-sm text-muted-foreground">
            Cierre predeterminado y cierre personalizado mediante slot.
          </p>
        </div>

        <Alerta titulo="Cierre predeterminado"
          descripcion="Pulsa el botón situado a la derecha para ocultar esta alerta." variante="sutil" paleta="primario"
          cerrable />

        <Alerta titulo="Cierre personalizado"
          descripcion="Esta alerta utiliza el slot cerrar y la función expuesta por el componente." variante="suave"
          paleta="alerta" cerrable>
          <template #cerrar="{ cerrar }">
            <button type="button"
              class="rounded-md px-2 py-1 text-xs font-medium text-current transition-colors hover:bg-current/10 focus-visible:ring-2 focus-visible:ring-current/30 focus-visible:outline-none"
              @click="cerrar">
              Entendido
            </button>
          </template>
        </Alerta>
      </section>
    </div>
  </main>
</template>
