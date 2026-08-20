<script setup lang="ts">
import AccordionDocs from '../docs/AccordionDocs.vue'
import AccordionExamples from '../examples/accordion/AccordionExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <AccordionDocs />
        <AccordionExamples />
      </div>
    </main>
  </DocsLayout>
</template>
