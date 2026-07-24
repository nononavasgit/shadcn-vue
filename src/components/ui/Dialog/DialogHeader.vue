<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>

<template>
  <div
    v-bind="attrs"
    data-slot="dialog-header"
    :class="cn('flex flex-col gap-2 text-center sm:text-left', attrs.class)"
  >
    <slot />
  </div>
</template>
