<script setup lang="ts">
import { computed, ref } from 'vue'

import { Attachment, type AttachmentProps, type AttachmentState } from '@/components/ui/Attachment'
import type {
  AttachmentMediaVariant,
  AttachmentOrientation,
  AttachmentSize,
} from '@/components/ui/Attachment'
import { attachmentDefaults } from '@/components/ui/Attachment/default'
import { Button } from '@/components/ui/Button'
import type { IconConfig } from '@/components/ui/Icon'
import { ICONS } from '@/components/ui/Icon/icons'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const iconNames = Object.keys(ICONS)
const label = ref('report.pdf')
const description = ref('2.4 MB')
const icon = ref('fileText')
const iconObjectInput = ref('')
const orientation = ref<AttachmentOrientation>(attachmentDefaults.orientation)
const size = ref<AttachmentSize>(attachmentDefaults.size)
const state = ref<AttachmentState>(attachmentDefaults.state)
const mediaVariant = ref<AttachmentMediaVariant>(attachmentDefaults.mediaVariant)

function parseIconProps(value: string): IconConfig | undefined {
  if (!value.trim()) return undefined

  try {
    const parsed: unknown = JSON.parse(value)

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as IconConfig
    }
  } catch {
    return undefined
  }

  return undefined
}

const playgroundProps = computed<AttachmentProps>(() => ({
  label: label.value || undefined,
  description: description.value || undefined,
  icon: parseIconProps(iconObjectInput.value) ?? (icon.value ? { name: icon.value } : undefined),
  orientation: orientation.value,
  size: size.value,
  state: state.value,
  mediaVariant: mediaVariant.value,
}))

const propRows: ApiTableRow[] = [
  {
    name: 'label',
    type: 'string',
    default: String(attachmentDefaults.label),
    description: 'Nombre o titulo del archivo.',
  },
  {
    name: 'description',
    type: 'string',
    default: String(attachmentDefaults.description),
    description: 'Informacion secundaria del archivo.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: String(attachmentDefaults.icon),
    description: 'Icono mostrado en la zona multimedia.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: `'${attachmentDefaults.orientation}'`,
    description: 'Orientacion del contenido.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md'",
    default: `'${attachmentDefaults.size}'`,
    description: 'Tamano del componente.',
  },
  {
    name: 'state',
    type: "'idle' | 'uploading' | 'processing' | 'error' | 'done'",
    default: `'${attachmentDefaults.state}'`,
    description: 'Estado visual y de carga.',
  },
  {
    name: 'mediaVariant',
    type: "'icon' | 'image'",
    default: `'${attachmentDefaults.mediaVariant}'`,
    description: 'Renderiza un icono o el slot de media.',
  },
  {
    name: 'ui',
    type: '{ media?: () => HTMLAttributes; content?: () => HTMLAttributes; label?: () => HTMLAttributes; description?: () => HTMLAttributes; actions?: () => HTMLAttributes }',
    default: String(attachmentDefaults.ui),
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

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Configura el archivo, su estado y el contenido multimedia.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Attachment v-bind="playgroundProps">
              <template #media>
                <div
                  class="grid size-full place-items-center bg-primary text-xs font-semibold text-primary-foreground"
                >
                  IMG
                </div>
              </template>
              <template #actions>
                <Button size="xs" variant="plain" aria-label="Remove attachment">x</Button>
              </template>
            </Attachment>
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
  "name": "fileText",
  "size": "md"
}'
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">orientation</span>
            <select
              v-model="orientation"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="horizontal">horizontal</option>
              <option value="vertical">vertical</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">size</span>
            <select
              v-model="size"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="xs">xs</option>
              <option value="sm">sm</option>
              <option value="md">md</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">state</span>
            <select
              v-model="state"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="idle">idle</option>
              <option value="uploading">uploading</option>
              <option value="processing">processing</option>
              <option value="error">error</option>
              <option value="done">done</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">mediaVariant</span>
            <select
              v-model="mediaVariant"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="icon">icon</option>
              <option value="image">image</option>
            </select>
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
