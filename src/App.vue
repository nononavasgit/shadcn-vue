<script setup lang="ts">
import { ref } from 'vue'
import {
  ToggleGroup,
  type ToggleGroupItem as ToggleGroupItemData,
  type ToggleGroupValue,
} from '@/components/ui/ToggleGroup'
import { Tabs, type TabItem, type TabsValue } from '@/components/ui/Tabs'
import { Button } from '@/components/ui/Button'
import { Empty } from '@/components/ui/Empty'

const alignmentItems: ToggleGroupItemData[] = [
  { id: 'left', value: 'left', label: 'Izquierda', icon: 'chevronLeft' },
  { id: 'center', value: 'center', label: 'Centro', icon: 'minus' },
  { id: 'right', value: 'right', label: 'Derecha', icon: 'chevronRight' },
]

const formatItems: ToggleGroupItemData[] = [
  { id: 'bold', value: 'bold', label: 'Negrita' },
  { id: 'italic', value: 'italic', label: 'Cursiva' },
  { id: 'underline', value: 'underline', label: 'Subrayado' },
]

const viewItems: ToggleGroupItemData[] = [
  { id: 'list', value: 'list', label: 'Lista' },
  { id: 'grid', value: 'grid', label: 'Cuadrícula' },
  { id: 'detail', value: 'detail', label: 'Detalle', disabled: true },
]

