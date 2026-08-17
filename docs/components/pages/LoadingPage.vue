<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import LoadingExamples from '../examples/loading/LoadingExamples.vue'
import LoadingDocs from '../docs/LoadingDocs.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <LoadingDocs />
        <LoadingExamples />
      </div>
    </main>
  </DocsLayout>
</template>
