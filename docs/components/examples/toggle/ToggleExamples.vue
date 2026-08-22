<script setup lang="ts">
import { ref } from 'vue'

import { Toggle } from '@/components/ui/Toggle'

const notifications = ref(false)
const favorite = ref(true)
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Usa Toggle con modelos controlados, iconos y slots personalizados.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Estado controlado</h3>
          <p class="text-sm text-muted-foreground">
            El valor se sincroniza mediante v-model:value.
          </p>
        </div>
        <Toggle v-model:value="notifications" label="Notifications" :icon="{ name: 'bell' }" />
        <p class="text-sm text-muted-foreground">
          {{ notifications ? 'Activado' : 'Desactivado' }}
        </p>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Iconos y slots</h3>
          <p class="text-sm text-muted-foreground">
            Los slots leading y trailing tienen prioridad sobre sus iconos fallback.
          </p>
        </div>
        <Toggle v-model:value="favorite" severity="primary" variant="outline">
          <template #leading>
            <span aria-hidden="true">★</span>
          </template>
          Favorite
          <template #trailing>
            <span class="text-xs">{{ favorite ? 'On' : 'Off' }}</span>
          </template>
        </Toggle>
      </div>
    </div>
  </section>
</template>
