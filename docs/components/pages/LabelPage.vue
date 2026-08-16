<script setup lang="ts">
import LabelDocs from '../docs/LabelDocs.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <LabelDocs />
      </div>
    </main>
  </DocsLayout>
</template>
