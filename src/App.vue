<script setup lang="ts">
import { ref } from 'vue'
import { Stepper, type StepperPaso } from '@/components/app/Stepper'

const pasos: StepperPaso[] = [
  {
    clave: 'cuenta',
    paso: 1,
    titulo: 'Cuenta',
    descripcion: 'Introduce tus datos personales',
    contenido: 'Completa el nombre y el correo electrónico de tu cuenta.',
  },
  {
    clave: 'direccion',
    paso: 2,
    titulo: 'Dirección',
    descripcion: 'Indica dónde recibirás el pedido',
    contenido: 'Añade la dirección y las instrucciones de entrega.',
  },
  {
    clave: 'confirmacion',
    paso: 3,
    titulo: 'Confirmación',
    descripcion: 'Revisa y confirma la información',
    contenido: 'Comprueba todos los datos antes de finalizar.',
  },
]

const pasosConIconos: StepperPaso[] = [
  { ...pasos[0], icono: 'info' },
  { ...pasos[1], icono: 'guardar' },
  { ...pasos[2], icono: 'exito' },
]

const pasosConDeshabilitado: StepperPaso[] = [
  pasos[0],
  { ...pasos[1], deshabilitado: true },
  pasos[2],
]

const pasoActual = ref(1)
const pasoVertical = ref(1)
</script>

<template>
  <main class="mx-auto max-w-4xl space-y-12 p-8">
    <header class="space-y-2">
      <h1 class="text-2xl font-bold">Ejemplos de Stepper</h1>
      <p class="text-muted-foreground">Variantes de uso de la API en español.</p>
    </header>

    <section class="space-y-4">
      <h2 class="font-semibold">Básico</h2>
      <Stepper :pasos="pasos" />
    </section>

    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold">Estado controlado y navegación</h2>
        <span class="text-sm text-muted-foreground">Paso actual: {{ pasoActual }}</span>
      </div>

      <Stepper v-model="pasoActual" :pasos="pasos" lineal>
        <template
          #contenido="{
            paso,
            anteriorDeshabilitado,
            siguienteDeshabilitado,
            pasoAnterior,
            siguientePaso,
          }"
        >
          <div class="rounded-lg border p-4">
            <p class="text-sm text-muted-foreground">{{ paso.contenido }}</p>

            <div class="mt-4 flex justify-between">
              <button
                type="button"
                class="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
                :disabled="anteriorDeshabilitado"
                @click="pasoAnterior"
              >
                Anterior
              </button>
              <button
                type="button"
                class="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50"
                :disabled="siguienteDeshabilitado"
                @click="siguientePaso"
              >
                Siguiente
              </button>
            </div>
          </div>
        </template>
      </Stepper>
    </section>

    <section class="space-y-4">
      <h2 class="font-semibold">Orientación vertical</h2>
      <Stepper
        v-model="pasoVertical"
        :pasos="pasosConIconos"
        orientacion="vertical"
        class="max-w-lg"
      />
    </section>

    <section class="space-y-4">
      <h2 class="font-semibold">Paso deshabilitado</h2>
      <Stepper :pasos="pasosConDeshabilitado" />
    </section>

    <section class="space-y-4">
      <h2 class="font-semibold">Slots por paso</h2>

      <Stepper :pasos="pasos">
        <template #icono-cuenta>
          <span class="text-xs font-bold">A</span>
        </template>

        <template #titulo-confirmacion="{ paso, activo }">
          <span :class="activo && 'text-violet-700'">{{ paso.titulo }} personalizada</span>
        </template>

        <template #contenido-direccion="{ paso }">
          <div class="rounded-lg bg-violet-50 p-4 text-sm text-violet-950">
            Contenido exclusivo para {{ paso.titulo.toLowerCase() }}.
          </div>
        </template>
      </Stepper>
    </section>

    <section class="space-y-4">
      <h2 class="font-semibold">Color y UI dinámica</h2>

      <Stepper
        :pasos="pasos"
        color="#7c3aed"
        :ui="{
          elemento: ({ ultimo }) => ({
            class: ultimo ? 'opacity-100' : undefined,
          }),
          activador: ({ activo }) => ({
            class: activo ? 'scale-105' : 'opacity-80',
          }),
          indicador: ({ estado }) => ({
            class: estado === 'inactivo' ? 'border-violet-200' : undefined,
          }),
          titulo: ({ activo }) => ({
            class: activo ? 'text-violet-700' : undefined,
          }),
          contenido: { class: 'rounded-lg border border-violet-200 p-4' },
        }"
      />
    </section>
  </main>
</template>
