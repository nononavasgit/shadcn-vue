<script setup lang="ts">
import { ref } from 'vue'
import { Accordion, type AccordionItem } from '@/components/ui/Accordion'

const accordionItems: AccordionItem[] = [
  {
    value: 'account',
    label: 'Â¿CÃ³mo creo una cuenta?',
    description: 'Puedes crearla desde la pantalla de registro usando tu correo electrÃ³nico.',
    icon: 'info',
  },
  {
    value: 'billing',
    label: 'Â¿Puedo cambiar mi plan?',
    description: 'SÃ­, puedes cambiarlo en cualquier momento desde la configuraciÃ³n.',
    icon: {
      name: 'save',
      color: 'red',
    },
  },
  {
    value: 'support',
    label: 'Â¿CÃ³mo contacto con soporte?',
    description: 'EscrÃ­benos desde el centro de ayuda y responderemos lo antes posible.',
    icon: 'chevronDown',
  },
]

const accordionValue = ref('account')
</script>

<template>
  <main class="mx-auto min-h-screen max-w-2xl space-y-8 p-6 md:p-10">
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold">Accordion</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos con selecciÃ³n simple y personalizaciÃ³n mediante UI y slots.
        </p>
      </div>

      <div class="space-y-3 rounded-lg border p-5">
        <Accordion
          v-model="accordionValue"
          icon-drop-down-close="error"
          :icon-drop-down-open="'check'"
          :items="accordionItems"
        />
      </div>

      <div class="space-y-3 rounded-lg border p-5">
        <Accordion
          type="multiple"
          :items="accordionItems"
          :default-value="['account', 'billing']"
          :ui="{
            trigger: ({ open }) => ({ class: open ? 'text-primary' : undefined }),
            content: { class: 'text-muted-foreground' },
          }"
        >
          <template #trigger-support="{ item, open }">
            {{ item.label }} {{ open ? 'âˆ’' : '+' }}
          </template>
        </Accordion>
      </div>
    </section>
  </main>
</template>
