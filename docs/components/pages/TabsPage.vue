<script setup lang="ts">
import TabsDocs from '../docs/TabsDocs.vue'
import TabsExamples from '../examples/tabs/TabsExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <TabsDocs />
        <TabsExamples />
      </div>
    </main>
  </DocsLayout>
</template>
