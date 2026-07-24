<script setup lang="ts">
import { ref } from 'vue'
import { Boton } from '@/components/app/Button'
import { Stepper, type StepperEntry } from '@/components/app/Stepper'

const basicStep = ref(1)
const controlledStep = ref(1)
const verticalStep = ref(1)

const basicSteps: StepperEntry[] = [
  {
    key: 'account',
    step: 1,
    title: 'Cuenta',
    description: 'Datos personales',
    icon: 'info',
    content: 'Introduce tu nombre, correo electrónico y datos de contacto.',
  },
  {
    key: 'shipping',
    step: 2,
    title: 'Envío',
    description: 'Dirección de entrega',
    icon: 'chevronRight',
    content: 'Selecciona la dirección y el método de envío del pedido.',
  },
  {
    key: 'confirmation',
    step: 3,
    title: 'Confirmación',
    description: 'Revisa los datos',
    icon: 'save',
    content: 'Comprueba toda la información antes de confirmar el pedido.',
  },
]

const slotSteps: StepperEntry[] = [
  {
    key: 'profile',
    step: 1,
    title: 'Perfil',
    description: 'Información pública',
  },
  {
    key: 'security',
    step: 2,
    title: 'Seguridad',
    description: 'Contraseña y acceso',
  },
  {
    key: 'finish',
    step: 3,
    title: 'Finalizar',
    description: 'Guardar cambios',
  },
]

const verticalSteps: StepperEntry[] = [
  {
    key: 'created',
    step: 1,
    title: 'Pedido creado',
    description: 'Hemos recibido correctamente el pedido.',
    content: 'El pedido se ha registrado y está pendiente de preparación.',
  },
  {
    key: 'prepared',
    step: 2,
    title: 'En preparación',
    description: 'El almacén está preparando los productos.',
    content: 'Los artículos se están empaquetando para su envío.',
  },
  {
    key: 'sent',
    step: 3,
    title: 'Enviado',
    description: 'El paquete está en camino.',
    content: 'Pronto recibirás la información de seguimiento.',
  },
]

const stateSteps: StepperEntry[] = [
  {
    step: 1,
    title: 'Completado',
    description: 'Paso marcado manualmente',
    completed: true,
  },
  {
    step: 2,
    title: 'Deshabilitado',
    description: 'No admite interacción',
    disabled: true,
  },
  {
    step: 3,
    title: 'Disponible',
    description: 'Navegación no lineal',
  },
]
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-5xl space-y-12">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Stepper</h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Procesos divididos en pasos con navegación, contenido, iconos y slots personalizables.
        </p>
      </header>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Básico</h2>
          <p class="text-sm text-muted-foreground">
            El array steppers proporciona cabecera, icono y contenido de cada paso.
          </p>
        </div>

        <Stepper v-model="basicStep" :steppers="basicSteps" />
        <p class="text-sm text-muted-foreground">Paso activo: {{ basicStep }}</p>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Contenido y navegación</h2>
          <p class="text-sm text-muted-foreground">
            El slot por defecto recibe el paso activo y todos los controles de navegación de Reka.
          </p>
        </div>

        <Stepper v-model="controlledStep" :steppers="slotSteps" linear>
          <template
            #default="{ stepper, isPrevDisabled, isNextDisabled, isLastStep, prevStep, nextStep }"
          >
            <div class="rounded-lg border bg-card p-5 text-card-foreground">
              <h3 class="font-semibold">Contenido de {{ stepper.title }}</h3>
              <p class="mt-1 text-sm text-muted-foreground">
                Este panel pertenece al paso {{ stepper.step }}.
              </p>

              <div class="mt-5 flex items-center justify-between gap-3">
                <Boton
                  label="Anterior"
                  variant="outlined"
                  :disabled="isPrevDisabled"
                  @click="prevStep"
                />
                <Boton
                  :label="isLastStep ? 'Finalizar' : 'Siguiente'"
                  :disabled="isNextDisabled"
                  @click="nextStep"
                />
              </div>
            </div>
          </template>
        </Stepper>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Slots globales y específicos</h2>
          <p class="text-sm text-muted-foreground">
            Los slots globales afectan a todos los pasos y los slots con key solo a uno.
          </p>
        </div>

        <Stepper :steppers="slotSteps" :linear="false">
          <template #title="{ stepper, state }">
            <span :class="state === 'active' && 'text-primary'">
              {{ stepper.title }}
            </span>
          </template>

          <template #icon-security>
            <span class="text-lg">🔒</span>
          </template>

          <template #description-finish> Todo listo para guardar </template>

          <template #content-profile>
            <div class="rounded-md border p-4 text-sm">Formulario de información del perfil.</div>
          </template>

          <template #content-security="{ goToStep }">
            <div class="space-y-3 rounded-md border p-4 text-sm">
              <p>Configuración de contraseña y autenticación.</p>
              <Boton label="Ir a finalizar" size="sm" @click="goToStep(3)" />
            </div>
          </template>

          <template #content-finish>
            <div class="rounded-md border p-4 text-sm">Resumen final de la configuración.</div>
          </template>
        </Stepper>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Vertical</h2>
          <p class="text-sm text-muted-foreground">
            Orientation también adapta la disposición de elementos y separadores.
          </p>
        </div>

        <Stepper
          v-model="verticalStep"
          :steppers="verticalSteps"
          orientation="vertical"
          :linear="false"
          :ui="{
            list: { class: 'max-w-xl' },
            content: { class: 'max-w-xl rounded-lg bg-muted/40 p-4 text-sm' },
          }"
        />
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Estados</h2>
          <p class="text-sm text-muted-foreground">
            Cada elemento puede declararse como completed o disabled.
          </p>
        </div>

        <Stepper :steppers="stateSteps" :linear="false" />
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Custom UI</h2>
          <p class="text-sm text-muted-foreground">
            Cada nodo admite un objeto o una función que recibe el contexto del paso.
          </p>
        </div>

        <Stepper
          :steppers="[
            {
              step: 1,
              title: 'Diseño',
              description: 'Estilos personalizados',
              content: 'Primer paso personalizado.',
            },
            {
              step: 2,
              title: 'Desarrollo',
              description: 'Implementación',
              content: 'Segundo paso personalizado.',
            },
            {
              step: 3,
              title: 'Entrega',
              description: 'Publicación',
              content: 'Último paso personalizado.',
            },
          ]"
          :ui="{
            indicator: ({ stepper }) => {
              return {
                'aria-label': stepper?.step + ' se puedeee',
              }
            },
            title: { class: 'text-sm' },
            description: { class: 'text-xs' },
            separator: { class: 'top-6' },
            content: { class: 'rounded-xl border border-dashed p-5' },
          }"
        />
      </section>
    </div>
  </main>
</template>
