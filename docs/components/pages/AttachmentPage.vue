<script setup lang="ts">
import AttachmentDocs from '../docs/AttachmentDocs.vue'
import DocsLayout from '../DocsLayout.vue'
import AttachmentExamples from '../examples/attachment/AttachmentExamples.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <AttachmentDocs />
        <AttachmentExamples />
      </div>
    </main>
  </DocsLayout>
</template>
