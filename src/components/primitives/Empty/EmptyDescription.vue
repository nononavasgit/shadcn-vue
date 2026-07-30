<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    v-bind="attrs"
    data-slot="empty-description"
    :class="
      cn(
        'text-sm/relaxed text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary',
        attrs.class,
      )
    "
  >
    <slot />
  </div>
</template>
