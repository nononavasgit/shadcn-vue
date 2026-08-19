<script setup lang="ts">
import { computed, ref } from 'vue'

import { Dialog, type DialogProps } from '@/components/ui/Dialog'
import { dialogDefaults } from '@/components/ui/Dialog/defaults'
import { ICONS } from '@/components/ui/Icon/icons'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const iconNames = Object.keys(ICONS)
const open = ref(false)
const label = ref('Editar perfil')
const description = ref('Actualiza tus datos personales y guarda los cambios.')
const icon = ref('edit')
const modal = ref(dialogDefaults.modal)
const forceMount = ref(false)
const disableOutsidePointerEvents = ref(true)
const showCloseButton = ref(dialogDefaults.showCloseButton)

const playgroundProps = computed<DialogProps>(() => ({
  label: label.value || undefined,
  description: description.value || undefined,
  icon: icon.value ? { name: icon.value } : undefined,
  modal: modal.value,
  forceMount: forceMount.value,
  disableOutsidePointerEvents: disableOutsidePointerEvents.value,
  showCloseButton: showCloseButton.value,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'DialogUI',
    type: '{ overlay; content; header; label; description; body; footer; close }',
    description: 'Resolvers para personalizar cada parte del dialogo.',
  },
  {
    name: 'DialogContext',
    type: '{ open: boolean; close: () => void }',
    description: 'Contexto disponible en los slots y resolvers de UI.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'open',
    type: 'boolean',
    default: 'false',
    description: 'Estado controlado mediante v-model:open.',
  },
  {
    name: 'modal',
    type: 'boolean',
    default: String(dialogDefaults.modal),
    description: 'Bloquea la interaccion fuera del dialogo.',
  },
  {
    name: 'block',
    type: 'boolean',
    default: String(dialogDefaults.block),
    description: 'Impide cerrar el dialogo desde el exterior o el boton de cierre.',
  },
  {
    name: 'unmountOnHide',
    type: 'boolean',
    default: String(dialogDefaults.unmountOnHide),
    description: 'Desmonta el contenido cuando el dialogo se cierra.',
  },
  {
    name: 'forceMount',
    type: 'boolean',
    default: 'undefined',
    description: 'Mantiene montado el contenido para controlar animaciones.',
  },
  {
    name: 'disableOutsidePointerEvents',
    type: 'boolean',
    default: 'modal',
    description: 'Controla los eventos de puntero fuera del contenido.',
  },
  { name: 'label', type: 'string', default: 'undefined', description: 'Titulo del dialogo.' },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Descripcion accesible del dialogo.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon',
    default: 'undefined',
    description: 'Icono mostrado junto al titulo.',
  },
  {
    name: 'closeIcon',
    type: 'IconConfig',
    typeLink: '/icon',
    default: "'x'",
    description: 'Icono del boton de cierre.',
  },
  {
    name: 'showCloseButton',
    type: 'boolean',
    default: String(dialogDefaults.showCloseButton),
    description: 'Muestra el boton de cierre.',
  },
  {
    name: 'ui',
    type: 'DialogUI',
    default: 'undefined',
    description: 'Personalizacion dinamica de las partes internas.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:open',
    type: '[value: boolean]',
    default: '-',
    description: 'Actualiza el estado controlado.',
  },
  { name: 'show', type: '[]', default: '-', description: 'Se emite al abrir el dialogo.' },
  { name: 'close', type: '[]', default: '-', description: 'Se emite al cerrar el dialogo.' },
  {
    name: 'openAutoFocus',
    type: '[event: Event]',
    default: '-',
    description: 'Se reemite cuando Reka prepara el autofocus al abrir.',
  },
  {
    name: 'closeAutoFocus',
    type: '[event: Event]',
    default: '-',
    description: 'Se reemite cuando Reka prepara el autofocus al cerrar.',
  },
  {
    name: 'escapeKeyDown',
    type: '[event: KeyboardEvent]',
    default: '-',
    description: 'Se reemite cuando Reka recibe la tecla Escape.',
  },
  {
    name: 'pointerDownOutside',
    type: '[event: PointerDownOutsideEvent]',
    default: '-',
    description: 'Se reemite cuando Reka detecta un puntero fuera.',
  },
  {
    name: 'focusOutside',
    type: '[event: FocusOutsideEvent]',
    default: '-',
    description: 'Se reemite cuando Reka detecta foco fuera.',
  },
  {
    name: 'interactOutside',
    type: '[event: PointerDownOutsideEvent | FocusOutsideEvent]',
    default: '-',
    description: 'Se reemite cuando Reka detecta una interaccion fuera.',
  },
]

const slotRows: ApiTableRow[] = [
  { name: 'default', type: 'DialogContext', default: '-', description: 'Trigger del dialogo.' },
  { name: 'content', type: 'DialogContext', default: '-', description: 'Contenido principal.' },
  { name: 'header', type: 'DialogContext', default: '-', description: 'Reemplaza el encabezado.' },
  { name: 'label', type: 'DialogContext', default: '-', description: 'Personaliza el titulo.' },
  {
    name: 'description',
    type: 'DialogContext',
    default: '-',
    description: 'Personaliza la descripcion.',
  },
  { name: 'footer', type: 'DialogContext', default: '-', description: 'Reemplaza el pie.' },
  {
    name: 'close',
    type: 'DialogContext',
    default: '-',
    description: 'Reemplaza el boton de cierre.',
  },
  {
    name: 'closeIcon',
    type: 'DialogContext',
    default: '-',
    description: 'Personaliza el icono de cierre.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Dialog</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Dialogos modales con una API plana, slots contextuales y personalizacion por UI.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">Tipos publicos usados por la API.</p>
      </div>
      <ApiTable title="Tipos" :rows="typeRows" />
    </section>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">Prueba la API plana del dialogo.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Dialog v-model:open="open" v-bind="playgroundProps">
              <button
                type="button"
                class="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Abrir dialogo
              </button>
              <template #content>
                <p class="text-sm text-muted-foreground">
                  Todas las props de root y content se configuran directamente en Dialog.
                </p>
              </template>
              <template #footer>
                <button
                  type="button"
                  class="rounded-md border px-3 py-2 text-sm hover:bg-accent"
                  @click="open = false"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  class="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
                  @click="open = false"
                >
                  Guardar
                </button>
              </template>
            </Dialog>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">label</span>
            <input
              v-model="label"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">description</span>
            <input
              v-model="description"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">icon</span>
            <select
              v-model="icon"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Sin icono</option>
              <option v-for="name in iconNames" :key="name" :value="name">{{ name }}</option>
            </select>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="modal" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">modal</span>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="forceMount" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">forceMount</span>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="disableOutsidePointerEvents"
              type="checkbox"
              class="size-4 rounded border-input"
            />
            <span class="font-medium">disableOutsidePointerEvents</span>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="showCloseButton" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">showCloseButton</span>
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
