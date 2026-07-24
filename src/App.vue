<script setup lang="ts">
import { ref } from 'vue'
import { Popover } from '@/components/app/Popover'

const controlledOpen = ref(false)
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-4xl space-y-10">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Popover</h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Ejemplos de contenido flotante, estado controlado, posicionamiento y personalizacion.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Basic</h2>
          <p class="text-sm text-muted-foreground">Trigger mediante prop y contenido por slot.</p>
        </div>

        <Popover>
          <template #trigger>
            <button
              type="button"
              class="rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-muted"
            >
              Account settings
            </button>
          </template>

          <div class="space-y-2">
            <h3 class="font-medium">Dimensions</h3>
            <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
        </Popover>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Custom trigger</h2>
          <p class="text-sm text-muted-foreground">
            Un elemento propio se integra automáticamente mediante asChild.
          </p>
        </div>

        <Popover side="bottom" align="start" :side-offset="8">
          <template #trigger>
            <button
              type="button"
              class="rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-muted"
            >
              Account settings
            </button>
          </template>

          <div class="space-y-3">
            <div>
              <h3 class="font-medium">Account settings</h3>
              <p class="text-sm text-muted-foreground">Manage your public profile.</p>
            </div>

            <div class="grid gap-2">
              <label for="popover-name" class="text-sm font-medium">Name</label>
              <input
                id="popover-name"
                value="Nonito"
                class="h-9 rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
        </Popover>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Controlled state</h2>
          <p class="text-sm text-muted-foreground">
            Estado gestionado mediante v-model:open y cierre programático.
          </p>
        </div>

        <div class="flex items-center gap-4">
          <Popover v-model:open="controlledOpen" align="center">
            <template #trigger>
              <button
                type="button"
                class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                {{ controlledOpen ? 'Popover open' : 'Open controlled popover' }}
              </button>
            </template>

            <template #default="{ close }">
              <div class="space-y-4">
                <div class="space-y-1">
                  <h3 class="font-medium">Controlled popover</h3>
                  <p class="text-sm text-muted-foreground">
                    El contenido puede cerrar el popover desde los slot props.
                  </p>
                </div>

                <button
                  type="button"
                  class="w-full rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
                  @click="close"
                >
                  Close
                </button>
              </div>
            </template>
          </Popover>

          <span class="text-sm text-muted-foreground"> open: {{ controlledOpen }} </span>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Placement and UI</h2>
          <p class="text-sm text-muted-foreground">
            Posición lateral y atributos personalizados para trigger y content.
          </p>
        </div>

        <div class="flex min-h-40 items-center justify-center rounded-xl border border-dashed">
          <Popover
            side="right"
            align="center"
            :side-offset="12"
            :ui="{
              trigger: {
                class: 'rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-xs',
              },
              content: {
                class: 'w-64 border-primary/30 bg-card',
              },
            }"
          >
            <template #trigger>
              <button>hola</button>
            </template>
            <div class="space-y-2">
              <h3 class="font-medium text-primary">Custom content</h3>
              <p class="text-sm text-muted-foreground">
                Estas clases se aplican mediante ui.content.
              </p>
            </div>
          </Popover>
        </div>
      </section>
    </div>
  </main>
</template>
