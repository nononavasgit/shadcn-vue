<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { AvatarFallbackProps } from 'reka-ui'
import { AvatarFallback as RekaAvatarFallback } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<AvatarFallbackProps>()
const attrs = useAttrs()
const fallbackProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...props }
})
</script>

<template>
  <RekaAvatarFallback
    v-bind="fallbackProps"
    data-slot="avatar-fallback"
    :class="cn('flex size-full items-center justify-center rounded-full bg-muted', attrs.class)"
  >
    <slot />
  </RekaAvatarFallback>
</template>
