<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>

<template>
  <div
    v-bind="attrs"
    data-slot="sheet-footer"
    :class="cn('mt-auto flex flex-col gap-2 p-4', attrs.class)"
  >
    <slot />
  </div>
</template>