const variants = ['plain', 'outline'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const
const severities = ['default', 'primary', 'secondary', 'warning', 'success', 'error'] as const

const alignment = ref<ToggleGroupValue>('center')
const formats = ref<ToggleGroupValue[]>(['bold', 'underline'])
const verticalValue = ref<ToggleGroupValue>('list')
const customValue = ref<ToggleGroupValue[]>(['list'])

const accountTabs: TabItem[] = [
  {
    id: 'account',
    value: 'account',
    label: 'Cuenta',
    content:
      'Gestiona la información pública de tu cuenta, el nombre visible y las preferencias principales del perfil.',
  },
  {
    id: 'security',
    value: 'security',
    label: 'Seguridad',
    content:
      'Configura la contraseña, la autenticación en dos pasos y revisa las sesiones que permanecen activas.',
  },
  {
    id: 'billing',
    value: 'billing',
    label: 'Facturación',
    content:
      'Consulta el plan actual, descarga facturas anteriores y actualiza el método de pago predeterminado.',
  },
]

const iconTabs: TabItem[] = [
  { id: 'search', value: 'search', label: 'Buscar', icon: 'search', forceMount: true },
  { id: 'saved', value: 'saved', label: 'Guardado', icon: 'save' },
  { id: 'alerts', value: 'alerts', label: 'Alertas', icon: 'warning' },
  { id: 'disabled', value: 'disabled', label: 'Bloqueado', icon: 'x', disabled: true },
]

const activeAccountTab = ref<TabsValue>('account')
const activeIconTab = ref<TabsValue>('search')
</script>

<template>
  <main class="mx-auto min-h-screen max-w-6xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">ToggleGroup</h1>
      <p class="max-w-3xl text-muted-foreground">
        Ejemplos de selección única y múltiple con las variantes plain y outline.
      </p>
    </header>

    <section class="grid gap-6 rounded-xl border p-5 md:grid-cols-2">
      <div class="space-y-3">
        <div>
          <h2 class="text-lg font-semibold">Selección única</h2>
          <p class="text-sm text-muted-foreground">Valor: {{ alignment }}</p>
        </div>

        <ToggleGroup v-model="alignment" mandatory disabled :items="alignmentItems" />
      </div>

      <div class="space-y-3">
        <div>
          <h2 class="text-lg font-semibold">Selección múltiple</h2>
          <p class="text-sm text-muted-foreground">
            Valores: {{ formats.join(', ') || 'ninguno' }}
          </p>
        </div>

        <ToggleGroup
          v-model="formats"
          type="multiple"
          disabled
          variant="outline"
          :items="formatItems"
        />
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Variantes y separación</h2>
        <p class="text-sm text-muted-foreground">
          Con spacing 0 los elementos permanecen unidos; con spacing mayor se separan.
        </p>
      </div>

      <div v-for="(variant, index) in variants" :key="variant" class="flex flex-wrap gap-4">
        <span class="w-16 self-center text-sm font-medium">{{ variant }}</span>
        <ToggleGroup
          :default-value="index === 0 ? 'center' : 'left'"
          :variant="variant"
          :spacing="index * 2"
          :items="alignmentItems"
        />
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Tamaños</h2>
        <p class="text-sm text-muted-foreground">Los cuatro tamaños heredados de Toggle.</p>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <ToggleGroup
          v-for="size in sizes"
          :key="size"
          default-value="center"
          variant="outline"
          :size="size"
          :items="alignmentItems"
        />
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Severidades</h2>
        <p class="text-sm text-muted-foreground">Cada severidad funciona en plain y outline.</p>
      </div>

      <div v-for="severity in severities" :key="severity" class="flex flex-wrap items-center gap-4">
        <span class="w-20 text-sm font-medium">{{ severity }}</span>
        <ToggleGroup
          v-for="variant in variants"
          :key="variant"
          default-value="center"
          :variant="variant"
          :severity="severity"
          :items="alignmentItems"
        />
      </div>
    </section>

    <section class="grid gap-6 rounded-xl border p-5 md:grid-cols-2">
      <div class="space-y-3">
        <div>
          <h2 class="text-lg font-semibold">Orientación vertical</h2>
          <p class="text-sm text-muted-foreground">Incluye un elemento deshabilitado.</p>
        </div>

        <ToggleGroup
          v-model="verticalValue"
          orientation="vertical"
          variant="outline"
          :items="viewItems"
        />
      </div>

      <div class="space-y-3">
        <div>
          <h2 class="text-lg font-semibold">Color y slots</h2>
          <p class="text-sm text-muted-foreground">
            Slot individual para grid e indicador global al final.
          </p>
        </div>

        <ToggleGroup
          v-model="customValue"
          type="multiple"
          color="#7c3aed"
          variant="outline"
          :spacing="2"
          :items="viewItems"
        >
          <template #leading-grid>
            <span aria-hidden="true" class="font-mono text-xs">#</span>
          </template>

          <template #trailing="{ selected }">
            <span v-if="selected" aria-hidden="true" class="text-xs">✓</span>
          </template>
        </ToggleGroup>
      </div>
    </section>

    <header class="space-y-2 border-t pt-10">
      <h1 class="text-3xl font-bold">Tabs</h1>
      <p class="max-w-3xl text-muted-foreground">
        Variantes default y line, orientación vertical, iconos, slots y activación manual.
      </p>
    </header>

    <section class="grid gap-6 rounded-xl border p-5 lg:grid-cols-2">
      <div class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Pestañas clásicas</h2>
          <p class="text-sm text-muted-foreground">
            Tab activa: {{ activeAccountTab }}. Personalizadas únicamente mediante ui.
          </p>
        </div>

        <Tabs
          v-model="activeAccountTab"
          :tabs="accountTabs"
          :ui="{
            list: {
              class: 'h-auto justify-start gap-0 rounded-none bg-transparent p-0 gap-[1px]',
            },
            trigger: {
              class:
                'rounded-b-none border border-border bg-muted px-4 py-2 data-[state=active]:border-b-background data-[state=active]:bg-background data-[state=active]:shadow-none',
            },
            contentWrapper: {
              class: 'border',
            },
            content: {
              class: 'bg-background p-4 text-sm',
            },
          }"
        />
      </div>

      <div class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Variante line</h2>
          <p class="text-sm text-muted-foreground">
            La selección se representa mediante una línea inferior.
          </p>
        </div>

        <Tabs
          default-value="security"
          variant="line"
          :tabs="accountTabs"
          :ui="{
            content: {
              class: 'border-t p-4 text-sm',
            },
          }"
        />
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Orientación vertical</h2>
        <p class="text-sm text-muted-foreground">
          Las dos variantes adaptan su distribución y la posición del indicador.
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-2">
        <Tabs
          default-value="account"
          orientation="vertical"
          :tabs="accountTabs"
          :ui="{
            list: {
              class: 'min-w-32',
            },
            content: {
              class: 'min-h-40 rounded-lg border p-4 text-sm',
            },
          }"
        />

        <Tabs
          default-value="billing"
          orientation="vertical"
          variant="line"
          :tabs="accountTabs"
          :ui="{
            list: {
              class: 'min-w-32',
            },
            content: {
              class: 'min-h-40 border-l p-4 text-sm',
            },
          }"
        />
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Iconos, estado y slots</h2>
        <p class="text-sm text-muted-foreground">
          Activación manual, contenido persistente, un tab deshabilitado y slots personalizados.
        </p>
      </div>

      <Tabs
        v-model="activeIconTab"
        activation-mode="manual"
        :unmount-on-hide="false"
        variant="line"
        :tabs="iconTabs"
        :ui="{
          list: {
            class: 'w-full justify-start',
            'aria-label': 'Herramientas',
          },
          trigger: ({ tab, active }) => ({
            'aria-label': `Abrir ${tab.label}`,
            class: active ? 'font-semibold' : '',
          }),
          content: {
            class: 'min-h-28 rounded-lg border p-4',
          },
        }"
      >
        <template #trailing="{ active }">
          <span v-if="active" aria-hidden="true" class="size-1.5 rounded-full bg-current" />
        </template>

        <template #content-search="{ tab }">
          <div class="space-y-2">
            <h3 class="font-semibold">{{ tab.label }}</h3>
            <p class="text-sm text-muted-foreground">
              Este panel usa el slot individual content-search y permanece montado al cambiar de
              tab.
            </p>
          </div>
        </template>

        <template #content="{ tab, active }">
          <div class="space-y-2">
            <h3 class="font-semibold">{{ tab.label }}</h3>
            <p class="text-sm text-muted-foreground">
              Panel generado con el slot global. Estado actual:
              {{ active ? 'activo' : 'inactivo' }}.
            </p>
          </div>
        </template>
      </Tabs>
    </section>

    <header class="space-y-2 border-t pt-10">
      <h1 class="text-3xl font-bold">Empty</h1>
      <p class="max-w-3xl text-muted-foreground">
        Estados vacíos con props, media, acciones, slots y personalización mediante ui.
      </p>
    </header>

    <section class="grid gap-6 md:grid-cols-2">
      <Empty
        class="min-h-72 border"
        label="No hay elementos"
        description="Todavía no has creado ningún elemento. Empieza creando el primero."
      >
        <Button label="Crear elemento" />
      </Empty>

      <Empty
        class="min-h-72 border border-dashed"
        label="No hay proyectos"
        description="Crea un proyecto para organizar y compartir tu trabajo."
        media-variant="icon"
      >
        <template #media>
          <span aria-hidden="true" class="text-xl">+</span>
        </template>

        <div class="flex flex-wrap justify-center gap-2">
          <Button label="Nuevo proyecto" />
          <Button label="Importar" variant="outline" />
        </div>
      </Empty>

      <Empty
        class="min-h-72 border bg-gradient-to-b from-muted/50 to-background md:col-span-2"
        media-variant="icon"
        :ui="{
          header: { class: 'max-w-md' },
          media: { class: 'size-14 rounded-full text-primary' },
          label: { class: 'text-primary' },
          content: { class: 'max-w-md' },
        }"
      >
        <template #media>
          <span aria-hidden="true" class="text-xl">✓</span>
        </template>

        <template #label>Estás al día</template>

        <template #description>
          No tienes notificaciones pendientes. Vuelve más tarde para comprobar las novedades.
        </template>

        <Button label="Actualizar" variant="soft" />
      </Empty>
    </section>
  </main>
</template>
