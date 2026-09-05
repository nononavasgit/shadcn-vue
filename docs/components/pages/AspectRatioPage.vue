<script setup lang="ts">
import AspectRatioDocs from '../docs/AspectRatioDocs.vue'
import AspectRatioPlayground from '../examples/aspect-ratio/AspectRatioPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <AspectRatioDocs />
        <AspectRatioPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
