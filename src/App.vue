<script setup lang="ts">
import { ref } from 'vue'
import { Panel } from '@/components/app/Panel'

const panelAbierto = ref(true)
const personalizadoAbierto = ref(true)
</script>

<template>
  <main class="mx-auto max-w-3xl space-y-10 p-8">
    <header class="space-y-2">
      <h1 class="text-2xl font-bold">Ejemplos de Panel</h1>
      <p class="text-muted-foreground">Variantes de uso de la API en español.</p>
    </header>

    <section class="space-y-3">
      <h2 class="font-semibold">Básico</h2>
      <Panel titulo="Información"> Este es el contenido de un panel expandible. </Panel>
    </section>

    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold">Estado controlado</h2>
        <span class="text-sm text-muted-foreground">
          {{ panelAbierto ? 'Abierto' : 'Cerrado' }}
        </span>
      </div>

      <Panel v-model:abierto="panelAbierto" titulo="Panel controlado">
        Su estado se controla mediante <code>v-model:abierto</code>.
      </Panel>

      <button
        class="rounded-md border px-3 py-2 text-sm"
        type="button"
        @click="panelAbierto = !panelAbierto"
      >
        Cambiar desde fuera
      </button>
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">Gravedades y variantes</h2>

      <div class="grid gap-4 sm:grid-cols-2">
        <Panel titulo="Éxito" gravedad="exito" variante="sutil">
          La operación se completó correctamente.
        </Panel>

        <Panel titulo="Alerta" gravedad="alerta" variante="delineado">
          Revisa la información antes de continuar.
        </Panel>

        <Panel titulo="Error" gravedad="error" variante="suave">
          No se pudo completar la operación.
        </Panel>

        <Panel titulo="Secundario" gravedad="secundario" variante="plano">
          Contenido con una apariencia secundaria.
        </Panel>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">Color e icono</h2>

      <Panel titulo="Configuración" icono="info" color="#7c3aed">
        Panel con un color y un icono personalizados.
      </Panel>
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">No expandible</h2>

      <Panel titulo="Contenido permanente" :expandible="false">
        Este contenido permanece siempre visible.
      </Panel>
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">Slots y UI personalizada</h2>

      <Panel
        v-model:abierto="personalizadoAbierto"
        :ui="{
          encabezado: { class: 'bg-violet-50 text-violet-700' },
          contenido: { class: 'bg-violet-50/40 p-5' },
        }"
      >
        <template #titulo="{ abierto }">
          Panel personalizado · {{ abierto ? 'abierto' : 'cerrado' }}
        </template>

        <template #flechas="{ abierto }">
          <span class="text-xs">{{ abierto ? 'Ocultar' : 'Mostrar' }}</span>
        </template>

        Contenido personalizado mediante slots y la prop <code>ui</code>.
      </Panel>
    </section>
  </main>
</template>
