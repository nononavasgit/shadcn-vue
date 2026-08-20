<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Agrupa acciones relacionadas y ajusta su orientación y tamaño.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Grupo horizontal</h3>
          <p class="text-sm text-muted-foreground">La orientación por defecto.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <ButtonGroup>
            <Button variant="outline">Back</Button>
            <Button variant="outline">Next</Button>
            <Button>Finish</Button>
          </ButtonGroup>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Grupo vertical</h3>
          <p class="text-sm text-muted-foreground">Útil para menús y acciones apiladas.</p>
        </div>
        <div class="flex items-start">
          <ButtonGroup orientation="vertical">
            <Button variant="outline">Perfil</Button>
            <Button variant="outline">Preferencias</Button>
            <Button>Salir</Button>
          </ButtonGroup>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Tamaños</h3>
          <p class="text-sm text-muted-foreground">El tamaño se aplica a todos los botones.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <ButtonGroup size="xs">
            <Button variant="outline">Small</Button>
            <Button variant="outline">Group</Button>
          </ButtonGroup>
          <ButtonGroup size="lg">
            <Button variant="outline">Large</Button>
            <Button>Group</Button>
          </ButtonGroup>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Acciones con iconos</h3>
          <p class="text-sm text-muted-foreground">Combina ButtonGroup con configuraciones de Button.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <ButtonGroup>
            <Button variant="outline" :icon="{ name: 'check' }" aria-label="Negrita" />
            <Button variant="outline" :icon="{ name: 'info' }" aria-label="Cursiva" />
            <Button :icon="{ name: 'warning' }" :severity="'warning'" aria-label="Subrayado" />
          </ButtonGroup>
        </div>
      </div>
    </div>
  </section>
</template>
