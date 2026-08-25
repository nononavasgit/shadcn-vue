<script setup lang="ts">
import { Icon } from '@/components/ui/Icon'
import Example from '../../Example.vue'

const basicCode = `<Icon name="user" />`
const sizeCode = `<div class="flex items-center gap-4">
  <Icon name="search" size="xs" />
  <Icon name="search" size="sm" />
  <Icon name="search" size="md" />
  <Icon name="search" size="lg" />
</div>`
const colorCode = `<div class="flex items-center gap-4">
  <Icon name="success" color="#16a34a" />
  <Icon name="warning" color="#d97706" />
  <Icon name="error" color="#dc2626" />
</div>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Usos habituales del componente Icon. Puedes copiar el código de cada ejemplo.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Icono básico"
        description="Renderiza un icono por su nombre."
        :code="basicCode"
      >
        <Icon name="user" />
      </Example>

      <Example
        title="Tamaños"
        description="Usa uno de los cuatro tamaños disponibles."
        :code="sizeCode"
      >
        <div class="flex items-center gap-4">
          <Icon name="search" size="xs" />
          <Icon name="search" size="sm" />
          <Icon name="search" size="md" />
          <Icon name="search" size="lg" />
        </div>
      </Example>

      <Example
        title="Colores semánticos"
        description="Aplica cualquier color CSS mediante la prop color."
        :code="colorCode"
        class="md:col-span-2"
      >
        <div class="flex items-center gap-4">
          <Icon name="success" color="#16a34a" />
          <Icon name="warning" color="#d97706" />
          <Icon name="error" color="#dc2626" />
        </div>
      </Example>
    </div>
  </section>
</template>
