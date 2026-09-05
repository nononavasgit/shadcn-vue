<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import SwitchDocs from '../docs/SwitchDocs.vue'
import SwitchPlayground from '../examples/switch/SwitchPlayground.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <SwitchDocs />
        <SwitchPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
