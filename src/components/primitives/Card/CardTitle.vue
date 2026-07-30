<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <h3 v-bind="attrs" data-slot="card-title" :class="cn('leading-none font-semibold', attrs.class)">
    <slot />
  </h3>
</template>
