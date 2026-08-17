<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import SwitchDocs from '../docs/SwitchDocs.vue'
import SwitchExamples from '../examples/switch/SwitchExamples.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <SwitchDocs />
        <SwitchExamples />
      </div>
    </main>
  </DocsLayout>
</template>
