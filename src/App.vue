<script setup lang="ts">
import { ref } from 'vue'
import { Panel, type PanelProps } from '@/components/app/Panel'

const controlledOpen = ref(false)

const severities: Array<{
  severity: NonNullable<PanelProps['severity']>
  label: string
  content: string
}> = [
  {
    severity: 'primary',
    label: 'Panel primary',
    content: 'Información principal del panel.',
  },
  {
    severity: 'secondary',
    label: 'Panel secondary',
    content: 'Información secundaria del panel.',
  },
  {
    severity: 'success',
    label: 'Panel success',
    content: 'La operación se ha completado correctamente.',
  },
  {
    severity: 'error',
    label: 'Panel error',
    content: 'No se ha podido completar la operación.',
  },
  {
    severity: 'warning',
    label: 'Panel warning',
    content: 'Revisa la información antes de continuar.',
  },
]
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-4xl space-y-10">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Panel</h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Paneles contextuales expandibles con variantes, iconos y slots personalizados.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Básico</h2>
          <p class="text-sm text-muted-foreground">
            Es expandible por defecto y utiliza severity primary y variant solid.
          </p>
        </div>

        <Panel label="Configuración general">
          <p class="text-sm text-muted-foreground">
            Desde este panel puedes administrar la configuración principal de la aplicación.
          </p>
        </Panel>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Severities</h2>
          <p class="text-sm text-muted-foreground">Primary, secondary, success, error y warning.</p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <Panel
            v-for="item in severities"
            :key="item.severity"
            :severity="item.severity"
            :label="item.label"
          >
            <p class="text-sm text-muted-foreground">{{ item.content }}</p>
          </Panel>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Variantes de Button</h2>
          <p class="text-sm text-muted-foreground">
            El trigger utiliza solid, outlined, plain, subtle y soft del componente Button.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <Panel
            v-for="buttonVariant in ['solid', 'outlined', 'plain', 'subtle', 'soft'] as const"
            :key="buttonVariant"
            :variant="buttonVariant"
            severity="primary"
            :label="`Variant ${buttonVariant}`"
          >
            <p class="text-sm text-muted-foreground">
              El borde del contenedor se calcula con severity, mientras el trigger usa
              {{ buttonVariant }}.
            </p>
          </Panel>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Color personalizado</h2>
          <p class="text-sm text-muted-foreground">
            Color se aplica al Button y se reutiliza para calcular el borde del contenedor.
          </p>
        </div>

        <Panel label="Panel violeta" color="#7c3aed" variant="solid">
          <p class="text-sm text-muted-foreground">
            El contraste del trigger y el borde se calculan a partir del color personalizado.
          </p>
        </Panel>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Icono</h2>
          <p class="text-sm text-muted-foreground">
            nameIcon selecciona el icono e iconProps permite personalizarlo.
          </p>
        </div>

        <Panel
          label="Información del sistema"
          name-icon="info"
          severity="secondary"
          :icon-props="{
            size: 'lg',
            class: 'opacity-80',
          }"
        >
          <dl class="grid gap-2 text-sm">
            <div class="flex justify-between gap-4">
              <dt class="font-medium">Versión</dt>
              <dd class="text-muted-foreground">0.1.0</dd>
            </div>
            <div class="flex justify-between gap-4">
              <dt class="font-medium">Entorno</dt>
              <dd class="text-muted-foreground">Development</dd>
            </div>
          </dl>
        </Panel>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Estado controlado</h2>
          <p class="text-sm text-muted-foreground">
            El estado se sincroniza mediante v-model:open.
          </p>
        </div>

        <Panel
          v-model:open="controlledOpen"
          severity="success"
          name-icon="success"
          label="Proceso completado"
        >
          <p class="text-sm text-muted-foreground">
            El panel está {{ controlledOpen ? 'abierto' : 'cerrado' }}.
          </p>
        </Panel>

        <p class="text-sm text-muted-foreground">open: {{ controlledOpen }}</p>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Slots personalizados</h2>
          <p class="text-sm text-muted-foreground">
            Los slots icon, label y arrows reemplazan el contenido predeterminado.
          </p>
        </div>

        <Panel severity="warning" default-open>
          <template #icon>
            <span class="grid size-6 place-items-center rounded-full bg-black/10 text-xs font-bold">
              !
            </span>
          </template>

          <template #label="{ open }">
            Revisión necesaria · {{ open ? 'abierto' : 'cerrado' }}
          </template>

          <template #arrows="{ open }">
            <span class="text-lg leading-none">{{ open ? '−' : '+' }}</span>
          </template>

          <p class="text-sm text-muted-foreground">
            Comprueba todos los datos antes de enviar el formulario.
          </p>
        </Panel>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">No expandible</h2>
          <p class="text-sm text-muted-foreground">
            No muestra flechas, la cabecera no es interactiva y el contenido siempre está visible.
          </p>
        </div>

        <Panel label="Resumen permanente" name-icon="check" severity="primary" :expandable="false">
          <p class="text-sm text-muted-foreground">
            Este contenido forma parte fija del panel y no puede contraerse.
          </p>
        </Panel>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Custom UI</h2>
          <p class="text-sm text-muted-foreground">
            Cada nodo puede personalizarse mediante el objeto ui.
          </p>
        </div>

        <Panel
          label="Panel personalizado"
          severity="secondary"
          :ui="{
            root: { class: 'rounded-xl shadow-lg' },
            header: { class: 'py-4 text-base' },
            label: { class: 'tracking-wide' },
            content: { class: 'bg-muted/40 p-6' },
          }"
        >
          <p class="text-sm text-muted-foreground">
            El radio, la sombra, la cabecera y el cuerpo se han modificado desde ui.
          </p>
        </Panel>
      </section>
    </div>
  </main>
</template>
