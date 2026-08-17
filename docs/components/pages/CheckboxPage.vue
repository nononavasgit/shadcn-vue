<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import CheckboxDocs from '../docs/CheckboxDocs.vue'
import CheckboxExamples from '../examples/checkbox/CheckboxExamples.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <CheckboxDocs />
        <CheckboxExamples />
      </div>
    </main>
  </DocsLayout>
</template>
