<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <kbd
    v-bind="attrs"
    data-slot="kbd-group"
    :class="cn('inline-flex items-center gap-1', attrs.class)"
  >
    <slot />
  </kbd>
</template>
