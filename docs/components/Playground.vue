<script setup lang="ts">
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
</script>

<template>
  <div class="mb-4 h-full w-full rounded-lg p-4">
    <ConfigProvider>
      <div
        class="flex h-full flex-wrap content-center justify-center bg-background text-foreground"
      >
        <slot />
      </div>
    </ConfigProvider>
  </div>
</template>
