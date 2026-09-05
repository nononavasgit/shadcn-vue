<script setup lang="ts">
import AvatarDocs from '../docs/AvatarDocs.vue'
import AvatarPlayground from '../examples/avatar/AvatarPlayground.vue'
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <AvatarDocs />
        <AvatarPlayground />
      </div>
    </main>
  </DocsLayout>
</template>
