<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import StepperDocs from '../docs/StepperDocs.vue'
import StepperExamples from '../examples/stepper/StepperExamples.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <StepperDocs />
        <StepperExamples />
      </div>
    </main>
  </DocsLayout>
</template>
