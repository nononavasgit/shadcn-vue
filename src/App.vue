<script setup lang="ts">
import { Boton } from '@/components/ui/Boton'
</script>
<template>
  <main class="min-h-screen bg-background text-foreground">
    <section class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-6">
      <div class="space-y-3">
        <p class="text-sm font-medium text-muted-foreground">@nonito/ui</p>
        <h1 class="text-4xl font-bold tracking-tight">Tu librerÃ­a de componentes Vue</h1>
        <p class="max-w-xl text-muted-foreground">
          Componentes reutilizables basados en shadcn-vue, listos para consumir desde tus apps.
        </p>
      </div>
      <div class="flex flex-wrap gap-3">
          <Boton titulo="hola" variante="delineado"></Boton>
                    <Boton titulo="hola" variante="destructivo"></Boton>

                              <Boton titulo="hola" variante="plano"></Boton>

                                        <Boton cargando titulo="hola" variante="primario" redondeado></Boton>

      </div>
    </section>
  </main>
</template>

