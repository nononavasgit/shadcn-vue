<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Tabs, type TabItem, type TabsValue } from '@/components/ui/Tabs'

const activeAccountTab = ref<TabsValue>('account')
const activeToolTab = ref<TabsValue>('search')

const accountTabs: TabItem[] = [
  {
    id: 'account',
    value: 'account',
    label: 'Cuenta',
    icon: 'info',
    content: 'Gestiona el nombre visible, el correo y las preferencias principales de tu cuenta.',
  },
  {
    id: 'security',
    value: 'security',
    label: 'Seguridad',
    icon: 'success',
    content: 'Configura la contraseña, la autenticación y las sesiones activas.',
  },
  {
    id: 'billing',
    value: 'billing',
    label: 'Facturación',
    icon: 'save',
    content: 'Consulta tu plan, las facturas y el método de pago predeterminado.',
  },
]

const toolTabs: TabItem[] = [
  {
    id: 'search',
    value: 'search',
    label: 'Buscar',
    icon: 'search',
    trailingIcon: 'chevronRight',
    forceMount: true,
  },
  {
    id: 'saved',
    value: 'saved',
    label: 'Guardado',
    icon: 'save',
    contentProps: { forceMount: true },
  },
  {
    id: 'alerts',
    value: 'alerts',
    label: 'Alertas',
    icon: 'warning',
    trigger: { disabled: true },
  },
]
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Tabs</h1>
      <p class="text-muted-foreground">
        Ejemplos con variantes, orientación, props funcionales, UI contextual y slots.
      </p>
    </header>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Uso básico</h2>
        <p class="text-sm text-muted-foreground">Tab activa: {{ activeAccountTab }}.</p>
      </div>

      <Tabs
        v-model="activeAccountTab"
        :tabs="accountTabs"
        :ui="{
          content: { class: 'mt-4 min-h-28 border p-4 text-sm text-muted-foreground' },
        }"
      />
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Variante line</h2>
        <p class="text-sm text-muted-foreground">Indicador inferior para la tab activa.</p>
      </div>

      <Tabs
        default-value="security"
        variant="line"
        :tabs="accountTabs"
        :ui="{
          list: { class: 'w-full justify-start border-b' },
          content: { class: 'mt-0 rounded-none border-x border-b p-4 text-sm' },
        }"
      />
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Orientación vertical</h2>
        <p class="text-sm text-muted-foreground">Lista lateral y contenido flexible.</p>
      </div>

      <Tabs
        default-value="account"
        orientation="vertical"
        variant="line"
        :tabs="accountTabs"
        :list="{ as: 'div' }"
        :ui="{
          root: { class: 'min-h-56 gap-6' },
          list: { class: 'w-40 border-r pr-3' },
          trigger: { class: 'justify-start' },
          contentWrapper: { class: 'rounded-lg border p-4' },
          content: { class: 'mt-0 text-sm text-muted-foreground' },
        }"
      />
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Estado controlado y activación manual</h2>
        <p class="text-sm text-muted-foreground">Herramienta activa: {{ activeToolTab }}.</p>
      </div>

      <Tabs
        v-model="activeToolTab"
        activation-mode="manual"
        :unmount-on-hide="false"
        variant="line"
        :tabs="toolTabs"
        :ui="{
          root: { 'data-example': 'controlled-tabs' },
          list: { class: 'w-full justify-start' },
          trigger: ({ active }) => ({
            class: active ? 'font-bold text-primary' : '',
            title: active ? 'Tab activa' : 'Activar tab',
          }),
          icon: ({ active }) => ({ class: active ? 'scale-110 text-primary' : '' }),
          label: ({ active }) => ({ class: active ? 'tracking-wide' : '' }),
          trailingIcon: { class: 'opacity-50' },
          content: { class: 'mt-4 min-h-32 rounded-lg border p-4' },
        }"
      >
        <template #content-search="{ tab, active }">
          <div class="space-y-2">
            <h3 class="font-semibold">{{ tab.label }}</h3>
            <p class="text-sm text-muted-foreground">
              Contenido individual. Estado: {{ active ? 'activo' : 'inactivo' }}.
            </p>
          </div>
        </template>

        <template #content="{ tab, active }">
          <div class="space-y-2">
            <h3 class="font-semibold">{{ tab.label }}</h3>
            <p class="text-sm text-muted-foreground">
              Contenido global. Estado: {{ active ? 'activo' : 'inactivo' }}.
            </p>
          </div>
        </template>
      </Tabs>

      <div class="flex flex-wrap gap-2">
        <Button label="Buscar" variant="outline" @click="activeToolTab = 'search'" />
        <Button label="Guardado" variant="outline" @click="activeToolTab = 'saved'" />
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slots de trigger</h2>
        <p class="text-sm text-muted-foreground">
          Personalización global e individual de cada trigger.
        </p>
      </div>

      <Tabs
        default-value="account"
        :tabs="accountTabs"
        :ui="{
          list: { class: 'gap-2 bg-transparent p-0' },
          trigger: ({ active }) => ({
            class: active ? 'border-primary bg-primary/10 text-primary' : 'border bg-background',
          }),
          content: { class: 'mt-4 rounded-lg bg-muted/40 p-4 text-sm' },
        }"
      >
        <template #trigger-account="{ tab, active }">
          <span class="flex items-center gap-2">
            <span
              :class="['size-2 rounded-full', active ? 'bg-primary' : 'bg-muted-foreground/40']"
            />
            {{ tab.label }}
          </span>
        </template>

        <template #trailing="{ active }">
          <span v-if="active" class="text-[10px]">ACTIVA</span>
        </template>
      </Tabs>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Props funcionales por tab</h2>
        <p class="text-sm text-muted-foreground">
          trigger y contentProps se filtran mediante normalizadores explícitos.
        </p>
      </div>

      <Tabs
        default-value="first"
        :list="{ as: 'nav' }"
        :tabs="[
          {
            id: 'first',
            value: 'first',
            label: 'Primera',
            trigger: { as: 'button' },
            contentProps: { as: 'section', forceMount: true },
            content: 'Panel montado permanentemente.',
          },
          {
            id: 'second',
            value: 'second',
            label: 'Segunda',
            trigger: { as: 'button' },
            contentProps: { as: 'article' },
            content: 'Panel renderizado como article.',
          },
        ]"
        :ui="{
          list: { 'aria-label': 'Ejemplo de props funcionales' },
          content: { class: 'mt-4 rounded-lg border p-4 text-sm' },
        }"
      />
    </section>
  </main>
</template>
