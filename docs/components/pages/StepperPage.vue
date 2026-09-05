<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import StepperDocs from '../docs/StepperDocs.vue'
import StepperPlayground from '../examples/stepper/StepperPlayground.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <StepperDocs />
        <StepperPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
