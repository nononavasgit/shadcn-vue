<script setup lang="ts">
import { ref } from 'vue'
import { Timeline, type TimelineProps } from '@/components/ui/Timeline'

const items: TimelineProps['items'] = [
  {
    value: 'created',
    slot: 'order-created',
    label: 'Pedido creado',
    description: 'Recibimos el pedido y comenzamos a prepararlo.',
    icon: { name: 'success' },
  },
  {
    value: 'review',
    slot: 'order-review',
    label: 'En revisión',
    description: 'Estamos verificando los datos del envío.',
    icon: { name: 'search' },
  },
  {
    value: 'delivery',
    slot: 'order-delivery',
    label: 'En camino',
    description: 'El paquete saldrá del almacén próximamente.',
    icon: { name: 'upload' },
  },
]

const selectedValue = ref<string | number>('review')
const valueExample = ref<string | number>('review')
const lastUpdate = ref<string | number>('review')

const styledUi: TimelineProps['ui'] = {
  item: ({ active }) => ({ class: active ? 'rounded-lg bg-muted/60' : undefined }),
  indicator: ({ active }) => ({ 'aria-label': active ? 'Paso actual' : 'Paso pendiente' }),
}

function handleUpdate(value: string | number) {
  lastUpdate.value = value
}
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada ejemplo corresponde a una prop, slot o emit de Timeline.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Prop: items</h3>
          <p class="text-sm text-muted-foreground">Define los eventos y sus datos visibles.</p>
        </div>
        <Timeline :items="items" />
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Prop: value</h3>
          <p class="text-sm text-muted-foreground">
            Marca el evento activo y los anteriores como completados.
          </p>
        </div>
        <Timeline v-model:value="valueExample" :items="items" />
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <button
            v-for="item in items"
            :key="item.value"
            type="button"
            class="rounded-md border px-2 py-1"
            @click="valueExample = item.value"
          >
            {{ item.label }}
          </button>
          <span class="text-muted-foreground">Valor actual: {{ valueExample }}</span>
        </div>
      </article>

      <article class="grid gap-3 rounded-lg border p-4 md:col-span-2">
        <div>
          <h3 class="font-medium">Prop: orientation</h3>
          <p class="text-sm text-muted-foreground">
            Cambia entre una línea temporal vertical y horizontal.
          </p>
        </div>
        <Timeline :items="items" orientation="horizontal" value="review" />
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Prop: align</h3>
          <p class="text-sm text-muted-foreground">alternate alterna el lado de cada evento.</p>
        </div>
        <Timeline :items="items" align="alternate" value="review" />
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Prop: sizeIndicator</h3>
          <p class="text-sm text-muted-foreground">Aumenta el tamaño de los indicadores a xl.</p>
        </div>
        <Timeline :items="items" size-indicator="xl" value="review" />
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Prop: color</h3>
          <p class="text-sm text-muted-foreground">
            Usa un color CSS personalizado en estados completados.
          </p>
        </div>
        <Timeline :items="items" color="#7c3aed" value="review" />
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Prop: severity</h3>
          <p class="text-sm text-muted-foreground">Aplica la paleta semántica warning.</p>
        </div>
        <Timeline :items="items" severity="warning" value="review" />
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Prop: reverse</h3>
          <p class="text-sm text-muted-foreground">Invierte el orden de los eventos.</p>
        </div>
        <Timeline :items="items" reverse value="delivery" />
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Prop: ui</h3>
          <p class="text-sm text-muted-foreground">
            Personaliza atributos según el contexto de cada item.
          </p>
        </div>
        <Timeline :items="items" value="review" :ui="styledUi" />
      </article>

      <article class="grid gap-3 rounded-lg border p-4 md:col-span-2">
        <div>
          <h3 class="font-medium">Emit: update:value</h3>
          <p class="text-sm text-muted-foreground">
            Escucha el evento del modelo controlado desde el componente padre.
          </p>
        </div>
        <Timeline v-model:value="selectedValue" :items="items" @update:value="handleUpdate" />
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <button
            v-for="item in items"
            :key="item.value"
            type="button"
            class="rounded-md border px-2 py-1"
            @click="selectedValue = item.value"
          >
            {{ item.label }}
          </button>
          <span class="text-muted-foreground">Último update:value: {{ lastUpdate }}</span>
        </div>
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slot: header</h3>
          <p class="text-sm text-muted-foreground">Sustituye el encabezado completo.</p>
        </div>
        <Timeline :items="items">
          <template #header="{ item }">
            <strong class="text-primary">{{ item.label }} · cabecera</strong>
          </template>
        </Timeline>
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slot: label</h3>
          <p class="text-sm text-muted-foreground">Personaliza la etiqueta del evento.</p>
        </div>
        <Timeline :items="items">
          <template #label="{ item }">
            <span class="font-semibold">Evento: {{ item.label }}</span>
          </template>
        </Timeline>
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slot: description</h3>
          <p class="text-sm text-muted-foreground">
            Añade una presentación propia a la descripción.
          </p>
        </div>
        <Timeline :items="items">
          <template #description="{ item }">
            <span class="text-sm text-muted-foreground">Detalle: {{ item.description }}</span>
          </template>
        </Timeline>
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slot: indicator</h3>
          <p class="text-sm text-muted-foreground">Sustituye el icono o contenido del indicador.</p>
        </div>
        <Timeline :items="items" value="review">
          <template #indicator="{ index }">
            <span aria-hidden="true">{{ index + 1 }}</span>
          </template>
        </Timeline>
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slot: separator</h3>
          <p class="text-sm text-muted-foreground">
            Inserta contenido personalizado en cada separador.
          </p>
        </div>
        <Timeline :items="items">
          <template #separator>
            <span aria-hidden="true" class="text-xs text-muted-foreground">•</span>
          </template>
        </Timeline>
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slot: header-{slot}</h3>
          <p class="text-sm text-muted-foreground">
            Personaliza el encabezado de un item concreto.
          </p>
        </div>
        <Timeline :items="items">
          <template #header-order-review>
            <strong class="text-primary">Revisión personalizada</strong>
          </template>
        </Timeline>
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slot: label-{slot}</h3>
          <p class="text-sm text-muted-foreground">Personaliza la etiqueta de un item concreto.</p>
        </div>
        <Timeline :items="items">
          <template #label-order-review>
            <span class="font-semibold text-primary">Revisión seleccionada</span>
          </template>
        </Timeline>
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slot: description-{slot}</h3>
          <p class="text-sm text-muted-foreground">
            Personaliza la descripción de un item concreto.
          </p>
        </div>
        <Timeline :items="items">
          <template #description-order-review>
            <span class="text-sm text-primary">La revisión está en curso.</span>
          </template>
        </Timeline>
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slot: indicator-{slot}</h3>
          <p class="text-sm text-muted-foreground">Personaliza el indicador de un item concreto.</p>
        </div>
        <Timeline :items="items" value="review">
          <template #indicator-order-review>
            <span aria-hidden="true" class="font-bold text-primary">R</span>
          </template>
        </Timeline>
      </article>

      <article class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slot: separator-{slot}</h3>
          <p class="text-sm text-muted-foreground">Personaliza el separador de un item concreto.</p>
        </div>
        <Timeline :items="items">
          <template #separator-order-review>
            <span aria-hidden="true" class="text-xs text-primary">◆</span>
          </template>
        </Timeline>
      </article>
    </div>
  </section>
</template>
