<script setup>
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Dialog, Empty, HoverCard, Tabs } from '@/components/ui'

const activeTab = ref('overview')
const dialogOpen = ref(false)

const tabs = [
  {
    id: 'overview',
    value: 'overview',
    label: 'Resumen',
    icon: 'minus',
    content: 'Resumen general del proyecto.',
  },
  {
    id: 'activity',
    value: 'activity',
    label: 'Actividad',
    icon: 'user',
    content: 'Aquí puedes consultar la actividad reciente.',
  },
  {
    id: 'settings',
    value: 'settings',
    label: 'Configuración',
    icon: 'search',
    content: 'Gestiona las preferencias del proyecto.',
  },
]

const tabsUI = {
  trigger: ({ active }) => ({
    class: active ? 'font-semibold' : undefined,
    xd: 'xd',
  }),
  content: ({ active }) => ({
    class: active ? 'border-primary' : undefined,
  }),
}

const emptyUI = {
  root: ({ props }) => ({
    class: props.mediaVariant === 'icon' ? 'min-h-64' : 'min-h-48',
  }),
}

const hoverCardUI = {
  content: ({ open }) => ({
    class: open ? 'border-primary' : undefined,
  }),
}
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto min-h-screen max-w-3xl space-y-10 p-6 md:p-10">
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Tabs examples</h2>

        <Tabs
          v-model="activeTab"
          :tabs="tabs"
          variant="default"
          :ui="tabsUI"
          :orientation="'vertical'"
        >
          <template #content="{ tab }">
            <div class="rounded-md border p-4">
              {{ tab.content }}
            </div>
          </template>
        </Tabs>

        <p class="text-sm text-muted-foreground">Pestaña activa: {{ activeTab }}</p>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Dialog examples</h2>

        <Dialog v-model:open="dialogOpen" label="Editar proyecto" icon="edit">
          <template #default="{ open }">
            <button class="rounded-md border px-3 py-2 text-sm hover:bg-muted">
              {{ open ? 'Diálogo abierto' : 'Abrir diálogo' }}
            </button>
          </template>

          <template #content="{ close }">
            <p class="text-sm text-muted-foreground">
              El contenido recibe el contexto del diálogo y puede cerrarlo directamente.
            </p>
            <button class="mt-4 rounded-md border px-3 py-2 text-sm hover:bg-muted" @click="close">
              Cerrar desde el contexto
            </button>
          </template>
        </Dialog>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Empty examples</h2>

        <Empty
          label="No hay proyectos"
          description="Crea tu primer proyecto para empezar a trabajar."
          media-variant="icon"
          :ui="emptyUI"
        >
          <template #media>
            <span class="text-2xl">📁</span>
          </template>

          <button class="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">
            Crear proyecto
          </button>
        </Empty>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">HoverCard examples</h2>

        <div class="flex flex-wrap items-center gap-4">
          <HoverCard label="Información adicional sobre este elemento.">
            <template #default>
              <button class="rounded-md border px-3 py-2 text-sm hover:bg-muted">
                HoverCard con label
              </button>
            </template>
          </HoverCard>

          <HoverCard :ui="hoverCardUI" show-arrow>
            <template #default="{ open }">
              <button class="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">
                {{ open ? 'Tarjeta abierta' : 'Pasar el ratón' }}
              </button>
            </template>

            <template #content="{ close }">
              <div class="space-y-3">
                <div>
                  <h3 class="font-medium">Perfil de usuario</h3>
                  <p class="text-sm text-muted-foreground">
                    Este contenido recibe el contexto del HoverCard.
                  </p>
                </div>
                <button class="rounded-md border px-3 py-2 text-sm hover:bg-muted" @click="close">
                  Cerrar
                </button>
              </div>
            </template>
          </HoverCard>
        </div>
      </section>
    </main>
  </ConfigProvider>
</template>
