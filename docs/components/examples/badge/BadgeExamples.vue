<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Variantes, severidades, iconos y colores personalizados para Badge.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Variantes</h3>
          <p class="text-sm text-muted-foreground">Diferentes tratamientos visuales.</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <Badge label="Solid" />
          <Badge label="Outline" variant="outline" />
          <Badge label="Plain" variant="plain" />
          <Badge label="Subtle" variant="subtle" />
          <Badge label="Soft" variant="soft" />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Severidades</h3>
          <p class="text-sm text-muted-foreground">Usa el color semántico del estado.</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <Badge label="Principal" />
          <Badge label="Secundario" severity="secondary" />
          <Badge label="Aviso" severity="warning" />
          <Badge label="Correcto" severity="success" />
          <Badge label="Error" severity="error" />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Iconos</h3>
          <p class="text-sm text-muted-foreground">Los iconos se pasan como objetos.</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <Badge label="Guardado" :icon="{ name: 'check' }" severity="success" />
          <Badge label="Siguiente" :trailing-icon="{ name: 'chevronRight' }" />
          <Badge
            label="Con ambos"
            :icon="{ name: 'info' }"
            :trailing-icon="{ name: 'chevronRight' }"
            variant="outline"
          />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Tamaño y color</h3>
          <p class="text-sm text-muted-foreground">Ajusta el tamaño y aplica un color propio.</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <Badge label="Pequeño" size="sm" />
          <Badge label="Grande" size="lg" />
          <Badge label="Personalizado" color="#7c3aed" />
        </div>
      </div>
    </div>
  </section>
</template>
