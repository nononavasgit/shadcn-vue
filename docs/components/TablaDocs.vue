<script setup lang="ts">
export interface TablaDocsColumn {
  key: string
  label: string
  class?: string
}

export interface TablaDocsRow {
  [key: string]: string
}

defineProps<{
  title: string
  description?: string
  columns: TablaDocsColumn[]
  rows: TablaDocsRow[]
  emptyText?: string
}>()
</script>

<template>
  <section :aria-labelledby="`tabla-${title.toLowerCase()}`">
    <div class="mb-4">
      <h2 :id="`tabla-${title.toLowerCase()}`" class="text-2xl font-semibold tracking-tight">
        {{ title }}
      </h2>
      <p v-if="description" class="mt-2 text-sm leading-6 text-muted-foreground">
        {{ description }}
      </p>
    </div>

    <div class="overflow-hidden rounded-xl border">
      <div v-if="rows.length" class="overflow-x-auto">
        <table class="w-full border-collapse text-left text-sm">
          <thead class="bg-muted/60">
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                class="border-b px-4 py-3 font-medium"
                :class="column.class"
                scope="col"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="(row, index) in rows" :key="index">
              <td
                v-for="column in columns"
                :key="column.key"
                class="px-4 py-3 align-top text-muted-foreground"
                :class="column.class"
              >
                <code v-if="column.key === 'name' || column.key === 'type'">
                  {{ row[column.key] }}
                </code>
                <template v-else>{{ row[column.key] }}</template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="px-4 py-6 text-sm text-muted-foreground">
        {{ emptyText ?? `Este componente no expone ${title.toLowerCase()}.` }}
      </p>
    </div>
  </section>
</template>
