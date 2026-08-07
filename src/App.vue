<script setup>
import { ref } from 'vue'
import { Breadcrumb, Input, Textarea } from '@/components/ui'
import { ConfigProvider } from '@/components/provider'

const breadcrumbItems = [
  { id: 'home', label: 'Inicio', to: '/', icon: 'user' },
  { id: 'projects', label: 'Proyectos', to: '/projects' },
  { id: 'current', label: 'Configuración' },
]

const breadcrumbItemsWithEllipsis = [
  { id: 'home', label: 'Inicio', to: '/' },
  { id: 'workspace', label: 'Workspace', to: '/workspace' },
  { id: 'projects', label: 'Proyectos', to: '/projects' },
  { id: 'settings', label: 'Configuración', to: '/settings' },
  { id: 'profile', label: 'Perfil' },
]

const breadcrumbUI = {
  root: ({ props }) => ({
    'aria-label': props.ellipsisIndex === undefined ? 'Ruta de navegación' : 'Ruta resumida',
  }),
  item: ({ first }) => ({
    class: first ? 'font-medium' : undefined,
  }),
  label: ({ last }) => ({
    class: last ? 'font-semibold' : undefined,
  }),
}

const inputValue = ref('Texto editable')
const textareaValue = ref('Contenido inicial del textarea')

const inputUI = {
  root: ({ props }) => ({
    class: props.modelValue ? 'border-primary ring-1 ring-primary/20' : undefined,
  }),
}

const textareaUI = {
  root: ({ props }) => ({
    class: props.modelValue ? 'border-success ring-1 ring-success/20' : undefined,
  }),
}
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto min-h-screen max-w-2xl space-y-8 p-6 md:p-10">
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Breadcrumb examples</h2>

        <Breadcrumb :items="breadcrumbItems" :ui="breadcrumbUI" :separator-icon="'chevronDown'" />

        <Breadcrumb
          :items="breadcrumbItemsWithEllipsis"
          :ellipsis-index="[1, 3]"
          :ui="breadcrumbUI"
        >
          <template #ellipsis>
            <span class=""> ... </span>
          </template>

          <template #separator="{ props }">
            <li
              class="px-1 text-muted-foreground/60"
              :aria-label="'Separador en ' + props.items.length + ' items'"
            >
              /
            </li>
          </template>
        </Breadcrumb>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Input y Textarea examples</h2>

        <div class="grid gap-4 sm:grid-cols-2">
          <Input default-value="Valor inicial" placeholder="Input con valor por defecto" />

          <Input v-model="inputValue" placeholder="Input con v-model" :ui="inputUI" />
        </div>

        <Textarea v-model="textareaValue" placeholder="Escribe una descripción" :ui="textareaUI" />

        <div class="space-y-1 text-sm text-muted-foreground">
          <p>Input: {{ inputValue }}</p>
          <p>Textarea: {{ textareaValue }}</p>
        </div>
      </section>
    </main>
  </ConfigProvider>
</template>
