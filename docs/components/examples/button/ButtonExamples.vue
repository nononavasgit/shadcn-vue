<script setup lang="ts">
import { Button } from '@/components/ui/Button'
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Variantes visuales, iconos, estados y formas habituales de Button.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Variantes</h3>
          <p class="text-sm text-muted-foreground">Elige el tratamiento visual del botón.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button label="Solid" />
          <Button label="Outline" variant="outline" />
          <Button label="Plain" variant="plain" />
          <Button label="Subtle" variant="subtle" />
          <Button label="Soft" variant="soft" />
          <Button label="Link" variant="link" />
          <Button label="Raised" raised />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Iconos</h3>
          <p class="text-sm text-muted-foreground">Los iconos se configuran como objetos.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button label="Guardar" :icon="{ name: 'save' }" />
          <Button label="Siguiente" :trailing-icon="{ name: 'chevronRight' }" />
          <Button square aria-label="Guardar" :icon="{ name: 'save' }" variant="outline" />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Estados</h3>
          <p class="text-sm text-muted-foreground">Loading reemplaza el contenido principal.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button label="Guardar cambios" severity="success" />
          <Button label="Eliminar" severity="error" variant="outline" />
          <Button label="Procesando" loading />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Tamaño y forma</h3>
          <p class="text-sm text-muted-foreground">Combina tamaño, redondeado y forma cuadrada.</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <Button label="Pequeño" size="sm" />
          <Button label="Grande" size="lg" />
          <Button label="Redondo" rounded />
          <Button square :icon="{ name: 'plus' }" aria-label="Añadir" />
        </div>
      </div>
    </div>
  </section>
</template>
