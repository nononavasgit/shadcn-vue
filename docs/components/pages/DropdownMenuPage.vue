<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
import DropdownMenuDocs from '../docs/DropdownMenuDocs.vue'
import DropdownMenuPlayground from '../examples/dropdown-menu/DropdownMenuPlayground.vue'
</script>

<template>
  <DocsLayout
    ><main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <DropdownMenuDocs /><DropdownMenuPlayground />
      </div></main
  ></DocsLayout>
</template>
