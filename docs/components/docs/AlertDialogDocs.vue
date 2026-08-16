<script setup lang="ts">
import { computed, ref } from 'vue'

import { AlertDialog, type AlertDialogProps } from '@/components/ui/AlertDialog'
import type { NormalizeButtonProps } from '@/components/ui/Button'
import type { NormalizeIconProps } from '@/components/ui/Icon'
import { ICONS } from '@/components/ui/Icon/icons'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const iconNames = Object.keys(ICONS)
const open = ref(false)
const label = ref('Delete project?')
const description = ref('This action cannot be undone.')
const icon = ref('warning')
const iconObjectInput = ref('')
const actionButtonInput = ref(`{
  "label": "Delete",
  "severity": "error"
}`)
const cancelButtonInput = ref(`{
  "label": "Cancel",
  "variant": "outline"
}`)
const unmountOnHide = ref(true)
const forceMount = ref(false)
const disableOutsidePointerEvents = ref(true)

function parseButtonProps(value: string): NormalizeButtonProps | undefined {
  try {
    const parsed: unknown = JSON.parse(value)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as NormalizeButtonProps
    }
  } catch {
    return undefined
  }

  return undefined
}

function parseIconProps(value: string): NormalizeIconProps | undefined {
  if (!value.trim()) return undefined

  try {
    const parsed: unknown = JSON.parse(value)

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as NormalizeIconProps
    }
  } catch {
    return undefined
  }

  return undefined
}

const playgroundProps = computed<AlertDialogProps>(() => ({
  label: label.value || undefined,
  description: description.value || undefined,
  icon: parseIconProps(iconObjectInput.value) ?? (icon.value || undefined),
  actionButton: parseButtonProps(actionButtonInput.value),
  cancelButton: parseButtonProps(cancelButtonInput.value),
  unmountOnHide: unmountOnHide.value,
  forceMount: forceMount.value,
  disableOutsidePointerEvents: disableOutsidePointerEvents.value,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'AlertDialogUI',
    type: '{ trigger?; overlay?; content?; header?; label?; description?; body?; footer? }',
    description: 'Funciones de atributos para cada parte del dialogo.',
  },
  {
    name: 'AlertDialogContext',
    type: '{ ui; open: boolean; close: () => void }',
    description: 'Contexto compartido por slots y funciones de ui.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Controla si el dialogo esta abierto.',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Titulo del dialogo de confirmacion.',
  },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Descripcion de la accion que se va a confirmar.',
  },
  {
    name: 'icon',
    type: 'NormalizeIconProps',
    typeLink: '/icon',
    default: 'undefined',
    description: 'Icono mostrado junto al titulo.',
  },
  {
    name: 'actionButton',
    type: 'NormalizeButtonProps',
    typeLink: '/button',
    default: 'undefined',
    description: 'Props del boton de confirmacion.',
  },
  {
    name: 'cancelButton',
    type: 'NormalizeButtonProps',
    typeLink: '/button',
    default: 'undefined',
    description: 'Props del boton de cancelacion.',
  },
  {
    name: 'unmountOnHide',
    type: 'boolean',
    default: 'true',
    description: 'Desmonta el contenido cuando el dialogo se cierra.',
  },
  {
    name: 'forceMount',
    type: 'boolean',
    default: 'undefined',
    description: 'Fuerza el montaje del contenido.',
  },
  {
    name: 'disableOutsidePointerEvents',
    type: 'boolean',
    default: 'true',
    description: 'Bloquea los eventos de puntero fuera del dialogo.',
  },
  {
    name: 'ui',
    type: 'AlertDialogUI',
    default: 'undefined',
    description: 'Atributos personalizados para las partes internas.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'action',
    type: '[event: PointerEvent]',
    default: '-',
    description: 'Confirma la accion.',
  },
  {
    name: 'cancel',
    type: '[event: PointerEvent]',
    default: '-',
    description: 'Cancela la accion.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'AlertDialogContext',
    default: '-',
    description: 'Trigger del dialogo.',
  },
  {
    name: 'content',
    type: 'AlertDialogContext',
    default: '-',
    description: 'Contenido principal.',
  },
  {
    name: 'header',
    type: 'AlertDialogContext',
    default: '-',
    description: 'Reemplaza el encabezado.',
  },
  {
    name: 'label',
    type: 'AlertDialogContext',
    default: '-',
    description: 'Personaliza el titulo.',
  },
  {
    name: 'description',
    type: 'AlertDialogContext',
    default: '-',
    description: 'Personaliza la descripcion.',
  },
  { name: 'footer', type: 'AlertDialogContext', default: '-', description: 'Reemplaza el pie.' },
  {
    name: 'action',
    type: 'AlertDialogContext',
    default: '-',
    description: 'Personaliza la accion.',
  },
  {
    name: 'cancel',
    type: 'AlertDialogContext',
    default: '-',
    description: 'Personaliza la cancelacion.',
  },
]

const exposeRows: ApiTableRow[] = [
  { name: 'close', type: '() => void', default: '-', description: 'Cierra el dialogo.' },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">AlertDialog</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Dialogo modal para confirmar acciones que requieren una decision explicita.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">
          Tipos publicos usados por la API del componente.
        </p>
      </div>
      <ApiTable title="Tipos" :rows="typeRows" />
    </section>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Configura el contenido y prueba la confirmacion.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <AlertDialog v-model:open="open" v-bind="playgroundProps">
              <button
                type="button"
                class="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Open dialog
              </button>
              <template #content>
                <p class="text-sm text-muted-foreground">
                  The content slot can contain any confirmation details.
                </p>
              </template>
            </AlertDialog>
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

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">icon (objeto)</span>
            <textarea
              v-model="iconObjectInput"
              rows="4"
              placeholder='{
  "name": "warning",
  "size": "lg"
}'
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">actionButton</span>
            <textarea
              v-model="actionButtonInput"
              rows="4"
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">cancelButton</span>
            <textarea
              v-model="cancelButtonInput"
              rows="4"
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="unmountOnHide" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">unmountOnHide</span>
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
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" />
    </div>
  </section>
</template>
