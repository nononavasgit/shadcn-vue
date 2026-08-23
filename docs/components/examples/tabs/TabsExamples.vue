<script setup lang="ts">
import { ref } from 'vue'

import { Tabs, type TabItem, type TabsProps } from '@/components/ui/Tabs'

const basicValue = ref('overview')
const verticalValue = ref('profile')
const customValue = ref('account')

const basicTabs: TabItem[] = [
  {
    slot: 'overview',
    value: 'overview',
    label: 'Overview',
    icon: { name: 'layoutDashboard' },
  },
  {
    slot: 'analytics',
    value: 'analytics',
    label: 'Analytics',
    icon: { name: 'chartNoAxesCombined' },
  },
  {
    slot: 'notifications',
    value: 'notifications',
    label: 'Notifications',
    icon: { name: 'bell' },
  },
]

const verticalTabs: TabItem[] = [
  {
    slot: 'profile',
    value: 'profile',
    label: 'Profile',
  },
  {
    slot: 'security',
    value: 'security',
    label: 'Security',
  },
  {
    slot: 'billing',
    value: 'billing',
    label: 'Billing',
    disabled: true,
  },
]

const customTabs: TabItem[] = [
  {
    slot: 'account',
    value: 'account',
    label: 'Account',
    trailingIcon: { name: 'check' },
  },
  {
    slot: 'team',
    value: 'team',
    label: 'Team',
  },
]

const customTabsUi: TabsProps['ui'] = {
  contentWrapper: () => ({ class: 'rounded-lg border bg-muted/20 p-4' }),
  trigger: (context) => ({
    class: context.active ? 'font-semibold' : undefined,
  }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Tabs básicos, orientación vertical, estados deshabilitados y slots personalizados.
      </p>
    </div>

    <div class="grid gap-4">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Tabs básicos</h3>
          <p class="text-sm text-muted-foreground">Pestañas con iconos y contenido por item.</p>
        </div>
        <Tabs v-model:value="basicValue" :tabs="basicTabs">
          <template #content="{ tabs }">
            <p class="text-sm">Contenido para {{ tabs.length }} pestañas.</p>
          </template>
        </Tabs>
        <output class="text-sm text-muted-foreground">Pestaña activa: {{ basicValue }}</output>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Variante lineal y orientación vertical</h3>
          <p class="text-sm text-muted-foreground">
            La orientación vertical adapta la lista, los triggers y el contenido.
          </p>
        </div>
        <Tabs
          v-model:value="verticalValue"
          :tabs="verticalTabs"
          orientation="vertical"
          variant="line"
        >
          <template #content="{ tabs }">
            <p class="text-sm">Contenido para {{ tabs.length }} pestañas.</p>
          </template>
        </Tabs>
        <output class="text-sm text-muted-foreground">Pestaña activa: {{ verticalValue }}</output>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slots y ui</h3>
          <p class="text-sm text-muted-foreground">
            Reemplaza triggers y contenido y personaliza sus nodos internos.
          </p>
        </div>
        <Tabs v-model:value="customValue" :tabs="customTabs" :ui="customTabsUi">
          <template #content="{ tabs }">
            <p class="text-sm">Contenido para {{ tabs.length }} pestañas.</p>
          </template>
          <template #trigger-account="{ tab }">
            <span class="flex items-center gap-1.5">
              <span>{{ tab.label }}</span>
              <span class="text-xs text-muted-foreground">(principal)</span>
            </span>
          </template>
          <template #content-team="{ tab }">
            <p class="text-sm">Contenido personalizado para {{ tab.label }}.</p>
          </template>
        </Tabs>
        <output class="text-sm text-muted-foreground">Pestaña activa: {{ customValue }}</output>
      </div>
    </div>
  </section>
</template>
