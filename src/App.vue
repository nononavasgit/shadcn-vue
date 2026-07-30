<script setup lang="ts">
import { Toggle } from '@/components/app/Toggle'

const variants = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const
const severities = ['default', 'primary', 'secondary', 'warning', 'success', 'error'] as const
</script>

<template>
  <main class="mx-auto min-h-screen max-w-6xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Toggle</h1>
      <p class="max-w-3xl text-muted-foreground">
        Todas las variantes combinadas con cada severidad. Los toggles se pueden activar y
        desactivar de forma independiente.
      </p>
    </header>

    <section class="space-y-4 rounded-xl border p-5" aria-labelledby="toggle-default">
      <div class="space-y-1">
        <h2 id="toggle-default" class="text-xl font-semibold">Default real</h2>
        <p class="text-sm text-muted-foreground">
          Sin indicar variant ni severity; utiliza los valores predeterminados del componente.
        </p>
      </div>

      <Toggle label="Default" />
    </section>

    <section
      v-for="(variant, variantIndex) in variants"
      :key="variant"
      class="space-y-4 rounded-xl border p-5"
      :aria-labelledby="`toggle-variant-${variant}`"
    >
      <div class="space-y-1">
        <h2 :id="`toggle-variant-${variant}`" class="text-xl font-semibold">
          Variante: {{ variant }}
        </h2>
        <p class="text-sm text-muted-foreground">
          Un ejemplo {{ variant }} para cada severidad y otro con color personalizado.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <Toggle
          v-for="(severity, severityIndex) in severities"
          :key="`${variant}-${severity}`"
          :default-value="severityIndex === variantIndex % severities.length"
          :label="severity"
          :variant="variant"
          :severity="severity"
        />

        <Toggle :default-value="true" label="color" :variant="variant" color="#7c3aed" />
      </div>
    </section>
  </main>
</template>
