<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    v-bind="attrs"
    data-slot="empty-content"
    :class="cn('flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm', attrs.class)"
  >
    <slot />
  </div>
</template>
