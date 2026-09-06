<script setup lang="ts">
import MarkerDocs from '../docs/MarkerDocs.vue'
import MarkerPlayground from '../examples/marker/MarkerPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <MarkerDocs />
        <MarkerPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
