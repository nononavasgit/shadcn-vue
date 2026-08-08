<script setup lang="ts">
import { computed, ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Toolbar } from '@/components/ui'
import type { ToolbarItem } from '@/components/ui/Toolbar'
import type { ToggleGroupModelValue } from '@/components/ui/ToggleGroup'

const bold = ref(false)
const italic = ref(true)
const alignment = ref<ToggleGroupModelValue>('left')
const saveCount = ref(0)

const editorItems = computed<ToolbarItem[]>(() => [
  {
    value: 'save',
    type: 'button',
    props: {
      label: 'Guardar',
      icon: 'save',
      size: 'sm',
      onClick: () => {
        saveCount.value += 1
      },
    },
  },
  {
    value: 'documentation',
    type: 'link',
    props: {
      label: 'Documentación',
      to: '/Documentation',
      variant: 'plain',
      size: 'sm',
    },
  },
  {
    value: 'separator-actions',
    type: 'separator',
    props: {
      orientation: 'vertical',
      ui: {
        root: { class: 'mx-1 h-6' },
      },
    },
  },
  {
    value: 'bold',
    type: 'toggle',
    props: {
      label: 'B',
      value: bold.value,
      size: 'sm',
      variant: 'outline',
      ui: {
        root: { 'aria-label': 'Negrita' },
      },
      'onUpdate:value': (value) => {
        bold.value = value === true
      },
    },
  },
  {
    value: 'italic',
    type: 'toggle',
    props: {
      label: 'I',
      value: italic.value,
      size: 'sm',
      variant: 'outline',
      ui: {
        root: { 'aria-label': 'Cursiva' },
      },
      'onUpdate:value': (value) => {
        italic.value = value === true
      },
    },
  },
  {
    value: 'separator-format',
    type: 'separator',
    props: {
      orientation: 'vertical',
      ui: {
        root: { class: 'mx-1 h-6' },
      },
    },
  },
  {
    value: 'alignment',
    type: 'toggleGroup',
    props: {
      type: 'single',
      value: alignment.value,
      mandatory: true,
      variant: 'outline',
      size: 'sm',
      items: [
        { id: 'left', value: 'left', label: 'Izq.' },
        { id: 'center', value: 'center', label: 'Centro' },
        { id: 'right', value: 'right', label: 'Der.' },
      ],
      'onUpdate:value': (value) => {
        alignment.value = value
      },
    },
  },
  {
    value: 'status',
    type: 'custom',
    props: {
      label: 'Guardado',
    },
  },
])

const verticalItems: ToolbarItem[] = [
  {
    value: 'search',
    type: 'button',
    props: {
      label: 'Buscar',
      icon: 'search',
      variant: 'plain',
      severity: 'secondary',
    },
  },
  {
    value: 'vertical-separator',
    type: 'separator',
    props: {
      orientation: 'horizontal',
      ui: {
        root: { class: 'my-1 w-full' },
      },
    },
  },
  {
    value: 'notifications',
    type: 'toggle',
    props: {
      label: 'Notificaciones',
      value: true,
      variant: 'plain',
      severity: 'secondary',
    },
  },
  {
    value: 'profile',
    type: 'custom',
  },
]

const toolbarUI = {
  root: {
    class: 'w-full max-w-4xl',
  },
  item: ({ item }: { item: ToolbarItem }) => ({
    class: item.type === 'custom' ? 'last:ms-auto' : undefined,
  }),
}
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
      <header class="space-y-2">
        <h1 class="text-3xl font-semibold">Toolbar examples</h1>
        <p class="text-muted-foreground">
          Items tipados, modelos controlados, acciones y contenido personalizado.
        </p>
      </header>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Editor</h2>

        <Toolbar :items="editorItems" :ui="toolbarUI">
          <template #item-status>
            <span class="rounded-full bg-success/10 px-3 py-1 text-sm text-success">
              Guardado
            </span>
          </template>
        </Toolbar>

        <div class="grid gap-2 text-sm text-muted-foreground sm:grid-cols-4">
          <span>Guardados: {{ saveCount }}</span>
          <span>Negrita: {{ bold }}</span>
          <span>Cursiva: {{ italic }}</span>
          <span>Alineación: {{ alignment }}</span>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Orientación vertical</h2>

        <Toolbar orientation="vertical" :items="verticalItems">
          <template #item-profile="{ item, index }">
            <button
              class="w-full rounded-md border px-4 py-2 text-left text-sm hover:bg-muted"
              type="button"
            >
              Custom {{ item.value }} · {{ index }}
            </button>
          </template>
        </Toolbar>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Slot custom global</h2>

        <Toolbar
          :items="[
            { value: 'first-custom', type: 'custom' },
            { value: 'separator', type: 'separator', props: { orientation: 'vertical' } },
            { value: 'second-custom', type: 'custom' },
          ]"
        >
          <template #custom="{ item }">
            <span class="rounded-md bg-muted px-3 py-2 text-sm">
              {{ item.value }}
            </span>
          </template>
        </Toolbar>
      </section>
    </main>
  </ConfigProvider>
</template>
