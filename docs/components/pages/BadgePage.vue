<script setup lang="ts">
import BadgeDocs from '../docs/BadgeDocs.vue'
import BadgeExamples from '../examples/badge/BadgeExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <BadgeDocs />
        <BadgeExamples />
      </div>
    </main>
  </DocsLayout>
</template>
