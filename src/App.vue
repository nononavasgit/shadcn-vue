<script setup lang="ts">
import { ref } from 'vue'
import { NumberField } from '@/components/ui/NumberField'
import { Avatar } from '@/components/ui/Avatar'

const quantity = ref<number | null>(2)
const price = ref<number | null>(19.99)
const rating = ref<number | null>(4)
const readonlyValue = ref<number | null>(42)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-2xl space-y-8 p-6 md:p-10">
    <section class="space-y-4">
      <h1 class="text-2xl font-semibold">NumberField</h1>
      <p class="text-sm text-muted-foreground">
        Ejemplos de campos numericos con controles, limites y formato.
      </p>

      <div class="space-y-2">
        <label for="quantity" class="text-sm font-medium">Cantidad</label>
        <NumberField id="quantity" v-model="quantity" :min="0" :max="10" />
        <p class="text-sm text-muted-foreground">Valor actual: {{ quantity ?? 0 }}</p>
      </div>

      <div class="space-y-2">
        <label for="price" class="text-sm font-medium">Precio</label>
        <NumberField
          id="price"
          v-model="price"
          locale="es-ES"
          :min="0"
          :step="0.5"
          :format-options="{ style: 'currency', currency: 'EUR' }"
        />
        <p class="text-sm text-muted-foreground">Precio: {{ price ?? 0 }} EUR</p>
      </div>

      <div class="space-y-2">
        <label for="rating" class="text-sm font-medium">Valoracion (sin incremento)</label>
        <NumberField
          id="rating"
          v-model="rating"
          :min="0"
          :max="5"
          :step="0.5"
          :show-increment="false"
        />
      </div>

      <div class="space-y-2">
        <label for="readonly-number" class="text-sm font-medium">Solo lectura</label>
        <NumberField id="readonly-number" v-model="readonlyValue" readonly />
      </div>

      <div class="space-y-2">
        <label for="disabled-number" class="text-sm font-medium">Deshabilitado</label>
        <NumberField id="disabled-number" :default-value="8" disabled />
      </div>

      <div class="space-y-2">
        <label for="custom-number" class="text-sm font-medium">Controles personalizados</label>
        <NumberField
          id="custom-number"
          :default-value="3"
          placeholder="Ingrese un numero"
          :min="0"
          :max="10"
        >
          <template #decrement>Menos</template>
          <template #increment>Mas</template>
        </NumberField>
      </div>
    </section>
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Avatar</h2>

      <div class="flex flex-wrap items-center gap-4">
        <Avatar src="https://i.pravatar.cc/96?img=12" alt="Perfil de Ana" class="size-10" />
        <Avatar label="JD" class="size-10" />
        <Avatar label="ML" class="size-12" />
        <Avatar src="https://invalid.example/avatar.jpg" alt="Imagen no disponible" label="??" />
        <Avatar :icon="{ name: 'check', color: 'blue' }" alt="Imagen no disponible" label="??" />
      </div>

      <div class="flex items-center gap-3 rounded-md border p-4">
        <Avatar label="NV" class="size-14" />
        <div>
          <p class="font-medium">Nombre de usuario</p>
          <p class="text-sm text-muted-foreground">Fallback con iniciales</p>
        </div>
      </div>
    </section>
  </main>
</template>
