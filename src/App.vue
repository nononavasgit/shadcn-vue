<script setup>
import { ref, reactive, computed } from 'vue'
import { Accordion, Icon, Toggle } from '@/components/ui'
import { ConfigProvider } from '@/components/provider'

const accordionValue = ref(['account'])

const accordionItems = computed(() => {
  return [
    {
      value: 'account',
      label: 'Cuenta',
      description: 'Gestiona los datos principales de tu cuenta.',
      icon: {
        name: 'user',
        color: ['account'].includes(accordionValue.value) ? 'green' : 'red',
      },
    },
    {
      value: 'notifications',
      label: 'Notificaciones',
      description: 'Configura cómo quieres recibir los avisos.',
      icon: {
        name: 'info',
        ui: {
          root: () => ({ class: 'text-success' }),
        },
      },
    },
    {
      value: 'security',
      label: 'Seguridad',
      description: 'Revisa las opciones de acceso y protección.',
      icon: {
        name: 'warning',
        ui: {
          root: () => ({ class: 'text-warning' }),
        },
      },
    },
  ]
})

const accordionUI = reactive({
  root: ({ props, value }) => ({
    class: props.type === 'single' && value ? 'rounded-lg border px-4' : undefined,
  }),
  item: ({ open }) => ({
    class: open ? 'border-primary' : undefined,
  }),
  trigger: ({ open }) => ({
    class: open ? 'text-primary hover:no-underline' : undefined,
  }),
  content: ({ last }) => ({
    class: last ? 'pb-6' : undefined,
  }),
})

const toggleValue = ref(false)

const toggleUI = {
  root: ({ pressed }) => ({
    class: pressed ? 'ring-2 ring-primary/30' : undefined,
  }),
}
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto min-h-screen max-w-2xl space-y-8 p-6 md:p-10">
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Accordion examples</h2>

        {{ accordionValue }}
        {{ accordionItems }}

        <div class="space-y-2">
          <h3 class="font-medium">Con defaultValue</h3>
          <Accordion v-model="accordionValue" :items="accordionItems" collapsible> </Accordion>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium">Controlado y personalizado</h3>

          <Accordion v-model="accordionValue" :items="accordionItems" collapsible :ui="accordionUI">
            <template #trigger="{ item, index, open }">
              <span>{{ index + 1 }}. {{ item.label }}</span>
              <span v-if="open" class="text-xs text-muted-foreground">abierto</span>
            </template>

            <template #iconDropdown="{ open }">
              <Icon :name="open ? 'chevronUp' : 'chevronDown'" class="size-4 text-primary" />
            </template>

            <template #iconDropdown-security="{ open }">
              <Icon :name="open ? 'chevronUp' : 'chevronDown'" class="size-4 text-warning" />
            </template>

            <template #content-security="{ item, props }">
              <p>
                {{ item.description }} Tipo del accordion:
                <strong>{{ props.type }}</strong>
              </p>
            </template>

            <template #content="{ item, open }">
              <p :class="open ? 'text-foreground' : 'text-muted-foreground'">
                {{ item.description }}
              </p>
            </template>
          </Accordion>

          <p class="text-sm text-muted-foreground">
            Item activo: {{ accordionValue || 'ninguno' }}
          </p>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Toggle examples</h2>

        <div class="space-y-2">
          <h3 class="font-medium">Básico y controlado</h3>

          <Toggle v-model="toggleValue" label="Guardar" icon="save" />

          <p class="text-sm text-muted-foreground">
            Estado: {{ toggleValue ? 'activado' : 'desactivado' }}
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <Toggle label="Primario" variant="outline" severity="primary" />
          <Toggle label="Éxito" variant="outline" severity="success" icon="check" />
          <Toggle label="Aviso" variant="outline" severity="warning" icon="warning" />
          <Toggle label="Deshabilitado" disabled />
        </div>

        <div class="space-y-2">
          <h3 class="font-medium">Iconos y slots con contexto</h3>

          <Toggle
            default-value
            label="Confirmar"
            icon="check"
            trailing-icon="chevronDown"
            color="green"
            :ui="toggleUI"
          >
            <template #leading="{ pressed }">
              <Icon :name="pressed ? 'check' : 'x'" />
            </template>

            <template #default="{ state }">
              {{ state === 'on' ? 'Marcado' : 'Sin marcar' }}
            </template>

            <template #trailing="{ pressed }">
              <span class="text-xs">{{ pressed ? 'ON' : 'OFF' }}</span>
            </template>
          </Toggle>
        </div>
      </section>
    </main>
  </ConfigProvider>
</template>
