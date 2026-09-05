<script setup lang="ts">
import CardDocs from '../docs/CardDocs.vue'
import CardPlayground from '../examples/card/CardPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <CardDocs />
        <CardPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
