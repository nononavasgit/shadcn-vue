<script setup lang="ts">
import EmptyDocs from '../docs/EmptyDocs.vue'
import EmptyPlayground from '../examples/empty/EmptyPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <EmptyDocs />
        <EmptyPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
