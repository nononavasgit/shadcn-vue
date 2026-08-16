<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import TimeDocs from '../docs/TimeDocs.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <TimeDocs />
      </div>
    </main>
  </DocsLayout>
</template>
