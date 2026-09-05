<script setup lang="ts">
import PopoverDocs from '../docs/PopoverDocs.vue'
import PopoverPlayground from '../examples/popover/PopoverPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <PopoverDocs />
        <PopoverPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
