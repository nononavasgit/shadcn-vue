<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Listbox } from '@/components/ui'
import type { ListboxItem, ListboxValue } from '@/components/ui/Listbox'

const frameworks: ListboxItem[] = [
  { value: 'vue', label: 'Vue', icon: 'success' },
  { value: 'react', label: 'React', icon: 'info' },
  { value: 'svelte', label: 'Svelte', icon: 'warning' },
  { value: 'angular', label: 'Angular', icon: 'error', disabled: true },
]

const tools: ListboxItem[] = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'vite', label: 'Vite' },
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'vitest', label: 'Vitest' },
]

const framework = ref<ListboxValue>('vue')
const selectedTools = ref<ListboxValue[]>(['typescript', 'vite'])
</script>

<template>
  <ConfigProvider>
    <main class="min-h-screen bg-background px-6 py-12 text-foreground">
      <div class="mx-auto grid max-w-4xl gap-8">
        <header class="space-y-2">
          <h1 class="text-3xl font-bold tracking-tight">Listbox</h1>
          <p class="text-muted-foreground">
            Ejemplos de listas de selección accesibles basadas en Reka UI.
          </p>
        </header>

        <section class="grid gap-6 md:grid-cols-2">
          <article class="space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div class="space-y-1">
              <h2 class="font-semibold">Selección simple</h2>
              <p class="text-sm text-muted-foreground">Selecciona un framework.</p>
            </div>

            <Listbox v-model:value="framework" :items="frameworks">
              <template #item-leading-react>
                <span
                  class="grid size-5 place-items-center rounded-full bg-primary text-xs text-primary-foreground"
                >
                  R
                </span>
              </template>
            </Listbox>

            <p class="text-sm text-muted-foreground">
              Seleccionado: <code class="text-foreground">{{ framework }}</code>
            </p>
          </article>

          <article class="space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div class="space-y-1">
              <h2 class="font-semibold">Selección múltiple</h2>
              <p class="text-sm text-muted-foreground">Puedes seleccionar varias herramientas.</p>
            </div>

            <Listbox v-model:value="selectedTools" :items="tools" multiple />

            <p class="text-sm text-muted-foreground">
              Seleccionados:
              <code class="text-foreground">{{ selectedTools.join(', ') }}</code>
            </p>
          </article>

          <article class="space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div class="space-y-1">
              <h2 class="font-semibold">Estado deshabilitado</h2>
              <p class="text-sm text-muted-foreground">La lista completa no permite interacción.</p>
            </div>

            <Listbox value="svelte" :items="frameworks" disabled />
          </article>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
