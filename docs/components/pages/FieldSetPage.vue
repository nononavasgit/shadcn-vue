<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import FieldSetDocs from '../docs/FieldSetDocs.vue'
import FieldSetPlayground from '../examples/field-set/FieldSetPlayground.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <FieldSetDocs />
        <FieldSetPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
