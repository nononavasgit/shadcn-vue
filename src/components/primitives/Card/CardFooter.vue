<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    v-bind="attrs"
    data-slot="card-footer"
    :class="cn('flex items-center px-6 [.border-t]:pt-6', attrs.class)"
  >
    <slot />
  </div>
</template>
