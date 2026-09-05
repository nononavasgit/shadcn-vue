<script setup lang="ts">
import ChipDocs from '../docs/ChipDocs.vue'
import ChipPlayground from '../examples/chip/ChipPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <ChipDocs />
        <ChipPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
