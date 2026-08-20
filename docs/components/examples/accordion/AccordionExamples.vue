<script setup lang="ts">
import { ref } from 'vue'

import { Accordion, type AccordionItem } from '@/components/ui/Accordion'

const singleValue = ref<string | undefined>('account')
const multipleValue = ref<string[]>(['first'])

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
    icon: { name: 'lock' },
  },
  {
    value: 'billing',
    slot: 'billing',
    label: 'Billing',
    description: 'Update your payment details and view your invoices.',
    icon: { name: 'creditCard' },
  },
]

const multipleItems: AccordionItem[] = [
  {
    value: 'first',
    slot: 'first',
    label: 'What is an accordion?',
    description: 'An accordion organizes related content into expandable sections.',
  },
  {
    value: 'second',
    slot: 'second',
    label: 'Can I open several sections?',
    description: 'Yes. Use type="multiple" to keep more than one section open.',
  },
  {
    value: 'third',
    slot: 'third',
    label: 'Can an item be disabled?',
    description: 'Each item can be disabled independently.',
    disabled: true,
  },
]
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Acordeones single, multiple y con slots personalizados.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Modo single</h3>
          <p class="text-sm text-muted-foreground">Solo una sección puede estar abierta.</p>
        </div>
        <Accordion v-model:value="singleValue" :items="basicItems" />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Modo multiple</h3>
          <p class="text-sm text-muted-foreground">Varias secciones pueden estar abiertas.</p>
        </div>
        <Accordion
          v-model:value="multipleValue"
          type="multiple"
          collapsible
          :items="multipleItems"
        />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slots globales</h3>
          <p class="text-sm text-muted-foreground">Personaliza label, icono y contenido.</p>
        </div>
        <Accordion :items="basicItems" value="account">
          <template #label-account="{ item }">
            <span class="flex items-center gap-2">
              {{ item.label }}
              <span class="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                Personalizado
              </span>
            </span>
          </template>
          <template #content-account="{ item }">
            <p class="text-sm text-muted-foreground">
              {{ item.description }} Puedes sustituir el contenido desde este slot.
            </p>
          </template>
        </Accordion>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Indicador personalizado</h3>
          <p class="text-sm text-muted-foreground">Cambia el indicador de apertura.</p>
        </div>
        <Accordion :items="basicItems" value="security">
          <template #iconDropdown="{ open }">
            <span class="grid size-6 place-items-center rounded border text-sm" aria-hidden="true">
              {{ open ? '−' : '+' }}
            </span>
          </template>
        </Accordion>
      </div>
    </div>
  </section>
</template>
