<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import LinearChartDocs from '../docs/LinearChartDocs.vue'
import LinearChartPlayground from '../examples/linear-chart/LinearChartPlayground.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <LinearChartDocs />
        <LinearChartPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
