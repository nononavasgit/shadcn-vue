<script setup lang="ts">
import BreadcrumbDocs from '../docs/BreadcrumbDocs.vue'
import BreadcrumbPlayground from '../examples/breadcrumb/BreadcrumbPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <BreadcrumbDocs />
        <BreadcrumbPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
