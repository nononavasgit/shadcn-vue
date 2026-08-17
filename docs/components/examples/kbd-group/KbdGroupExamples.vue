<script setup lang="ts">
import { Kbd, KbdGroup } from '@/components/ui/Kbd'
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Combina teclas individuales para representar atajos completos.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Atajo de teclado</h3>
          <p class="text-sm text-muted-foreground">
            Agrupa las teclas y separadores que forman una acción.
          </p>
        </div>
        <KbdGroup aria-label="Atajo para guardar">
          <Kbd label="Ctrl" />
          <span class="text-muted-foreground">+</span>
          <Kbd label="S" />
        </KbdGroup>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Atajos alternativos</h3>
          <p class="text-sm text-muted-foreground">
            Presenta varias opciones para la misma acción.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <KbdGroup aria-label="Atajo para buscar">
            <Kbd label="Ctrl" />
            <span class="text-muted-foreground">+</span>
            <Kbd label="K" />
          </KbdGroup>
          <span class="text-sm text-muted-foreground">o</span>
          <KbdGroup aria-label="Atajo alternativo para buscar">
            <Kbd label="/" />
          </KbdGroup>
        </div>
      </div>
    </div>
  </section>
</template>
