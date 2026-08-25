<script setup lang="ts">
import { ref } from 'vue'

import { Alert } from '@/components/ui/Alert'
import { Icon } from '@/components/ui/Icon'
import Example from '../../Example.vue'

const closeCount = ref(0)
const showEventAlert = ref(true)

const customUi = {
  label: () => ({ class: 'uppercase tracking-wide' }),
  description: () => ({ class: 'italic' }),
  closeButtonContainer: () => ({ class: 'top-1 right-1' }),
}

function handleClose() {
  closeCount.value += 1
  showEventAlert.value = false
}

const labelCode = `<Alert label="Cambios guardados" />`
const descriptionCode = `<Alert
  label="Cambios guardados"
  description="Tus preferencias se han actualizado correctamente."
/>`
const iconCode = `<Alert
  label="Información"
  :icon="{ name: 'info' }"
/>`
const closeButtonCode = `<Alert
  label="Alerta cerrable"
  description="Personaliza las props del botón de cierre."
  closable
  :close-button="{ variant: 'outline', size: 'sm' }"
/>`
const variantCode = `<div class="grid gap-2">
  <Alert label="Solid" variant="solid" />
  <Alert label="Outline" variant="outline" />
  <Alert label="Plain" variant="plain" />
  <Alert label="Subtle" variant="subtle" />
  <Alert label="Soft" variant="soft" />
</div>`
const severityCode = `<div class="grid gap-2">
  <Alert label="Primary" severity="primary" />
  <Alert label="Secondary" severity="secondary" />
  <Alert label="Warning" severity="warning" />
  <Alert label="Success" severity="success" />
  <Alert label="Error" severity="error" />
</div>`
const colorCode = `<Alert
  label="Color personalizado"
  description="Puedes usar cualquier valor CSS válido."
  color="#7c3aed"
/>`
const closableCode = `<Alert
  label="Alerta cerrable"
  description="El botón predeterminado utiliza el icono de cierre."
  closable
/>`
const decorativeCode = `<div class="grid gap-2">
  <Alert label="Alerta semántica" />
  <Alert label="Contenido decorativo" decorative />
</div>`
const uiCode = `<Alert
  label="Contenido personalizado"
  description="Los atributos se aplican a las partes internas."
  :ui="customUi"
/>`
const iconSlotCode = `<Alert label="Información">
  <template #icon>
    <Icon name="info" class="size-4" />
  </template>
</Alert>`
const labelSlotCode = `<Alert description="Descripción del aviso.">
  <template #label>
    <strong>Etiqueta personalizada</strong>
  </template>
</Alert>`
const descriptionSlotCode = `<Alert label="Aviso">
  <template #description>
    <span>Descripción con <strong>contenido enriquecido</strong>.</span>
  </template>
</Alert>`
const closeSlotCode = `<Alert label="Alerta cerrable" closable>
  <template #close="{ close }">
    <button type="button" @click="close">Descartar</button>
  </template>
</Alert>`
const closeEventCode = `<Alert
  v-if="showEventAlert"
  label="Cierra esta alerta"
  closable
  @close="handleClose"
/>`
const attrsCode = `<Alert
  label="Estado activo"
  class="border-primary"
  data-state="active"
  aria-label="Estado activo"
/>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada ejemplo muestra una prop, slot, evento o configuración disponible en Alert.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Label"
        description="Usa label para definir el título principal del mensaje."
        :code="labelCode"
      >
        <Alert label="Cambios guardados" />
      </Example>

      <Example
        title="Description"
        description="description añade información secundaria al título."
        :code="descriptionCode"
      >
        <Alert
          label="Cambios guardados"
          description="Tus preferencias se han actualizado correctamente."
        />
      </Example>

      <Example
        title="Icon"
        description="icon muestra un IconConfig junto al contenido."
        :code="iconCode"
      >
        <Alert label="Información" :icon="{ name: 'info' }" />
      </Example>

      <Example
        title="Close button"
        description="closeButton permite configurar el botón de cierre."
        :code="closeButtonCode"
      >
        <Alert
          label="Alerta cerrable"
          description="Personaliza las props del botón de cierre."
          closable
          :close-button="{ variant: 'outline', size: 'sm' }"
        />
      </Example>

      <Example
        title="Variant"
        description="Controla el tratamiento visual con las cinco variantes disponibles."
        :code="variantCode"
        class="md:col-span-2"
      >
        <div class="grid w-full gap-2">
          <Alert label="Solid" variant="solid" />
          <Alert label="Outline" variant="outline" />
          <Alert label="Plain" variant="plain" />
          <Alert label="Subtle" variant="subtle" />
          <Alert label="Soft" variant="soft" />
        </div>
      </Example>

      <Example
        title="Severity"
        description="Aplica una intención semántica al mensaje."
        :code="severityCode"
        class="md:col-span-2"
      >
        <div class="grid w-full gap-2">
          <Alert label="Primary" severity="primary" />
          <Alert label="Secondary" severity="secondary" />
          <Alert label="Warning" severity="warning" />
          <Alert label="Success" severity="success" />
          <Alert label="Error" severity="error" />
        </div>
      </Example>

      <Example
        title="Color"
        description="color permite usar un color CSS personalizado."
        :code="colorCode"
      >
        <Alert
          label="Color personalizado"
          description="Puedes usar cualquier valor CSS válido."
          color="#7c3aed"
        />
      </Example>

      <Example
        title="Closable"
        description="closable muestra el botón predeterminado para cerrar el mensaje."
        :code="closableCode"
      >
        <Alert
          label="Alerta cerrable"
          description="El botón predeterminado utiliza el icono de cierre."
          closable
        />
      </Example>

      <Example
        title="Decorative"
        description="decorative cambia el rol semántico del alert a none."
        :code="decorativeCode"
        class="md:col-span-2"
      >
        <div class="grid w-full gap-2">
          <Alert label="Alerta semántica" />
          <Alert label="Contenido decorativo" decorative />
        </div>
      </Example>

      <Example
        title="UI"
        description="ui permite añadir atributos y clases a las partes internas."
        :code="uiCode"
      >
        <Alert
          label="Contenido personalizado"
          description="Los atributos se aplican a las partes internas."
          :ui="customUi"
        />
      </Example>

      <Example
        title="Slot icon"
        description="icon sustituye el icono configurado por defecto."
        :code="iconSlotCode"
      >
        <Alert label="Información">
          <template #icon>
            <Icon name="info" class="size-4" />
          </template>
        </Alert>
      </Example>

      <Example
        title="Slot label"
        description="label permite personalizar el título con contenido propio."
        :code="labelSlotCode"
      >
        <Alert description="Descripción del aviso.">
          <template #label>
            <strong>Etiqueta personalizada</strong>
          </template>
        </Alert>
      </Example>

      <Example
        title="Slot description"
        description="description admite contenido enriquecido."
        :code="descriptionSlotCode"
      >
        <Alert label="Aviso">
          <template #description>
            <span>Descripción con <strong>contenido enriquecido</strong>.</span>
          </template>
        </Alert>
      </Example>

      <Example
        title="Slot close"
        description="close recibe la función close para controlar el cierre."
        :code="closeSlotCode"
      >
        <Alert label="Alerta cerrable" closable>
          <template #close="{ close }">
            <button
              type="button"
              class="rounded-md border px-2 py-1 text-xs font-medium hover:bg-accent"
              @click="close"
            >
              Descartar
            </button>
          </template>
        </Alert>
      </Example>

      <Example
        title="Evento close"
        description="close se emite después de cerrar la alerta."
        :code="closeEventCode"
      >
        <div class="grid w-full gap-2">
          <Alert v-if="showEventAlert" label="Cierra esta alerta" closable @close="handleClose" />
          <div v-else class="flex items-center justify-between gap-2 text-sm text-muted-foreground">
            <span>Se ha emitido close {{ closeCount }} vez.</span>
            <button
              type="button"
              class="rounded-md border px-2 py-1 text-xs font-medium text-foreground hover:bg-accent"
              @click="showEventAlert = true"
            >
              Mostrar de nuevo
            </button>
          </div>
        </div>
      </Example>

      <Example
        title="Atributos HTML"
        description="Los atributos y clases se reenvían al elemento raíz."
        :code="attrsCode"
        class="md:col-span-2"
      >
        <Alert
          label="Estado activo"
          class="border-primary"
          data-state="active"
          aria-label="Estado activo"
        />
      </Example>
    </div>
  </section>
</template>
