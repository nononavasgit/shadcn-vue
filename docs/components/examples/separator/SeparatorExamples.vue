<script setup lang="ts">
import { Separator } from '@/components/ui/Separator'
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de usar Separator para separar contenido.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Separador horizontal</h3>
          <p class="text-sm text-muted-foreground">La orientación por defecto.</p>
        </div>
        <div class="grid gap-3">
          <span class="text-sm">Perfil</span>
          <Separator />
          <span class="text-sm">Preferencias</span>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Separador vertical</h3>
          <p class="text-sm text-muted-foreground">Útil para dividir acciones en una fila.</p>
        </div>
        <div class="flex h-10 items-center justify-center gap-4">
          <span class="text-sm">Anterior</span>
          <Separator orientation="vertical" />
          <span class="text-sm">Siguiente</span>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4 md:col-span-2">
        <div>
          <h3 class="font-medium">Separador semántico</h3>
          <p class="text-sm text-muted-foreground">
            Usa decorative=false cuando el separador comunica una división del contenido.
          </p>
        </div>
        <Separator :decorative="false" />
      </div>
    </div>
  </section>
</template>
