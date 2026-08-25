<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import Example from '../../Example.vue'

const clickCount = ref(0)

function handleClick() {
  clickCount.value += 1
}

const basicCode = `<Button label="Guardar cambios" />`
const variantCode = `<div class="flex flex-wrap gap-2">
  <Button label="Solid" />
  <Button label="Outline" variant="outline" />
  <Button label="Plain" variant="plain" />
  <Button label="Subtle" variant="subtle" />
  <Button label="Soft" variant="soft" />
  <Button label="Link" variant="link" />
</div>`
const severityCode = `<div class="flex flex-wrap gap-2">
  <Button label="Primary" severity="primary" />
  <Button label="Secondary" severity="secondary" />
  <Button label="Warning" severity="warning" />
  <Button label="Success" severity="success" />
  <Button label="Error" severity="error" />
</div>`
const sizeCode = `<div class="flex flex-wrap items-center gap-2">
  <Button label="Extra small" size="xs" />
  <Button label="Small" size="sm" />
  <Button label="Medium" size="md" />
  <Button label="Large" size="lg" />
</div>`
const roundedCode = `<Button label="Rounded" rounded />`
const squareCode = `<Button square :icon="{ name: 'plus' }" aria-label="Añadir" />`
const raisedCode = `<Button label="Raised" raised />`
const loadingCode = `<Button label="Guardando" loading />`
const colorCode = `<Button label="Personalizado" color="#7c3aed" />`
const iconCode = `<Button label="Guardar" :icon="{ name: 'save' }" />`
const trailingIconCode = `<Button label="Siguiente" :trailing-icon="{ name: 'chevronRight' }" />`
const asCode = `<Button as="a" href="#button-props" label="Ir a las props" />`
const asChildCode = `<Button as-child>
  <a href="#button-slots">Enlace como hijo</a>
</Button>`
const defaultSlotCode = `<Button>Contenido del slot default</Button>`
const leadingSlotCode = `<Button>
  <template #leading>
    <Icon name="save" />
  </template>
  Guardar
</Button>`
const loadingSlotCode = `<Button loading>
  <template #loading>
    <span>Guardando...</span>
  </template>
</Button>`
const trailingSlotCode = `<Button>
  Siguiente
  <template #trailing>
    <Icon name="chevronRight" />
  </template>
</Button>`
const clickCode = `<Button @click="handleClick">
  Pulsado {{ clickCount }} veces
</Button>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada ejemplo muestra una prop, slot o evento disponible en Button.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Label"
        description="Usa label para definir el texto principal del boton."
        :code="basicCode"
      >
        <Button label="Guardar cambios" />
      </Example>

      <Example
        title="Variant"
        description="Controla el tratamiento visual con las seis variantes disponibles."
        :code="variantCode"
        class="md:col-span-2"
      >
        <div class="flex flex-wrap gap-2">
          <Button label="Solid" />
          <Button label="Outline" variant="outline" />
          <Button label="Plain" variant="plain" />
          <Button label="Subtle" variant="subtle" />
          <Button label="Soft" variant="soft" />
          <Button label="Link" variant="link" />
        </div>
      </Example>

      <Example
        title="Severity"
        description="Aplica una intención semántica al botón."
        :code="severityCode"
        class="md:col-span-2"
      >
        <div class="flex flex-wrap gap-2">
          <Button label="Primary" severity="primary" />
          <Button label="Secondary" severity="secondary" />
          <Button label="Warning" severity="warning" />
          <Button label="Success" severity="success" />
          <Button label="Error" severity="error" />
        </div>
      </Example>

      <Example
        title="Size"
        description="Elige entre xs, sm, md y lg."
        :code="sizeCode"
        class="md:col-span-2"
      >
        <div class="flex flex-wrap items-center gap-2">
          <Button label="Extra small" size="xs" />
          <Button label="Small" size="sm" />
          <Button label="Medium" size="md" />
          <Button label="Large" size="lg" />
        </div>
      </Example>

      <Example
        title="Rounded"
        description="rounded convierte los bordes en una píldora."
        :code="roundedCode"
      >
        <Button label="Rounded" rounded />
      </Example>

      <Example
        title="Square"
        description="square crea un botón cuadrado, normalmente combinado con un icono."
        :code="squareCode"
      >
        <Button square :icon="{ name: 'plus' }" aria-label="Añadir" />
      </Example>

      <Example
        title="Raised"
        description="raised añade una sombra sutil para elevar visualmente el botón."
        :code="raisedCode"
      >
        <Button label="Raised" raised />
      </Example>

      <Example
        title="Loading"
        description="loading muestra el indicador y marca el botón como ocupado y deshabilitado."
        :code="loadingCode"
      >
        <Button label="Guardando" loading />
      </Example>

      <Example
        title="Color"
        description="color permite usar un color CSS personalizado."
        :code="colorCode"
      >
        <Button label="Personalizado" color="#7c3aed" />
      </Example>

      <Example
        title="Icon"
        description="icon coloca un IconConfig al principio del contenido."
        :code="iconCode"
      >
        <Button label="Guardar" :icon="{ name: 'save' }" />
      </Example>

      <Example
        title="Trailing icon"
        description="trailingIcon coloca un IconConfig después del contenido."
        :code="trailingIconCode"
      >
        <Button label="Siguiente" :trailing-icon="{ name: 'chevronRight' }" />
      </Example>

      <Example
        title="As"
        description="as cambia el elemento HTML renderizado manteniendo la API del botón."
        :code="asCode"
      >
        <Button as="a" href="#button-props" label="Ir a las props" />
      </Example>

      <Example
        title="As child"
        description="asChild delega el elemento raíz al hijo proporcionado."
        :code="asChildCode"
      >
        <Button as-child>
          <a href="#button-slots">Enlace como hijo</a>
        </Button>
      </Example>

      <Example
        title="Slot default"
        description="El slot default sustituye el fallback de label."
        :code="defaultSlotCode"
      >
        <Button>Contenido del slot default</Button>
      </Example>

      <Example
        title="Slot leading"
        description="leading permite sustituir el icono inicial."
        :code="leadingSlotCode"
      >
        <Button>
          <template #leading>
            <Icon name="save" />
          </template>
          Guardar
        </Button>
      </Example>

      <Example
        title="Slot loading"
        description="loading sustituye el spinner mientras el botón está cargando."
        :code="loadingSlotCode"
      >
        <Button loading>
          <template #loading>
            <span>Guardando...</span>
          </template>
        </Button>
      </Example>

      <Example
        title="Slot trailing"
        description="trailing permite sustituir el icono final."
        :code="trailingSlotCode"
      >
        <Button>
          Siguiente
          <template #trailing>
            <Icon name="chevronRight" />
          </template>
        </Button>
      </Example>

      <Example
        title="Evento click"
        description="click se emite cuando el botón no está loading ni aria-disabled."
        :code="clickCode"
        class="md:col-span-2"
      >
        <Button @click="handleClick">Pulsado {{ clickCount }} veces</Button>
      </Example>
    </div>
  </section>
</template>
