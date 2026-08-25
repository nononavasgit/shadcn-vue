<script setup lang="ts">
import { AspectRatio } from '@/components/ui/AspectRatio'
import Example from '../../Example.vue'

const ratio169Code = `<AspectRatio :ratio="16 / 9">
  <div class="size-full bg-primary" />
</AspectRatio>`
const ratio43Code = `<AspectRatio :ratio="4 / 3">
  <div class="size-full bg-secondary" />
</AspectRatio>`
const ratio11Code = `<AspectRatio :ratio="1">
  <div class="size-full rounded-full bg-primary" />
</AspectRatio>`
const numericRatioCode = `<AspectRatio :ratio="2">
  <div class="size-full bg-muted" />
</AspectRatio>`
const defaultSlotCode = `<AspectRatio :ratio="16 / 9">
  <div class="grid size-full place-items-center rounded-md bg-primary text-primary-foreground">
    Contenido
  </div>
</AspectRatio>`
const attrsCode = `<AspectRatio
  :ratio="16 / 9"
  class="overflow-hidden rounded-lg border"
  data-state="ready"
>
  <div class="size-full bg-muted" />
</AspectRatio>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada ejemplo muestra una relación, slot o atributo disponible en AspectRatio.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Ratio 16:9"
        description="La relación más habitual para vídeos y contenido panorámico."
        :code="ratio169Code"
      >
        <div class="w-full max-w-md">
          <AspectRatio :ratio="16 / 9">
            <div
              class="grid size-full place-items-center rounded-md bg-primary text-primary-foreground"
            >
              16:9
            </div>
          </AspectRatio>
        </div>
      </Example>

      <Example
        title="Ratio 4:3"
        description="Una relación más compacta para imágenes y paneles."
        :code="ratio43Code"
      >
        <div class="w-full max-w-md">
          <AspectRatio :ratio="4 / 3">
            <div
              class="grid size-full place-items-center rounded-md bg-secondary text-secondary-foreground"
            >
              4:3
            </div>
          </AspectRatio>
        </div>
      </Example>

      <Example
        title="Ratio 1:1"
        description="Usa 1 para crear un contenedor cuadrado."
        :code="ratio11Code"
      >
        <div class="w-full max-w-56">
          <AspectRatio :ratio="1">
            <div
              class="grid size-full place-items-center rounded-full bg-primary text-primary-foreground"
            >
              1:1
            </div>
          </AspectRatio>
        </div>
      </Example>

      <Example
        title="Ratio numérico"
        description="ratio acepta cualquier número positivo, no solo fracciones habituales."
        :code="numericRatioCode"
      >
        <div class="w-full max-w-md">
          <AspectRatio :ratio="2">
            <div class="grid size-full place-items-center rounded-md bg-muted text-foreground">
              2:1
            </div>
          </AspectRatio>
        </div>
      </Example>

      <Example
        title="Slot default"
        description="El contenido del slot ocupa todo el contenedor proporcional."
        :code="defaultSlotCode"
        class="md:col-span-2"
      >
        <div class="w-full max-w-md">
          <AspectRatio :ratio="16 / 9">
            <div
              class="grid size-full place-items-center rounded-md bg-primary text-primary-foreground"
            >
              Contenido
            </div>
          </AspectRatio>
        </div>
      </Example>

      <Example
        title="Atributos HTML"
        description="Los atributos y clases se reenvían al elemento raíz."
        :code="attrsCode"
        class="md:col-span-2"
      >
        <div class="w-full max-w-md">
          <AspectRatio :ratio="16 / 9" class="overflow-hidden rounded-lg border" data-state="ready">
            <div class="size-full bg-muted" />
          </AspectRatio>
        </div>
      </Example>
    </div>
  </section>
</template>
