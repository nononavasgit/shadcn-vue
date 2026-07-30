<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    v-bind="attrs"
    data-slot="empty-header"
    :class="cn('flex max-w-sm flex-col items-center gap-2 text-center', attrs.class)"
  >
    <slot />
  </div>
</template>
