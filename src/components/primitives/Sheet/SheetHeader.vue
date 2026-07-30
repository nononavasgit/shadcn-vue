<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>

<template>
  <div
    v-bind="attrs"
    data-slot="sheet-header"
    :class="cn('flex flex-col gap-1.5 p-4', attrs.class)"
  >
    <slot />
  </div>
</template>
