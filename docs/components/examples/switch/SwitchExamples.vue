<script setup lang="ts">
import { ref } from 'vue'

import { Switch, type SwitchProps } from '@/components/ui/Switch'

const basicValue = ref(1)
const customValue = ref<'on' | 'off'>('off')
const numericValue = ref(0)
const slotValue = ref(false)
const styledValue = ref(true)
const styledSwitchUi: SwitchProps['ui'] = {
  thumb: ({ checked }) => {
    return {
      style: {
        background: checked ? 'red' : undefined,
      },
    }
  },
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de usar el switch con valores, estados y contenido personalizados.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Valor booleano</h3>
          <p class="text-sm text-muted-foreground">El uso más sencillo con true y false.</p>
        </div>

        <div class="flex items-center gap-3">
          <Switch v-model:value="basicValue" aria-label="Activar opción básica" />
          <span class="text-sm">{{ basicValue ? 'Activado' : 'Desactivado' }}</span>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Valores personalizados</h3>
          <p class="text-sm text-muted-foreground">Usa strings con trueValue y falseValue.</p>
        </div>
        <div class="flex items-center gap-3">
          <Switch
            v-model:value="customValue"
            true-value="on"
            false-value="off"
            aria-label="Activar opción personalizada"
          />
          <span class="font-mono text-sm">value: {{ customValue }}</span>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Valores numéricos</h3>
          <p class="text-sm text-muted-foreground">También puede trabajar con 1 y 0.</p>
        </div>
        <div class="flex items-center gap-3">
          <Switch
            v-model:value="numericValue"
            :true-value="1"
            :false-value="0"
            aria-label="Activar opción numérica"
          />
          <span class="font-mono text-sm">value: {{ numericValue }}</span>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Deshabilitado</h3>
          <p class="text-sm text-muted-foreground">Conserva su estado, pero no permite cambios.</p>
        </div>
        <div class="flex items-center gap-3">
          <Switch :value="true" disabled aria-label="Opción deshabilitada" />
          <span class="text-sm text-muted-foreground">Siempre activado</span>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Thumb personalizado</h3>
          <p class="text-sm text-muted-foreground">Personaliza sus atributos mediante ui.</p>
        </div>
        <div class="flex items-center gap-3">
          <Switch v-model:value="styledValue" :ui="styledSwitchUi" aria-label="Switch estilizado" />
          <span class="text-sm">Con estilo personalizado</span>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slot thumb</h3>
          <p class="text-sm text-muted-foreground">Muestra el estado dentro del thumb.</p>
        </div>
        <div class="flex items-center gap-3">
          <Switch v-model:value="slotValue" aria-label="Switch con slot personalizado">
            <template #thumb="{ checked }">
              <span class="text-[0.5rem] leading-none font-bold" aria-hidden="true">
                {{ checked ? 'ON' : 'OFF' }}
              </span>
            </template>
          </Switch>
          <span class="text-sm">Contenido mediante slot</span>
        </div>
      </div>
    </div>
  </section>
</template>
