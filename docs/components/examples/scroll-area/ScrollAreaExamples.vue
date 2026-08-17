<script setup lang="ts">
import { ScrollArea, type ScrollAreaProps } from '@/components/ui/ScrollArea'

const messages = Array.from({ length: 14 }, (_, index) => `Mensaje de ejemplo ${index + 1}`)
const columns = Array.from({ length: 8 }, (_, index) => `Columna ${index + 1}`)
const scrollTypes = ['scroll', 'always', 'hover', 'auto', 'glimpse'] as const

const customUi: ScrollAreaProps['ui'] = {
  viewport: () => ({ class: 'scroll-smooth' }),
  verticalScrollbar: () => ({ class: 'bg-primary/5' }),
  horizontalScrollbar: () => ({ class: 'bg-primary/5' }),
  thumbVertical: () => ({ class: 'bg-primary/60' }),
  thumbHorizontal: () => ({ class: 'bg-primary/60' }),
  corner: () => ({ class: 'bg-primary/20' }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Desplazamiento vertical, horizontal y personalización de las barras.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4 md:col-span-2">
        <div>
          <h3 class="font-medium">Tipos de visibilidad</h3>
          <p class="text-sm text-muted-foreground">
            Compara cuándo aparece la barra de desplazamiento en cada modo.
          </p>
        </div>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div v-for="scrollType in scrollTypes" :key="scrollType" class="grid gap-2">
            <span class="font-mono text-xs text-muted-foreground">{{ scrollType }}</span>
            <ScrollArea :type="scrollType" class="h-24 w-full rounded-md border bg-muted/20">
              <div class="grid min-h-48 gap-2 p-3 text-xs">
                <span v-for="line in 8" :key="line" class="rounded border bg-background p-2">
                  {{ scrollType }} · {{ line }}
                </span>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Lista vertical</h3>
          <p class="text-sm text-muted-foreground">El caso más habitual para listas largas.</p>
        </div>
        <ScrollArea class="h-48 rounded-md border bg-muted/20">
          <div class="grid gap-2 p-3">
            <div
              v-for="message in messages"
              :key="message"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              {{ message }}
            </div>
          </div>
        </ScrollArea>
      </div>

      <div class="grid min-w-0 gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Ambos ejes</h3>
          <p class="text-sm text-muted-foreground">
            Útil para tablas o contenido que necesita desplazamiento horizontal y vertical.
          </p>
        </div>
        <ScrollArea
          type="hover"
          orientation="both"
          class="h-48 w-full min-w-0 rounded-md border bg-muted/20"
        >
          <div class="grid h-[480px] w-[720px] gap-2 p-3">
            <div class="grid grid-cols-8 gap-2 text-xs font-medium text-muted-foreground">
              <span v-for="column in columns" :key="column">{{ column }}</span>
            </div>
            <div v-for="row in 12" :key="row" class="grid grid-cols-8 gap-2">
              <span
                v-for="column in columns"
                :key="`${row}-${column}`"
                class="rounded border bg-background px-2 py-1 text-xs"
              >
                {{ row }}-{{ column.slice(-1) }}
              </span>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div class="grid gap-3 rounded-lg border p-4 md:col-span-2">
        <div>
          <h3 class="font-medium">Personalización con UI</h3>
          <p class="text-sm text-muted-foreground">
            Personaliza cada parte interna con resolvers sin subobjetos.
          </p>
        </div>
        <ScrollArea :ui="customUi" class="h-40 rounded-md border bg-muted/20">
          <template #default>
            <div class="grid gap-2 p-3">
              <p class="text-sm font-medium">Contenido con UI personalizada</p>
              <p v-for="line in 8" :key="line" class="text-sm">Línea de contenido {{ line }}</p>
            </div>
          </template>
        </ScrollArea>
      </div>
    </div>
  </section>
</template>
