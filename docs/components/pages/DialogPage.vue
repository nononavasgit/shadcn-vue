<script setup lang="ts">
import DialogDocs from '../docs/DialogDocs.vue'
import DialogPlayground from '../examples/dialog/DialogPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <DialogDocs />
        <DialogPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
