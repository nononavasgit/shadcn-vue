<script setup lang="ts">
import { Announcer } from '@/components/ui/Announcer'
import Example from '../../Example.vue'

const messageCode = `<Announcer message="Cambios guardados correctamente" />`
const atomicCode = `<Announcer
  message="Se han guardado todos los cambios"
  atomic
/>`
const politenessCode = `<div class="grid gap-2">
  <Announcer message="Mensaje normal" politeness="polite" />
  <Announcer message="Mensaje urgente" politeness="assertive" />
  <Announcer message="Sin anuncio automático" politeness="off" />
</div>`
const slotCode = `<Announcer politeness="polite">
  <span>Cambios guardados correctamente</span>
</Announcer>`
const attrsCode = `<Announcer
  message="Estado actualizado"
  class="text-sm"
  data-state="updated"
/>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada ejemplo muestra una prop, slot o atributo disponible en Announcer.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Message"
        description="message define el texto que se anuncia cuando no usas el slot default."
        :code="messageCode"
      >
        <div class="grid gap-2 text-center">
          <span class="text-sm font-medium">Mensaje anunciado</span>
          <span class="text-xs text-muted-foreground">
            El contenido se mantiene oculto visualmente para tecnologías de asistencia.
          </span>
          <Announcer message="Cambios guardados correctamente" />
        </div>
      </Example>

      <Example
        title="Atomic"
        description="atomic indica si debe anunciarse el contenido completo de una vez."
        :code="atomicCode"
      >
        <div class="grid gap-2 text-center">
          <span class="text-sm font-medium">Anuncio atómico</span>
          <span class="text-xs text-muted-foreground">aria-atomic="true"</span>
          <Announcer message="Se han guardado todos los cambios" atomic />
        </div>
      </Example>

      <Example
        title="Politeness"
        description="politeness configura aria-live y el role semántico del anuncio."
        :code="politenessCode"
        class="md:col-span-2"
      >
        <div class="grid w-full gap-2 text-sm">
          <div class="flex items-center justify-between rounded-md border p-3">
            <span>polite</span>
            <code class="text-muted-foreground">aria-live="polite" · role="status"</code>
            <Announcer message="Mensaje normal" politeness="polite" />
          </div>
          <div class="flex items-center justify-between rounded-md border p-3">
            <span>assertive</span>
            <code class="text-muted-foreground">aria-live="assertive" · role="alert"</code>
            <Announcer message="Mensaje urgente" politeness="assertive" />
          </div>
          <div class="flex items-center justify-between rounded-md border p-3">
            <span>off</span>
            <code class="text-muted-foreground">aria-live="off"</code>
            <Announcer message="Sin anuncio automático" politeness="off" />
          </div>
        </div>
      </Example>

      <Example
        title="Slot default"
        description="El slot default sustituye el contenido de message y se muestra visualmente."
        :code="slotCode"
        class="md:col-span-2"
      >
        <Announcer politeness="polite">
          <span class="rounded-md border bg-muted/40 px-3 py-2 text-sm">
            Cambios guardados correctamente
          </span>
        </Announcer>
      </Example>

      <Example
        title="Atributos HTML"
        description="Los atributos y clases se reenvían al elemento raíz."
        :code="attrsCode"
        class="md:col-span-2"
      >
        <Announcer message="Estado actualizado" class="text-sm" data-state="updated" />
        <span class="text-sm text-muted-foreground">
          Los atributos se aplican al elemento que contiene el anuncio.
        </span>
      </Example>
    </div>
  </section>
</template>
