<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    v-bind="attrs"
    data-slot="empty-title"
    :class="cn('text-lg font-medium tracking-tight', attrs.class)"
  >
    <slot />
  </div>
</template>
