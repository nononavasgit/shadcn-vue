<script setup lang="ts">
import PaginationDocs from '../docs/PaginationDocs.vue'
import PaginationExamples from '../examples/pagination/PaginationExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <PaginationDocs />
        <PaginationExamples />
      </div>
    </main>
  </DocsLayout>
</template>
