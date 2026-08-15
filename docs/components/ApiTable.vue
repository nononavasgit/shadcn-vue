<script setup lang="ts">
export interface ApiTableRow {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

withDefaults(
  defineProps<{
    title: string
    rows: ApiTableRow[]
    emptyText?: string
  }>(),
  {
    emptyText: 'No hay elementos definidos.',
  },
)
</script>

<template>
  <section class="overflow-hidden rounded-lg border bg-card text-card-foreground">
    <header class="border-b px-4 py-3">
      <h3 class="font-medium">{{ title }}</h3>
    </header>

    <div class="overflow-x-auto">
      <table class="w-full min-w-[640px] text-left text-sm">
        <thead class="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th class="px-4 py-3 font-medium">Nombre</th>
            <th class="px-4 py-3 font-medium">Tipo</th>
            <th class="px-4 py-3 font-medium">Por defecto</th>
            <th class="px-4 py-3 font-medium">Descripcion</th>
          </tr>
        </thead>

        <tbody v-if="rows.length" class="divide-y">
          <tr v-for="row in rows" :key="row.name" class="align-top">
            <td class="whitespace-nowrap px-4 py-3 font-mono text-xs">
              {{ row.name }}<span v-if="row.required" class="text-destructive"> *</span>
            </td>
            <td class="px-4 py-3">
              <code class="rounded bg-muted px-1.5 py-0.5 text-xs">{{ row.type }}</code>
            </td>
            <td class="px-4 py-3 text-muted-foreground">
              <code v-if="row.default" class="text-xs">{{ row.default }}</code>
              <span v-else>-</span>
            </td>
            <td class="px-4 py-3 text-muted-foreground">{{ row.description }}</td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="4" class="px-4 py-6 text-center text-muted-foreground">
              {{ emptyText }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
