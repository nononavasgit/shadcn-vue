<script setup lang="ts">
import AutocompleteDocs from '../docs/AutocompleteDocs.vue'
import AutocompletePlayground from '../examples/autocomplete/AutocompletePlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout
    ><main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <AutocompleteDocs /><AutocompletePlayground />
      </div></main
  ></DocsLayout>
</template>
