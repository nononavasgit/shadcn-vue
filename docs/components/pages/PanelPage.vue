<script setup lang="ts">
import PanelDocs from '../docs/PanelDocs.vue'
import PanelPlayground from '../examples/panel/PanelPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>
<template>
  <DocsLayout
    ><main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6"><PanelDocs /><PanelPlayground /></div></main
  ></DocsLayout>
</template>
