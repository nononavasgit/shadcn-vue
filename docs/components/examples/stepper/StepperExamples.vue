<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Stepper, type StepperProps, type StepperStep } from '@/components/ui/Stepper'
import Example from '../../Example.vue'

const checkoutSteps: StepperStep[] = [
  {
    slot: 'account',
    step: 1,
    label: 'Cuenta',
    description: 'Datos personales',
    icon: { name: 'user' },
    content: 'Completa tu nombre, correo y datos de contacto.',
  },
  {
    slot: 'shipping',
    step: 2,
    label: 'Envío',
    description: 'Dirección de entrega',
    content: 'Selecciona una dirección y el método de envío.',
  },
  {
    slot: 'payment',
    step: 3,
    label: 'Pago',
    description: 'Método de pago',
    icon: { name: 'save' },
    content: 'Introduce los datos de pago y revisa el pedido.',
  },
  {
    slot: 'confirmation',
    step: 4,
    label: 'Confirmación',
    description: 'Pedido completado',
    content: 'El pedido está listo para ser confirmado.',
  },
]

const settingsSteps: StepperStep[] = [
  {
    slot: 'profile',
    step: 1,
    label: 'Perfil',
    description: 'Información pública',
  },
  {
    slot: 'security',
    step: 2,
    label: 'Seguridad',
    description: 'Acceso y sesiones',
  },
  {
    slot: 'notifications',
    step: 3,
    label: 'Notificaciones',
    description: 'Correo y avisos push',
    disabled: true,
  },
]

const activeCheckoutStep = ref(1)
const activeSettingsStep = ref(1)
const activeCustomStep = ref(2)
const activeLinearStep = ref(1)
const activeColorStep = ref(1)
const emittedValue = ref<number | undefined>()

const customStepperUi: StepperProps['ui'] = {
  root: () => ({ class: 'rounded-xl bg-muted/30 p-4' }),
  item: ({ active }) => ({ class: active ? 'scale-[1.02]' : undefined }),
  indicator: ({ completed }) => ({
    class: completed ? 'ring-2 ring-success/40' : undefined,
  }),
  label: ({ active }) => ({ class: active ? 'text-primary' : undefined }),
  content: () => ({ class: 'rounded-lg bg-background p-4 shadow-sm' }),
}

const activeSettingsLabel = computed(
  () => settingsSteps.find((step) => step.step === activeSettingsStep.value)?.label,
)

const checkoutCode = `<Stepper
  v-model:value="activeStep"
  orientation="vertical"
  :steps="steps"
>
  <template #content="{ item, prevStep, nextStep, isFirstStep, isLastStep }">
    <div>
      <p>{{ item.label }}</p>
      <p>{{ item.content }}</p>
      <Button :disabled="isFirstStep" @click="prevStep">Anterior</Button>
      <Button :disabled="isLastStep" @click="nextStep">Siguiente</Button>
    </div>
  </template>
</Stepper>`

const verticalCode = `<Stepper
  v-model:value="activeStep"
  orientation="vertical"
  :steps="steps"
>
  <template #content="{ item }">
    Configuración de {{ item.label }}.
  </template>
</Stepper>`

const linearCode = `<Stepper v-model:value="activeStep" :steps="steps" :linear="false" />`

const colorCode = `<Stepper
  v-model:value="activeStep"
  :steps="steps"
  color="#7c3aed"
/>`

const uiCode = `<Stepper :steps="steps" :ui="{
  indicator: ({ completed }) => ({
    class: completed ? 'ring-2 ring-success/40' : undefined,
  }),
}">
  <template #indicator="{ completed, item }">
    {{ completed ? 'OK' : item.step }}
  </template>
</Stepper>`

const defaultSlotCode = `<Stepper :steps="steps">
  <template #default="{ item }">
    Contenido de {{ item.content }}
  </template>
</Stepper>`

