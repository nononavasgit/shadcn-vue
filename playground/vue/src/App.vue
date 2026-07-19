<script setup lang="ts">
import { Boton, Icono } from '@'
import { ArrowRight, Save } from '@lucide/vue'
import { ref } from 'vue'

const guardando = ref(false)

function guardar() {
  guardando.value = true
  window.setTimeout(() => {
    guardando.value = false
  }, 1200)
}
</script>

<template>
  <main class="min-h-screen bg-background p-8 text-foreground">
    <section class="mx-auto max-w-2xl space-y-8">
      <div>
        <p class="text-sm text-muted-foreground">playground/vue</p>
        <h1 class="text-3xl font-semibold">App consumidora</h1>
      </div>
      <div class="flex flex-wrap gap-3">
        <Icono nombre="spinner" color="oklch(0.55 0.2 255)" class="size-6" />
        <Boton :cargando="guardando" @click="guardar"><Save /> Guardar</Boton>
        <Boton variante="contorno">Continuar <ArrowRight /></Boton>
        <Boton class="bg-brand text-brand-foreground hover:bg-brand/90 rounded-full px-6">
          Estilo extendido por la app
        </Boton>
      </div>
    </section>
  </main>
</template>
