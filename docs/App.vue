<script setup lang="ts">
import { computed, ref } from 'vue'
import { Toolbar, type ToolbarItemInput } from '@/components/ui/Toolbar'

const bold = ref(false)

const items = computed<ToolbarItemInput[]>(() => [
  {
    value: 'save',
    type: 'button',
    props: { label: 'Guardar', icon: 'save' },
  },
  {
    value: 'docs',
    type: 'link',
    props: { label: 'Documentación', to: 'https://reka-ui.com', variant: 'plain' },
  },
  { value: 'separator', type: 'separator' },
  {
    value: 'bold',
    type: 'toggle',
    props: {
      label: 'Negrita',
      icon: 'check',
      variant: 'plain',
      value: bold.value,
      'onUpdate:value': (value: boolean) => (bold.value = value),
    },
  },
  { value: 'invalid', type: 'unknown', props: { label: 'No se renderiza' } },
])
</script>

<template>
  <main class="min-h-screen bg-background p-8 text-foreground">
    <div class="mx-auto flex max-w-5xl flex-col gap-6">
      <header>
        <h1 class="text-2xl font-semibold">Component playground</h1>
        <p class="text-sm text-muted-foreground">
          Edita <code>docs/App.vue</code> para probar los componentes.
        </p>
      </header>

      <section class="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <Toolbar :items="items" aria-label="Herramientas del editor" />
      </section>
    </div>
  </main>
</template>
