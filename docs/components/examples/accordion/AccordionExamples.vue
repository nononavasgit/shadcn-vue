<script setup lang="ts">
import { ref } from 'vue'

import {
  Accordion,
  type AccordionItem,
  type AccordionUI,
  type AccordionValue,
} from '@/components/ui/Accordion'
import { Icon } from '@/components/ui/Icon'
import Example from '../../Example.vue'

const singleValue = ref<string | undefined>('account')
const multipleValue = ref<string[]>(['first'])
const eventValue = ref<AccordionValue>('account')

const basicItems: AccordionItem[] = [
  {
    value: 'account',
    slot: 'account',
    label: 'Account settings',
    description: 'Manage your profile, password and notification preferences.',
    icon: { name: 'user' },
  },
  {
    value: 'security',
    slot: 'security',
    label: 'Security',
    description: 'Review your recent activity and manage security options.',
    icon: { name: 'info' },
  },
  {
    value: 'billing',
    slot: 'billing',
    label: 'Billing',
    description: 'Update your payment details and view your invoices.',
    icon: { name: 'warning' },
  },
]

const multipleItems: AccordionItem[] = [
  {
    value: 'first',
    label: 'What is an accordion?',
    description: 'An accordion organizes related content into expandable sections.',
  },
  {
    value: 'second',
    label: 'Can I open several sections?',
    description: 'Yes. Use type="multiple" to keep more than one section open.',
  },
  {
    value: 'third',
    label: 'Can an item be disabled?',
    description: 'Each item can be disabled independently.',
    disabled: true,
  },
]

const accordionUi: AccordionUI = {
  item: ({ open }) => ({ class: open ? 'border-primary' : '' }),
  trigger: ({ open }) => ({ class: open ? 'text-primary' : '' }),
  content: ({ first }) => ({ 'data-first': first ? 'true' : 'false' }),
}

