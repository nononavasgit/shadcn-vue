<script setup lang="ts">
import { ref } from 'vue'
import { Select, type SelectGroup, type SelectItem, type SelectProps } from '@/components/ui/Select'

const basicValue = ref<string | number>()
const groupedValue = ref<string | number>('apple')
const customValue = ref<string | number>('profile')
const loadingValue = ref<string | number>('profile')
const invalidValue = ref<string | number>()

const basicItems: SelectItem[] = [
  { value: 'apple', label: 'Manzana', icon: { name: 'info' } },
  { value: 'banana', label: 'Plátano', icon: { name: 'warning' } },
  { value: 'orange', label: 'Naranja', disabled: true },
  { value: 'pear', label: 'Pera' },
]

const groupedItems: SelectGroup[] = [
  {
    slot: 'fruits',
    label: 'Frutas',
    items: [
      { value: 'apple', label: 'Manzana' },
      { value: 'banana', label: 'Plátano' },
    ],
  },
  {
    slot: 'vegetables',
    label: 'Verduras',
    items: [
      { value: 'carrot', label: 'Zanahoria' },
      { value: 'pepper', label: 'Pimiento' },
    ],
  },
]

const customItems: SelectItem[] = [
  { slot: 'profile', value: 'profile', label: 'Perfil', icon: { name: 'user' } },
  { slot: 'settings', value: 'settings', label: 'Configuración', icon: { name: 'settings' } },
  { slot: 'help', value: 'help', label: 'Ayuda', icon: { name: 'circleHelp' } },
]

const longItems: SelectItem[] = Array.from({ length: 24 }, (_, index) => ({
  value: index + 1,
  label: 'Opción larga ' + (index + 1),
}))

const customUi: SelectProps['ui'] = {
  trigger: (context) => ({
    class: context.open ? 'border-primary ring-3 ring-primary/20' : undefined,
  }),
  content: () => ({ class: 'border-primary' }),
  item: (context) => ({
    class: context.selected ? 'font-semibold' : undefined,
  }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Select declarativo con estados, grupos, slots, ui y una lista larga.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Select básico controlado</h3>
          <p class="text-sm text-muted-foreground">El valor seleccionado se refleja fuera.</p>
        </div>
        <Select v-model:value="basicValue" :items="basicItems" placeholder="Elige una fruta" />
        <output class="text-sm text-muted-foreground">
          Valor: {{ basicValue ?? 'sin seleccionar' }}
        </output>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Disabled y placeholder</h3>
          <p class="text-sm text-muted-foreground">
            Una opción concreta puede estar deshabilitada.
          </p>
        </div>
        <Select :items="basicItems" placeholder="Selecciona una opción" />
        <Select :items="basicItems" disabled placeholder="Select deshabilitado" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Loading</h3>
          <p class="text-sm text-muted-foreground">
            El spinner sustituye el icono del value y el panel permanece oculto.
          </p>
        </div>
        <Select v-model:value="loadingValue" :items="customItems" loading> </Select>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Grupos e iconos</h3>
          <p class="text-sm text-muted-foreground">
            Los grupos sustituyen a items cuando tienen contenido.
          </p>
        </div>
        <Select v-model:value="groupedValue" :groups="groupedItems" />
        <output class="text-sm text-muted-foreground">Valor: {{ groupedValue }}</output>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slots y ui</h3>
          <p class="text-sm text-muted-foreground">
            Personaliza el icono del trigger, texto e indicador.
          </p>
        </div>
        <Select v-model:value="customValue" :items="customItems" :ui="customUi">
          <template #icon>
            <span class="text-xs text-primary" aria-hidden="true">⌄</span>
          </template>
          <template #item-leading="{ item }">
            <span class="size-2 rounded-full bg-primary" aria-hidden="true" />
            <span class="sr-only">Contenido adicional: {{ item.label }}</span>
          </template>
          <template #item-help="{ item }"> {{ item.label }} (FAQ) </template>
          <template #indicator>
            <span class="text-primary" aria-hidden="true">✓</span>
          </template>
        </Select>
        <output class="text-sm text-muted-foreground">Valor: {{ customValue }}</output>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Viewport, scroll y portal</h3>
          <p class="text-sm text-muted-foreground">La lista larga prueba el contenido flotante.</p>
        </div>
        <Select :items="longItems" placeholder="Abrir lista larga" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Atributos y estado inválido</h3>
          <p class="text-sm text-muted-foreground">
            Los atributos externos llegan al trigger visible.
          </p>
        </div>
        <Select
          v-model:value="invalidValue"
          :items="basicItems"
          aria-label="Fruta obligatoria"
          aria-invalid="true"
          placeholder="Campo inválido"
        />
        <output class="text-sm text-muted-foreground">
          Valor: {{ invalidValue ?? 'pendiente' }}
        </output>
      </div>
    </div>
  </section>
</template>
