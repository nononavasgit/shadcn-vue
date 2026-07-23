<script setup lang="ts">
import { ref } from 'vue'
import { Boton } from '@/components/app/Boton'
import { Enlace } from '@/components/app/Enlace'

const variantesEnlace = ['solido', 'delineado', 'plano', 'suave', 'sutil', 'link'] as const
const paletasEnlace = ['primario', 'secundario', 'alerta'] as const


</script>

<template>
  <main class="min-h-screen bg-background p-8 text-foreground">
    <section class="mx-auto mt-10 max-w-xl space-y-6">
      <div>
        <h2 class="text-2xl font-semibold">Enlace</h2>
        <p class="text-sm text-muted-foreground">
          Enlaces internos, externos y personalizados construidos sobre Boton.
        </p>
      </div>

      <div class="space-y-5 rounded-lg border p-4">
        <div class="space-y-2">
          <p class="text-sm font-medium">Enlace interno</p>
          <Enlace destino="#enlace-personalizado">Ir al ejemplo personalizado</Enlace>
        </div>

        <div class="space-y-2">
          <p class="text-sm font-medium">Enlace externo</p>
          <Enlace destino="https://www.shadcn-vue.com/docs/components/button" target="_blank" rel="noopener noreferrer">
            Documentación de Button
          </Enlace>
        </div>

        <div id="variantes" class="space-y-3">
          <p class="text-sm font-medium">Todas las variantes y paletas</p>
          <div class="space-y-3">
            <div v-for="variante in variantesEnlace" :key="variante"
              class="grid grid-cols-[7rem_1fr] items-center gap-3">
              <span class="text-sm text-muted-foreground capitalize">{{ variante }}</span>
              <div class="flex flex-wrap items-center gap-3">
                <Enlace v-for="paleta in paletasEnlace" :key="paleta" destino="#variantes" :variante="variante"
                  :paleta="paleta">
                  {{ paleta }}
                </Enlace>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-sm font-medium">Color personalizado</p>
          <Enlace destino="#personalizado" color="#7c3aed">Personalizado</Enlace>
        </div>

        <div id="enlace-personalizado" class="space-y-2">
          <p class="text-sm font-medium">Con icono y atributo download</p>
          <div class="flex flex-wrap gap-x-5 gap-y-2">
            <Enlace destino="#enlace-personalizado" icono-derecho="spinner"> Enlace con icono </Enlace>
            <Enlace destino="/ejemplo.pdf" icono="x" download>Descargar archivo</Enlace>
          </div>
        </div>


      </div>
    </section>
  </main>
</template>
