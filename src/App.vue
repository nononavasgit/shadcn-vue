<script setup>
import { Breadcrumb } from '@/components/ui'
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
    </main>
  </ConfigProvider>
</template>
