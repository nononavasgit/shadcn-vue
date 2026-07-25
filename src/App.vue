<script setup>
import { Button } from '@/components/app/Button'
</script>

<template>
  <Button
    label="Hola"
    :ui="{ icon: { name: 'alert' }, trailingIcon: { name: 'chevronLeft', 'aria-label': 'pepe' } }"
  ></Button>

  <Button label="Adios" severity="success" :loading="true"></Button>
</template>
