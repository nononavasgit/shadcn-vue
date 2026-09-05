<script setup lang="ts">
import LinkDocs from '../docs/LinkDocs.vue'
import LinkPlayground from '../examples/link/LinkPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <LinkDocs />
        <LinkPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
