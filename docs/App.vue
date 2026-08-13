<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert } from '@/components/ui/Alert'
import { Toolbar, type ToolbarItemInput } from '@/components/ui/Toolbar'
import {
  ToggleGroup,
  type ToggleGroupItem,
  type ToggleGroupModelValue,
} from '@/components/ui/ToggleGroup'

const bold = ref(false)
const alignment = ref<ToggleGroupModelValue>('left')
const formats = ref<ToggleGroupModelValue>(['bold'])
const density = ref<ToggleGroupModelValue>('comfortable')

const alignmentItems: ToggleGroupItem[] = [
  { value: 'left', label: 'Izquierda', icon: 'chevronLeft' },
  { value: 'center', label: 'Centro' },
  { value: 'right', label: 'Derecha', trailingIcon: 'chevronRight' },
]

const formatItems: ToggleGroupItem[] = [
  { value: 'bold', label: 'Negrita' },
  { value: 'italic', label: 'Cursiva' },
  { value: 'underline', label: 'Subrayado', disabled: true },
]

const densityItems: ToggleGroupItem[] = [
  { value: 'compact', label: 'Compacta' },
  { value: 'comfortable', label: 'Cómoda' },
  { value: 'spacious', label: 'Espaciosa' },
]

const items = computed<ToolbarItemInput[]>(() => [
  {
    value: 'save',
    type: 'button',
    props: { label: 'Guardar', icon: 'save' },
  },
  {
    value: 'docs',
    type: 'link',
    props: { label: 'Documentación', to: 'https://reka-ui.com', variant: 'plain' },
  },
  { value: 'separator', type: 'separator' },
  {
    value: 'bold',
    type: 'toggle',
    props: {
      label: 'Negrita',
      icon: 'check',
      variant: 'plain',
      value: bold.value,
      'onUpdate:value': (value: boolean) => (bold.value = value),
    },
  },
  { value: 'invalid', type: 'unknown', props: { label: 'No se renderiza' } },
])
</script>

<template>
  <main class="min-h-screen bg-background p-8 text-foreground">
    <div class="mx-auto flex max-w-5xl flex-col gap-6">
      <header>
        <h1 class="text-2xl font-semibold">Component playground</h1>
        <p class="text-sm text-muted-foreground">
          Edita <code>docs/App.vue</code> para probar los componentes.
        </p>
      </header>

      <section class="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <h2 class="mb-4 font-semibold">Toolbar</h2>
        <Toolbar :items="items" aria-label="Herramientas del editor" />
      </section>

      <section class="grid gap-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <h2 class="font-semibold">ToggleGroup</h2>

        <div class="grid gap-2">
          <h3 class="text-sm font-medium">Selección única</h3>
          <ToggleGroup
            v-model:value="alignment"
            :items="alignmentItems"
            variant="outline"
            mandatory
            aria-label="Alineación"
          />
          <code class="text-xs text-muted-foreground">{{ alignment }}</code>
        </div>

        <div class="grid gap-2">
          <h3 class="text-sm font-medium">Selección múltiple</h3>
          <ToggleGroup
            v-model:value="formats"
            :items="formatItems"
            type="multiple"
            severity="primary"
            :spacing="2"
            aria-label="Formato"
          />
          <code class="text-xs text-muted-foreground">{{ formats }}</code>
        </div>

        <div class="grid gap-2">
          <h3 class="text-sm font-medium">Orientación vertical</h3>
          <ToggleGroup
            v-model:value="density"
            :items="densityItems"
            orientation="vertical"
            variant="outline"
            size="sm"
            aria-label="Densidad"
          />
          <code class="text-xs text-muted-foreground">{{ density }}</code>
        </div>
      </section>

      <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <h2 class="font-semibold">Alert</h2>

        <Alert
          label="Información"
          description="La configuración se guardará automáticamente."
          icon="info"
        />

        <Alert
          label="Cambios guardados"
          description="La nueva configuración ya está disponible."
          icon="success"
          severity="success"
          variant="subtle"
        />

        <Alert
          label="Revisa los permisos"
          description="Algunos miembros todavía no tienen acceso al proyecto."
          icon="warning"
          severity="warning"
          variant="outline"
          closable
          :close-button="{ label: 'Cerrar', variant: 'plain' }"
        />

        <Alert
          label="No se pudo completar la operación"
          description="Comprueba la conexión e inténtalo de nuevo."
          icon="error"
          severity="error"
          variant="solid"
        />

        <Alert
          label="Aviso personalizado"
          description="Este ejemplo utiliza un color CSS en lugar de una severidad predefinida."
          icon="info"
          color="#0f766e"
          variant="soft"
        />
      </section>
    </div>
  </main>
</template>
