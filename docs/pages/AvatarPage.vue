<script setup lang="ts">
import AvatarDocs from '../components/AvatarDocs.vue'
</script>

<template>
  <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
    <div class="mx-auto grid max-w-5xl gap-6">
      <header>
        <div>
          <p class="font-mono text-xs uppercase tracking-wide text-muted-foreground">Docs</p>
          <h1 class="text-xl font-semibold">Avatar</h1>
        </div>
      </header>

      <AvatarDocs />
    </div>
  </main>
</template>
