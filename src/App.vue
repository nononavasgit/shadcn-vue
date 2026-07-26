<script setup>
import { ref } from 'vue'
import { Button } from '@/components/app/Button'
import { Accordeon } from '@/components/app/Accordeon'

const elementoAbierto = ref('producto')
const elementosAbiertos = ref(['envio'])

const elementos = [
  {
    value: 'producto',
    label: 'Información del producto',
    content: 'Fabricado con materiales resistentes y pensado para un uso diario.',
  },
  {
    value: 'envio',
    label: 'Detalles del envío',
    content: 'Los pedidos se entregan normalmente entre tres y cinco días laborables.',
  },
  {
    value: 'devoluciones',
    label: 'Política de devoluciones',
    content: 'Puedes devolver el producto durante los treinta días posteriores a la compra.',
  },
]
</script>

<template>
  <Button
    label="Hola"
    :ui="{ icon: { name: 'alert' }, trailingIcon: { name: 'chevronLeft', 'aria-label': 'pepe' } }"
  ></Button>

  <Button label="Adios" severity="success" :loading="true"></Button>

  <main class="mx-auto grid max-w-3xl gap-10 p-6">
    <section class="space-y-3">
      <h2 class="text-xl font-semibold">Acordeón básico</h2>
      <p class="text-sm text-muted-foreground">Solo permite abrir un elemento.</p>

      <Accordeon
        v-model="elementoAbierto"
        class="w-full"
        type="single"
        collapsible
        :elements="elementos"
      />

      <p class="text-sm text-muted-foreground">Valor actual: {{ elementoAbierto ?? 'ninguno' }}</p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">Apertura múltiple</h2>

      <Accordeon
        v-model="elementosAbiertos"
        type="multiple"
        :elements="elementos"
        :ui="{
          root: { class: 'rounded-lg border px-4' },
          item: ({ open }) => ({ class: open && 'bg-muted/40' }),
          trigger: ({ open }) => ({ class: open && 'text-primary' }),
          content: ({ last }) => ({ class: last && 'pb-1' }),
        }"
      />

      <p class="text-sm text-muted-foreground">
        Valores actuales: {{ elementosAbiertos.join(', ') || 'ninguno' }}
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">Slots personalizados</h2>

      <Accordeon type="single" collapsible :elements="elementos">
        <template #trigger="{ element, index, open }">
          <span class="flex items-center gap-2">
            <span
              class="grid size-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground"
            >
              {{ index + 1 }}
            </span>
            {{ element.label }}
            <span v-if="open" class="text-xs text-muted-foreground">Abierto</span>
          </span>
        </template>

        <template #default="{ element }">
          <div class="rounded-md bg-muted p-4">
            {{ element.content }}
          </div>
        </template>
      </Accordeon>
    </section>
  </main>
</template>