const generalSlotsCode = `<Stepper :steps="steps">
  <template #indicator="{ item }">P{{ item.step }}</template>
  <template #label="{ item }">Etiqueta: {{ item.label }}</template>
  <template #description="{ item }">{{ item.description }}</template>
</Stepper>`

const contentSlotCode = `<Stepper :steps="steps">
  <template #content="{ item }">
    Contenido: {{ item.content }}
  </template>
</Stepper>`

const individualWrapperCode = `<Stepper :steps="steps">
  <template #indicator-account>A</template>
</Stepper>`

const individualContentCode = `<Stepper :steps="steps">
  <template #label-account>Cuenta personalizada</template>
  <template #description-account>Descripción personalizada</template>
  <template #content-account="{ item }">
    Contenido de {{ item.slot }}
  </template>
</Stepper>`

const contextCode = `<Stepper :steps="steps">
  <template #content="{ value, totalSteps, item, index, completed, active }">
    {{ value }} / {{ totalSteps }} · {{ item.label }} · {{ index }}
    · completed={{ completed }} · active={{ active }}
  </template>
</Stepper>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos de Stepper</h2>
      <p class="text-sm text-muted-foreground">
        Flujos horizontales y verticales con contenido, navegación y slots contextuales.
      </p>
    </div>

    <Example
      title="Flujo de compra"
      description="Los pasos pueden mostrar iconos, descripciones y contenido asociado."
      :code="checkoutCode"
    >
      <Stepper
        v-model:value="activeCheckoutStep"
        :steps="checkoutSteps"
        @update:value="emittedValue = $event"
      >
        <template #content="{ item, prevStep, nextStep, isFirstStep, isLastStep }">
          <div class="grid gap-4 rounded-lg border bg-muted/20 p-4">
            <div>
              <p class="font-medium">{{ item.label }}</p>
              <p class="text-sm text-muted-foreground">{{ item.content }}</p>
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

      <output class="text-sm text-muted-foreground"> Paso activo: {{ activeCheckoutStep }} </output>
      <output class="text-sm text-muted-foreground">
        Último emit update:value: {{ emittedValue ?? 'sin cambios' }}
      </output>
    </Example>

    <Example
      title="Orientación vertical"
      description="Los pasos deshabilitados conservan su estado y no se pueden seleccionar."
      :code="verticalCode"
    >
      <Stepper
        v-model:value="activeSettingsStep"
        orientation="vertical"
        :steps="settingsSteps"
      >
        <template #content="{ item }">Configuración de {{ item.label?.toLowerCase() }}.</template>
      </Stepper>

      <output class="text-sm text-muted-foreground">
        Paso activo: {{ activeSettingsLabel ?? 'ninguno' }}
      </output>
    </Example>

    <Example
      title="Prop linear"
      description="Con linear=false se puede navegar libremente entre los pasos disponibles."
      :code="linearCode"
    >
      <Stepper
        v-model:value="activeLinearStep"
        :steps="checkoutSteps"
        :linear="false"
        class="rounded-lg border p-3"
      />

      <output class="text-sm text-muted-foreground">Paso activo: {{ activeLinearStep }}</output>
    </Example>

    <Example
      title="Prop color"
      description="color personaliza el indicador activo, los pasos completados y el foco."
      :code="colorCode"
    >
      <Stepper
        v-model:value="activeColorStep"
        :steps="checkoutSteps"
        color="#7c3aed"
        class="rounded-lg border p-3"
      />

      <output class="text-sm text-muted-foreground">Paso activo: {{ activeColorStep }}</output>
    </Example>

    <Example
      title="UI contextual y slots individuales"
      description="Cada resolver recibe el estado del paso y los slots con slot personalizan un item concreto."
      :code="uiCode"
    >
      <Stepper v-model:value="activeCustomStep" :steps="checkoutSteps" :ui="customStepperUi">
        <template #indicator="{ completed, item }">
          <span class="text-xs font-bold">{{ completed ? 'OK' : item.step }}</span>
        </template>
        <template #label="{ item, active }">
          <span :class="active ? 'text-primary' : ''">{{ item.label }}</span>
        </template>
        <template #indicator-payment>
          <span class="text-xs font-bold">EUR</span>
        </template>
        <template #content-confirmation="{ item }">
          <div class="rounded-lg border border-success/40 bg-success/5 p-4 text-sm">
            Slot individual: {{ item.content }}
          </div>
        </template>
      </Stepper>
    </Example>

    <div class="grid gap-3 rounded-lg border p-4">
      <div>
        <h3 class="font-medium">Slots generales</h3>
        <p class="text-sm text-muted-foreground">
          Cada slot general permite reemplazar una zona concreta del paso.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <Example title="Slot default" :code="defaultSlotCode">
          <Stepper :steps="checkoutSteps">
            <template #default="{ item }">
              <p class="rounded-md bg-muted/40 p-3 text-sm">
                Contenido default: {{ item.content }}
              </p>
            </template>
          </Stepper>
        </Example>

        <Example
          title="Indicator, label y description"
          :code="generalSlotsCode"
          class="md:col-span-2"
        >
          <Stepper :steps="checkoutSteps">
            <template #indicator="{ item }">
              <span class="text-xs font-bold">P{{ item.step }}</span>
            </template>
            <template #label="{ item }">
              <span class="text-primary">Etiqueta: {{ item.label }}</span>
            </template>
            <template #description="{ item }">
              <span class="text-xs italic">Descripción: {{ item.description }}</span>
            </template>
          </Stepper>
        </Example>

        <Example title="Slot content" :code="contentSlotCode">
          <Stepper :steps="checkoutSteps">
            <template #content="{ item }">
              <p class="rounded-md bg-primary/10 p-3 text-sm">Contenido: {{ item.content }}</p>
            </template>
          </Stepper>
        </Example>
      </div>
    </div>

    <div class="grid gap-3 rounded-lg border p-4">
      <div>
        <h3 class="font-medium">Slots individuales con slot</h3>
        <p class="text-sm text-muted-foreground">
          Los nombres dinámicos se construyen con el valor slot de cada StepperStep.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <Example
          title="Indicador individual"
          description="indicator-{slot}"
          :code="individualWrapperCode"
          class="md:col-span-2"
        >
          <Stepper :steps="checkoutSteps">
            <template #indicator-account>
              <span class="text-xs font-bold">A</span>
            </template>
          </Stepper>
        </Example>

        <Example
          title="Label, descripción y contenido individuales"
          description="label-{slot}, description-{slot}, content-{slot}"
          :code="individualContentCode"
          class="md:col-span-2"
        >
          <Stepper :steps="checkoutSteps">
            <template #label-account>
              <span class="text-primary">Cuenta personalizada</span>
            </template>
            <template #description-account>
              <span class="text-xs italic">Descripción personalizada</span>
            </template>
            <template #content-account="{ item }">
              <p class="rounded-md bg-primary/10 p-3 text-sm">Contenido de {{ item.slot }}</p>
            </template>
          </Stepper>
        </Example>
      </div>
    </div>

    <Example
      title="Contextos"
      description="Los slots reciben el contexto común de navegación y el contexto específico del item."
      :code="contextCode"
    >
      <Stepper :steps="checkoutSteps">
        <template #content="{ value, totalSteps, isNextDisabled, item, index, completed, active }">
          <div class="grid gap-2 rounded-md bg-muted/40 p-3 text-sm">
            <p>StepperContext: valor {{ value }} de {{ totalSteps }}</p>
            <p>StepperItemContext: {{ item.label }} · índice {{ index }}</p>
            <p>
              completed={{ completed }} · active={{ active }} · siguiente deshabilitado={{
                isNextDisabled
              }}
            </p>
          </div>
        </template>
      </Stepper>
    </Example>
  </section>
</template>
