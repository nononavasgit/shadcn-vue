<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import SearchDocs from '../docs/SearchDocs.vue'
import SearchPlayground from '../examples/search/SearchPlayground.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <SearchDocs />
        <SearchPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
