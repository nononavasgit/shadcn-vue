<script setup lang="ts">
import { ref } from 'vue'
import { Accordion, type AccordionItem, type AccordionValue } from '@/components/ui/Accordion'
import ConfigProvider from '@/components/provider/ConfigProvider.vue'

const accordionSingle = ref<AccordionValue>('installation')
const accordionMultiple = ref<AccordionValue>(['account'])

const accordionItems: AccordionItem[] = [
  {
    value: 'installation',
    label: 'Instalación',
    description: 'Instala el paquete y registra sus estilos globales para empezar.',
    icon: 'info',
  },
  {
    value: 'account',
    label: 'Cuenta',
    description: 'Gestiona tus datos personales, preferencias y sesiones activas.',
  },
  {
    value: 'disabled',
    label: 'Sección deshabilitada',
    description: 'Este contenido no se puede abrir.',
    disabled: true,
  },
]
</script>

<template>
  <ConfigProvider>
    <main class="min-h-screen bg-background p-8 text-foreground">
      <div class="mx-auto flex max-w-5xl flex-col gap-6">
        <header>
          <h1 class="text-2xl font-semibold">Accordion playground</h1>
          <p class="text-sm text-muted-foreground">Ejemplos del componente Accordion.</p>
        </header>

        <section class="grid gap-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div class="grid gap-2">
            <h2 class="font-semibold">Selección única y colapsable</h2>
            <Accordion
              v-model:value="accordionSingle"
              :items="accordionItems"
              collapsible
              dir="rtl"
              @value-change="console.log('Accordion single:', $event)"
            />
            <code class="text-xs text-muted-foreground">{{ accordionSingle }}</code>
          </div>

          <div class="grid gap-2">
            <h2 class="font-semibold">Selección múltiple con contenido personalizado</h2>
            <Accordion v-model:value="accordionMultiple" :items="accordionItems" type="multiple">
              <template #content="{ item, open }">
                <p>
                  {{ item.description }}
                  <span class="font-medium">Estado: {{ open ? 'abierto' : 'cerrado' }}</span>
                </p>
              </template>
            </Accordion>
            <code class="text-xs text-muted-foreground">{{ accordionMultiple }}</code>
          </div>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
