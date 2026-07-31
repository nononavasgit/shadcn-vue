<script setup lang="ts">
import { ref } from 'vue'
import { Accordion, type AccordionItem, type AccordionValue } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'

const faqItems: AccordionItem[] = [
  {
    value: 'account',
    label: 'Como creo una cuenta?',
    content: 'Completa el formulario de registro y confirma tu correo electronico.',
  },
  {
    value: 'password',
    label: 'Puedo cambiar mi contrasena?',
    content: 'Si. Puedes cambiarla desde el apartado de seguridad de tu perfil.',
  },
  {
    value: 'billing',
    label: 'Donde consulto mis facturas?',
    content: 'Las facturas estan disponibles en la seccion de facturacion.',
  },
]

const featureItems: AccordionItem[] = [
  {
    value: 'notifications',
    label: 'Notificaciones',
    content: 'Configura avisos por correo y push.',
  },
  { value: 'privacy', label: 'Privacidad', content: 'Controla la visibilidad de tu perfil.' },
  {
    value: 'sessions',
    label: 'Sesiones',
    content: 'Revisa los dispositivos con acceso.',
    disabled: true,
  },
]

const advancedItems: AccordionItem[] = [
  {
    value: 'summary',
    label: 'Resumen',
    content: 'Contenido renderizado como section.',
    trigger: { as: 'button' },
    contentProps: { as: 'section', forceMount: true },
  },
  {
    value: 'details',
    label: 'Detalles',
    content: 'Contenido renderizado como article.',
    trigger: { as: 'button', asChild: false },
    contentProps: { as: 'article' },
  },
]

const activeSection = ref<AccordionValue>('account')
const openFeatures = ref<string[]>(['notifications', 'privacy'])
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Accordion</h1>
      <p class="text-muted-foreground">
        Ejemplos con seleccion simple y multiple, UI contextual, slots y props funcionales.
      </p>
    </header>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Uso basico</h2>
        <p class="text-sm text-muted-foreground">Un unico elemento abierto y cierre permitido.</p>
      </div>

      <Accordion
        v-model="activeSection"
        type="single"
        collapsible
        :items="faqItems"
        :ui="{ root: { class: 'max-w-2xl' } }"
      />

      <p class="text-sm text-muted-foreground">Seccion activa: {{ activeSection || 'ninguna' }}</p>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Seleccion multiple</h2>
        <p class="text-sm text-muted-foreground">
          Abiertos: {{ openFeatures.join(', ') || 'ninguno' }}.
        </p>
      </div>

      <Accordion
        v-model="openFeatures"
        type="multiple"
        :items="featureItems"
        :ui="{
          root: { class: 'max-w-2xl rounded-lg border px-4' },
          item: ({ open }) => ({ class: open ? 'border-primary/40' : '' }),
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Control externo</h2>
        <p class="text-sm text-muted-foreground">
          El modelo puede cambiarse desde otros controles.
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <Button label="Cuenta" size="sm" variant="outline" @click="activeSection = 'account'" />
        <Button
          label="Contrasena"
          size="sm"
          variant="outline"
          @click="activeSection = 'password'"
        />
        <Button label="Cerrar" size="sm" variant="outline" @click="activeSection = undefined" />
      </div>

      <Accordion v-model="activeSection" type="single" collapsible :items="faqItems" />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">UI contextual</h2>
        <p class="text-sm text-muted-foreground">
          Cada zona recibe item, indice, estado abierto y posicion.
        </p>
      </div>

      <Accordion
        default-value="password"
        type="single"
        collapsible
        :items="faqItems"
        :ui="{
          root: { class: 'max-w-2xl rounded-xl bg-muted/30 p-3' },
          item: ({ first, last }) => ({
            class: [first && 'rounded-t-lg', last && 'rounded-b-lg border-b-0'],
          }),
          trigger: ({ open }) => ({
            class: open ? 'text-primary no-underline' : 'text-muted-foreground',
            title: open ? 'Cerrar seccion' : 'Abrir seccion',
          }),
          content: ({ open }) => ({ class: open ? 'text-foreground' : '' }),
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slots globales e individuales</h2>
        <p class="text-sm text-muted-foreground">
          Los slots asociados al value tienen prioridad sobre los globales.
        </p>
      </div>

      <Accordion type="single" collapsible :items="faqItems">
        <template #trigger="{ item, open }">
          <span class="flex items-center gap-2">
            <span
              :class="['size-2 rounded-full', open ? 'bg-primary' : 'bg-muted-foreground/40']"
            />
            {{ item.label }}
          </span>
        </template>

        <template #trigger-billing="{ open }">
          <span class="font-semibold text-warning"
            >Facturacion {{ open ? 'abierta' : 'cerrada' }}</span
          >
        </template>

        <template #content-password="{ item }">
          <div class="rounded-md bg-primary/5 p-3">Contenido individual: {{ item.content }}</div>
        </template>

        <template #default="{ item }">
          <span class="text-muted-foreground">Contenido global: {{ item.content }}</span>
        </template>
      </Accordion>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Props funcionales por item</h2>
        <p class="text-sm text-muted-foreground">
          trigger y contentProps se filtran mediante normalizadores explicitos.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        :items="advancedItems"
        :ui="{
          root: { class: 'max-w-2xl border-x px-4' },
          content: { class: 'rounded-md bg-muted/40 px-3' },
        }"
      />
    </section>
  </main>
</template>
