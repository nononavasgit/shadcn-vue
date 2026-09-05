<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import ToastDocs from '../docs/ToastDocs.vue'
import ToastPlayground from '../examples/toast/ToastPlayground.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <ToastDocs />
        <ToastPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
