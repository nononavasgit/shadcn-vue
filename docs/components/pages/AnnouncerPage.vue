<script setup lang="ts">
import AnnouncerDocs from '../docs/AnnouncerDocs.vue'
import AnnouncerExamples from '../examples/announcer/AnnouncerExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <AnnouncerDocs />
        <AnnouncerExamples />
      </div>
    </main>
  </DocsLayout>
</template>
