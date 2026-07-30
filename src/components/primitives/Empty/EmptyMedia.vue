<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import type { EmptyMediaProps } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<EmptyMediaProps>(), {
  variant: 'default',
})
const attrs = useAttrs()
</script>

<template>
  <div
    v-bind="attrs"
    data-slot="empty-media"
    :data-variant="props.variant"
    :class="
      cn(
        props.variant === 'icon' &&
          'flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*=size-])]:size-6',
        attrs.class,
      )
    "
  >
    <slot />
  </div>
</template>
