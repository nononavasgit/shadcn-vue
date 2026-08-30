<script setup lang="ts">
import { Card } from '@/components/ui/Card'
import { Ribbon } from '@/components/ui/Ribbon'
import Example from '../../Example.vue'

const basicCode = `<Ribbon :ribbons="[{ label: 'Nuevo', severity: 'primary' }]">
  <Card label="Producto destacado" description="Una cinta clásica sobre la tarjeta.">
    <p>Contenido de la tarjeta</p>
  </Card>
</Ribbon>`

const positionCode = `<div class="grid gap-4 sm:grid-cols-2">
  <Ribbon :ribbons="[{ label: 'Oferta', severity: 'warning', position: 'top-right' }]">
    <Card label="Oferta" />
  </Ribbon>
  <Ribbon :ribbons="[{ label: 'Nuevo', severity: 'success', position: 'top-left' }]">
    <Card label="Nuevo" />
  </Ribbon>
</div>`

const colorCode = `<Ribbon :ribbons="[{ label: 'Personalizado', color: '#7c3aed' }]">
  <Card label="Color propio" description="La cinta usa un color CSS personalizado." />
</Ribbon>`

const rotateCode = `<Ribbon :ribbons="[{ label: 'Inclinada', severity: 'error', rotate: 25 }]">
  <Card label="Rotación personalizada" description="La cinta usa rotate: 25." />
</Ribbon>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Ribbon es una cinta diagonal que se coloca sobre una esquina del contenido.
      </p>
    </div>

    <div class="grid gap-4">
      <Example
        title="Cinta sobre una Card"
        description="El uso más habitual: una etiqueta diagonal sobre la esquina superior derecha."
        :code="basicCode"
      >
        <Ribbon class="w-full max-w-xl" :ribbons="[{ label: 'Nuevo', severity: 'primary' }]">
          <Card
            label="Producto destacado"
            description="Una cinta clásica sobre la tarjeta."
            class="min-h-40"
          >
            <p>Contenido de la tarjeta</p>
          </Card>
        </Ribbon>
      </Example>

      <Example
        title="Posiciones"
        description="Cambia la esquina con position cuando la tarjeta lo necesite."
        :code="positionCode"
      >
        <div class="grid w-full gap-4 sm:grid-cols-2">
          <Ribbon :ribbons="[{ label: 'Oferta', severity: 'warning', position: 'top-right' }]">
            <Card label="Oferta" class="min-h-32" />
          </Ribbon>
          <Ribbon :ribbons="[{ label: 'Nuevo', severity: 'success', position: 'top-left' }]">
            <Card label="Nuevo" class="min-h-32" />
          </Ribbon>
        </div>
      </Example>

      <Example
        title="Color personalizado"
        description="color acepta cualquier valor CSS y calcula el contraste del texto."
        :code="colorCode"
      >
        <Ribbon class="w-full max-w-xl" :ribbons="[{ label: 'Personalizado', color: '#7c3aed' }]">
          <Card
            label="Color propio"
            description="La cinta usa un color CSS personalizado."
            class="min-h-40"
          />
        </Ribbon>
      </Example>

      <Example
        title="Rotación personalizada"
        description="Usa rotate para cambiar la inclinación de la cinta respecto a su posición."
        :code="rotateCode"
      >
        <Ribbon
          class="w-full max-w-xl"
          :ribbons="[{ label: 'Inclinada', severity: 'error', rotate: 25 }]"
        >
          <Card
            label="Rotación personalizada"
            description="La cinta usa una inclinación personalizada."
            class="min-h-40"
          />
        </Ribbon>
      </Example>
    </div>
  </section>
</template>
