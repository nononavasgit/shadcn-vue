<script setup>
import { ref } from 'vue'
import { Icon, ToggleGroup } from '@/components/ui'
import { ConfigProvider } from '@/components/provider'

const selectedFormat = ref('save')

const formatItems = [
  { id: 'save', value: 'save', label: 'Guardar', icon: 'save' },
  { id: 'check', value: 'check', label: 'Validar', icon: 'check' },
  { id: 'warning', value: 'warning', label: 'Avisar', icon: 'warning' },
]

const actionItems = [
  { id: 'save', value: 'save', label: 'Guardar', icon: 'save' },
  { id: 'check', value: 'check', label: 'Validar', icon: 'check' },
  { id: 'error', value: 'error', label: 'Eliminar', icon: 'x' },
]

const toggleGroupUI = {
  root: ({ value }) => ({
    class: value ? 'rounded-md ring-1 ring-primary/20' : undefined,
  }),
  item: ({ selected }) => ({
    class: selected ? 'font-semibold' : undefined,
  }),
  label: ({ selected }) => ({
    class: selected ? 'underline underline-offset-2' : undefined,
  }),
}
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto min-h-screen max-w-2xl space-y-8 p-6 md:p-10">
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">ToggleGroup examples</h2>

        <div class="space-y-2">
          <h3 class="font-medium">Selección simple y controlada</h3>

          <ToggleGroup
            v-model="selectedFormat"
            :items="formatItems"
            variant="outline"
            severity="primary"
            mandatory
          />

          <p class="text-sm text-muted-foreground">
            Formato seleccionado: {{ selectedFormat || 'ninguno' }}
          </p>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium">Selección múltiple con defaultValue</h3>

          <ToggleGroup
            type="multiple"
            :default-value="['save']"
            :items="actionItems"
            variant="outline"
            severity="secondary"
            :spacing="1"
            mandatory
          />
        </div>

        <div class="space-y-2">
          <h3 class="font-medium">Mandatory, UI y slots con contexto</h3>

          <ToggleGroup :items="formatItems" variant="plain" severity="success" mandatory>
            <template #leading="{ item, selected }">
              <Icon
                :name="selected ? 'check' : item.icon"
                :class="selected ? 'text-success' : 'text-muted-foreground'"
              />
            </template>

            <template #label="{ item, selected }">
              {{ selected ? `${item.label} ✓` : item.label }}
            </template>

            <template #trailing="{ first, last }">
              <span v-if="first" class="text-xs text-muted-foreground">inicio</span>
              <span v-else-if="last" class="text-xs text-muted-foreground">fin</span>
            </template>

            <template #label-warning="{ selected }">
              {{ selected ? 'Aviso activo' : 'Aviso' }}
            </template>
          </ToggleGroup>
        </div>
      </section>
    </main>
  </ConfigProvider>
</template>
