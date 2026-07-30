<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div v-bind="attrs" data-slot="card-content" :class="cn('px-6', attrs.class)">
    <slot />
  </div>
</template>
