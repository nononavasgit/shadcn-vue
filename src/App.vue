<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
</script>

<template>
  <main class="mx-auto min-h-screen max-w-4xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Iconos y botones</h1>
      <p class="text-muted-foreground">Ejemplos de uso de los componentes Icon y Button.</p>
    </header>

    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Iconos</h2>
      <div class="flex flex-wrap items-center gap-5">
        <div
          v-for="name in ['search', 'save', 'warning', 'success', 'trash2', 'x']"
          :key="name"
          class="flex flex-col items-center gap-2 text-sm"
        >
          <Icon :name="name" size="lg" color="red" />
          <span>{{ name }}</span>
        </div>
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Botones</h2>
      <div class="flex flex-wrap gap-3">
        <Button label="Principal" loading />
        <Button label="Guardar" icon="save" />
        <Button label="Buscar" icon="search" variant="outline" />
        <Button label="Advertencia" icon="warning" variant="soft" />
        <Button label="Eliminar" icon="trash2" variant="subtle" />
        <Button icon="x" aria-label="Cerrar" square />

        <Button severity="success" icon="x" aria-label="Cerrar" />
        <Button
          label="Guardar"
          :icon="'warning'"
          aria-label="Cerrar"
          color="#3b5553"
          loading
          :ui="{}"
        />
      </div>
    </section>
  </main>
</template>
