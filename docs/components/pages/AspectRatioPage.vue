<script setup lang="ts">
import AspectRatioDocs from '../docs/AspectRatioDocs.vue'
import AspectRatioExamples from '../examples/aspect-ratio/AspectRatioExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <AspectRatioDocs />
        <AspectRatioExamples />
      </div>
    </main>
  </DocsLayout>
</template>
