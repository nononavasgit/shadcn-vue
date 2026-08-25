<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import Example from '../../Example.vue'

const horizontalCode = `<ButtonGroup>
  <Button variant="outline">Back</Button>
  <Button variant="outline">Next</Button>
  <Button>Finish</Button>
</ButtonGroup>`
const verticalCode = `<ButtonGroup orientation="vertical">
  <Button variant="outline">Profile</Button>
  <Button variant="outline">Preferences</Button>
  <Button>Sign out</Button>
</ButtonGroup>`
const sizeCode = `<div class="flex items-center gap-3">
  <ButtonGroup size="xs">
    <Button variant="outline">xs 1</Button>
    <Button>xs 2</Button>
  </ButtonGroup>
  <ButtonGroup size="sm">
    <Button variant="outline">sm 1</Button>
    <Button>sm 2</Button>
  </ButtonGroup>
  <ButtonGroup size="md">
    <Button variant="outline">md 1</Button>
    <Button>md 2</Button>
  </ButtonGroup>
  <ButtonGroup size="lg">
    <Button variant="outline">lg 1</Button>
    <Button>lg 2</Button>
  </ButtonGroup>
</div>`
const defaultSlotCode = `<ButtonGroup>
  <Button :icon="{ name: 'chevronLeft' }" aria-label="Anterior" />
  <Button>Page 1</Button>
  <Button :icon="{ name: 'chevronRight' }" aria-label="Siguiente" />
</ButtonGroup>`
const attrsCode = `<ButtonGroup
  class="rounded-lg border p-1"
  data-state="ready"
  aria-label="Acciones de navegación"
>
  <Button variant="outline">Back</Button>
  <Button>Next</Button>
</ButtonGroup>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada ejemplo muestra una prop, slot o atributo disponible en ButtonGroup.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Orientation horizontal"
        description="La orientación horizontal es el valor por defecto."
        :code="horizontalCode"
        class="md:col-span-2"
      >
        <ButtonGroup>
          <Button variant="outline">Back</Button>
          <Button variant="outline">Next</Button>
          <Button>Finish</Button>
        </ButtonGroup>
      </Example>

      <Example
        title="Orientation vertical"
        description="vertical apila los botones para menús y acciones relacionadas."
        :code="verticalCode"
      >
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Profile</Button>
          <Button variant="outline">Preferences</Button>
          <Button>Sign out</Button>
        </ButtonGroup>
      </Example>

      <Example
        title="Size"
        description="size ajusta el tamaño de todos los botones del grupo."
        :code="sizeCode"
        class="md:col-span-2"
      >
        <div class="flex flex-wrap items-center gap-3">
          <ButtonGroup size="xs">
            <Button variant="outline">xs 1</Button>
            <Button>xs 2</Button>
          </ButtonGroup>
          <ButtonGroup size="sm">
            <Button variant="outline">sm 1</Button>
            <Button>sm 2</Button>
          </ButtonGroup>
          <ButtonGroup size="md">
            <Button variant="outline">md 1</Button>
            <Button>md 2</Button>
          </ButtonGroup>
          <ButtonGroup size="lg">
            <Button variant="outline">lg 1</Button>
            <Button>lg 2</Button>
          </ButtonGroup>
        </div>
      </Example>

      <Example
        title="Slot default"
        description="El slot default contiene los botones que forman el grupo."
        :code="defaultSlotCode"
      >
        <ButtonGroup>
          <Button :icon="{ name: 'chevronLeft' }" aria-label="Anterior" />
          <Button>Page 1</Button>
          <Button :icon="{ name: 'chevronRight' }" aria-label="Siguiente" />
        </ButtonGroup>
      </Example>

      <Example
        title="Atributos HTML"
        description="Los atributos, clases y el rol group se aplican al elemento raíz."
        :code="attrsCode"
      >
        <ButtonGroup
          class="rounded-lg border p-1"
          data-state="ready"
          aria-label="Acciones de navegación"
        >
          <Button variant="outline">Back</Button>
          <Button>Next</Button>
        </ButtonGroup>
      </Example>
    </div>
  </section>
</template>
