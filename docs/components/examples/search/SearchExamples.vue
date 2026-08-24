<script setup lang="ts">
import { SearchIcon } from '@lucide/vue'
import { ref } from 'vue'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Search } from '@/components/ui/Search'

const query = ref('')
const submittedQuery = ref('')

function submitSearch() {
  submittedQuery.value = query.value.trim()
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Combina Search con controles de formulario y gestiona el envío desde el componente padre.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Búsqueda con Input</h3>
          <p class="text-sm text-muted-foreground">
            Usa el evento nativo submit y evita el recargo de la página.
          </p>
        </div>
        <Search
          aria-label="Buscar componentes"
          class="flex items-center gap-2"
          @submit.prevent="submitSearch"
        >
          <Input v-model:value="query" type="search" placeholder="Buscar componentes" />
          <Button type="submit">Buscar</Button>
        </Search>
        <p v-if="submittedQuery" class="text-sm text-muted-foreground">
          Buscando: <strong class="text-foreground">{{ submittedQuery }}</strong>
        </p>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Controles nativos</h3>
          <p class="text-sm text-muted-foreground">
            El slot por defecto admite cualquier contenido válido dentro de un formulario.
          </p>
        </div>
        <Search aria-label="Buscar usuarios" class="flex items-center gap-2">
          <div class="relative flex-1">
            <SearchIcon
              class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              placeholder="Buscar usuarios"
              class="h-9 w-full rounded-md border bg-background pr-3 pl-9 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Button type="submit" variant="outline">Filtrar</Button>
        </Search>
      </div>
    </div>
  </section>
</template>
