<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import MessageDocs from '../docs/MessageDocs.vue'
import MessagePlayground from '../examples/message/MessagePlayground.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <MessageDocs />
        <MessagePlayground />
      </div>
    </main>
  </DocsLayout>
</template>
