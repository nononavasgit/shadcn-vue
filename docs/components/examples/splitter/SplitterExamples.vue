<script setup lang="ts">
import { computed, ref } from 'vue'
import { Splitter, type SplitterItem } from '@/components/ui/Splitter'

const horizontalLayout = ref<number[]>([])

const horizontalItems: SplitterItem[] = [
  {
    id: 'files',
    slot: 'files',
    defaultSize: 22,
    minSize: 16,
    maxSize: 35,
  },
  {
    id: 'editor',
    slot: 'editor',
    defaultSize: 53,
    minSize: 30,
  },
  {
    id: 'details',
    slot: 'details',
    defaultSize: 25,
    minSize: 15,
    collapsible: true,
    collapsedSize: 5,
  },
]

const verticalItems: SplitterItem[] = [
  {
    id: 'preview',
    slot: 'preview',
    defaultSize: 65,
    minSize: 35,
    class: undefined,
    style: undefined,
  },
  {
    id: 'terminal',
    slot: 'terminal',
    defaultSize: 35,
    minSize: 20,
    class: undefined,
    style: undefined,
  },
]

const horizontalLayoutText = computed(() =>
  horizontalLayout.value.length
    ? horizontalLayout.value.map((size) => `${Math.round(size)}%`).join(' · ')
    : 'Calculando…',
)
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos de Splitter</h2>
      <p class="text-sm text-muted-foreground">
        Prueba paneles configurados con items, slots individuales y handles personalizados.
      </p>
    </div>

    <div class="grid gap-3 rounded-lg border p-4">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 class="font-medium">Layout horizontal</h3>
          <p class="text-sm text-muted-foreground">
            El panel de detalles se puede colapsar al alcanzar su tamaño mínimo.
          </p>
        </div>
        <code class="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
          {{ horizontalLayoutText }}
        </code>
      </div>

      <Splitter
        :items="horizontalItems"
        :hit-area-margins="{ mouse: 10, touch: 10 }"
        :tabindex="0"
        class="h-72 overflow-hidden rounded-md border bg-muted/20"
        @layout="horizontalLayout = $event"
      >
        <template #panel-files>
          <div class="grid h-full content-start gap-3 overflow-auto p-4">
            <div class="flex items-center justify-between gap-2">
              <span class="text-sm font-medium">Archivos</span>
              <span class="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">12</span>
            </div>
            <div class="grid gap-1 text-sm text-muted-foreground">
              <span class="rounded bg-primary/10 px-2 py-1 text-primary">src/components</span>
              <span class="px-2 py-1">package.json</span>
              <span class="px-2 py-1">README.md</span>
            </div>
          </div>
        </template>

        <template #panel-editor>
          <div class="grid h-full content-start gap-3 overflow-auto p-4">
            <div class="flex items-center justify-between gap-2">
              <span class="text-sm font-medium">Splitter.vue</span>
              <span class="text-xs text-emerald-600">Sin cambios</span>
            </div>
            <pre
              class="overflow-auto rounded-md bg-background p-3 text-xs leading-6"
            ><code><span class="text-violet-600">&lt;Splitter</span> <span class="text-blue-600">:items</span>=<span class="text-emerald-600">"items"</span><span class="text-violet-600">&gt;</span>
  <span class="text-muted-foreground">Contenido del panel</span>
<span class="text-violet-600">&lt;/Splitter&gt;</span></code></pre>
          </div>
        </template>

        <template #panel-details="{ item, index, first, last, nextItem, layout }">
          <div class="grid h-full content-start gap-3 overflow-auto p-4">
            <div class="flex items-center justify-between gap-2">
              <span class="text-sm font-medium">Detalles</span>
              <span class="text-xs text-muted-foreground">Índice: {{ index }}</span>
            </div>
            <div class="grid gap-2 text-xs text-muted-foreground">
              <span class="rounded border bg-background px-2 py-1">Id: {{ item.id }}</span>
              <span class="rounded border bg-background px-2 py-1">
                Posición: {{ first ? 'primero' : last ? 'último' : 'intermedio' }}
              </span>
              <span class="rounded border bg-background px-2 py-1">
                Siguiente: {{ nextItem?.id ?? 'ninguno' }}
              </span>
              <span class="rounded border bg-background px-2 py-1">
                Layout:
                {{ layout.map((size) => `${Math.round(size)}%`).join(' · ') || 'Calculando…' }}
              </span>
            </div>
          </div>
        </template>

        <template #handle>
          <span class="grid gap-0.5 rounded-sm border bg-background p-1 shadow-sm">
            <span class="h-0.5 w-2 rounded-full bg-muted-foreground/60" />
            <span class="h-0.5 w-2 rounded-full bg-muted-foreground/60" />
            <span class="h-0.5 w-2 rounded-full bg-muted-foreground/60" />
          </span>
        </template>
      </Splitter>
    </div>

    <div class="flex h-80 flex-col gap-3 rounded-lg border p-4">
      <div>
        <h3 class="font-medium">Layout vertical</h3>
        <p class="text-sm text-muted-foreground">
          La misma API cambia de eje usando direction="vertical".
        </p>
      </div>

      <Splitter
        direction="vertical"
        :items="verticalItems"
        :hit-area-margins="{ mouse: 10, touch: 10 }"
        :tabindex="0"
        class="min-h-0 flex-1 overflow-hidden rounded-md border bg-muted/20"
      >
        <template #panel-preview>
          <div class="grid h-full place-items-center p-4 text-center">
            <div class="grid gap-1">
              <span class="text-sm font-medium">Vista previa</span>
              <span class="text-xs text-muted-foreground">Arrastra el separador horizontal</span>
            </div>
          </div>
        </template>

        <template #panel-terminal>
          <div class="h-full overflow-auto bg-slate-950 p-4 font-mono text-xs text-slate-200">
            <p>$ npm run dev</p>
            <p class="text-emerald-400">ready in 412ms</p>
          </div>
        </template>

        <template #handle-preview>
          <span class="bg-border-foreground/30 h-1 w-10 rounded-full" />
        </template>
      </Splitter>
    </div>
  </section>
</template>
