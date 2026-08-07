<script setup>
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Stepper } from '@/components/ui'

const activeStep = ref(1)
const verticalStep = ref(2)

const stepperSteps = [
  {
    step: 1,
    label: 'Cuenta',
    description: 'Datos personales',
    icon: 'user',
    content: 'Completa los datos básicos de tu cuenta.',
  },
  {
    step: 2,
    label: 'Preferencias',
    description: 'Configura tu experiencia',
    icon: 'search',
    content: 'Elige las preferencias que quieres utilizar.',
  },
  {
    step: 3,
    label: 'Confirmación',
    description: 'Revisa los datos',
    icon: 'check',
    content: 'Comprueba que todo es correcto antes de continuar.',
  },
]

const verticalSteps = [
  { step: 1, label: 'Pedido recibido', description: 'Hemos recibido tu pedido.' },
  { step: 2, label: 'Preparando', description: 'Estamos preparando tu envío.' },
  { step: 3, label: 'En camino', description: 'El paquete está en camino.' },
  { step: 4, label: 'Entregado', description: 'El pedido llegará próximamente.', disabled: true },
]

const stepperUI = {
  indicator: ({ active }) => ({}),
  label: ({ state }) => ({
    class: state === 'completed' ? 'text-primary' : undefined,
  }),
}
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto min-h-screen max-w-3xl space-y-10 p-6 md:p-10">
      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Stepper</h2>
        <p class="text-sm text-muted-foreground">
          Navegación controlada, contextos por paso y orientación vertical.
        </p>

        <Stepper
          v-model="activeStep"
          :steps="stepperSteps"
          color="#7c3aed"
          :linear="true"
          :ui="stepperUI"
        >
          <template #content="{ item, nextStep, prevStep, isFirstStep, isLastStep }">
            <div class="space-y-4 rounded-md border p-4">
              <p class="text-sm">{{ item.content }}</p>
              <div class="flex justify-between gap-2">
                <button
                  class="rounded-md border px-3 py-2 text-sm hover:bg-muted disabled:opacity-50"
                  :disabled="isFirstStep"
                  @click="prevStep"
                >
                  Anterior
                </button>
                <button
                  class="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50"
                  :disabled="isLastStep"
                  @click="nextStep"
                >
                  {{ isLastStep ? 'Finalizado' : 'Siguiente' }}
                </button>
              </div>
            </div>
          </template>
        </Stepper>

        <p class="text-sm text-muted-foreground">Paso activo: {{ activeStep }}</p>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="step in stepperSteps"
            :key="step.step"
            class="rounded-md border px-3 py-2 text-sm hover:bg-muted"
            @click="activeStep = step.step"
          >
            Ir al paso {{ step.step }}
          </button>
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-semibold">Stepper vertical</h2>

        <Stepper
          v-model="verticalStep"
          :steps="verticalSteps"
          orientation="vertical"
          :linear="false"
        >
          <template #content="{ item, goToStep }">
            <div class="rounded-md border p-4 text-sm">
              <p>{{ item.description }}</p>
              <button
                v-if="item.step < verticalSteps.length"
                class="mt-3 rounded-md border px-3 py-2 hover:bg-muted"
                @click="goToStep(item.step + 1)"
              >
                Avanzar al siguiente paso
              </button>
            </div>
          </template>
        </Stepper>
      </section>
    </main>
  </ConfigProvider>
</template>
