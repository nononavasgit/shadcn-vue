<script setup lang="ts">
import { useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(): unknown
}>()

const attrs = useAttrs()
</script>

<template>
  <time v-bind="attrs" data-slot="time">
    <slot />
  </time>
</template>
