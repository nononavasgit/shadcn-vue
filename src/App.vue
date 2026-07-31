<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { HoverCard } from '@/components/ui/HoverCard'
import { Icon } from '@/components/ui/Icon'

const controlledOpen = ref(false)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">HoverCard y Card</h1>
      <p class="text-muted-foreground">
        Ejemplos con props normalizadas, posiciones, slots y personalización mediante ui.
      </p>
    </header>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">HoverCard básico</h2>
        <p class="text-sm text-muted-foreground">El texto se define mediante la prop label.</p>
      </div>

      <div class="flex flex-wrap items-center gap-5">
        <HoverCard label="Información adicional sobre el usuario.">
          <Button label="Pasa el cursor" variant="outline" />
        </HoverCard>

        <HoverCard
          label="Este contenido aparece a la derecha."
          :trigger="{ asChild: true }"
          :content="{ side: 'right', sideOffset: 10, align: 'start' }"
        >
          <Button label="Props normalizadas" />
        </HoverCard>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Posiciones</h2>
        <p class="text-sm text-muted-foreground">
          Side, align y forceMount pertenecen al objeto content.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        <HoverCard
          v-for="side in ['top', 'right', 'bottom', 'left'] as const"
          :key="side"
          :label="`HoverCard situado en ${side}`"
          :content="{ side, sideOffset: 8, forceMount: true }"
        >
          <Button :label="side" variant="outline" />
        </HoverCard>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Contenido mediante slot</h2>
        <p class="text-sm text-muted-foreground">Un perfil enriquecido dentro del HoverCard.</p>
      </div>

      <HoverCard
        :content="{
          side: 'bottom',
          align: 'start',
          sideOffset: 8,
          collisionPadding: 16,
        }"
      >
        <button class="font-medium text-primary underline underline-offset-4">@nononavas</button>

        <template #content>
          <div class="flex gap-4">
            <Avatar
              label="NN"
              icon="info"
              :ui="{
                root: { class: 'size-12' },
                fallback: { class: 'bg-primary/10 text-primary' },
              }"
            />
            <div class="space-y-1">
              <h3 class="font-semibold">Nononavas</h3>
              <p class="max-w-64 text-sm text-muted-foreground">
                Componentes Vue accesibles y personalizables.
              </p>
              <div class="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon name="success" class="size-3" />
                Perfil verificado
              </div>
            </div>
          </div>
        </template>
      </HoverCard>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">UI y estado controlado</h2>
        <p class="text-sm text-muted-foreground">
          Estado: {{ controlledOpen ? 'abierto' : 'cerrado' }}.
        </p>
      </div>

      <HoverCard
        v-model:open="controlledOpen"
        :content="{ side: 'top', sideOffset: 10 }"
        :ui="{
          root: { 'data-example': 'controlled-hover-card' },
          trigger: { class: 'rounded-lg ring-2 ring-primary/20' },
          content: { class: 'w-80 border-2 border-primary/30 bg-primary/5 shadow-xl' },
        }"
      >
        <template #default="{ open }">
          <Button :label="open ? 'HoverCard abierto' : 'HoverCard cerrado'" />
        </template>

        <template #content="{ open }">
          <p class="text-sm">Contenido personalizado. Open: {{ open }}</p>
        </template>
      </HoverCard>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Card básico</h2>
        <p class="text-sm text-muted-foreground">Título, descripción, contenido y footer.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <Card
          label="Configuración del proyecto"
          description="Gestiona las preferencias principales del proyecto."
        >
          <div class="space-y-3 text-sm">
            <div class="flex justify-between border-b pb-2">
              <span class="text-muted-foreground">Visibilidad</span>
              <span class="font-medium">Privada</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Miembros</span>
              <span class="font-medium">8</span>
            </div>
          </div>

          <template #footer>
            <Button label="Guardar cambios" icon="save" class="w-full" />
          </template>
        </Card>

        <Card label="Plan profesional" description="Para equipos y proyectos avanzados.">
          <template #action>
            <Button icon="chevronRight" square variant="plain" aria-label="Ver plan" />
          </template>

          <div class="space-y-2">
            <p class="text-3xl font-bold">29 €</p>
            <p class="text-sm text-muted-foreground">por usuario al mes</p>
          </div>

          <template #footer>
            <div class="flex w-full gap-2">
              <Button label="Detalles" variant="outline" class="flex-1" />
              <Button label="Contratar" class="flex-1" />
            </div>
          </template>
        </Card>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Card personalizado</h2>
        <p class="text-sm text-muted-foreground">
          Todas las zonas utilizan HTMLAttributes normalizados.
        </p>
      </div>

      <Card
        label="Card personalizado"
        description="Cada sección se personaliza mediante CardUI."
        :ui="{
          root: { class: 'border-2 border-primary/30 bg-primary/5 shadow-lg' },
          header: { class: 'border-b border-primary/20' },
          label: { class: 'text-xl text-primary' },
          description: { class: 'text-primary/70' },
          action: { class: 'text-primary' },
          content: { class: 'py-8' },
          footer: { class: 'border-t border-primary/20 bg-primary/5' },
        }"
      >
        <template #action>
          <Icon name="success" />
        </template>

        <div class="text-center">
          <p class="font-medium">Contenido principal personalizado</p>
        </div>

        <template #footer>
          <span class="text-sm text-primary">Footer personalizado</span>
        </template>
      </Card>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Header completo mediante slot</h2>
      </div>

      <Card>
        <template #header>
          <div class="flex items-center gap-3">
            <Avatar label="UI" :ui="{ root: { class: 'size-10' } }" />
            <div>
              <h3 class="font-semibold">Header libre</h3>
              <p class="text-sm text-muted-foreground">Construido completamente con el slot.</p>
            </div>
          </div>
        </template>

        <p class="text-sm text-muted-foreground">
          El resto de zonas mantiene su estructura y normalización.
        </p>
      </Card>
    </section>
  </main>
</template>
