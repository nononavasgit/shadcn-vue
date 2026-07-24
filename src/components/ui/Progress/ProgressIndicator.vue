<script setup lang="ts">
import type { ProgressIndicatorProps } from 'reka-ui'
import { ProgressIndicator as ProgressIndicatorPrimitive } from 'reka-ui'
import { computed, mergeProps, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<ProgressIndicatorProps>()

const attrs = useAttrs()
const forwarded = computed(() => mergeProps(props, attrs))
</script>

<template>
  <ProgressIndicatorPrimitive
    v-bind="forwarded"
    data-slot="progress-indicator"
    :class="cn('h-full w-full flex-1 bg-primary transition-all', attrs.class)"
  >
    <slot />
  </ProgressIndicatorPrimitive>
</template>
