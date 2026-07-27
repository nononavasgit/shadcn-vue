<script setup>
import { ref } from 'vue'
import { Badge } from '@/components/app/Badge'
import { HoverCard } from '@/components/app/HoverCard'

const hoverCardAbierto = ref(false)
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

  <section class="mt-10 flex flex-wrap items-start gap-8 p-6">
    <HoverCard lado="abajo" evitar-colisiones="false">
      <button class="rounded-md border px-4 py-2">Contenido simple</button>
      <template #contenido="{ abierto }">
        <div class="space-y-2">
          <p class="font-semibold">HoverCard personalizado</p>
          <p class="text-sm text-muted-foreground">Estado: {{ abierto ? 'abierto' : 'cerrado' }}</p>
        </div>
      </template>
    </HoverCard>

    <HoverCard :desplazamiento-lado="8">
      <button class="rounded-md border px-4 py-2">Contenido mediante slot</button>

      <template #contenido="{ abierto }">
        <div class="space-y-2">
          <p class="font-semibold">HoverCard personalizado</p>
          <p class="text-sm text-muted-foreground">Estado: {{ abierto ? 'abierto' : 'cerrado' }}</p>
        </div>
      </template>
    </HoverCard>

    <HoverCard v-model:abierto="hoverCardAbierto">
      <button class="rounded-md border px-4 py-2">Apertura controlada</button>

      <template #contenido>
        <div class="space-y-3">
          <p>Este ejemplo controla la apertura mediante <code>v-model:abierto</code>.</p>
          <button class="rounded-md border px-3 py-1" @click="hoverCardAbierto = false">
            Cerrar
          </button>
        </div>
      </template>
    </HoverCard>
  </section>
</template>
