<script setup lang="ts">
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/Breadcrumb'
import { Icon } from '@/components/ui/Icon'
import Example from '../../Example.vue'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Inicio', to: '/' },
  { slot: 'library', label: 'Biblioteca', to: '/library' },
  { slot: 'components', label: 'Componentes', to: '/components' },
  { slot: 'breadcrumb', label: 'Breadcrumb', icon: { name: 'check' } },
]

const fullCode = `<Breadcrumb :items="items" />`
const ellipsisCode = `<Breadcrumb :items="items" :ellipsis-index="[0, 2]" />`
const iconsCode = `<Breadcrumb
  :items="items"
  :separator-icon="{ name: 'minus' }"
/>`
const separatorSlotCode = `<Breadcrumb :items="items">
  <template #separator>
    <Icon name="chevronDown" class="size-3" />
  </template>
</Breadcrumb>`
const itemSlotCode = `<Breadcrumb :items="items">
  <template #item="{ item, last }">
    <span :class="last ? 'font-semibold text-foreground' : 'underline'">
      {{ item.label }}
    </span>
  </template>
</Breadcrumb>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Combina enlaces, elipsis, iconos y slots para representar la ruta actual.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Ruta completa"
        description="Muestra todos los enlaces y la página actual."
        :code="fullCode"
      >
        <Breadcrumb :items="items" />
      </Example>

      <Example
        title="Ruta comprimida"
        description="Oculta los items intermedios con una elipsis."
        :code="ellipsisCode"
      >
        <Breadcrumb :items="items" :ellipsis-index="[0, 2]" />
      </Example>

      <Example
        title="Icono separador"
        description="Cambia el icono que separa los items de la ruta."
        :code="iconsCode"
      >
        <Breadcrumb :items="items" :separator-icon="{ name: 'minus' }" />
      </Example>

      <Example
        title="Slot separator"
        description="Sustituye el icono separador con contenido personalizado."
        :code="separatorSlotCode"
      >
        <Breadcrumb :items="items">
          <template #separator>
            <Icon name="chevronDown" class="size-3" />
          </template>
        </Breadcrumb>
      </Example>

      <Example
        title="Slot item"
        description="Personaliza la representación de cada item con su contexto."
        :code="itemSlotCode"
        class="md:col-span-2"
      >
        <Breadcrumb :items="items">
          <template #item="{ item, last }">
            <span :class="last ? 'font-semibold text-foreground' : 'underline'">
              {{ item.label }}
            </span>
          </template>
        </Breadcrumb>
      </Example>
    </div>
  </section>
</template>
