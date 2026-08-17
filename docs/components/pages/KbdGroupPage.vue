<script setup lang="ts">
import KbdGroupDocs from '../docs/KbdGroupDocs.vue'
import KbdGroupExamples from '../examples/kbd-group/KbdGroupExamples.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <KbdGroupDocs />
        <KbdGroupExamples />
      </div>
    </main>
  </DocsLayout>
</template>
