<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Empty } from '@/components/ui/Empty'
import { Icon } from '@/components/ui/Icon'
import { Toggle } from '@/components/ui/Toggle'

const notifications = ref(false)
const favorite = ref(true)
const customToggle = ref(false)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Toggle y Empty</h1>
      <p class="text-muted-foreground">
        Ejemplos de estados, variantes, iconos, slots y personalización mediante ui.
      </p>
    </header>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Toggle básico</h2>
        <p class="text-sm text-muted-foreground">
          Notificaciones: {{ notifications ? 'activadas' : 'desactivadas' }}.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <Toggle v-model="notifications" label="Notificaciones" icon="info" />
        <Toggle v-model="favorite" label="Favorito" icon="success" variant="outline" />
        <Toggle label="Deshabilitado" icon="x" disabled />
        <Toggle icon="save" aria-label="Guardar" />
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Variantes y severidades</h2>
        <p class="text-sm text-muted-foreground">Combinaciones plain y outline.</p>
      </div>

      <div class="space-y-4">
        <div
          v-for="severity in [
            'default',
            'primary',
            'secondary',
            'warning',
            'success',
            'error',
          ] as const"
          :key="severity"
          class="flex flex-wrap items-center gap-3"
        >
          <span class="w-24 text-sm font-medium">{{ severity }}</span>
          <Toggle :label="`${severity} plain`" :severity="severity" />
          <Toggle :label="`${severity} outline`" :severity="severity" variant="outline" />
        </div>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Tamaños e iconos</h2>
        <p class="text-sm text-muted-foreground">Iconos iniciales y finales normalizados.</p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <Toggle size="xs" label="Extra small" icon="minus" />
        <Toggle size="sm" label="Small" icon="search" />
        <Toggle size="md" label="Medium" icon="save" trailing-icon="check" />
        <Toggle size="lg" label="Large" trailing-icon="chevronRight" variant="outline" />
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slots y ui</h2>
        <p class="text-sm text-muted-foreground">
          Estado personalizado: {{ customToggle ? 'on' : 'off' }}.
        </p>
      </div>

      <Toggle
        v-model="customToggle"
        color="#7c3aed"
        variant="outline"
        :ui="{
          root: { class: 'rounded-full shadow-sm' },
          icon: { class: 'size-5' },
          trailingIcon: { class: 'opacity-60' },
        }"
      >
        <template #leading="{ pressed }">
          <Icon :name="pressed ? 'success' : 'info'" />
        </template>

        <template #default="{ pressed }">
          {{ pressed ? 'Personalización activa' : 'Personalización inactiva' }}
        </template>

        <template #trailing="{ pressed }">
          <span class="text-xs">{{ pressed ? 'ON' : 'OFF' }}</span>
        </template>
      </Toggle>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Empty básico</h2>
        <p class="text-sm text-muted-foreground">Estado vacío con props y acciones.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <Empty
          class="min-h-72 border"
          label="No hay proyectos"
          description="Crea tu primer proyecto para organizar y compartir el trabajo."
        >
          <Button label="Crear proyecto" icon="save" />
        </Empty>

        <Empty
          class="min-h-72 border border-dashed"
          label="No hay resultados"
          description="Prueba con otros términos o elimina los filtros activos."
          media-variant="icon"
        >
          <template #media>
            <Icon name="search" />
          </template>

          <div class="flex flex-wrap justify-center gap-2">
            <Button label="Limpiar filtros" variant="outline" />
            <Button label="Nueva búsqueda" />
          </div>
        </Empty>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Empty personalizado</h2>
        <p class="text-sm text-muted-foreground">
          Todas las zonas utilizan atributos HTML normalizados.
        </p>
      </div>

      <Empty
        label="Todo está al día"
        description="No tienes tareas pendientes. Vuelve más tarde para comprobar las novedades."
        media-variant="icon"
        :ui="{
          root: {
            class: 'min-h-80 border-2 border-primary/20 bg-primary/5 shadow-sm',
          },
          header: { class: 'max-w-lg' },
          media: { class: 'size-14 rounded-full bg-primary/10 text-primary' },
          label: { class: 'text-xl text-primary' },
          description: { class: 'max-w-md' },
          content: { class: 'flex-row gap-2' },
        }"
      >
        <template #media>
          <Icon name="success" size="lg" />
        </template>

        <template #label>¡Trabajo completado!</template>

        <template #description>
          Has completado todas las tareas disponibles y no queda ninguna acción pendiente.
        </template>

        <Button label="Actualizar" icon="spinner" variant="outline" />
        <Button label="Ver historial" trailing-icon="chevronRight" />
      </Empty>
    </section>
  </main>
</template>
