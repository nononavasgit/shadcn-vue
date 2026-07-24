<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(): unknown
}>()

const attrs = useAttrs()
</script>

<template>
  <span v-bind="attrs" data-slot="announcer" :class="cn('sr-only', attrs.class)">
    <slot />
  </span>
</template>
