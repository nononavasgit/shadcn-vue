<script setup lang="ts">
import { ref } from 'vue'
import { Accordeon, type AccordeonElemento } from '@/components/app/Accordion'

const elementos: AccordeonElemento[] = [
  {
    valor: 'cuenta',
    titulo: '¿Cómo creo una cuenta?',
    contenido: 'Pulsa en Registrarse y completa los datos solicitados.',
  },
  {
    valor: 'contrasena',
    titulo: '¿Cómo cambio mi contraseña?',
    contenido: 'Puedes cambiarla desde la sección de seguridad de tu perfil.',
  },
  {
    valor: 'soporte',
    titulo: '¿Cómo contacto con soporte?',
    contenido: 'Envía tu consulta desde el formulario de ayuda.',
  },
]

const elementosConDeshabilitado: AccordeonElemento[] = [
  ...elementos,
  {
    valor: 'proximamente',
    titulo: 'Función disponible próximamente',
    contenido: 'Este contenido todavía no está disponible.',
    deshabilitado: true,
  },
]

const valorUnico = ref<string>()
const valoresMultiples = ref<string[]>(['cuenta'])
</script>

<template>
  <main class="mx-auto max-w-3xl space-y-10 p-8">
    <header class="space-y-2">
      <h1 class="text-2xl font-bold">Ejemplos de Accordeon</h1>
      <p class="text-muted-foreground">Variantes de uso de la API en español.</p>
    </header>

    <section class="space-y-3">
      <h2 class="font-semibold">Básico</h2>
      <Accordeon :elementos="elementos" colapsable />
    </section>

    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold">Estado controlado</h2>
        <span class="text-sm text-muted-foreground">
          {{ valorUnico ?? 'Ninguno' }}
        </span>
      </div>

      <Accordeon v-model="valorUnico" :elementos="elementos" colapsable />

      <button
        class="rounded-md border px-3 py-2 text-sm"
        type="button"
        @click="valorUnico = 'soporte'"
      >
        Abrir soporte
      </button>
    </section>

    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold">Selección múltiple</h2>
        <span class="text-sm text-muted-foreground"> {{ valoresMultiples.length }} abiertos </span>
      </div>

      <Accordeon v-model="valoresMultiples" tipo="multiple" :elementos="elementos" />
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">Elemento deshabilitado</h2>
      <Accordeon :elementos="elementosConDeshabilitado" colapsable />
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">Slots personalizados</h2>

      <Accordeon :elementos="elementos" colapsable>
        <template #activador="{ elemento, abierto, indice }">
          <span class="flex w-full items-center gap-2">
            <span class="text-xs text-muted-foreground">0{{ indice + 1 }}</span>
            <span>{{ elemento.titulo }}</span>
            <span class="ml-auto text-xs">{{ abierto ? 'Abierto' : 'Cerrado' }}</span>
          </span>
        </template>

        <template #default="{ elemento }">
          <p class="text-sm text-muted-foreground">{{ elemento.contenido }}</p>
        </template>
      </Accordeon>
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">UI dinámica</h2>

      <Accordeon
        :elementos="elementos"
        colapsable
        :ui="{
          elemento: ({ ultimo }) => ({
            class: ultimo ? 'border-b-0' : 'border-b border-violet-100',
          }),
          activador: ({ abierto }) => ({
            class: abierto ? 'text-violet-700' : 'text-foreground',
          }),
          contenido: { class: 'pb-4 text-violet-950' },
        }"
      />
    </section>
  </main>
</template>
