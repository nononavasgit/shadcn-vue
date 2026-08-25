<script setup lang="ts">
import { ref } from 'vue'

import {
  AlertDialog,
  type AlertDialogExpose,
  type AlertDialogUI,
} from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import Example from '../../Example.vue'

const controlledOpen = ref(false)
const eventOpen = ref(false)
const exposeOpen = ref(false)
const actionCount = ref(0)
const cancelCount = ref(0)
const dialogRef = ref<AlertDialogExpose>()

const customUi: AlertDialogUI = {
  content: () => ({ class: 'border-primary' }),
  label: () => ({ class: 'text-primary' }),
  footer: () => ({ class: 'rounded-md bg-muted/40 p-2' }),
}

function handleAction() {
  actionCount.value += 1
}

function handleCancel() {
  cancelCount.value += 1
}

const basicCode = `<AlertDialog
  label="Eliminar proyecto"
  description="Esta acción no se puede deshacer."
>
  <Button label="Eliminar" severity="error" />
</AlertDialog>`
const openCode = `<AlertDialog v-model:open="open" label="Confirmar acción">
  <Button label="Abrir" />
</AlertDialog>`
const iconCode = `<AlertDialog
  label="Acción peligrosa"
  :icon="{ name: 'warning' }"
>
  <Button label="Continuar" />
</AlertDialog>`
const actionButtonCode = `<AlertDialog
  label="Eliminar proyecto"
  :action-button="{ label: 'Eliminar', severity: 'error' }"
>
  <Button label="Eliminar" />
</AlertDialog>`
const cancelButtonCode = `<AlertDialog
  label="Salir sin guardar"
  :cancel-button="{ label: 'Volver', variant: 'plain' }"
>
  <Button label="Salir" />
</AlertDialog>`
const unmountCode = `<AlertDialog
  label="Contenido persistente"
  :unmount-on-hide="false"
>
  <Button label="Abrir" />
</AlertDialog>`
const pointerEventsCode = `<AlertDialog
  label="Permite interacción exterior"
  :disable-outside-pointer-events="false"
>
  <Button label="Abrir" />
</AlertDialog>`
const uiCode = `<AlertDialog
  label="UI personalizada"
  :ui="customUi"
>
  <Button label="Abrir" />
</AlertDialog>`
const defaultSlotCode = `<AlertDialog label="Confirmar">
  <Button label="Abrir diálogo" />
</AlertDialog>`
const contentSlotCode = `<AlertDialog label="Eliminar proyecto">
  <Button label="Eliminar" />
  <template #content>
    <p>Revisa los datos antes de continuar.</p>
  </template>
</AlertDialog>`
const headerSlotCode = `<AlertDialog>
  <Button label="Abrir" />
  <template #header>
    <h3>Encabezado personalizado</h3>
    <p>Texto adicional del encabezado.</p>
  </template>
</AlertDialog>`
const labelSlotCode = `<AlertDialog description="Descripción de la acción.">
  <Button label="Abrir" />
  <template #label>
    <span>Etiqueta personalizada</span>
  </template>
</AlertDialog>`
const descriptionSlotCode = `<AlertDialog label="Aviso">
  <Button label="Abrir" />
  <template #description>
    <span>Descripción con <strong>contenido enriquecido</strong>.</span>
  </template>
</AlertDialog>`
const footerSlotCode = `<AlertDialog label="Confirmar">
  <Button label="Abrir" />
  <template #footer="{ close }">
    <Button variant="outline" label="Cerrar" @click="close" />
  </template>
</AlertDialog>`
const actionSlotCode = `<AlertDialog label="Confirmar">
  <Button label="Abrir" />
  <template #action="{ close }">
    <Button label="Aceptar" @click="close" />
  </template>
</AlertDialog>`
const cancelSlotCode = `<AlertDialog label="Confirmar">
  <Button label="Abrir" />
  <template #cancel="{ close }">
    <Button label="No" variant="plain" @click="close" />
  </template>
</AlertDialog>`
const eventsCode = `<AlertDialog
  v-model:open="open"
  label="Confirma la acción"
  @action="handleAction"
  @cancel="handleCancel"
>
  <Button label="Abrir" />
</AlertDialog>`
const exposeCode = `<AlertDialog ref="dialogRef" label="Cerrar desde expose">
  <Button label="Abrir" />
  <template #content>
    <Button label="Cerrar diálogo" @click="dialogRef?.close()" />
  </template>
</AlertDialog>`
const attrsCode = `<AlertDialog
  label="Atributos en el root"
  class="contents"
  data-state="ready"
>
  <Button label="Abrir" />
</AlertDialog>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada ejemplo muestra una prop, slot, evento o método disponible en AlertDialog.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Label y description"
        description="Define el título y la descripción de confirmación."
        :code="basicCode"
      >
        <AlertDialog label="Eliminar proyecto" description="Esta acción no se puede deshacer.">
          <Button label="Eliminar" severity="error" />
        </AlertDialog>
      </Example>

      <Example
        title="Open"
        description="open y v-model:open controlan el estado del diálogo."
        :code="openCode"
      >
        <AlertDialog v-model:open="controlledOpen" label="Confirmar acción">
          <Button label="Abrir" />
        </AlertDialog>
      </Example>

      <Example
        title="Icon"
        description="icon muestra un IconConfig junto al título."
        :code="iconCode"
      >
        <AlertDialog label="Acción peligrosa" :icon="{ name: 'warning' }">
          <Button label="Continuar" />
        </AlertDialog>
      </Example>

      <Example
        title="Action button"
        description="actionButton personaliza el botón de confirmación."
        :code="actionButtonCode"
      >
        <AlertDialog
          label="Eliminar proyecto"
          :action-button="{ label: 'Eliminar', severity: 'error' }"
        >
          <Button label="Eliminar" />
        </AlertDialog>
      </Example>

      <Example
        title="Cancel button"
        description="cancelButton personaliza el botón de cancelación."
        :code="cancelButtonCode"
      >
        <AlertDialog
          label="Salir sin guardar"
          :cancel-button="{ label: 'Volver', variant: 'plain' }"
        >
          <Button label="Salir" />
        </AlertDialog>
      </Example>

      <Example
        title="Unmount on hide"
        description="unmountOnHide controla si el contenido se desmonta al cerrar."
        :code="unmountCode"
      >
        <AlertDialog label="Contenido persistente" :unmount-on-hide="false">
          <Button label="Abrir" />
        </AlertDialog>
      </Example>

      <Example
        title="Disable outside pointer events"
        description="Permite o bloquea los eventos de puntero fuera del diálogo."
        :code="pointerEventsCode"
      >
        <AlertDialog label="Permite interacción exterior" :disable-outside-pointer-events="false">
          <Button label="Abrir" />
        </AlertDialog>
      </Example>

      <Example
        title="UI"
        description="ui permite personalizar las partes internas del diálogo."
        :code="uiCode"
      >
        <AlertDialog label="UI personalizada" :ui="customUi">
          <Button label="Abrir" />
        </AlertDialog>
      </Example>

      <Example
        title="Slot default"
        description="El slot default se utiliza como trigger del diálogo."
        :code="defaultSlotCode"
      >
        <AlertDialog label="Confirmar">
          <Button label="Abrir diálogo" />
        </AlertDialog>
      </Example>

      <Example
        title="Slot content"
        description="content añade contenido principal al cuerpo del diálogo."
        :code="contentSlotCode"
      >
        <AlertDialog label="Eliminar proyecto">
          <Button label="Eliminar" />
          <template #content>
            <p class="text-sm text-muted-foreground">Revisa los datos antes de continuar.</p>
          </template>
        </AlertDialog>
      </Example>

      <Example
        title="Slot header"
        description="header sustituye el encabezado completo."
        :code="headerSlotCode"
      >
        <AlertDialog>
          <Button label="Abrir" />
          <template #header>
            <h3 class="text-lg font-semibold">Encabezado personalizado</h3>
            <p class="text-sm text-muted-foreground">Texto adicional del encabezado.</p>
          </template>
        </AlertDialog>
      </Example>

      <Example
        title="Slot label"
        description="label personaliza el título sin reemplazar todo el header."
        :code="labelSlotCode"
      >
        <AlertDialog description="Descripción de la acción.">
          <Button label="Abrir" />
          <template #label>
            <span>Etiqueta personalizada</span>
          </template>
        </AlertDialog>
      </Example>

      <Example
        title="Slot description"
        description="description admite contenido enriquecido."
        :code="descriptionSlotCode"
      >
        <AlertDialog label="Aviso">
          <Button label="Abrir" />
          <template #description>
            <span>Descripción con <strong>contenido enriquecido</strong>.</span>
          </template>
        </AlertDialog>
      </Example>

      <Example
        title="Slot footer"
        description="footer reemplaza los botones predeterminados y recibe close para cerrar."
        :code="footerSlotCode"
      >
        <AlertDialog label="Confirmar">
          <Button label="Abrir" />
          <template #footer="{ close }">
            <Button variant="outline" label="Cerrar" @click="close" />
          </template>
        </AlertDialog>
      </Example>

      <Example
        title="Slot action"
        description="action recibe close para cerrar tras una acción personalizada."
        :code="actionSlotCode"
      >
        <AlertDialog label="Confirmar">
          <Button label="Abrir" />
          <template #action="{ close }">
            <Button label="Aceptar" @click="close" />
          </template>
        </AlertDialog>
      </Example>

      <Example
        title="Slot cancel"
        description="cancel recibe close para cerrar con una cancelación personalizada."
        :code="cancelSlotCode"
      >
        <AlertDialog label="Confirmar">
          <Button label="Abrir" />
          <template #cancel="{ close }">
            <Button label="No" variant="plain" @click="close" />
          </template>
        </AlertDialog>
      </Example>

      <Example
        title="Eventos action y cancel"
        description="Escucha las decisiones del usuario mediante action y cancel."
        :code="eventsCode"
      >
        <div class="grid gap-2">
          <AlertDialog
            v-model:open="eventOpen"
            label="Confirma la acción"
            @action="handleAction"
            @cancel="handleCancel"
          >
            <Button label="Abrir" />
          </AlertDialog>
          <span class="text-xs text-muted-foreground">
            action: {{ actionCount }} · cancel: {{ cancelCount }}
          </span>
        </div>
      </Example>

      <Example
        title="Expose close"
        description="El método close permite cerrar el diálogo desde el componente padre."
        :code="exposeCode"
      >
        <AlertDialog ref="dialogRef" v-model:open="exposeOpen" label="Cerrar desde expose">
          <Button label="Abrir" />
          <template #content>
            <Button label="Cerrar diálogo" @click="dialogRef?.close()" />
          </template>
        </AlertDialog>
      </Example>

      <Example
        title="Atributos HTML"
        description="Los atributos se reenvían al root del componente."
        :code="attrsCode"
        class="md:col-span-2"
      >
        <AlertDialog label="Atributos en el root" class="contents" data-state="ready">
          <Button label="Abrir" />
        </AlertDialog>
      </Example>
    </div>
  </section>
</template>
