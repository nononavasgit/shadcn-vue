<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import Example from '../../Example.vue'

const basicCode = `<Badge label="Activo" />`
const sizeCode = `<div class="flex flex-wrap items-center gap-2">
  <Badge label="Small" size="sm" />
  <Badge label="Medium" size="md" />
  <Badge label="Large" size="lg" />
</div>`
const variantCode = `<div class="flex flex-wrap items-center gap-2">
  <Badge label="Solid" />
  <Badge label="Outline" variant="outline" />
  <Badge label="Plain" variant="plain" />
  <Badge label="Subtle" variant="subtle" />
  <Badge label="Soft" variant="soft" />
</div>`
const severityCode = `<div class="flex flex-wrap items-center gap-2">
  <Badge label="Primary" severity="primary" />
  <Badge label="Secondary" severity="secondary" />
  <Badge label="Warning" severity="warning" />
  <Badge label="Success" severity="success" />
  <Badge label="Error" severity="error" />
</div>`
const colorCode = `<Badge label="Personalizado" color="#7c3aed" />`
const iconCode = `<Badge label="Guardado" :icon="{ name: 'check' }" />`
const trailingIconCode = `<Badge label="Siguiente" :trailing-icon="{ name: 'chevronRight' }" />`
const defaultSlotCode = `<Badge>Contenido del slot default</Badge>`
const leadingSlotCode = `<Badge>
  <template #leading>
    <Icon name="check" />
  </template>
  Guardado
</Badge>`
const trailingSlotCode = `<Badge>
  Siguiente
  <template #trailing>
    <Icon name="chevronRight" />
  </template>
</Badge>`
const attrsCode = `<Badge
  label="Activo"
  class="uppercase"
  data-state="active"
  aria-label="Estado activo"
/>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada ejemplo muestra una prop, slot o atributo disponible en Badge.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Label"
        description="Usa label para definir el texto principal del badge."
        :code="basicCode"
      >
        <Badge label="Activo" />
      </Example>

      <Example
        title="Size"
        description="Elige entre los tamaños sm, md y lg."
        :code="sizeCode"
        class="md:col-span-2"
      >
        <div class="flex flex-wrap items-center gap-2">
          <Badge label="Small" size="sm" />
          <Badge label="Medium" size="md" />
          <Badge label="Large" size="lg" />
        </div>
      </Example>

      <Example
        title="Variant"
        description="Controla el tratamiento visual con las cinco variantes disponibles."
        :code="variantCode"
        class="md:col-span-2"
      >
        <div class="flex flex-wrap items-center gap-2">
          <Badge label="Solid" />
          <Badge label="Outline" variant="outline" />
          <Badge label="Plain" variant="plain" />
          <Badge label="Subtle" variant="subtle" />
          <Badge label="Soft" variant="soft" />
        </div>
      </Example>

      <Example
        title="Severity"
        description="Aplica una intención semántica al badge."
        :code="severityCode"
        class="md:col-span-2"
      >
        <div class="flex flex-wrap items-center gap-2">
          <Badge label="Primary" severity="primary" />
          <Badge label="Secondary" severity="secondary" />
          <Badge label="Warning" severity="warning" />
          <Badge label="Success" severity="success" />
          <Badge label="Error" severity="error" />
        </div>
      </Example>

      <Example
        title="Color"
        description="color permite usar un color CSS personalizado."
        :code="colorCode"
      >
        <Badge label="Personalizado" color="#7c3aed" />
      </Example>

      <Example
        title="Icon"
        description="icon coloca un IconConfig al principio del contenido."
        :code="iconCode"
      >
        <Badge label="Guardado" :icon="{ name: 'check' }" severity="success" />
      </Example>

      <Example
        title="Trailing icon"
        description="trailingIcon coloca un IconConfig después del contenido."
        :code="trailingIconCode"
      >
        <Badge label="Siguiente" :trailing-icon="{ name: 'chevronRight' }" />
      </Example>

      <Example
        title="Slot default"
        description="El slot default sustituye el fallback de label."
        :code="defaultSlotCode"
      >
        <Badge>Contenido del slot default</Badge>
      </Example>

      <Example
        title="Slot leading"
        description="leading permite sustituir el icono inicial."
        :code="leadingSlotCode"
      >
        <Badge>
          <template #leading>
            <Icon name="check" />
          </template>
          Guardado
        </Badge>
      </Example>

      <Example
        title="Slot trailing"
        description="trailing permite sustituir el icono final."
        :code="trailingSlotCode"
      >
        <Badge>
          Siguiente
          <template #trailing>
            <Icon name="chevronRight" />
          </template>
        </Badge>
      </Example>

      <Example
        title="Atributos HTML"
        description="Los atributos y clases se reenvían al elemento raíz del badge."
        :code="attrsCode"
        class="md:col-span-2"
      >
        <Badge label="Activo" class="uppercase" data-state="active" aria-label="Estado activo" />
      </Example>
    </div>
  </section>
</template>
