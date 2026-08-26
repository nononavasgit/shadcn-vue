<script setup lang="ts">
import { Card, type CardProps } from '@/components/ui/Card'
import Example from '../../Example.vue'

const cardUi: CardProps['ui'] = {
  header: () => ({ class: 'bg-muted/40 rounded-t-xl py-4' }),
  label: () => ({ class: 'text-primary' }),
  description: () => ({ class: 'italic' }),
  action: () => ({ class: 'rounded-md bg-primary/10 p-1' }),
  content: () => ({ class: 'bg-muted/20 py-2' }),
  footer: () => ({ class: 'justify-between border-t pt-4' }),
}

const labelCode = `<Card label="Preferencias de cuenta" />`
const descriptionCode = `<Card
  label="Preferencias de cuenta"
  description="Administra los datos de tu perfil."
/>`
const uiCode = `const cardUi = {
  header: () => ({ class: 'bg-muted/40 rounded-t-xl py-4' }),
  label: () => ({ class: 'text-primary' }),
  description: () => ({ class: 'italic' }),
  action: () => ({ class: 'rounded-md bg-primary/10 p-1' }),
  content: () => ({ class: 'bg-muted/20 py-2' }),
  footer: () => ({ class: 'justify-between border-t pt-4' }),
}

<Card
  label="Resumen semanal"
  description="Datos de los últimos siete días."
  :ui="cardUi"
/>`
const defaultSlotCode = `<Card label="Actividad reciente">
  <ul class="grid gap-2 text-sm">
    <li>Nuevo acceso al proyecto</li>
    <li>Perfil actualizado</li>
  </ul>
</Card>`
const headerSlotCode = `<Card>
  <template #header>
    <div class="flex items-center justify-between px-6">
      <strong>Encabezado personalizado</strong>
      <span class="text-xs text-muted-foreground">Opcional</span>
    </div>
  </template>
  <p class="text-sm">Contenido de la tarjeta.</p>
</Card>`
const labelSlotCode = `<Card description="Personas con acceso al proyecto.">
  <template #label>
    <span class="flex items-center gap-2">
      Equipo de trabajo
      <span class="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">3</span>
    </span>
  </template>
</Card>`
const descriptionSlotCode = `<Card label="Estado del proyecto">
  <template #description>
    <span class="text-primary">Sincronizado hace un momento</span>
  </template>
</Card>`
const actionSlotCode = `<Card label="Actualización disponible" description="Nueva versión lista.">
  <template #action>
    <button type="button" class="rounded-md border px-2 py-1 text-xs">Detalles</button>
  </template>
</Card>`
const footerSlotCode = `<Card label="Resumen semanal">
  <p class="text-sm">24 tareas completadas esta semana.</p>
  <template #footer>
    <span class="text-xs text-muted-foreground">Actualizado hace 5 min</span>
    <a href="#" class="ml-auto text-sm font-medium text-primary">Ver informe</a>
  </template>
</Card>`
const attrsCode = `<Card
  label="Documento compartido"
  class="ring-2 ring-primary ring-offset-2"
  data-source="documents"
  aria-label="Documento compartido"
/>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada ejemplo muestra una prop, slot, configuración o atributo disponible en Card.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Label"
        description="label define el título del encabezado de la tarjeta."
        :code="labelCode"
      >
        <Card label="Preferencias de cuenta" class="w-full max-w-md" />
      </Example>

      <Example
        title="Description"
        description="description añade una descripción secundaria al encabezado."
        :code="descriptionCode"
      >
        <Card
          label="Preferencias de cuenta"
          description="Administra los datos de tu perfil."
          class="w-full max-w-md"
        />
      </Example>

      <Example
        title="UI"
        description="ui personaliza los atributos de las partes internas mediante resolvers."
        :code="uiCode"
        class="md:col-span-2"
      >
        <Card
          label="Resumen semanal"
          description="Datos de los últimos siete días."
          :ui="cardUi"
          class="w-full max-w-md"
        >
          <div class="grid gap-1">
            <span class="text-2xl font-semibold">+24,8%</span>
            <span class="text-xs text-emerald-600">12% más que la semana anterior</span>
          </div>
          <template #action>
            <button type="button" class="rounded-md border px-2 py-1 text-xs">Detalles</button>
          </template>
          <template #footer>
            <span class="text-xs text-muted-foreground">Actualizado hace 5 min</span>
            <a href="#" class="ml-auto text-sm font-medium text-primary">Ver informe</a>
          </template>
        </Card>
      </Example>

      <Example
        title="Slot default"
        description="default contiene el contenido principal de la tarjeta."
        :code="defaultSlotCode"
      >
        <Card label="Actividad reciente" class="w-full max-w-md">
          <ul class="grid gap-2 text-sm">
            <li>Nuevo acceso al proyecto</li>
            <li>Perfil actualizado</li>
          </ul>
        </Card>
      </Example>

      <Example
        title="Slot header"
        description="header reemplaza el contenido completo del encabezado."
        :code="headerSlotCode"
      >
        <Card class="w-full max-w-md">
          <template #header>
            <div class="flex w-full items-center justify-between px-6">
              <strong>Encabezado personalizado</strong>
              <span class="text-xs text-muted-foreground">Opcional</span>
            </div>
          </template>
          <p class="text-sm">Contenido de la tarjeta.</p>
        </Card>
      </Example>

      <Example
        title="Slot label"
        description="label permite enriquecer o reemplazar el título."
        :code="labelSlotCode"
      >
        <Card description="Personas con acceso al proyecto." class="w-full max-w-md">
          <template #label>
            <span class="flex items-center gap-2">
              Equipo de trabajo
              <span class="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">3</span>
            </span>
          </template>
        </Card>
      </Example>

      <Example
        title="Slot description"
        description="description permite incluir contenido enriquecido en el subtítulo."
        :code="descriptionSlotCode"
      >
        <Card label="Estado del proyecto" class="w-full max-w-md">
          <template #description>
            <span class="text-primary">Sincronizado hace un momento</span>
          </template>
        </Card>
      </Example>

      <Example
        title="Slot action"
        description="action añade una acción alineada en el encabezado."
        :code="actionSlotCode"
      >
        <Card
          label="Actualización disponible"
          description="Nueva versión lista."
          class="w-full max-w-md"
        >
          <template #action>
            <button type="button" class="rounded-md border px-2 py-1 text-xs">Detalles</button>
          </template>
        </Card>
      </Example>

      <Example
        title="Slot footer"
        description="footer añade contenido alineado al pie de la tarjeta."
        :code="footerSlotCode"
      >
        <Card label="Resumen semanal" class="w-full max-w-md">
          <p class="text-sm">24 tareas completadas esta semana.</p>
          <template #footer>
            <span class="text-xs text-muted-foreground">Actualizado hace 5 min</span>
            <a href="#" class="ml-auto text-sm font-medium text-primary">Ver informe</a>
          </template>
        </Card>
      </Example>

      <Example
        title="Atributos HTML"
        description="Los atributos y clases se reenvían al elemento raíz de Card."
        :code="attrsCode"
        class="md:col-span-2"
      >
        <Card
          label="Documento compartido"
          class="w-full max-w-md ring-2 ring-primary ring-offset-2"
          data-source="documents"
          aria-label="Documento compartido"
        />
      </Example>
    </div>
  </section>
</template>
