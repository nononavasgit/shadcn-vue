<script setup lang="ts">
import ScrollAreaDocs from '../docs/ScrollAreaDocs.vue'
import ScrollAreaExamples from '../examples/scroll-area/ScrollAreaExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <ScrollAreaDocs />
        <ScrollAreaExamples />
      </div>
    </main>
  </DocsLayout>
</template>
