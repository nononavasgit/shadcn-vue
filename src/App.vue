<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Stepper, type StepperStep } from '@/components/ui/Stepper'

const checkoutSteps: StepperStep[] = [
  {
    key: 'account',
    step: 1,
    label: 'Cuenta',
    description: 'Datos personales',
    icon: 'info',
    content: 'Completa tu nombre, correo y datos de contacto.',
  },
  {
    key: 'shipping',
    step: 2,
    label: 'Envio',
    description: 'Direccion de entrega',
    content: 'Selecciona una direccion y el metodo de envio.',
  },
  {
    key: 'payment',
    step: 3,
    label: 'Pago',
    description: 'Metodo de pago',
    icon: 'save',
    content: 'Introduce los datos de pago y revisa el pedido.',
  },
  {
    key: 'confirmation',
    step: 4,
    label: 'Confirmacion',
    description: 'Pedido completado',
    content: 'El pedido esta listo para ser confirmado.',
  },
]

const settingsSteps: StepperStep[] = [
  { key: 'profile', step: 1, label: 'Perfil', description: 'Informacion publica' },
  { key: 'security', step: 2, label: 'Seguridad', description: 'Acceso y sesiones' },
  {
    key: 'notifications',
    step: 3,
    label: 'Notificaciones',
    description: 'Correo y avisos push',
    disabled: true,
  },
]

const primitiveSteps: StepperStep[] = [
  {
    key: 'first',
    step: 1,
    label: 'Primer paso',
    content: 'Item y elementos internos renderizados con props explicitas.',
    as: 'li',
    trigger: { as: 'button' },
    indicator: { as: 'span' },
    titleProps: { as: 'h3' },
    descriptionProps: { as: 'p' },
    separator: { as: 'span' },
  },
  {
    key: 'second',
    step: 2,
    label: 'Segundo paso',
    description: 'Final del flujo',
    content: 'Segundo contenido.',
    as: 'li',
    trigger: { as: 'button', asChild: false },
    indicator: { as: 'span' },
    titleProps: { as: 'h3' },
  },
]

const activeCheckoutStep = ref(1)
const activeVerticalStep = ref(1)
const activeLinearStep = ref(1)
const activeCustomStep = ref(2)
const activePrimitiveStep = ref(1)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Stepper</h1>
      <p class="text-muted-foreground">
        Ejemplos horizontales y verticales con UI contextual, slots y props funcionales.
      </p>
    </header>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Uso basico</h2>
        <p class="text-sm text-muted-foreground">Paso activo: {{ activeCheckoutStep }}.</p>
      </div>

      <Stepper v-model="activeCheckoutStep" :steps="checkoutSteps" />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Navegacion desde el contenido</h2>
        <p class="text-sm text-muted-foreground">
          Los slots reciben metodos para avanzar, retroceder o seleccionar un paso.
        </p>
      </div>

      <Stepper
        v-model="activeCheckoutStep"
        :steps="checkoutSteps"
        :ui="{ content: { class: 'rounded-lg border bg-muted/30 p-4' } }"
      >
        <template #content="{ step, prevStep, nextStep, isFirstStep, isLastStep }">
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold">{{ step.label }}</h3>
              <p class="text-sm text-muted-foreground">{{ step.content }}</p>
            </div>
            <div class="flex gap-2">
              <Button
                label="Anterior"
                size="sm"
                variant="outline"
                :disabled="isFirstStep"
                @click="prevStep"
              />
              <Button label="Siguiente" size="sm" :disabled="isLastStep" @click="nextStep" />
            </div>
          </div>
        </template>
      </Stepper>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Orientacion vertical</h2>
        <p class="text-sm text-muted-foreground">Flujo lateral con un paso deshabilitado.</p>
      </div>

      <Stepper
        v-model="activeVerticalStep"
        orientation="vertical"
        :steps="settingsSteps"
        :ui="{
          root: { class: 'max-w-xl' },
          content: { class: 'ml-14 rounded-md bg-muted/40 p-4 text-sm' },
        }"
      >
        <template #content="{ step }">Configuracion de {{ step.label?.toLowerCase() }}.</template>
      </Stepper>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Flujo lineal</h2>
        <p class="text-sm text-muted-foreground">
          Solo permite avanzar siguiendo el orden de los pasos.
        </p>
      </div>

      <Stepper
        v-model="activeLinearStep"
        linear
        color="#7c3aed"
        :steps="checkoutSteps"
        :ui="{ root: { 'aria-label': 'Proceso de compra lineal' } }"
      >
        <template #content="{ step, nextStep, isLastStep }">
          <div class="flex items-center justify-between rounded-lg border p-4">
            <span class="text-sm">{{ step.content }}</span>
            <Button
              :label="isLastStep ? 'Completado' : 'Continuar'"
              size="sm"
              :disabled="isLastStep"
              @click="nextStep"
            />
          </div>
        </template>
      </Stepper>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">UI contextual</h2>
        <p class="text-sm text-muted-foreground">
          Cada zona conoce su estado, posicion e item asociado.
        </p>
      </div>

      <Stepper
        v-model="activeCustomStep"
        :steps="checkoutSteps"
        :ui="{
          root: { class: 'rounded-xl bg-muted/30 p-4' },
          item: ({ active }) => ({ class: active ? 'scale-[1.02]' : '' }),
          trigger: ({ active }) => ({ title: active ? 'Paso activo' : 'Seleccionar paso' }),
          indicator: ({ state }) => ({
            class: state === 'completed' ? 'ring-2 ring-success/40' : '',
          }),
          icon: ({ active }) => ({ class: active ? 'scale-110' : '' }),
          title: ({ active }) => ({ class: active ? 'text-primary' : '' }),
          description: ({ last }) => ({ class: last ? 'font-medium' : '' }),
          separator: ({ state }) => ({
            class: state === 'completed' ? 'opacity-100' : 'opacity-50',
          }),
          content: { class: 'rounded-lg bg-background p-4 shadow-sm' },
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slots globales e individuales</h2>
        <p class="text-sm text-muted-foreground">
          Los slots asociados al key del step tienen prioridad sobre los globales.
        </p>
      </div>

      <Stepper v-model="activeCustomStep" :steps="checkoutSteps">
        <template #indicator="{ step, state }">
          <span class="text-xs font-bold">{{ state === 'completed' ? 'OK' : step.step }}</span>
        </template>

        <template #title="{ step, active }">
          <span :class="active ? 'text-primary' : ''">{{ step.label }}</span>
        </template>

        <template #indicator-payment>
          <span class="text-xs font-bold">EUR</span>
        </template>

        <template #content-confirmation="{ step }">
          <div class="rounded-lg border border-success/40 bg-success/5 p-4 text-sm">
            Slot individual: {{ step.content }}
          </div>
        </template>
      </Stepper>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Props funcionales normalizadas</h2>
        <p class="text-sm text-muted-foreground">
          El item extiende StepperItemProps y los nodos internos filtran as y asChild.
        </p>
      </div>

      <Stepper
        v-model="activePrimitiveStep"
        as="ol"
        :steps="primitiveSteps"
        :ui="{
          root: { class: 'list-none' },
          content: { class: 'rounded-md border p-4 text-sm' },
        }"
      />
    </section>
  </main>
</template>
