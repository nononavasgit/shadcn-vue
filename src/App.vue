<script setup>
import { ref } from 'vue'
import { Command } from '@/components/app/Command'
import { Icon } from '@/components/app/Icon'
import { Popover } from '@/components/app/Popover'

const commandItems = [
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

const commandGroups = [
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
      commandItems[3],
    ],
  },
]

const commandUI = {
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
  footer: {
    class: 'border-t px-3 py-2 text-xs text-muted-foreground',
  },
}

const itemValue = ref()
const groupValue = ref()
const customValue = ref()
const customSearch = ref('')
const commandFiltering = ref(false)
const filteredCommandGroups = ref(commandGroups)
const multipleValue = ref(['search'])

let commandFilterRequest = 0

async function handleCommandSearch(search, filter) {
  const request = ++commandFilterRequest
  customSearch.value = search
  commandFiltering.value = true

  await new Promise((resolve) => setTimeout(resolve, 2000))
  if (request !== commandFilterRequest) return

  filteredCommandGroups.value = search
    ? commandGroups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            filter.contains(
              `${item.label ?? ''} ${item.value ?? ''} ${(item.tags ?? []).join(' ')}`,
              search,
            ),
          ),
        }))
        .filter((group) => group.items.length > 0)
    : commandGroups
  commandFiltering.value = false
}

const richCommandItems = [
  {
    id: 'vue-guide',
    label: 'Guía de Vue',
    description: 'Documentación para construir interfaces con Vue.',
    tags: ['frontend', 'javascript', 'componentes'],
  },
  {
    id: 'api-users',
    label: 'Usuarios',
    description: 'Administración de cuentas y permisos.',
    tags: ['backend', 'seguridad', 'equipo'],
  },
  {
    id: 'deploy-production',
    label: 'Desplegar',
    description: 'Publicar la aplicación en producción.',
    tags: ['devops', 'release', 'producción'],
  },
]
const filteredRichCommandItems = ref(richCommandItems)

function handleRichCommandSearch(search, filter) {
  filteredRichCommandItems.value = search
    ? richCommandItems.filter((item) =>
        filter.contains(`${item.label} ${item.description} ${item.tags.join(' ')}`, search),
      )
    : richCommandItems
}

const lastSelection = ref('Ninguna selección')

function handleSelect(item, group) {
  console.log(item, group)
  lastSelection.value = group
    ? `${item.label ?? item.value ?? item.id} · ${group.label ?? group.id}`
    : `${item.label ?? item.value ?? item.id} · sin grupo`
}
</script>

<template>
  <!-- Command examples -->
  <main class="mx-auto max-w-5xl space-y-10 p-8">
    <Popover :ui="{ content: { class: 'p-0 border-none' } }">
      <button class="rounded-lg border">HOlaa</button>

      <template #content>
        <Command v-model="itemValue" :items="commandItems" :filter="false" @select="handleSelect" />
      </template>
    </Popover>

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
        :items="commandGroups"
        class="rounded-lg border shadow-sm md:max-w-xl"
      />

      <p class="text-sm text-muted-foreground">Con un único grupo no se muestra su encabezado:</p>
      <Command :items="commandGroups.slice(0, 1)" class="rounded-lg border shadow-sm md:max-w-xl" />

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

      {{ customSearch }}
      <Command
        v-model="customValue"
        :items="filteredCommandGroups"
        :filter="true"
        selectable
        placeholder="Busca una acción..."
        empty-label="No existe ninguna acción con ese nombre."
        :ui="commandUI"
        class="rounded-lg border border-violet-200 shadow-sm md:max-w-xl dark:border-violet-900"
        @select="handleSelect"
        @search="handleCommandSearch"
      >
        <template #inputIcon>
          <Icon name="error" color="purple" class="" />
        </template>

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

        <template #footer="{ search }">
          {{ commandFiltering ? 'Filtrando…' : `Filtro controlado: ${search || 'sin búsqueda'}` }}
        </template>
      </Command>

      <p class="text-sm text-muted-foreground">
        Última selección: <strong>{{ lastSelection }}</strong>
      </p>
    </section>

    <section class="space-y-4" aria-labelledby="command-rich-items-title">
      <div>
        <h2 id="command-rich-items-title" class="text-xl font-semibold">
          Filtrado externo por varios campos
        </h2>
        <p class="text-sm text-muted-foreground">
          El evento <code>search</code> filtra por label, descripción y tags mediante
          <code>useFilter</code>. El contenido de cada opción se renderiza con el slot
          <code>item</code>.
        </p>
      </div>

      <Command
        :items="filteredRichCommandItems"
        placeholder="Busca por nombre, descripción o tag..."
        class="rounded-lg border shadow-sm md:max-w-xl"
        :selectable="true"
        :multiple="true"
        @search="handleRichCommandSearch"
      >
        <template #item="{ item, ...slotProps }">
          <div class="min-w-0 flex-1">
            <p class="font-medium">{{ item.label }}</p>
            <p class="truncate text-xs text-muted-foreground">{{ item.description }}</p>
            <div class="mt-1 flex flex-wrap gap-1">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
              >
                {{ tag }}
              </span>
            </div>

            <div v-if="slotProps.selected">YES</div>
          </div>
        </template>
      </Command>
    </section>
  </main>
</template>
