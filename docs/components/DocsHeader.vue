<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
    <RouterLink to="/" class="text-sm font-semibold tracking-tight">Componentes</RouterLink>
    <nav aria-label="Componentes" class="flex items-center gap-4 text-sm text-muted-foreground">
      <RouterLink to="/avatar" class="transition-colors hover:text-foreground">Avatar</RouterLink>
      <RouterLink to="/announcer" class="transition-colors hover:text-foreground">
        Announcer
      </RouterLink>
      <RouterLink to="/icon" class="transition-colors hover:text-foreground">Icon</RouterLink>
    </nav>
  </header>
</template>
