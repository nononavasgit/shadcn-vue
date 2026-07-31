<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'

const controlledOpen = ref(false)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-4xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Tooltip</h1>
      <p class="text-muted-foreground">
        Ejemplos con label, posiciones, props agrupadas, slots y personalización mediante ui.
      </p>
    </header>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Uso básico</h2>
        <p class="text-sm text-muted-foreground">El texto se define mediante la prop label.</p>
      </div>

      <div class="flex flex-wrap gap-4">
        <Tooltip label="Guardar los cambios">
          <Button label="Guardar" icon="save" />
        </Tooltip>

        <Tooltip label="Buscar en el contenido" :content="{ side: 'bottom', sideOffset: 8 }">
          <Button label="Buscar" icon="search" variant="outline" />
        </Tooltip>

        <Tooltip label="Esta acción no está disponible" disabled>
          <Button label="Deshabilitado" disabled />
        </Tooltip>
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Posiciones</h2>
        <p class="text-sm text-muted-foreground">
          Las props de posicionamiento pertenecen al objeto content.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        <Tooltip
          v-for="side in ['top', 'right', 'bottom', 'left'] as const"
          :key="side"
          :label="`Posición ${side}`"
          :content="{ side, sideOffset: 8 }"
        >
          <Button :label="side" variant="outline" />
        </Tooltip>
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Content y Arrow</h2>
        <p class="text-sm text-muted-foreground">
          Cada pieza recibe sus props funcionales mediante un objeto independiente.
        </p>
      </div>

      <div class="flex flex-wrap gap-4">
        <Tooltip
          label="Tooltip alineado al inicio"
          :content="{
            side: 'bottom',
            align: 'start',
            alignOffset: 12,
            sideOffset: 8,
            forceMount: true,
          }"
          :arrow="{ width: 14, height: 7 }"
        >
          <Button label="Alineado" variant="outline" />
        </Tooltip>

        <Tooltip
          label="El trigger utiliza las props agrupadas"
          :trigger="{ asChild: true }"
          :content="{ side: 'right', sticky: 'always' }"
          :arrow="{ width: 12, height: 6 }"
        >
          <Button label="Props agrupadas" />
        </Tooltip>
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Personalización con ui</h2>
        <p class="text-sm text-muted-foreground">
          Las zonas de ui admiten exclusivamente atributos HTML.
        </p>
      </div>

      <Tooltip
        label="Tooltip personalizado"
        :content="{ side: 'bottom', sideOffset: 10 }"
        :arrow="{ width: 14, height: 7 }"
        :ui="{
          root: { 'data-example': 'custom-tooltip' },
          trigger: { class: 'rounded-lg ring-2 ring-primary/20' },
          content: {
            class: 'border-primary bg-primary px-4 py-2 text-primary-foreground shadow-lg',
          },
          arrow: { class: 'fill-primary text-primary' },
        }"
      >
        <Button label="Personalizado" />
      </Tooltip>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slots y estado controlado</h2>
        <p class="text-sm text-muted-foreground">
          Estado actual: {{ controlledOpen ? 'abierto' : 'cerrado' }}.
        </p>
      </div>

      <Tooltip
        v-model:open="controlledOpen"
        :content="{ side: 'top', sideOffset: 8 }"
        :arrow="{ width: 12, height: 6 }"
      >
        <template #default="{ open }">
          <Button :label="open ? 'Tooltip abierto' : 'Tooltip cerrado'" variant="outline" />
        </template>

        <template #content="{ open }">
          <div class="space-y-1">
            <p class="font-semibold">Contenido mediante slot</p>
            <p class="opacity-75">Open: {{ open }}</p>
          </div>
        </template>
      </Tooltip>
    </section>
  </main>
</template>
