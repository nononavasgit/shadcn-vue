<script setup lang="ts">
import { ref } from 'vue'
import { Acordeon, type AcordeonElemento } from '@/components/app/Acordeon'

const seccionAbierta = ref('instalacion')

const elementosAcordeon: AcordeonElemento[] = [
  {
    valor: 'instalacion',
    titulo: '¿Cómo instalo la librería?',
    contenido:
      'Instala el paquete, importa sus estilos una sola vez y después importa los componentes que necesites.',
  },
  {
    valor: 'personalizacion',
    titulo: '¿Puedo personalizar los componentes?',
    contenido:
      'Sí. Puedes cambiar los tokens CSS, añadir clases o crear un wrapper con variantes propias de tu aplicación.',
  },
  {
    valor: 'estado',
    titulo: '¿Admite contenido deshabilitado?',
    contenido: 'Este elemento no se puede abrir.',
    deshabilitado: false,
  },
]
</script>
<template>
  <main class="min-h-screen bg-background text-foreground">


    <h2 class="text-xl font-semibold">Acordeón</h2>
    <p class="text-sm text-muted-foreground">
      Sección abierta:
      <span class="font-medium text-foreground">{{ seccionAbierta || 'ninguna' }}</span>
    </p>
    <br />
    <Acordeon v-model="seccionAbierta" :elementos="elementosAcordeon" variante="simple">
      <template #titulo="{ elemento, abierto }">
        <span :class="{ 'text-primary': abierto }">
          {{ elemento.titulo }}
        </span>
      </template>
    </Acordeon>
  </main>
</template>
