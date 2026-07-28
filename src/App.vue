<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/app/Button'
import { Dialog } from '@/components/app/Dialog'

const dialogoAbierto = ref(false)
const personalizadoAbierto = ref(false)
</script>

<template>
  <main class="mx-auto max-w-3xl space-y-10 p-8">
    <header class="space-y-2">
      <h1 class="text-2xl font-bold">Ejemplos de Dialog</h1>
      <p class="text-muted-foreground">Variantes de uso de la API en español.</p>
    </header>

    <section class="space-y-3">
      <h2 class="font-semibold">Básico</h2>

      <Dialog
        titulo="Información"
        descripcion="Un diálogo sencillo con título, descripción y contenido."
      >
        <Button>Abrir diálogo</Button>

        <template #contenido>
          <p class="text-sm">Este es el contenido principal del diálogo.</p>
        </template>
      </Dialog>
    </section>

    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold">Estado controlado</h2>
        <span class="text-sm text-muted-foreground">
          {{ dialogoAbierto ? 'Abierto' : 'Cerrado' }}
        </span>
      </div>

      <Dialog
        v-model:abierto="dialogoAbierto"
        titulo="Diálogo controlado"
        descripcion="Su estado se sincroniza mediante v-model:abierto."
      >
        <Button>Abrir diálogo controlado</Button>

        <template #contenido>
          <p class="text-sm">También puedes cambiar su estado desde fuera.</p>
        </template>
      </Dialog>

      <Button variante="delineado" @click="dialogoAbierto = !dialogoAbierto">
        Cambiar desde fuera
      </Button>
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">Con icono y pie</h2>

      <Dialog
        titulo="Confirmar operación"
        descripcion="Comprueba los datos antes de continuar."
        icono="alerta"
      >
        <Button gravedad="alerta">Mostrar confirmación</Button>

        <template #contenido>
          <p class="text-sm">Esta acción realizará cambios sobre los datos seleccionados.</p>
        </template>

        <template #pie="{ cerrar }">
          <Button variante="delineado" @click="cerrar">Cancelar</Button>
          <Button gravedad="alerta" @click="cerrar">Confirmar</Button>
        </template>
      </Dialog>
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">Cierre personalizado</h2>

      <Dialog titulo="Botón de cierre personalizado" titulo-cerrar="Cerrar ventana">
        <Button variante="sutil">Abrir ejemplo</Button>

        <template #iconoCerrar>
          <span class="text-xs font-bold">Cerrar</span>
        </template>

        <template #contenido>
          <p class="text-sm">El icono de cierre se ha sustituido mediante un slot.</p>
        </template>
      </Dialog>
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">Slots y UI personalizada</h2>

      <Dialog
        v-model:abierto="personalizadoAbierto"
        :ui="{
          contenedor: { class: 'border-violet-300 sm:max-w-xl' },
          encabezado: { class: 'border-b border-violet-100 pb-4' },
          titulo: { class: 'text-violet-700' },
          contenido: { class: 'py-4' },
          pie: { class: 'border-t border-violet-100 pt-4' },
        }"
      >
        <Button color="#7c3aed">Abrir personalizado</Button>

        <template #titulo>Diálogo personalizado</template>

        <template #descripcion>
          El aspecto se configura con las claves visuales de <code>ui</code>.
        </template>

        <template #contenido>
          <p class="text-sm">Las opciones funcionales del contenedor ahora son props de Dialog.</p>
        </template>

        <template #pie="{ cerrar }">
          <Button color="#7c3aed" @click="cerrar">Aceptar</Button>
        </template>
      </Dialog>
    </section>
  </main>
</template>
