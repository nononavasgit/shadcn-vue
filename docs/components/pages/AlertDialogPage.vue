<script setup lang="ts">
import AlertDialogDocs from '../docs/AlertDialogDocs.vue'
import AlertDialogExamples from '../examples/alert-dialog/AlertDialogExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <AlertDialogDocs />
        <AlertDialogExamples />
      </div>
    </main>
  </DocsLayout>
</template>
