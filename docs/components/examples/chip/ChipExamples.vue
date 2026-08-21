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
          <p class="text-sm text-muted-foreground">Coloca un valor sobre un avatar o tarjeta.</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative inline-flex">
            <Chip text="3" color="#ef4444">
              <Avatar label="JD" />
            </Chip>
          </div>
          <div class="relative inline-flex">
            <Chip text="" color="#22c55e">
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
          <Chip text="1" position="top-left" color="#3b82f6">
            <span class="flex size-10 items-center justify-center rounded-lg bg-muted text-xs"
              >TL</span
            >
          </Chip>
          <Chip text="2" position="top-right" color="#64748b">
            <span class="flex size-10 items-center justify-center rounded-lg bg-muted text-xs"
              >TR</span
            >
          </Chip>
          <Chip text="3" position="bottom-left" color="#f59e0b">
            <span class="flex size-10 items-center justify-center rounded-lg bg-muted text-xs"
              >BL</span
            >
          </Chip>
          <Chip text="4" position="bottom-right" color="#22c55e">
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
          <Chip text="1" size="3xs" standalone />
          <Chip text="2" size="xs" standalone color="#22c55e" />
          <Chip text="3" size="md" standalone color="#ef4444" />
          <Chip text="4" size="xl" standalone color="#f59e0b" />
          <Chip text="5" size="3xl" standalone color="#2563eb" />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Standalone e inset</h3>
          <p class="text-sm text-muted-foreground">También puede renderizarse sin overlay.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Chip text="7" standalone color="#18181b" />
          <div class="relative inline-flex">
            <Avatar label="IN" size="sm" />
            <Chip text="8" inset position="bottom-right" color="#22c55e" />
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
