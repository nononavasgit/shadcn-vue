<script setup lang="ts">
import { ref } from 'vue'
import {
  Command,
  type CommandEntry,
  type CommandGroup,
  type CommandItem,
} from '@/components/ui/Command'

const simpleItems: CommandItem[] = [
  { id: 'search', label: 'Buscar archivos', icon: 'search' },
  { id: 'save', label: 'Guardar documento', icon: 'save' },
  { id: 'delete', label: 'Eliminar elemento', icon: 'trash2', disabled: true },
]

const groupedItems: CommandEntry[] = [
  {
    id: 'suggestions',
    label: 'Sugerencias',
    items: [
      { id: 'calendar', value: 'calendar', label: 'Calendario', icon: 'info' },
      { id: 'search', value: 'search', label: 'Buscar', icon: 'search' },
    ],
  },
  {
    id: 'settings',
    label: 'Configuracion',
    separator: { as: 'div' },
    items: [
      { id: 'profile', value: 'profile', label: 'Perfil', icon: 'success' },
      { id: 'billing', value: 'billing', label: 'Facturacion', icon: 'save' },
      { id: 'security', value: 'security', label: 'Seguridad', icon: 'warning' },
    ],
  },
]

const primitiveItems: CommandEntry[] = [
  {
    id: 'actions',
    label: 'Acciones',
    as: 'section',
    separator: { as: 'div' },
    items: [
      { id: 'first', value: 'first', label: 'Primera accion', as: 'button' },
      { id: 'second', value: 'second', label: 'Segunda accion', as: 'button' },
    ],
  },
]

const selectedCommand = ref<string>('calendar')
const selectedCommands = ref<string[]>(['search', 'profile'])
const lastSelection = ref('Ninguna')
const searchValue = ref('')

function handleSelect(item: CommandItem, group?: CommandGroup) {
  lastSelection.value = group ? `${group.label}: ${item.label}` : (item.label ?? String(item.id))
}
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Command</h1>
      <p class="text-muted-foreground">
        Ejemplos con busqueda, grupos, seleccion, UI contextual y slots personalizados.
      </p>
    </header>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Uso basico</h2>
        <p class="text-sm text-muted-foreground">Seleccion emitida: {{ lastSelection }}.</p>
      </div>

      <Command
        :items="simpleItems"
        placeholder="Escribe una accion..."
        class="max-w-xl"
        @select="handleSelect"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Grupos y seleccion unica</h2>
        <p class="text-sm text-muted-foreground">Valor seleccionado: {{ selectedCommand }}.</p>
      </div>

      <Command
        v-model="selectedCommand"
        selectable
        :items="groupedItems"
        placeholder="Buscar comando..."
        :ui="{
          root: { class: 'max-w-xl' },
          inputWrapper: { class: 'bg-muted/30' },
          list: { class: 'max-h-64' },
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Seleccion multiple</h2>
        <p class="text-sm text-muted-foreground">
          Valores: {{ selectedCommands.join(', ') || 'ninguno' }}.
        </p>
      </div>

      <Command
        v-model="selectedCommands"
        multiple
        selectable
        selection-behavior="toggle"
        :items="groupedItems"
        :ui="{
          root: { class: 'max-w-xl' },
          indicator: ({ selected }) => ({ class: selected ? 'text-primary' : '' }),
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Cabecera, pie y busqueda</h2>
        <p class="text-sm text-muted-foreground">Busqueda actual: {{ searchValue || 'vacia' }}.</p>
      </div>

      <Command
        :items="groupedItems"
        :input="{ autoFocus: false }"
        :ui="{
          root: { class: 'max-w-xl' },
          header: { class: 'border-b bg-muted/40 px-3 py-2 text-xs font-medium' },
          footer: { class: 'border-t px-3 py-2 text-xs text-muted-foreground' },
        }"
        @search="searchValue = $event"
      >
        <template #header>Paleta de comandos</template>
        <template #footer="{ search }">
          {{ search ? `Filtrando por: ${search}` : 'Escribe para filtrar los resultados' }}
        </template>
      </Command>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">UI contextual</h2>
        <p class="text-sm text-muted-foreground">
          Grupos e items reciben su posicion y estado de seleccion.
        </p>
      </div>

      <Command
        v-model="selectedCommand"
        selectable
        :items="groupedItems"
        :ui="{
          root: { class: 'max-w-xl rounded-xl bg-muted/20' },
          group: ({ first, last }) => ({
            class: [first && 'pt-2', last && 'pb-2'],
          }),
          heading: ({ groupIndex }) => ({ class: groupIndex === 0 ? 'text-primary' : '' }),
          item: ({ selected, firstItem }) => ({
            class: [selected && 'bg-primary/10 text-primary', firstItem && 'mt-1'],
            title: selected ? 'Comando seleccionado' : undefined,
          }),
          icon: ({ selected }) => ({ class: selected ? 'text-primary' : 'opacity-60' }),
          label: ({ selected }) => ({ class: selected ? 'font-semibold' : '' }),
          separator: { class: 'mx-2' },
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slots globales e individuales</h2>
        <p class="text-sm text-muted-foreground">
          Los slots asociados al id tienen prioridad sobre los slots globales.
        </p>
      </div>

      <Command v-model="selectedCommand" selectable :items="groupedItems" class="max-w-xl">
        <template #heading="{ group }">
          <span class="tracking-wider uppercase">{{ group.label }}</span>
        </template>

        <template #icon="{ item }">
          <span class="grid size-5 place-items-center rounded-full bg-muted text-[10px]">
            {{ String(item.label).charAt(0) }}
          </span>
        </template>

        <template #item-security="{ item, selected }">
          <div class="flex w-full items-center justify-between">
            <span class="font-medium text-warning">{{ item.label }}</span>
            <span class="text-xs">{{ selected ? 'Activa' : 'Abrir' }}</span>
          </div>
        </template>
      </Command>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Props funcionales normalizadas</h2>
        <p class="text-sm text-muted-foreground">
          Items y grupos extienden sus props; input y list se filtran explicitamente.
        </p>
      </div>

      <Command
        :items="primitiveItems"
        :input="{ as: 'input', autoFocus: false }"
        :list="{ as: 'div' }"
        :ui="{ root: { class: 'max-w-xl' } }"
      />
    </section>
  </main>
</template>
