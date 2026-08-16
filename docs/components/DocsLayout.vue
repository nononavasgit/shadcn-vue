<script setup lang="ts">
import DocsHeader from './DocsHeader.vue'
</script>

<template>
  <div>
    <div class="px-4 pt-4 sm:px-8">
      <div class="mx-auto max-w-5xl">
        <DocsHeader />
      </div>
    </div>
    <slot />
  </div>
</template>
