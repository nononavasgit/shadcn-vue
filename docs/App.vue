<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav aria-label="Navegación principal" class="px-4 pt-4 sm:px-8">
    <RouterLink to="/table" class="text-sm font-medium text-primary hover:underline">
      Table
    </RouterLink>
  </nav>
  <RouterView />
</template>
