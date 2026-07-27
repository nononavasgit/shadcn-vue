<script setup>
import { ref } from 'vue'
import { Badge } from '@/components/app/Badge'
</script>

<template>
  <Badge
    titulo="Hola"
    :ui="{
      icono: { nombre: 'alerta' },
      iconoFinal: { nombre: 'chevronLeft', 'aria-label': 'pepe' },
    }"
  ></Badge>

  <Badge titulo="Adios" gravedad="exito"></Badge>
  <Badge titulo="Adios" gravedad="error"></Badge>
  <Badge titulo="Adios" gravedad="alerta"></Badge>
  <Badge titulo="Adios" color="#4aaddd"></Badge>
</template>
