<script setup lang="ts">
import { ref } from 'vue'
import { Boton } from '@/components/app/Boton'
import { Enlace } from '@/components/app/Enlace'

const variantesEnlace = ['solido', 'delineado', 'plano', 'suave', 'sutil', 'link'] as const
const paletasEnlace = ['primario', 'secundario', 'alerta'] as const


</script>

<template>
  <main class="min-h-screen bg-background p-8 text-foreground">
    <div id="enlace-personalizado" class="space-y-2">
      <p class="text-sm font-medium">Con icono y atributo download</p>
      <div class="flex flex-wrap gap-x-5 gap-y-2">
        <Enlace destino="#enlace-personalizado" icono-derecho="info"> Enlace con icono </Enlace>
        <Enlace destino="/ejemplo.pdf" icono="x" download>Descargar archivo</Enlace>
      </div>
    </div>
  </main>
</template>
