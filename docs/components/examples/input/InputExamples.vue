<script setup lang="ts">
import { CheckIcon, SearchIcon } from '@lucide/vue'
import { ref } from 'vue'

import { Input } from '@/components/ui/Input'

const searchValue = ref('Buscar componentes')
const emailValue = ref('')
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de usar Input en formularios controlados.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Valor controlado</h3>
          <p class="text-sm text-muted-foreground">Sincroniza el contenido con v-model:value.</p>
        </div>
        <Input v-model:value="searchValue" type="text" aria-label="Buscar componentes" />
        <p class="text-sm text-muted-foreground">{{ searchValue }}</p>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Placeholder y tipo</h3>
          <p class="text-sm text-muted-foreground">
            Configura una ayuda visual y el tipo nativo del campo.
          </p>
        </div>
        <Input
          v-model:value="emailValue"
          type="email"
          placeholder="nombre@ejemplo.com"
          aria-label="Correo electrónico"
        />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Deshabilitado</h3>
          <p class="text-sm text-muted-foreground">Muestra un valor sin permitir modificaciones.</p>
        </div>
        <Input
          value="Este campo no se puede editar."
          type="text"
          disabled
          aria-label="Contenido deshabilitado"
        />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Slots leading y trailing</h3>
          <p class="text-sm text-muted-foreground">
            Añade iconos u otro contenido alrededor del control.
          </p>
        </div>
        <Input placeholder="Buscar componentes" aria-label="Buscar componentes">
          <template #leading>
            <SearchIcon />
          </template>
          <template #trailing>
            <CheckIcon class="text-primary" />
          </template>
        </Input>
      </div>
    </div>
  </section>
</template>
