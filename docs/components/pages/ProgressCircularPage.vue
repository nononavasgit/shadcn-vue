<script setup lang="ts">
import ProgressCircularDocs from '../docs/ProgressCircularDocs.vue'
import ProgressCircularPlayground from '../examples/progress-circular/ProgressCircularPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <ProgressCircularDocs />
        <ProgressCircularPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
