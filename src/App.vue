<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/app/Button'
import { Icon, type IconName } from '@/components/app/Icon'

const iconNames: IconName[] = [
  'warning',
  'check',
  'chevronDown',
  'chevronUp',
  'chevronRight',
  'chevronLeft',
  'error',
  'success',
  'info',
  'spinner',
  'save',
  'search',
  'trash2',
  'x',
]

const loading = ref(false)
const clicks = ref(0)

function simulateLoading() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 1500)
}
</script>

<template>
  <main class="mx-auto max-w-5xl space-y-12 p-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Icon & Button</h1>
      <p class="text-muted-foreground">Ejemplos de los componentes con su nueva API en inglés.</p>
    </header>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Iconos disponibles</h2>
        <p class="text-sm text-muted-foreground">Todos los valores aceptados por IconName.</p>
      </div>

      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        <div
          v-for="name in iconNames"
          :key="name"
          class="flex flex-col items-center gap-2 rounded-lg border p-4"
        >
          <Icon :name="name" />
          <code class="text-xs text-muted-foreground">{{ name }}</code>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Tamaños y colores de Icon</h2>

      <div class="flex flex-wrap items-center gap-6 rounded-lg border p-5">
        <div class="flex items-center gap-2">
          <Icon name="info" size="sm" />
          <span class="text-sm">Small</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="info" size="md" />
          <span class="text-sm">Medium</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="info" size="lg" />
          <span class="text-sm">Large</span>
        </div>
        <Icon name="success" size="lg" color="#16a34a" />
        <Icon name="warning" size="lg" color="#f59e0b" />
        <Icon name="error" size="lg" color="#dc2626" />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Variantes de Button</h2>

      <div class="flex flex-wrap gap-3">
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="plain">Plain</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="soft">Soft</Button>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Severidades</h2>

      <div class="grid gap-5">
        <div class="flex flex-wrap gap-3">
          <Button severity="primary">Primary</Button>
          <Button severity="secondary">Secondary</Button>
          <Button severity="warning">Warning</Button>
          <Button severity="success">Success</Button>
          <Button severity="error">Error</Button>
        </div>

        <div class="flex flex-wrap gap-3">
          <Button variant="outline" severity="primary">Primary</Button>
          <Button variant="outline" severity="secondary">Secondary</Button>
          <Button variant="outline" severity="warning">Warning</Button>
          <Button variant="outline" severity="success">Success</Button>
          <Button variant="outline" severity="error">Error</Button>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Tamaños y formas</h2>

      <div class="flex flex-wrap items-center gap-3">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button rounded icon="check">Rounded</Button>
        <Button square size="sm" icon="search" aria-label="Buscar" />
        <Button square size="md" icon="save" aria-label="Guardar" />
        <Button square size="lg" severity="error" icon="trash2" aria-label="Eliminar" />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Botones con iconos</h2>

      <div class="flex flex-wrap gap-3">
        <Button icon="save">Guardar</Button>
        <Button trailing-icon="chevronRight">Continuar</Button>
        <Button
          variant="outline"
          :icon="{ name: 'search', size: 'sm' }"
          :trailing-icon="{ name: 'chevronRight', size: 'sm' }"
        >
          Buscar
        </Button>
        <Button severity="error" icon="trash2">Eliminar</Button>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Carga e interacción</h2>

      <div class="flex flex-wrap items-center gap-3">
        <Button :loading="loading" icon="save" @click="simulateLoading">
          {{ loading ? 'Guardando…' : 'Guardar cambios' }}
        </Button>

        <Button variant="outline" @click="clicks++"> Pulsaciones: {{ clicks }} </Button>

        <Button loading variant="soft">Procesando</Button>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Color y slots personalizados</h2>

      <div class="flex flex-wrap gap-3">
        <Button color="#7c3aed" icon="success">Color personalizado</Button>
        <Button color="#0891b2" variant="outline">Outline personalizado</Button>

        <Button variant="soft">
          <template #leading>
            <span
              class="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"
            >
              N
            </span>
          </template>
          Slot leading
          <template #trailing>
            <Icon name="chevronRight" size="sm" />
          </template>
        </Button>

        <Button loading severity="warning">
          <template #loading>
            <Icon name="spinner" size="sm" class="animate-spin" />
          </template>
          Carga personalizada
        </Button>
      </div>
    </section>
  </main>
</template>
