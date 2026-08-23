<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import SearchDocs from '../docs/SearchDocs.vue'
import SearchExamples from '../examples/search/SearchExamples.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <SearchDocs />
        <SearchExamples />
      </div>
    </main>
  </DocsLayout>
</template>
