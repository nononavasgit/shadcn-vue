<script setup lang="ts">
import BubbleDocs from '../docs/BubbleDocs.vue'
import BubblePlayground from '../examples/bubble/BubblePlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <BubbleDocs />
        <BubblePlayground />
      </div>
    </main>
  </DocsLayout>
</template>
