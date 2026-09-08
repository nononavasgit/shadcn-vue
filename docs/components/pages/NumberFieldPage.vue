<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import NumberFieldDocs from '../docs/NumberFieldDocs.vue'
import NumberFieldPlayground from '../examples/numberfield/NumberFieldPlayground.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <NumberFieldDocs />
        <NumberFieldPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
