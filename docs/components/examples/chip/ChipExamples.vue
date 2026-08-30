<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Indicadores sobre avatares, posiciones, tamaños y contenido personalizado.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Sobre un elemento</h3>
          <p class="text-sm text-muted-foreground">
            Coloca un indicador sobre un avatar o tarjeta.
          </p>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative inline-flex">
            <Chip color="#ef4444" aria-label="Tres notificaciones">
              <Avatar label="JD" />
            </Chip>
          </div>
          <div class="relative inline-flex">
            <Chip color="#22c55e" aria-label="En línea">
              <Avatar label="AB" />
            </Chip>
          </div>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Posiciones</h3>
          <p class="text-sm text-muted-foreground">
            Coloca el indicador en cualquiera de las cuatro esquinas.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <Chip position="top-left" color="#3b82f6" aria-label="Estado superior izquierdo">
            <span class="flex size-10 items-center justify-center rounded-lg bg-muted text-xs"
              >TL</span
            >
          </Chip>
          <Chip position="top-right" color="#64748b" aria-label="Estado superior derecho">
            <span class="flex size-10 items-center justify-center rounded-lg bg-muted text-xs"
              >TR</span
            >
          </Chip>
          <Chip position="bottom-left" color="#f59e0b" aria-label="Estado inferior izquierdo">
            <span class="flex size-10 items-center justify-center rounded-lg bg-muted text-xs"
              >BL</span
            >
          </Chip>
          <Chip position="bottom-right" color="#22c55e" aria-label="Estado inferior derecho">
            <span class="flex size-10 items-center justify-center rounded-lg bg-muted text-xs"
              >BR</span
            >
          </Chip>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Tamaños y colores</h3>
          <p class="text-sm text-muted-foreground">Usa el tamaño adecuado para cada indicador.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Chip size="3xs" standalone aria-label="Tamaño 3xs" />
          <Chip size="xs" standalone color="#22c55e" aria-label="Tamaño xs" />
          <Chip size="md" standalone color="#ef4444" aria-label="Tamaño md" />
          <Chip size="xl" standalone color="#f59e0b" aria-label="Tamaño xl" />
          <Chip size="3xl" standalone color="#2563eb" aria-label="Tamaño 3xl" />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Standalone e inset</h3>
          <p class="text-sm text-muted-foreground">También puede renderizarse sin overlay.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Chip standalone color="#18181b" aria-label="Indicador independiente" />
          <div class="relative inline-flex">
            <Avatar label="IN" size="sm" />
            <Chip inset position="bottom-right" color="#22c55e" aria-label="Indicador insertado" />
          </div>
          <Chip size="lg">
            <span class="flex size-3 items-center justify-center rounded-full bg-warning text-[8px]"
              >!</span
            >
          </Chip>
        </div>
      </div>
    </div>
  </section>
</template>
