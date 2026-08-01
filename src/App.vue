<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem, type RadioGroupOption } from '@/components/ui/RadioGroup'
import { Slider } from '@/components/ui/Slider'

const planItems: RadioGroupOption[] = [
  { value: 'free', label: 'Gratuito', description: 'Para probar las funciones basicas.' },
  { value: 'pro', label: 'Profesional', description: 'Para proyectos y equipos pequenos.' },
  { value: 'enterprise', label: 'Empresa', description: 'Soporte y controles avanzados.' },
]
const deliveryItems: RadioGroupOption[] = [
  { value: 'standard', label: 'Estandar', description: 'Entrega en 3-5 dias.' },
  { value: 'express', label: 'Express', description: 'Entrega el siguiente dia.' },
  {
    value: 'pickup',
    label: 'Recogida',
    description: 'No disponible temporalmente.',
    disabled: true,
  },
]
const primitiveItems: RadioGroupOption[] = [
  { value: 1, label: 'Baja', disabled: true },
  { value: 2, label: 'Media' },
  { value: 3, label: 'Alta' },
]
const selectedPlan = ref('pro')
const selectedDelivery = ref('standard')
const selectedPriority = ref<number>(1)
const customValue = ref('email')
const sliderValue = ref([65])
const rangeValue = ref([25, 75])
const verticalValue = ref([40])
const steppedValue = ref([30])
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">RadioGroup</h1>
      <p class="text-muted-foreground">
        Ejemplos con orientacion, estados, UI contextual, slots y primitives personalizados.
      </p>
    </header>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Uso basico</h2>
        <p class="text-sm text-muted-foreground">Plan seleccionado: {{ selectedPlan }}.</p>
      </div>
      <RadioGroup v-model="selectedPlan" :items="planItems" class="max-w-xl" />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Horizontal y agrupado</h2>
        <p class="text-sm text-muted-foreground">Los radios se muestran a la derecha.</p>
      </div>
      <RadioGroup
        v-model="selectedDelivery"
        orientation="horizontal"
        grouped
        radio-position="right"
        :items="deliveryItems"
        :ui="{
          root: { class: 'max-w-3xl rounded-lg border p-2' },
          item: { class: 'min-w-44 justify-between rounded-md p-3 hover:bg-muted/50' },
        }"
      />
    </section>
    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">UI contextual</h2>
        <p class="text-sm text-muted-foreground">
          Cada zona conoce el item, su posicion y si esta seleccionado.
        </p>
      </div>
      <RadioGroup
        v-model="selectedPlan"
        :items="planItems"
        :ui="{
          root: { class: 'max-w-xl rounded-xl bg-muted/20 p-2' },
          item: ({ selected }) => ({
            class: selected ? 'rounded-lg bg-background p-3 shadow-sm' : 'rounded-lg p-3',
            title: selected ? 'Opcion seleccionada' : 'Seleccionar opcion',
          }),
          radio: ({ selected }) => ({ class: selected ? 'ring-2 ring-primary/20' : '' }),
          label: ({ selected }) => ({ class: selected ? 'text-primary' : '' }),
          description: ({ index }) => ({ class: index === 0 ? 'italic' : '' }),
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slots globales e individuales</h2>
        <p class="text-sm text-muted-foreground">
          Los slots asociados al id o valor tienen prioridad sobre los globales.
        </p>
      </div>
      <RadioGroup v-model="selectedDelivery" :items="deliveryItems" class="max-w-xl">
        <template #leading="{ index }">
          <span class="grid size-7 place-items-center rounded-full bg-muted text-xs">
            {{ index + 1 }}
          </span>
        </template>
        <template #trailing="{ selected }">
          <span class="ml-auto text-xs text-muted-foreground">
            {{ selected ? 'Elegido' : 'Elegir' }}
          </span>
        </template>
        <template #trailing-express>
          <span class="ml-auto rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
            Rapido
          </span>
        </template>
      </RadioGroup>
    </section>
    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Props funcionales normalizadas</h2>
        <p class="text-sm text-muted-foreground">
          Cada item extiende las props del primitive y solo reenvia las admitidas.
        </p>
      </div>
      {{ selectedPriority }}
      <RadioGroup
        v-model="selectedPriority"
        as="section"
        name="priority"
        :items="primitiveItems"
        :ui="{
          root: { class: 'max-w-xl' },
          item: { class: 'rounded-md border p-3' },
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Composicion manual</h2>
        <p class="text-sm text-muted-foreground">Valor seleccionado: {{ customValue }}.</p>
      </div>
      <RadioGroup v-model="customValue" class="flex max-w-xl gap-5">
        <label class="flex items-center gap-2 text-sm">
          <RadioGroupItem value="email" /> Correo
        </label>
        <label class="flex items-center gap-2 text-sm"> <RadioGroupItem value="sms" /> SMS </label>
      </RadioGroup>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slider basico</h2>
        <p class="text-sm text-muted-foreground">Valor actual: {{ sliderValue[0] }}.</p>
      </div>
      <Slider v-model="sliderValue" class="max-w-xl" />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slider de rango</h2>
        <p class="text-sm text-muted-foreground">
          Rango seleccionado: {{ rangeValue[0] }} - {{ rangeValue[1] }}.
        </p>
      </div>
      <Slider
        v-model="rangeValue"
        :min="0"
        :max="100"
        :step="5"
        class="max-w-xl"
        :ui="{
          thumb: ({ index }) => ({
            class: index === 0 ? 'border-success' : 'border-warning',
          }),
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Orientacion vertical y UI contextual</h2>
        <p class="text-sm text-muted-foreground">Valor vertical: {{ verticalValue[0] }}.</p>
      </div>
      <Slider
        v-model="verticalValue"
        orientation="vertical"
        :ui="{
          root: { class: 'h-48' },
          track: { class: 'bg-muted' },
          range: { class: 'bg-success' },
          thumb: { class: 'border-success focus-visible:ring-success' },
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Props funcionales y slot del thumb</h2>
        <p class="text-sm text-muted-foreground">Paso actual: {{ steppedValue[0] }}.</p>
      </div>
      <Slider v-model="steppedValue" :min="0" :max="60" :step="10" class="max-w-xl">
        <template #thumb="{ value }">
          <span
            class="grid size-5 place-items-center rounded-full bg-primary text-[8px] text-white"
          >
            {{ value }}
          </span>
        </template>
      </Slider>
    </section>
  </main>
</template>
