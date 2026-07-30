<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const groupAttrs = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return restAttrs
})
</script>

<template>
  <div
    v-bind="groupAttrs"
    data-slot="input-otp-group"
    :class="cn('flex items-center', attrs.class)"
  >
    <slot />
  </div>
</template>
