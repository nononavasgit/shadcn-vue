<script setup lang="ts">
import { ref } from 'vue'

import { Dialog, type DialogProps } from '@/components/ui/Dialog'

const controlledOpen = ref(false)
const styledDialogUi: DialogProps['ui'] = {
  content: () => ({ class: 'border-primary' }),
  close: () => ({ class: 'text-primary' }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de usar Dialog con props planas y slots.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Dialog basico</h3>
          <p class="text-sm text-muted-foreground">Titulo y descripcion desde props.</p>
        </div>
        <Dialog label="Dialog basico" description="Contenido de un dialogo sencillo.">
          <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
            Abrir dialogo
          </button>
        </Dialog>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Contenido y footer</h3>
          <p class="text-sm text-muted-foreground">Los slots permiten construir el contenido.</p>
        </div>
        <Dialog label="Editar preferencias">
          <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
            Editar
          </button>
          <template #content>
            <p class="text-sm text-muted-foreground">
              Configura tus preferencias antes de continuar.
            </p>
          </template>
          <template #footer="{ close }">
            <button
              type="button"
              class="rounded-md border px-3 py-2 text-sm hover:bg-accent"
              @click="close"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
              @click="close"
            >
              Guardar
            </button>
          </template>
        </Dialog>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Apertura controlada</h3>
          <p class="text-sm text-muted-foreground">Usa v-model:open para controlar el estado.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Dialog v-model:open="controlledOpen" label="Estado controlado">
            <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
              Abrir
            </button>
            
            <template>{{controlledOpen}}</template>
          </Dialog>
          <button
            type="button"
            class="rounded-md border px-3 py-2 text-sm hover:bg-accent"
            @click="controlledOpen = !controlledOpen"
          >
            {{ controlledOpen ? 'Cerrar' : 'Abrir desde fuera' }}
          </button>
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Props de contenido en la raiz</h3>
          <p class="text-sm text-muted-foreground">
            Las props de contenido ya no viven en content.
          </p>
        </div>
        <Dialog
          label="Dialog personalizado"
          :disable-outside-pointer-events="false"
          :ui="styledDialogUi"
        >
          <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
            Con UI personalizada
          </button>
          <template #content>
            <p class="text-sm text-muted-foreground">El contenido usa props planas.</p>
          </template>
        </Dialog>
      </div>
    </div>
  </section>
</template>
