<script setup lang="ts">
import { ref } from 'vue'
import { ChevronsUpDown } from '@lucide/vue'
import { Collapsible } from '@/components/app/Collapsible'

const controlledOpen = ref(false)
const persistentOpen = ref(false)
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-3xl space-y-10">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Collapsible</h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Ejemplos de paneles desplegables controlados y no controlados.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Básico</h2>
          <p class="text-sm text-muted-foreground">
            El slot por defecto es el trigger y el slot content contiene el panel.
          </p>
        </div>

        <Collapsible class="w-full max-w-md space-y-2">
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-md border bg-background px-4 py-3 text-left text-sm font-medium shadow-xs hover:bg-muted"
          >
            ¿Puedo utilizar esta librería en mi proyecto?
            <ChevronsUpDown class="size-4" />
          </button>

          <template #content>
            <div class="rounded-md border px-4 py-3 text-sm text-muted-foreground">
              Sí. Puedes utilizarla en proyectos personales y comerciales.
            </div>
          </template>
        </Collapsible>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Abierto inicialmente</h2>
          <p class="text-sm text-muted-foreground">
            defaultOpen establece el estado inicial sin controlar el componente.
          </p>
        </div>

        <Collapsible default-open class="w-full max-w-md space-y-2">
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-md border bg-background px-4 py-3 text-left text-sm font-medium shadow-xs hover:bg-muted"
          >
            Repositorios destacados
            <ChevronsUpDown class="size-4" />
          </button>

          <template #content>
            <div class="grid gap-2">
              <div class="rounded-md border px-4 py-2 font-mono text-sm">@unovue/reka-ui</div>
              <div class="rounded-md border px-4 py-2 font-mono text-sm">shadcn-vue</div>
            </div>
          </template>
        </Collapsible>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Estado controlado</h2>
          <p class="text-sm text-muted-foreground">
            v-model:open permite consultar y modificar el estado desde fuera.
          </p>
        </div>

        <Collapsible v-model:open="controlledOpen" class="w-full max-w-md space-y-2">
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-md bg-primary px-4 py-3 text-left text-sm font-medium text-primary-foreground"
          >
            {{ controlledOpen ? 'Ocultar detalles' : 'Mostrar detalles' }}
            <ChevronsUpDown class="size-4" />
          </button>

          <template #content="{ open }">
            <div class="rounded-md border bg-card px-4 py-3 text-sm">
              El panel está {{ open ? 'abierto' : 'cerrado' }} y su estado se sincroniza con el
              modelo.
            </div>
          </template>
        </Collapsible>

        <p class="text-sm text-muted-foreground">open: {{ controlledOpen }}</p>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Contenido persistente</h2>
          <p class="text-sm text-muted-foreground">
            Con unmountOnHide=false, el contenido permanece en el DOM cuando está cerrado.
          </p>
        </div>

        <Collapsible
          v-model:open="persistentOpen"
          :unmount-on-hide="false"
          class="w-full max-w-md space-y-2"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-md border bg-background px-4 py-3 text-left text-sm font-medium shadow-xs hover:bg-muted"
          >
            Preferencias avanzadas
            <ChevronsUpDown class="size-4" />
          </button>

          <template #content>
            <div class="rounded-md border border-dashed px-4 py-3 text-sm text-muted-foreground">
              Este contenido puede encontrarse con la búsqueda del navegador incluso cerrado.
            </div>
          </template>
        </Collapsible>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Custom UI</h2>
          <p class="text-sm text-muted-foreground">
            Los atributos de trigger y content se personalizan mediante ui.
          </p>
        </div>

        <Collapsible
          class="w-full max-w-md"
          :ui="{
            trigger: {
              class:
                'flex w-full items-center justify-between rounded-t-lg border border-primary/30 bg-primary/10 px-4 py-3 text-left text-sm font-medium text-primary',
            },
            content: {
              class: 'rounded-b-lg border border-t-0 border-primary/30 bg-primary/5 p-4 text-sm',
            },
          }"
        >
          <button type="button">
            Configuración personalizada
            <ChevronsUpDown class="size-4" />
          </button>

          <template #content> Estas clases se aplican desde ui.trigger y ui.content. </template>
        </Collapsible>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Disabled</h2>
          <p class="text-sm text-muted-foreground">El trigger no puede cambiar el estado.</p>
        </div>

        <Collapsible disabled class="w-full max-w-md">
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-md border bg-muted px-4 py-3 text-left text-sm font-medium opacity-50"
          >
            Sección no disponible
            <ChevronsUpDown class="size-4" />
          </button>

          <template #content>Contenido deshabilitado.</template>
        </Collapsible>
      </section>
    </div>
  </main>
</template>
