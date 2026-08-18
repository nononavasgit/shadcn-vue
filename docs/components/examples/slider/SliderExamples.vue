<script setup lang="ts">
import { ref } from 'vue'

import { Slider, type SliderProps } from '@/components/ui/Slider'

const singleValue = ref<number[] | null>([35])
const rangeValue = ref<number[] | null>([25, 75])

const styledSliderUi: SliderProps['ui'] = {
  track: () => ({ class: 'bg-muted' }),
  range: () => ({ class: 'bg-success' }),
  thumb: ({ first }) => ({ class: first ? 'border-success' : 'border-primary' }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de usar Slider con valores simples y rangos.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Valor único</h3>
          <p class="text-sm text-muted-foreground">Controla un solo valor con v-model:value.</p>
        </div>
        <Slider v-model:value="singleValue" :max="100" :step="5" />
        <output class="text-sm text-muted-foreground tabular-nums">
          {{ singleValue?.[0] }}
        </output>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Rango</h3>
          <p class="text-sm text-muted-foreground">
            Usa dos valores para seleccionar un intervalo.
          </p>
        </div>
        <Slider v-model:value="rangeValue" :min="0" :max="100" :step="1" />
        <output class="text-sm text-muted-foreground tabular-nums">
          {{ rangeValue?.join(' – ') }}
        </output>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Orientación vertical</h3>
          <p class="text-sm text-muted-foreground">Cambia orientation a vertical.</p>
        </div>
        <div class="flex h-32 justify-center">
          <Slider orientation="vertical" :value="[60]" class="h-full" />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Personalización con ui</h3>
          <p class="text-sm text-muted-foreground">Personaliza track, range y thumb.</p>
        </div>
        <Slider :value="[65]" :ui="styledSliderUi" />
      </div>
    </div>
  </section>
</template>
