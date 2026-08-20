<script setup lang="ts">
import { RouterLink } from 'vue-router'

export interface ApiTableRow {
  name: string
  type: string
  typeLink?: string
  default?: string
  description: string
  required?: boolean
}

withDefaults(
  defineProps<{
    title: string
    id?: string
    rows: ApiTableRow[]
    emptyText?: string
    typeLabel?: string
    showDefault?: boolean
  }>(),
  {
    emptyText: 'No hay elementos definidos.',
    typeLabel: 'Tipo',
    showDefault: true,
  },
)
</script>

<template>
  <section :id="id" class="overflow-hidden rounded-lg border bg-card text-card-foreground">
    <header class="border-b px-4 py-3">
      <h3 class="font-medium">{{ title }}</h3>
    </header>

    <div class="overflow-x-auto">
      <table class="w-full min-w-[640px] text-left text-sm">
        <thead class="bg-muted/40 text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th class="px-4 py-3 font-medium">Nombre</th>
            <th class="px-4 py-3 font-medium">{{ typeLabel }}</th>
            <th v-if="showDefault" class="px-4 py-3 font-medium">Por defecto</th>
            <th class="px-4 py-3 font-medium">Descripcion</th>
          </tr>
        </thead>

        <tbody v-if="rows.length" class="divide-y">
          <tr v-for="row in rows" :key="row.name" class="align-top">
            <td class="px-4 py-3 font-mono text-xs whitespace-nowrap">
              {{ row.name }}<span v-if="row.required" class="text-destructive"> *</span>
            </td>
            <td class="px-4 py-3">
              <a v-if="row.typeLink?.startsWith('#')" :href="row.typeLink">
                <code
                  class="rounded bg-muted px-1.5 py-0.5 text-xs text-primary underline-offset-4 hover:underline"
                >
                  {{ row.type }}
                </code>
              </a>
              <RouterLink v-else-if="row.typeLink" :to="row.typeLink">
                <code
                  class="rounded bg-muted px-1.5 py-0.5 text-xs text-primary underline-offset-4 hover:underline"
                >
                  {{ row.type }}
                </code>
              </RouterLink>
              <code v-else class="rounded bg-muted px-1.5 py-0.5 text-xs">{{ row.type }}</code>
            </td>
            <td v-if="showDefault" class="px-4 py-3 text-muted-foreground">
              <code v-if="row.default" class="text-xs">{{ row.default }}</code>
              <span v-else>-</span>
            </td>
            <td class="px-4 py-3 text-muted-foreground">{{ row.description }}</td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td :colspan="showDefault ? 4 : 3" class="px-4 py-6 text-center text-muted-foreground">
              {{ emptyText }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
