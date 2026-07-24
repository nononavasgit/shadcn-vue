<script setup lang="ts">
import type { ProgressIndicatorProps } from 'reka-ui'
import { ProgressIndicator as ProgressIndicatorPrimitive } from 'reka-ui'
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

defineProps<ProgressIndicatorProps>()

const attrs = useAttrs()
</script>

<template>
  <ProgressIndicatorPrimitive
    v-bind="attrs"
    data-slot="progress-indicator"
    :class="cn('h-full w-full flex-1 bg-primary transition-all', attrs.class)"
  >
    <slot />
  </ProgressIndicatorPrimitive>
</template>
