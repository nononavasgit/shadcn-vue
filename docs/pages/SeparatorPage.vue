<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TablaDocs, { type TablaDocsColumn, type TablaDocsRow } from '../components/TablaDocs.vue'
import { Separator } from '@/components/ui/Separator'

const apiColumns: TablaDocsColumn[] = [
  { key: 'name', label: 'Nombre', class: 'min-w-32' },
  { key: 'type', label: 'Tipo', class: 'min-w-48' },
  { key: 'default', label: 'Por defecto', class: 'min-w-32' },
  { key: 'description', label: 'Descripción', class: 'min-w-64' },
]

const props: TablaDocsRow[] = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Define la dirección del separador.',
  },
  {
    name: 'decorative',
    type: 'boolean',
    default: 'true',
    description: 'Indica si el separador es únicamente visual.',
  },
  {
    name: 'as',
    type: 'AsTag | Component',
    default: "'div'",
    description: 'Elemento o componente usado para renderizar la raíz.',
  },
  {
    name: 'asChild',
    type: 'boolean',
    default: 'false',
    description: 'Fusiona las propiedades con el único elemento hijo.',
  },
  {
    name: 'ui',
    type: 'SeparatorUI',
    default: 'undefined',
    description: 'Atributos y estilos de la raíz, como objeto o función de contexto.',
  },
]

const slots: TablaDocsRow[] = [
  {
    name: 'default',
    type: '{ orientation, decorative }',
    description: 'Contenido opcional con acceso al contexto del separador.',
  },
]

const slotColumns = apiColumns.filter((column) => column.key !== 'default')
</script>

<template>
  <main class="mx-auto max-w-5xl px-6 py-12 md:py-16">
    <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/">
      ← Componentes
    </RouterLink>

    <header class="mt-8 max-w-3xl">
      <h1 class="text-4xl font-bold tracking-tight">Separator</h1>
      <p class="mt-4 text-lg leading-8 text-muted-foreground">
        Separa visual o semánticamente distintos grupos de contenido.
      </p>
    </header>

    <div class="mt-12 space-y-12">
      <TablaDocs
        title="Props"
        description="Propiedades disponibles en el componente."
        :columns="apiColumns"
        :rows="props"
      />

      <TablaDocs
        title="Emits"
        description="Eventos emitidos por el componente."
        :columns="apiColumns"
        :rows="[]"
      />

      <TablaDocs
        title="Slots"
        description="Contenido que puede inyectarse en el componente."
        :columns="slotColumns"
        :rows="slots"
      />

      <section aria-labelledby="examples-title">
        <h2 id="examples-title" class="text-2xl font-semibold tracking-tight">Ejemplos</h2>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">
          Variantes básicas de orientación y personalización.
        </p>

        <div class="mt-5 space-y-6">
          <article class="overflow-hidden rounded-xl border">
            <div class="p-6">
              <h3 class="font-medium">Horizontal</h3>
              <div class="mt-5 space-y-4">
                <p class="text-sm">Contenido superior</p>
                <Separator />
                <p class="text-sm">Contenido inferior</p>
              </div>
            </div>
            <pre
              class="overflow-x-auto border-t bg-muted/50 p-4 text-sm"
            ><code>&lt;Separator /&gt;</code></pre>
          </article>

          <article class="overflow-hidden rounded-xl border">
            <div class="p-6">
              <h3 class="font-medium">Vertical</h3>
              <div class="mt-5 flex h-12 items-center gap-4 text-sm">
                <span>Perfil</span>
                <Separator orientation="vertical" />
                <span>Configuración</span>
                <Separator orientation="vertical" />
                <span>Sesión</span>
              </div>
            </div>
            <pre
              class="overflow-x-auto border-t bg-muted/50 p-4 text-sm"
            ><code>&lt;Separator orientation=&quot;vertical&quot; /&gt;</code></pre>
          </article>

          <article class="overflow-hidden rounded-xl border">
            <div class="p-6">
              <h3 class="font-medium">Personalizado con UI</h3>
              <Separator :ui="{ root: { class: 'my-5 bg-primary' } }" />
            </div>
            <pre
              class="overflow-x-auto border-t bg-muted/50 p-4 text-sm"
            ><code>&lt;Separator :ui=&quot;{ root: { class: 'my-5 bg-primary' } }&quot; /&gt;</code></pre>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>
