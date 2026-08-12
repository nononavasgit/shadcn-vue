<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TablaDocs, { type TablaDocsColumn, type TablaDocsRow } from '../components/TablaDocs.vue'
import { Button } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import { Input } from '@/components/ui/Input'

const apiColumns: TablaDocsColumn[] = [
  { key: 'name', label: 'Nombre', class: 'min-w-32' },
  { key: 'type', label: 'Tipo', class: 'min-w-48' },
  { key: 'default', label: 'Por defecto', class: 'min-w-32' },
  { key: 'description', label: 'Descripción', class: 'min-w-64' },
]

const props: TablaDocsRow[] = [
  {
    name: 'as',
    type: 'AsTag | Component',
    default: "'div'",
    description: 'Elemento o componente usado para renderizar la raíz.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Define cómo se distribuyen los elementos del grupo.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Aplica una altura, espaciado y tamaño de texto común a los hijos.',
  },
  {
    name: 'ui',
    type: 'ButtonGroupUI',
    default: 'undefined',
    description: 'Atributos y estilos de la raíz, como objeto o función de contexto.',
  },
]

const slots: TablaDocsRow[] = [
  {
    name: 'default',
    type: '{ orientation, size }',
    description: 'Botones, inputs u otros controles que forman el grupo.',
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
      <h1 class="text-4xl font-bold tracking-tight">ButtonGroup</h1>
      <p class="mt-4 text-lg leading-8 text-muted-foreground">
        Agrupa botones y controles relacionados en una unidad visual consistente.
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

      <section aria-labelledby="button-group-examples">
        <h2 id="button-group-examples" class="text-2xl font-semibold tracking-tight">Ejemplos</h2>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">
          Grupos horizontales, verticales y combinados con otros controles.
        </p>

        <div class="mt-5 space-y-6">
          <article class="overflow-hidden rounded-xl border">
            <div class="p-6">
              <h3 class="font-medium">Horizontal</h3>
              <ButtonGroup class="mt-5">
                <Button label="Anterior" variant="outline" />
                <Button label="Hoy" variant="outline" />
                <Button label="Siguiente" variant="outline" />
              </ButtonGroup>
            </div>
            <pre class="overflow-x-auto border-t bg-muted/50 p-4 text-sm"><code>&lt;ButtonGroup&gt;
  &lt;Button label=&quot;Anterior&quot; variant=&quot;outline&quot; /&gt;
  &lt;Button label=&quot;Hoy&quot; variant=&quot;outline&quot; /&gt;
  &lt;Button label=&quot;Siguiente&quot; variant=&quot;outline&quot; /&gt;
&lt;/ButtonGroup&gt;</code></pre>
          </article>

          <article class="overflow-hidden rounded-xl border">
            <div class="p-6">
              <h3 class="font-medium">Vertical</h3>
              <ButtonGroup class="mt-5" orientation="vertical">
                <Button label="Editar" variant="outline" />
                <Button label="Duplicar" variant="outline" />
                <Button label="Eliminar" severity="error" variant="outline" />
              </ButtonGroup>
            </div>
            <pre
              class="overflow-x-auto border-t bg-muted/50 p-4 text-sm"
            ><code>&lt;ButtonGroup orientation=&quot;vertical&quot;&gt;
  ...
&lt;/ButtonGroup&gt;</code></pre>
          </article>

          <article class="overflow-hidden rounded-xl border">
            <div class="p-6">
              <h3 class="font-medium">Tamaños</h3>
              <div class="mt-5 flex flex-col items-start gap-4">
                <ButtonGroup size="xs">
                  <Button label="Uno" variant="outline" />
                  <Button label="Dos" variant="outline" />
                </ButtonGroup>
                <ButtonGroup size="sm">
                  <Button label="Uno" variant="outline" />
                  <Button label="Dos" variant="outline" />
                </ButtonGroup>
                <ButtonGroup size="md">
                  <Button label="Uno" variant="outline" />
                  <Button label="Dos" variant="outline" />
                </ButtonGroup>
                <ButtonGroup size="lg">
                  <Button label="Uno" variant="outline" />
                  <Button label="Dos" variant="outline" />
                </ButtonGroup>
              </div>
            </div>
            <pre
              class="overflow-x-auto border-t bg-muted/50 p-4 text-sm"
            ><code>&lt;ButtonGroup size=&quot;lg&quot;&gt;
  ...
&lt;/ButtonGroup&gt;</code></pre>
          </article>

          <article class="overflow-hidden rounded-xl border">
            <div class="p-6">
              <h3 class="font-medium">Con input</h3>
              <ButtonGroup class="mt-5 w-full sm:w-auto">
                <Input class="min-w-0 sm:w-64" placeholder="Introduce un dominio" />
                <Button label="Buscar" />
              </ButtonGroup>
            </div>
            <pre class="overflow-x-auto border-t bg-muted/50 p-4 text-sm"><code>&lt;ButtonGroup&gt;
  &lt;Input placeholder=&quot;Introduce un dominio&quot; /&gt;
  &lt;Button label=&quot;Buscar&quot; /&gt;
&lt;/ButtonGroup&gt;</code></pre>
          </article>

          <article class="overflow-hidden rounded-xl border">
            <div class="p-6">
              <h3 class="font-medium">Personalizado con UI</h3>
              <ButtonGroup
                class="mt-5"
                :ui="{ root: { class: 'rounded-lg bg-muted p-1 [&>*]:border-0' } }"
              >
                <Button label="Día" variant="plain" />
                <Button label="Semana" variant="plain" />
                <Button label="Mes" variant="plain" />
              </ButtonGroup>
            </div>
            <pre
              class="overflow-x-auto border-t bg-muted/50 p-4 text-sm"
            ><code>&lt;ButtonGroup :ui=&quot;{ root: { class: 'rounded-lg bg-muted p-1' } }&quot;&gt;
  ...
&lt;/ButtonGroup&gt;</code></pre>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>
