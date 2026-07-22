<script setup lang="ts">
import { ref } from 'vue'
import { Kbd } from '@/components/app/Kbd'
import { Tarjeta } from '@/components/app/Tarjeta'
import { Tooltip } from '@/components/app/Tooltip'

const tooltipAbierto = ref(false)
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


      <section class="space-y-4">
        <div>
          <h2 class="text-xl font-semibold">Tooltips</h2>
          <p class="text-sm text-muted-foreground">
            Contenido mediante prop, slot y estado controlado.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <Tooltip texto="Guardar cambios">
            <button type="button" class="rounded-md border px-3 py-2 text-sm font-medium">
              Pasa el cursor
            </button>
          </Tooltip>

          <Tooltip deshabilitado>
            <button type="button" class="rounded-md border px-3 py-2 text-sm font-medium">
              Contenido personalizado
            </button>

            <template #contenido>
              Este contenido utiliza el slot y se muestra a la derecha.
              Este contenido utiliza el slot y se muestra a la derecha.
              Este contenido utiliza el slot y se muestra a la derecha.

            </template>
          </Tooltip>

          <Tooltip v-model:visible="tooltipAbierto" texto="Estado controlado">
            <button type="button" class="rounded-md border px-3 py-2 text-sm font-medium">
              Tooltip controlado
            </button>
          </Tooltip>



          <Tooltip disabled texto="Estado controlado">
            <span>ee</span>
          </Tooltip>

          <button type="button" class="text-sm text-muted-foreground underline underline-offset-4"
            @click="tooltipAbierto = !tooltipAbierto">
            {{ tooltipAbierto ? 'Cerrar' : 'Abrir' }} desde fuera
          </button>
        </div>
      </section>

      <header class="space-y-2">
        <p class="text-sm font-medium text-muted-foreground">@nonito/ui</p>
        <h1 class="text-3xl font-bold tracking-tight">Alertas</h1>
        <p class="max-w-2xl text-muted-foreground">
          Ejemplos de variantes, paletas, colores personalizados, iconos y cierre.
        </p>
      </header>

      <header class="space-y-2">
        <p class="text-sm font-medium text-muted-foreground">@nonito/ui</p>
        <h1 class="text-3xl font-bold tracking-tight">Alertas</h1>
        <p class="max-w-2xl text-muted-foreground">
          Ejemplos de variantes, paletas, colores personalizados, iconos y cierre.
        </p>
      </header>
      <header class="space-y-2">
        <p class="text-sm font-medium text-muted-foreground">@nonito/ui</p>
        <h1 class="text-3xl font-bold tracking-tight">Alertas</h1>
        <p class="max-w-2xl text-muted-foreground">
          Ejemplos de variantes, paletas, colores personalizados, iconos y cierre.
        </p>
      </header>
      <header class="space-y-2">
        <p class="text-sm font-medium text-muted-foreground">@nonito/ui</p>
        <h1 class="text-3xl font-bold tracking-tight">Alertas</h1>
        <p class="max-w-2xl text-muted-foreground">
          Ejemplos de variantes, paletas, colores personalizados, iconos y cierre.
        </p>
      </header>
      <header class="space-y-2">
        <p class="text-sm font-medium text-muted-foreground">@nonito/ui</p>
        <h1 class="text-3xl font-bold tracking-tight">Alertas</h1>
        <p class="max-w-2xl text-muted-foreground">
          Ejemplos de variantes, paletas, colores personalizados, iconos y cierre.
        </p>
      </header>
    </div>
  </main>
</template>
