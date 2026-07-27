<script setup>
import { ref } from 'vue'
import { Button } from '@/components/app/Button'
</script>

<template>
  <Button
    titulo="Hola"
    :ui="{
      icono: { nombre: 'alerta' },
      iconoFinal: { nombre: 'chevronLeft', 'aria-label': 'pepe' },
    }"
  ></Button>

  <Button titulo="Adios" gravedad="exito" :cargando="false"></Button>
  <Button titulo="Adios" gravedad="error" :cargando="false"></Button>
  <Button titulo="Adios" gravedad="alerta" :cargando="false"></Button>
  <Button titulo="Adios" color="#4aaddd" :cargando="true"></Button>
</template>
