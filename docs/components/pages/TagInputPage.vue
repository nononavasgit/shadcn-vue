<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import TagInputDocs from '../docs/TagInputDocs.vue'
import TagInputExamples from '../examples/tag-input/TagInputExamples.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <TagInputDocs />
        <TagInputExamples />
      </div>
    </main>
  </DocsLayout>
</template>
