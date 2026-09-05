<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import TagInputDocs from '../docs/TagInputDocs.vue'
import TagInputPlayground from '../examples/tag-input/TagInputPlayground.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <TagInputDocs />
        <TagInputPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
