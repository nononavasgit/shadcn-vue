<script setup lang="ts">
import { Link } from '@/components/ui/Link'
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Enlaces internos, externos, con props visuales y con slots personalizados.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Enlace interno</h3>
          <p class="text-sm text-muted-foreground">Navega usando Vue Router.</p>
        </div>
        <Link to="/button" label="Ir a Button" :icon="{ name: 'chevronRight' }" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Enlace externo</h3>
          <p class="text-sm text-muted-foreground">Las URLs externas se renderizan como anclas.</p>
        </div>
        <Link
          to="https://example.com"
          label="Abrir example.com"
          :trailing-icon="{ name: 'chevronRight' }"
        />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Props de Button</h3>
          <p class="text-sm text-muted-foreground">
            Conserva las variantes visuales y estilos de Button.
          </p>
        </div>
        <Link to="/button" label="Enlace outline" variant="outline" severity="success" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slots</h3>
          <p class="text-sm text-muted-foreground">Personaliza el contenido y los iconos.</p>
        </div>
        <Link to="/icon" variant="plain">
          <template #leading>
            <span class="text-primary">→</span>
          </template>
          <template #default>Explorar iconos</template>
          <template #trailing>
            <span aria-hidden="true">↗</span>
          </template>
        </Link>
      </div>
    </div>
  </section>
</template>
