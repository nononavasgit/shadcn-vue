<script setup lang="ts">
import { useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <search v-bind="attrs" data-slot="search" role="search">
    <form>
      <slot />
    </form>
  </search>
</template>
