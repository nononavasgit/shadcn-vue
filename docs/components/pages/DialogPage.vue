<script setup lang="ts">
import DialogDocs from '../docs/DialogDocs.vue'
import DialogExamples from '../examples/dialog/DialogExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <DialogDocs />
        <DialogExamples />
      </div>
    </main>
  </DocsLayout>
</template>
