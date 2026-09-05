<script setup lang="ts">
import PaginationDocs from '../docs/PaginationDocs.vue'
import PaginationPlayground from '../examples/pagination/PaginationPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <PaginationDocs />
        <PaginationPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
