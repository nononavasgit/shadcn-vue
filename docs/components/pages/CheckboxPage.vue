<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import CheckboxDocs from '../docs/CheckboxDocs.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <CheckboxDocs />
      </div>
    </main>
  </DocsLayout>
</template>
