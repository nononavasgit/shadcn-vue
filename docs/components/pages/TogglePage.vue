<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import ToggleDocs from '../docs/ToggleDocs.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <ToggleDocs />
      </div>
    </main>
  </DocsLayout>
</template>
