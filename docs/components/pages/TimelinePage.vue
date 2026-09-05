<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import TimelineDocs from '../docs/TimelineDocs.vue'
import TimelinePlayground from '../examples/timeline/TimelinePlayground.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <TimelineDocs />
        <TimelinePlayground />
      </div>
    </main>
  </DocsLayout>
</template>
