<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { NumberField } from '@/components/ui/NumberField'

const quantity = ref(1)
const temperature = ref(20)
const price = ref(25)
const customValue = ref(5)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-4xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">NumberField</h1>
      <p class="text-muted-foreground">
        Ejemplos con valores, límites, botones normalizados, slots y personalización mediante ui.
      </p>
    </header>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Uso básico</h2>
        <p class="text-sm text-muted-foreground">Cantidad seleccionada: {{ quantity }}.</p>
      </div>

      <div class="max-w-xs">
        <NumberField
          v-model="quantity"
          :min="0"
          :max="10"
          placeholder="Cantidad"
          aria-label="Cantidad"
        />
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Límites y pasos</h2>
        <p class="text-sm text-muted-foreground">
          Temperatura: {{ temperature }} °C · Precio: {{ price }} €.
        </p>
      </div>

      <div class="grid gap-5 md:grid-cols-2">
        <label class="space-y-2">
          <span class="text-sm font-medium">Temperatura</span>
          <NumberField
            v-model="temperature"
            :min="-10"
            :max="40"
            :step="1"
            aria-label="Temperatura"
          />
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium">Precio</span>
          <NumberField v-model="price" :min="0" :max="100" :step="5" aria-label="Precio" />
        </label>
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Props de botones</h2>
        <p class="text-sm text-muted-foreground">
          Increment y decrement aceptan exclusivamente as, asChild y disabled.
        </p>
      </div>

      <div class="grid gap-5 md:grid-cols-2">
        <label class="space-y-2">
          <span class="text-sm font-medium">Decremento deshabilitado</span>
          <NumberField
            :default-value="5"
            :decrement="{ disabled: true }"
            aria-label="Decremento deshabilitado"
          />
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium">Incremento deshabilitado</span>
          <NumberField
            :default-value="5"
            :increment="{ disabled: true }"
            aria-label="Incremento deshabilitado"
          />
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium">Solo incremento</span>
          <NumberField :default-value="1" :show-decrement="false" aria-label="Solo incremento" />
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium">Solo decremento</span>
          <NumberField :default-value="10" :show-increment="false" aria-label="Solo decremento" />
        </label>
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Personalización con ui</h2>
        <p class="text-sm text-muted-foreground">
          Todas las zonas de NumberFieldUI contienen únicamente HTMLAttributes.
        </p>
      </div>

      <div class="max-w-sm">
        <NumberField
          v-model="customValue"
          :min="0"
          :max="20"
          :ui="{
            root: { class: 'rounded-xl bg-primary/5 p-3' },
            content: { class: 'rounded-lg ring-2 ring-primary/20' },
            decrement: {
              class: 'left-1 rounded-md text-primary hover:bg-primary/10',
              title: 'Restar una unidad',
            },
            input: {
              class: 'h-11 border-primary/30 bg-background font-semibold text-primary',
            },
            increment: {
              class: 'right-1 rounded-md text-primary hover:bg-primary/10',
              title: 'Sumar una unidad',
            },
          }"
          aria-label="NumberField personalizado"
        />
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slots personalizados</h2>
        <p class="text-sm text-muted-foreground">
          Los botones mantienen sus props funcionales y permiten cambiar su contenido.
        </p>
      </div>

      <div class="max-w-xs">
        <NumberField :default-value="3" :min="0" :max="10" aria-label="Controles personalizados">
          <template #decrement>
            <Icon name="chevronLeft" />
          </template>

          <template #increment>
            <Icon name="chevronRight" />
          </template>
        </NumberField>
      </div>
    </section>
  </main>
</template>
