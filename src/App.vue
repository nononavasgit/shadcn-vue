<script setup lang="ts">
import { Boton } from '@/components/app/Boton'
</script>
<template>
  <main class="min-h-screen bg-background text-foreground">
    <section class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-6">
      <div class="space-y-3">
        <p class="text-sm font-medium text-muted-foreground">@nonito/ui</p>
        <h1 class="text-4xl font-bold tracking-tight">Tu librería de componentes Vue</h1>
        <p class="max-w-xl text-muted-foreground">
          Componentes reutilizables basados en shadcn-vue, listos para consumir desde tus apps.
        </p>
      </div>
      <div class="flex flex-wrap gap-3">
        <Boton titulo="solido" :fluido="true" variante="solido" paleta="secundario"></Boton>

        <br />

        <Boton icono="spinner" titulo="solido" fluido variante="solido" paleta="alerta"></Boton>
        <Boton titulo="hola" redondeado variante="delineado" paleta="alerta" cargando
          :icono="{ nombre: 'spinner', color: '#fff000', }">

          <template #izquierda>holaa</template>
        </Boton>
        <Boton icono="spinner" tamano="lg" variante="plano" paleta="alerta"></Boton>
        <Boton icono="spinner" tamano="md" variante="plano" paleta="alerta"></Boton>
        <Boton icono="spinner" tamano="sm" variante="plano" paleta="alerta"></Boton>


      </div>
    </section>
  </main>
</template>
