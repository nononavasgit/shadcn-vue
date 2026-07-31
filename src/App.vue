<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Popover } from '@/components/ui/Popover'

const controlledOpen = ref(false)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-4xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Popover</h1>
      <p class="text-muted-foreground">
        Ejemplos con props agrupadas, posiciones, estado controlado y personalización mediante ui.
      </p>
    </header>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Uso básico</h2>
        <p class="text-sm text-muted-foreground">Trigger y contenido mediante slots.</p>
      </div>

      <Popover>
        <Button label="Abrir popover" variant="outline" />

        <template #content="{ close }">
          <div class="space-y-4">
            <div class="space-y-1">
              <h3 class="font-semibold">Preferencias</h3>
              <p class="text-sm text-muted-foreground">
                Configura las opciones principales de tu cuenta.
              </p>
            </div>
            <Button label="Cerrar" size="sm" class="w-full" @click="close" />
          </div>
        </template>
      </Popover>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Posiciones</h2>
        <p class="text-sm text-muted-foreground">
          Las opciones de posición pertenecen al objeto content.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        <Popover
          v-for="side in ['top', 'right', 'bottom', 'left'] as const"
          :key="side"
          :content="{ side, sideOffset: 8 }"
        >
          <Button :label="side" variant="outline" />

          <template #content>
            <p class="text-sm">Popover situado en {{ side }}.</p>
          </template>
        </Popover>
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Props agrupadas</h2>
        <p class="text-sm text-muted-foreground">
          Trigger y content contienen únicamente las props funcionales de cada pieza.
        </p>
      </div>

      <Popover
        :trigger="{ asChild: true }"
        :content="{
          side: 'bottom',
          align: 'start',
          alignOffset: 12,
          sideOffset: 8,
          sticky: 'always',
          forceMount: true,
        }"
      >
        <Button label="Configuración avanzada" />

        <template #content="{ close }">
          <form class="space-y-4" @submit.prevent="close">
            <div class="space-y-1">
              <label for="popover-width" class="text-sm font-medium">Anchura</label>
              <input
                id="popover-width"
                value="320px"
                class="h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div class="space-y-1">
              <label for="popover-height" class="text-sm font-medium">Altura</label>
              <input
                id="popover-height"
                value="240px"
                class="h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <Button type="submit" label="Aplicar" size="sm" class="w-full" />
          </form>
        </template>
      </Popover>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Personalización con ui</h2>
        <p class="text-sm text-muted-foreground">
          Root, trigger y content admiten exclusivamente atributos HTML.
        </p>
      </div>

      <Popover
        :content="{ side: 'right', sideOffset: 12 }"
        :ui="{
          root: { 'data-example': 'custom-popover' },
          trigger: { class: 'rounded-xl ring-2 ring-primary/20' },
          content: {
            class: 'w-80 border-2 border-primary/30 bg-primary/5 shadow-xl',
          },
        }"
      >
        <Button label="Popover personalizado" />

        <template #content="{ close }">
          <div class="space-y-3">
            <h3 class="font-semibold text-primary">Contenido personalizado</h3>
            <p class="text-sm text-muted-foreground">Las clases proceden de ui.content.</p>
            <Button label="Entendido" size="sm" variant="outline" @click="close" />
          </div>
        </template>
      </Popover>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Estado controlado y modal</h2>
        <p class="text-sm text-muted-foreground">
          Estado actual: {{ controlledOpen ? 'abierto' : 'cerrado' }}.
        </p>
      </div>

      <div class="flex flex-wrap gap-4">
        <Popover v-model:open="controlledOpen" :content="{ sideOffset: 8 }">
          <template #default="{ open }">
            <Button :label="open ? 'Cerrar controlado' : 'Abrir controlado'" variant="outline" />
          </template>

          <template #content="{ close }">
            <div class="space-y-3">
              <p class="text-sm">Este estado utiliza v-model:open.</p>
              <Button label="Cerrar" size="sm" @click="close" />
            </div>
          </template>
        </Popover>

        <Popover modal :content="{ side: 'bottom', sideOffset: 8 }">
          <Button label="Abrir modal" />

          <template #content="{ close }">
            <div class="space-y-3">
              <h3 class="font-semibold">Popover modal</h3>
              <p class="text-sm text-muted-foreground">
                La interacción queda contenida mientras está abierto.
              </p>
              <Button label="Cerrar" size="sm" @click="close" />
            </div>
          </template>
        </Popover>
      </div>
    </section>
  </main>
</template>
