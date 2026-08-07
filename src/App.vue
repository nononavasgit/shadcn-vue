<script setup>
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Slider } from '@/components/ui'

const volume = ref([35])
const priceRange = ref([20, 80])
const temperature = ref([18])
const rating = ref([3])
const verticalValue = ref([65])
const customValue = ref([45])
const committedValue = ref([])

const sliderUI = {
  track: ({ values }) => ({
    class: values[0] >= 75 ? 'bg-green-100' : undefined,
  }),
  range: ({ values }) => ({
    class: values[0] >= 75 ? 'bg-green-500' : 'bg-violet-600',
  }),
  thumb: ({ first, last }) => ({
    class: [first && 'border-violet-600', last && 'ring-2 ring-violet-200'],
  }),
}
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto min-h-screen max-w-3xl space-y-10 p-6 md:p-10">
      <header class="space-y-2">
        <h1 class="text-3xl font-semibold">Slider examples</h1>
        <p class="text-muted-foreground">
          Valores únicos, rangos, orientación vertical y personalización mediante contexto.
        </p>
      </header>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Valor único</h2>

        <div class="space-y-3">
          <div class="flex justify-between text-sm">
            <span>Volumen</span>
            <span>{{ volume[0] }}%</span>
          </div>
          <Slider v-model="volume" />
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="value in [0, 25, 50, 75, 100]"
            :key="value"
            class="rounded-md border px-3 py-2 text-sm hover:bg-muted"
            @click="volume = [value]"
          >
            {{ value }}%
          </button>
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Rango de valores</h2>

        <div class="flex justify-between text-sm">
          <span>Precio mínimo: {{ priceRange[0] }} €</span>
          <span>Precio máximo: {{ priceRange[1] }} €</span>
        </div>
        <Slider v-model="priceRange" :min="0" :max="100" :min-steps-between-thumbs="10" />
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Steps y límites</h2>

        <div class="space-y-3">
          <div class="flex justify-between text-sm">
            <span>Temperatura</span>
            <span>{{ temperature[0] }} °C</span>
          </div>
          <Slider v-model="temperature" :min="10" :max="30" :step="0.5" />
        </div>

        <div class="space-y-3">
          <div class="flex justify-between text-sm">
            <span>Valoración</span>
            <span>{{ rating[0] }} / 5</span>
          </div>
          <Slider v-model="rating" :min="1" :max="5" :step="1" />
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Invertido y deshabilitado</h2>

        <div class="space-y-3">
          <p class="text-sm text-muted-foreground">Dirección visual invertida</p>
          <Slider :default-value="[30]" inverted />
        </div>

        <div class="space-y-3">
          <p class="text-sm text-muted-foreground">Slider deshabilitado</p>
          <Slider :model-value="[60]" disabled />
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Orientación vertical</h2>

        <div class="flex h-56 items-center gap-8 rounded-md border p-6">
          <Slider v-model="verticalValue" orientation="vertical" />
          <Slider :default-value="[25, 75]" orientation="vertical" />
          <p class="text-sm text-muted-foreground">Valor: {{ verticalValue[0] }}%</p>
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">UI dinámica y thumb personalizado</h2>

        <div class="space-y-8">
          <Slider v-model="customValue" :ui="sliderUI">
            <template #thumb="{ value }">
              <span
                class="absolute -top-8 rounded bg-foreground px-1.5 py-0.5 text-xs text-background"
              >
                {{ value }}
              </span>
            </template>
          </Slider>

          <p class="text-sm text-muted-foreground">
            El track cambia a verde al alcanzar el 75%. Valor actual: {{ customValue[0] }}%.
          </p>
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Value commit y formulario</h2>

        <form class="space-y-4" @submit.prevent>
          <Slider
            :default-value="[40]"
            name="brightness"
            required
            @value-commit="committedValue = $event"
          />
          <p class="text-sm text-muted-foreground">
            Último valor confirmado: {{ committedValue.length ? committedValue.join(', ') : '—' }}
          </p>
          <button class="rounded-md border px-3 py-2 text-sm hover:bg-muted" type="submit">
            Enviar formulario
          </button>
        </form>
      </section>
    </main>
  </ConfigProvider>
</template>
