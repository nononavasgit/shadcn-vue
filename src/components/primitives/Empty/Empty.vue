<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    v-bind="attrs"
    data-slot="empty"
    :class="
      cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center md:p-12',
        attrs.class,
      )
    "
  >
    <slot />
  </div>
</template>
