<script setup lang="ts">
import SplitterDocs from '../docs/SplitterDocs.vue'
import SplitterExamples from '../examples/splitter/SplitterExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <SplitterDocs />
        <SplitterExamples />
      </div>
    </main>
  </DocsLayout>
</template>
