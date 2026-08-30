<script setup lang="ts">
import RibbonDocs from '../docs/RibbonDocs.vue'
import RibbonExamples from '../examples/ribbon/RibbonExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <RibbonDocs />
        <RibbonExamples />
      </div>
    </main>
  </DocsLayout>
</template>
