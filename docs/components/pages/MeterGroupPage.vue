<script setup lang="ts">
import MeterGroupDocs from '../docs/MeterGroupDocs.vue'
import MeterGroupPlayground from '../examples/meter-group/MeterGroupPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <MeterGroupDocs />
        <MeterGroupPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
