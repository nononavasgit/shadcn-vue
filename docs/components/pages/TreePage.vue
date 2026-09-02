<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import TreeDocs from '../docs/TreeDocs.vue'
import TreeExamples from '../examples/tree/TreeExamples.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <TreeDocs />
        <TreeExamples />
      </div>
    </main>
  </DocsLayout>
</template>
