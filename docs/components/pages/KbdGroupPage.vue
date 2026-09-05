<script setup lang="ts">
import KbdGroupDocs from '../docs/KbdGroupDocs.vue'
import KbdGroupPlayground from '../examples/kbd-group/KbdGroupPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <KbdGroupDocs />
        <KbdGroupPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
