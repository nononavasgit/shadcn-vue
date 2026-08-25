<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Nombre o titulo del archivo.',
  },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Informacion secundaria del archivo.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono mostrado en la zona multimedia.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Orientacion del contenido.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md'",
    default: "'md'",
    description: 'Tamano del componente.',
  },
  {
    name: 'state',
    type: "'idle' | 'uploading' | 'processing' | 'error' | 'done'",
    default: "'idle'",
    description: 'Estado visual y de carga.',
  },
  {
    name: 'mediaVariant',
    type: "'icon' | 'image'",
    default: "'icon'",
    description: 'Renderiza un icono o el slot de media.',
  },
  {
    name: 'ui',
    type: '{ media?: () => HTMLAttributes; content?: () => HTMLAttributes; label?: () => HTMLAttributes; description?: () => HTMLAttributes; actions?: () => HTMLAttributes }',
    default: 'undefined',
    description: 'Atributos personalizados para las partes internas.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'media',
    type: '-',
    default: '-',
    description: 'Contenido multimedia cuando mediaVariant es image.',
  },
  {
    name: 'label',
    type: '-',
    default: '-',
    description: 'Personaliza el nombre del archivo.',
  },
  {
    name: 'description',
    type: '-',
    default: '-',
    description: 'Personaliza la descripcion del archivo.',
  },
  {
    name: 'actions',
    type: '-',
    default: '-',
    description: 'Acciones del attachment.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Attachment</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Representa un archivo con nombre, descripcion, estado, multimedia y acciones opcionales.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable id="attachment-props" title="Props" :rows="propRows" />
      <ApiTable
        id="attachment-emits"
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable
        id="attachment-slots"
        title="Slots"
        type-label="slotProps"
        :show-default="false"
        :rows="slotRows"
      />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
