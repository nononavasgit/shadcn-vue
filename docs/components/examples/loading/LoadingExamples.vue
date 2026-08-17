<script setup lang="ts">
import { ref } from 'vue'

import { Loading, type LoadingProps } from '@/components/ui/Loading'

const contentLoading = ref(true)
const customLoading = ref(true)

const styledLoadingUi: LoadingProps['ui'] = {
  loading: () => ({
    class: 'min-h-24 rounded-lg border border-dashed border-primary/50 bg-primary/5',
  }),
  content: () => ({
    class: 'rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-700',
  }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de mostrar estados de carga y contenido final.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Carga básica</h3>
          <p class="text-sm text-muted-foreground">Usa el icono spinner por defecto.</p>
        </div>
        <Loading class="rounded-lg border bg-muted/20 p-4" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Carga con contenido</h3>
          <p class="text-sm text-muted-foreground">
            Alterna entre el indicador y el contenido final.
          </p>
        </div>
        <Loading :loading="contentLoading" class="rounded-lg border bg-muted/20 p-4">
          <template #default>
            <div class="grid gap-1 text-center">
              <span class="font-medium">Datos cargados</span>
              <span class="text-sm text-muted-foreground">El contenido ya está disponible.</span>
            </div>
          </template>
        </Loading>
        <button
          type="button"
          class="rounded-md border px-3 py-2 text-sm hover:bg-accent"
          @click="contentLoading = !contentLoading"
        >
          {{ contentLoading ? 'Mostrar contenido' : 'Volver a cargar' }}
        </button>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slot loading</h3>
          <p class="text-sm text-muted-foreground">Sustituye el icono por un indicador propio.</p>
        </div>
        <Loading :loading="customLoading" class="rounded-lg border bg-muted/20 p-4">
          <template #loading="{ loading }">
            <div class="flex items-center justify-center gap-3 py-4">
              <span class="flex gap-1" aria-hidden="true">
                <span
                  class="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]"
                />
                <span
                  class="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]"
                />
                <span class="size-2 animate-bounce rounded-full bg-primary" />
              </span>
              <span class="text-sm">Cargando: {{ loading }}</span>
            </div>
          </template>
          <template #default>
            <span class="text-sm font-medium">Carga completada</span>
          </template>
        </Loading>
        <button
          type="button"
          class="rounded-md border px-3 py-2 text-sm hover:bg-accent"
          @click="customLoading = !customLoading"
        >
          {{ customLoading ? 'Completar carga' : 'Volver a cargar' }}
        </button>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Personalización con ui</h3>
          <p class="text-sm text-muted-foreground">Estiliza loading y content sin subobjetos.</p>
        </div>
        <Loading :loading="false" :ui="styledLoadingUi">
          <template #default>
            <div class="grid gap-1">
              <span class="font-medium">Contenido personalizado</span>
              <span class="text-sm">La carga ha terminado correctamente.</span>
            </div>
          </template>
        </Loading>
      </div>
    </div>
  </section>
</template>
