<script setup lang="ts">
import ListboxDocs from '../docs/ListboxDocs.vue'
import ListboxPlayground from '../examples/listbox/ListboxPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <ListboxDocs />
        <ListboxPlayground />
      </div>
    </main>
  </DocsLayout>
</template>

