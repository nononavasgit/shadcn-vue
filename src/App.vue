<script setup>
import { ref } from 'vue'
import { Breadcrumb, Checkbox, Input, Kbd, KbdGroup, Switch, Textarea, Time } from '@/components/ui'
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

const switchValue = ref(false)
const checkboxValue = ref(false)

const switchUI = {
  root: ({ checked }) => ({
    class: checked ? 'data-[state=checked]:bg-success' : undefined,
  }),
}

const checkboxUI = {
  root: ({ state }) => ({
    class: state === true ? 'ring-2 ring-primary/30' : undefined,
  }),
}

const timeValue = '2026-08-07T12:30:00.000Z'

const timeUI = {
  root: ({ date }) => ({
    class: 'font-medium text-primary',
    title: date,
  }),
}

const kbdUI = {
  root: ({ props }) => ({
    class: props.label === 'Ctrl' ? 'bg-primary/10 text-primary' : undefined,
  }),
}

const kbdGroupUI = {
  root: () => ({
    class: 'rounded-md border border-dashed p-2',
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
            <span class=""> ...... </span>
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

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Switch y Checkbox examples</h2>

        <div class="flex flex-wrap items-center gap-6">
          <label>
            <Switch :model-value="true"></Switch>
            Si
          </label>
          <label class="flex items-center gap-2 text-sm">
            <Switch v-model="switchValue" :ui="switchUI">
              <template #thumb="{ checked }">
                <span v-if="checked" class="text-[10px] text-primary">✓</span>
              </template>
            </Switch>
            Activar notificaciones
          </label>

          <label class="flex items-center gap-2 text-sm">
            <Checkbox v-model="checkboxValue" :ui="checkboxUI">
              <template #indicator="{ state }">
                <span class="text-xs">{{ state === 'indeterminate' ? '−' : '✓' }}</span>
              </template>
            </Checkbox>
            Aceptar condiciones
          </label>
        </div>

        <div class="space-y-1 text-sm text-muted-foreground">
          <p>Switch: {{ switchValue ? 'activado' : 'desactivado' }}</p>
          <p>Checkbox: {{ checkboxValue ? 'marcado' : 'sin marcar' }}</p>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Time y Kbd examples</h2>

        <div class="space-y-3">
          <Time :datetime="timeValue" :ui="timeUI">
            <template #default="{ date, props }">
              <span :title="props.locale?.toString()">{{ date }}</span>
            </template>
          </Time>

          <div class="flex items-center gap-2">
            <span>Atajo:</span>
            <Kbd label="Ctrl" :ui="kbdUI">
              <template #default="{ props }">
                {{ props.label }}
              </template>
            </Kbd>
            <span>+</span>
            <Kbd label="K">K</Kbd>
          </div>

          <KbdGroup :ui="kbdGroupUI">
            <Kbd label="Ctrl" />
            <span>+</span>
            <Kbd label="K" />
          </KbdGroup>
        </div>
      </section>
    </main>
  </ConfigProvider>
</template>
