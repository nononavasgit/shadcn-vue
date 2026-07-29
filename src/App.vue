<script setup lang="ts">
import { ref } from 'vue'
import {
  Command,
  type CommandGroup,
  type CommandItem,
  type CommandUI,
} from '@/components/app/Command'
import { Icon } from '@/components/app/Icon'

const commandItems: CommandItem[] = [
  {
    id: 'search',
    value: 'search',
    label: 'Buscar en el proyecto',
    icon: {
      name: 'search',
      color: 'green',
    },
  },
  {
    id: 'save',
    value: 'save',
    label: 'Guardar todos los cambios',
    icon: 'save',
  },
  {
    id: 'documentation',
    value: 'documentation',
    label: 'Abrir documentación',
    icon: 'info',
  },
  {
    id: 'deploy',
    value: 'deploy',
    label: 'Desplegar en producción',
    icon: 'chevronRight',
    disabled: true,
  },
]

const commandGroups: CommandGroup[] = [
  {
    id: 'project',
    label: 'Proyecto',
    items: commandItems.slice(0, 3),
  },
  {
    id: 'danger',
    label: 'Acciones sensibles',
    items: [
      {
        id: 'validate',
        value: 'validate',
        label: 'Validar el proyecto',
        icon: 'success',
      },
      {
        id: 'delete-cache',
        value: 'delete-cache',
        label: 'Eliminar la caché',
        icon: 'trash2',
      },
      commandItems[3]!,
    ],
  },
]

const commandUI: CommandUI = {
  input: {
    class: 'text-violet-700 dark:text-violet-300',
  },
  heading: {
    class: 'font-semibold text-violet-600 dark:text-violet-400',
  },
  item: ({ selected }) => ({
    class: selected ? 'bg-violet-100 dark:bg-violet-950/50' : undefined,
  }),
  icon: ({ item }) => ({
    color: item.id === 'delete-cache' ? 'red' : 'blue',
  }),
  separator: {
    class: 'bg-violet-200 dark:bg-violet-900',
  },
}

const itemValue = ref<string>()
const groupValue = ref<string>()
const customValue = ref<string>()
const multipleValue = ref<string[]>(['search'])
const lastSelection = ref('Ninguna selección')

function handleSelect(item: CommandItem, group?: CommandGroup) {
  lastSelection.value = group
    ? `${item.label ?? item.value ?? item.id} · ${group.label ?? group.id}`
    : `${item.label ?? item.value ?? item.id} · sin grupo`
}
</script>

<template>
  <!-- Command examples -->
  <main class="mx-auto max-w-5xl space-y-10 p-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Command</h1>
      <p class="text-muted-foreground">
        Ejemplos con items independientes, grupos, búsqueda, selección, UI y slots.
      </p>
    </header>

    <section class="space-y-4" aria-labelledby="command-items-title">
      <div>
        <h2 id="command-items-title" class="text-xl font-semibold">Sin grupos</h2>
        <p class="text-sm text-muted-foreground">
          La prop <code>items</code> permite mostrar comandos directamente, sin crear un grupo
          artificial.
        </p>
      </div>

      <div class="grid gap-4 rounded-lg border p-5 md:grid-cols-[minmax(0,1fr)_240px]">
        <Command v-model="itemValue" :items="commandItems" :filter="true" @select="handleSelect" />

        <div class="rounded-lg bg-muted p-4 text-sm">
          <p class="font-medium">Estado</p>
          <p class="mt-2 text-muted-foreground">Valor: {{ itemValue ?? 'ninguno' }}</p>
          <p class="mt-2 text-muted-foreground">{{ lastSelection }}</p>
        </div>
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="command-multiple-title">
      <div>
        <h2 id="command-multiple-title" class="text-xl font-semibold">Selección múltiple</h2>
        <p class="text-sm text-muted-foreground">
          Con <code>multiple</code>, el modelo es un array y cada selección alterna el valor
          automáticamente.
        </p>
      </div>

      <Command
        v-model="multipleValue"
        multiple
        selectable
        :items="commandItems"
        :ui="commandUI"
        class="rounded-lg border shadow-sm md:max-w-xl"
      />

      <p class="text-sm text-muted-foreground">
        Valores seleccionados:
        <strong>{{ multipleValue.length ? multipleValue.join(', ') : 'ninguno' }}</strong>
      </p>
    </section>

    <section class="space-y-4" aria-labelledby="command-groups-title">
      <div>
        <h2 id="command-groups-title" class="text-xl font-semibold">Con grupos</h2>
        <p class="text-sm text-muted-foreground">
          Los encabezados y separadores aparecen automáticamente y la búsqueda utiliza el texto
          visible de cada item.
        </p>
      </div>

      <Command
        v-model="groupValue"
        :groups="commandGroups"
        class="rounded-lg border shadow-sm md:max-w-xl"
      />

      <p class="text-sm text-muted-foreground">
        Valor seleccionado: <strong>{{ groupValue ?? 'ninguno' }}</strong>
      </p>
    </section>

    <section class="space-y-4" aria-labelledby="command-custom-title">
      <div>
        <h2 id="command-custom-title" class="text-xl font-semibold">UI y slots</h2>
        <p class="text-sm text-muted-foreground">
          Personalización funcional y slots individuales identificados por el <code>id</code>.
        </p>
      </div>

      <Command
        v-model="customValue"
        :groups="commandGroups"
        :filter="true"
        selectable
        placeholder="Busca una acción..."
        empty-label="No existe ninguna acción con ese nombre."
        :ui="commandUI"
        class="rounded-lg border border-violet-200 shadow-sm md:max-w-xl dark:border-violet-900"
        @select="handleSelect"
      >
        <template #heading-danger="{ group }">
          <span class="flex items-center gap-2 text-red-600">
            <Icon name="warning" class="size-3.5" />
            {{ group.label }}
          </span>
        </template>

        <template #label-save="{ item, selected }">
          <span :class="selected ? 'font-semibold text-violet-700' : undefined">
            {{ item.label }}
          </span>
        </template>

        <template #icon-delete-cache>
          <Icon name="trash2" color="red" />
        </template>
      </Command>

      <p class="text-sm text-muted-foreground">
        Última selección: <strong>{{ lastSelection }}</strong>
      </p>
    </section>
  </main>
</template>
