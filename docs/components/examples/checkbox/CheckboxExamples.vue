<script setup lang="ts">
import { ref } from 'vue'

import { Checkbox } from '@/components/ui/Checkbox'

const booleanValue = ref(false)
const customValue = ref<'yes' | 'no'>('no')
const indeterminateValue = ref<boolean | 'indeterminate'>('indeterminate')
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de usar Checkbox con valores personalizados y estado indeterminado.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Valor booleano</h3>
          <p class="text-sm text-muted-foreground">El uso más sencillo con true y false.</p>
        </div>
        <label class="flex items-center gap-3 text-sm">
          <Checkbox v-model:value="booleanValue" aria-label="Aceptar términos" />
          <span>{{ booleanValue ? 'Aceptado' : 'Pendiente' }}</span>
        </label>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Valores personalizados</h3>
          <p class="text-sm text-muted-foreground">Configura trueValue y falseValue.</p>
        </div>
        <label class="flex items-center gap-3 text-sm">
          <Checkbox
            v-model:value="customValue"
            true-value="yes"
            false-value="no"
            aria-label="Activar opción personalizada"
          />
          <span class="font-mono">value: {{ customValue }}</span>
        </label>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Estado indeterminado</h3>
          <p class="text-sm text-muted-foreground">Representa un estado intermedio.</p>
        </div>
        <label class="flex items-center gap-3 text-sm">
          <Checkbox v-model:value="indeterminateValue" aria-label="Estado indeterminado">
            <template #indicator="{ state }">
              <span v-if="state === 'indeterminate'" class="text-xs" aria-hidden="true">−</span>
            </template>
          </Checkbox>
          <span class="font-mono">value: {{ indeterminateValue }}</span>
        </label>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Deshabilitado</h3>
          <p class="text-sm text-muted-foreground">Conserva su estado sin permitir cambios.</p>
        </div>
        <label class="flex items-center gap-3 text-sm">
          <Checkbox :value="true" disabled aria-label="Opción deshabilitada" />
          <span>Siempre activado</span>
        </label>
      </div>
    </div>
  </section>
</template>
