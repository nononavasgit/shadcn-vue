<script setup lang="ts">
import MeterGroupDocs from '../docs/MeterGroupDocs.vue'
import MeterGroupExamples from '../examples/meter-group/MeterGroupExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <MeterGroupDocs />
        <MeterGroupExamples />
      </div>
    </main>
  </DocsLayout>
</template>
