<script setup lang="ts">
import ButtonDocs from '../docs/ButtonDocs.vue'
import ButtonPlayground from '../examples/button/ButtonPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <ButtonDocs />
        <ButtonPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
