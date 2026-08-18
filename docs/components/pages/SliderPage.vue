<script setup lang="ts">
import SliderDocs from '../docs/SliderDocs.vue'
import SliderExamples from '../examples/slider/SliderExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <SliderDocs />
        <SliderExamples />
      </div>
    </main>
  </DocsLayout>
</template>