const itemsCode = `<Accordion :items="items" value="account" />`
const singleCode = `<Accordion
  v-model:value="value"
  type="single"
  :items="items"
/>`
const multipleCode = `<Accordion
  v-model:value="value"
  type="multiple"
  :items="items"
/>`
const valueCode = `<Accordion
  v-model:value="value"
  :items="items"
/>`
const collapsibleCode = `<Accordion
  value="account"
  type="single"
  collapsible
  :items="items"
/>`
const disabledCode = `<Accordion
  value="account"
  disabled
  :items="items"
/>`
const unmountCode = `<Accordion
  value="account"
  :items="items"
  :unmount-on-hide="false"
/>`
const itemPropsCode = `const items = [
  {
    value: 'account',
    label: 'Account settings',
    description: 'Contenido del item',
    icon: { name: 'user' },
    disabled: false,
    unmountOnHide: false,
  },
]`
const dropdownIconsCode = `<Accordion
  :items="items"
  :icon-drop-down-open="{ name: 'minus' }"
  :icon-drop-down-close="{ name: 'plus' }"
/>`
const uiCode = `<Accordion
  :items="items"
  :ui="accordionUi"
/>`
const triggerSlotCode = `<Accordion :items="items" value="account">
  <template #trigger="{ item, open }">
    <span>{{ item.label }} · {{ open ? 'Abierto' : 'Cerrado' }}</span>
  </template>
</Accordion>`
const leadingSlotCode = `<Accordion :items="items" value="account">
  <template #leading="{ open }">
    <Icon :name="open ? 'folderOpen' : 'folder'" />
  </template>
</Accordion>`
const labelSlotCode = `<Accordion :items="items" value="account">
  <template #label="{ item, index }">
    <span>{{ index + 1 }}. {{ item.label }}</span>
  </template>
</Accordion>`
const dropdownSlotCode = `<Accordion :items="items" value="account">
  <template #iconDropdown="{ open }">
    <span>{{ open ? '−' : '+' }}</span>
  </template>
</Accordion>`
const contentSlotCode = `<Accordion :items="items" value="account">
  <template #content="{ item }">
    <p class="text-sm">{{ item.description }}</p>
  </template>
</Accordion>`
const itemTriggerSlotCode = `<Accordion :items="items" value="account">
  <template #trigger-account="{ item }">
    <strong>{{ item.label }}</strong>
  </template>
</Accordion>`
const itemLeadingSlotCode = `<Accordion :items="items" value="account">
  <template #leading-account>
    <Icon name="star" />
  </template>
</Accordion>`
const itemLabelSlotCode = `<Accordion :items="items" value="account">
  <template #label-account="{ item }">
    <span class="text-primary">{{ item.label }}</span>
  </template>
</Accordion>`
const itemContentSlotCode = `<Accordion :items="items" value="account">
  <template #content-account>
    <p>Contenido específico de Account.</p>
  </template>
</Accordion>`
const updateValueCode = `<Accordion
  v-model:value="value"
  :items="items"
  @update:value="value = $event"
/>`
const attrsCode = `<Accordion
  :items="items"
  class="rounded-lg border p-4"
  data-state="ready"
/>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada ejemplo muestra una prop, slot, evento o configuración disponible en Accordion.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Items"
        description="items define las secciones, su label, descripción e icono."
        :code="itemsCode"
        class="md:col-span-2"
      >
        <Accordion :items="basicItems" value="account" class="w-full" />
      </Example>

      <Example
        title="Type single"
        description="single mantiene como máximo una sección abierta."
        :code="singleCode"
      >
        <Accordion v-model:value="singleValue" type="single" :items="basicItems" class="w-full" />
      </Example>

      <Example
        title="Type multiple"
        description="multiple permite abrir varias secciones a la vez."
        :code="multipleCode"
      >
        <Accordion
          v-model:value="multipleValue"
          type="multiple"
          :items="multipleItems"
          class="w-full"
        />
      </Example>

      <Example
        title="Value"
        description="value y v-model:value controlan la sección abierta."
        :code="valueCode"
      >
        <Accordion v-model:value="singleValue" :items="basicItems" class="w-full" />
      </Example>

      <Example
        title="Collapsible"
        description="collapsible permite cerrar la sección abierta en modo single."
        :code="collapsibleCode"
      >
        <Accordion value="account" type="single" collapsible :items="basicItems" class="w-full" />
      </Example>

      <Example
        title="Disabled"
        description="disabled desactiva todos los triggers del acordeón."
        :code="disabledCode"
      >
        <Accordion value="account" disabled :items="basicItems" class="w-full" />
      </Example>

      <Example
        title="Unmount on hide"
        description="unmountOnHide conserva o desmonta el contenido cerrado."
        :code="unmountCode"
      >
        <Accordion value="account" :items="basicItems" :unmount-on-hide="false" class="w-full" />
      </Example>

      <Example
        title="Props de AccordionItem"
        description="Cada item puede tener slot, icon, disabled y unmountOnHide propios."
        :code="itemPropsCode"
      >
        <Accordion :items="multipleItems" value="first" class="w-full" />
      </Example>

      <Example
        title="Iconos de apertura"
        description="Personaliza los iconos para los estados abierto y cerrado."
        :code="dropdownIconsCode"
      >
        <Accordion
          :items="basicItems"
          value="account"
          :icon-drop-down-open="{ name: 'minus' }"
          :icon-drop-down-close="{ name: 'plus' }"
          class="w-full"
        />
      </Example>

      <Example
        title="UI"
        description="ui recibe el contexto del item para personalizar sus partes internas."
        :code="uiCode"
      >
        <Accordion :items="basicItems" value="account" :ui="accordionUi" class="w-full" />
      </Example>

      <Example
        title="Slot trigger"
        description="trigger sustituye el trigger completo y recibe el contexto del item."
        :code="triggerSlotCode"
      >
        <Accordion :items="basicItems" value="account" class="w-full">
          <template #trigger="{ item, open }">
            <span>{{ item.label }} · {{ open ? 'Abierto' : 'Cerrado' }}</span>
          </template>
        </Accordion>
      </Example>

      <Example
        title="Slot leading"
        description="leading sustituye el icono que aparece antes del label."
        :code="leadingSlotCode"
      >
        <Accordion :items="basicItems" value="account" class="w-full">
          <template #leading="{ open }">
            <Icon :name="open ? 'folderOpen' : 'folder'" />
          </template>
        </Accordion>
      </Example>

      <Example
        title="Slot label"
        description="label personaliza el texto del trigger."
        :code="labelSlotCode"
      >
        <Accordion :items="basicItems" value="account" class="w-full">
          <template #label="{ item, index }">
            <span>{{ index + 1 }}. {{ item.label }}</span>
          </template>
        </Accordion>
      </Example>

      <Example
        title="Slot iconDropdown"
        description="iconDropdown sustituye el indicador de apertura."
        :code="dropdownSlotCode"
      >
        <Accordion :items="basicItems" value="account" class="w-full">
          <template #iconDropdown="{ open }">
            <span class="grid size-6 place-items-center rounded border text-sm" aria-hidden="true">
              {{ open ? '−' : '+' }}
            </span>
          </template>
        </Accordion>
      </Example>

      <Example
        title="Slot content"
        description="content sustituye el contenido expandible."
        :code="contentSlotCode"
      >
        <Accordion :items="basicItems" value="account" class="w-full">
          <template #content="{ item }">
            <p class="text-sm text-muted-foreground">{{ item.description }}</p>
          </template>
        </Accordion>
      </Example>

      <Example
        title="Slot trigger específico"
        description="trigger-{slot} personaliza el trigger del item indicado por slot."
        :code="itemTriggerSlotCode"
      >
        <Accordion :items="basicItems" value="account" class="w-full">
          <template #trigger-account="{ item }">
            <strong>{{ item.label }}</strong>
          </template>
        </Accordion>
      </Example>

      <Example
        title="Slot leading específico"
        description="leading-{slot} personaliza el icono de un item concreto."
        :code="itemLeadingSlotCode"
      >
        <Accordion :items="basicItems" value="account" class="w-full">
          <template #leading-account>
            <Icon name="star" />
          </template>
        </Accordion>
      </Example>

      <Example
        title="Slot label específico"
        description="label-{slot} personaliza el label de un item concreto."
        :code="itemLabelSlotCode"
      >
        <Accordion :items="basicItems" value="account" class="w-full">
          <template #label-account="{ item }">
            <span class="text-primary">{{ item.label }}</span>
          </template>
        </Accordion>
      </Example>

      <Example
        title="Slot content específico"
        description="content-{slot} personaliza el contenido de un item concreto."
        :code="itemContentSlotCode"
      >
        <Accordion :items="basicItems" value="account" class="w-full">
          <template #content-account>
            <p>Contenido específico de Account.</p>
          </template>
        </Accordion>
      </Example>

      <Example
        title="Evento update:value"
        description="Se emite cuando cambia la sección o las secciones abiertas."
        :code="updateValueCode"
      >
        <div class="grid w-full gap-2">
          <Accordion
            v-model:value="eventValue"
            :items="basicItems"
            @update:value="eventValue = $event"
          />
          <code class="text-xs text-muted-foreground">value: {{ eventValue }}</code>
        </div>
      </Example>

      <Example
        title="Atributos HTML"
        description="Los atributos y clases se reenvían al root del acordeón."
        :code="attrsCode"
        class="md:col-span-2"
      >
        <Accordion :items="basicItems" class="w-full rounded-lg border p-4" data-state="ready" />
      </Example>
    </div>
  </section>
</template>
