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


        <Boton titulo="spinner" tamano="lg" variante="delineado" paleta="alerta" :cuadrado="true"></Boton>
        <Boton titulo="spinner" tamano="md" variante="delineado" paleta="alerta" :cuadrado="true"></Boton>
        <Boton titulo="spinner" tamano="sm" variante="delineado" paleta="alerta" :cuadrado="true"></Boton>
        <Boton titulo="spinner" tamano="xs" variante="delineado" paleta="alerta" :cuadrado="true"></Boton>

        <br />


        <Boton tamano="lg" variante="delineado" paleta="alerta" :cuadrado="true" :icono="{
          nombre: 'spinner',
          class: 'animate spin'
        }"></Boton>
        <Boton tamano="md" variante="delineado" paleta="alerta" :cuadrado="true" :icono="{
          nombre: 'spinner',
          class: 'animate spin'
        }"></Boton>
        <Boton tamano="sm" variante="delineado" paleta="alerta" :cuadrado="true" :icono="{
          nombre: 'spinner',
          class: 'animate spin'
        }"></Boton>
        <Boton tamano="xs" variante="delineado" paleta="alerta" :cuadrado="true" :icono="{
          nombre: 'spinner',
          class: 'animate spin'
        }"></Boton>

        <br />
        <Boton icono="spinner" titulo="spinner" tamano="lg" variante="delineado" paleta="alerta" :cuadrado="false">
        </Boton>
        <Boton icono="spinner" titulo="spinner" tamano="md" variante="delineado" paleta="alerta" :cuadrado="false">
        </Boton>
        <Boton icono="spinner" titulo="spinner" tamano="sm" variante="delineado" paleta="alerta" :cuadrado="false">
        </Boton>
        <Boton icono="spinner" titulo="spinner" tamano="xs" variante="delineado" paleta="alerta" :cuadrado="false">
        </Boton>

      </div>
    </section>
  </main>
</template>
