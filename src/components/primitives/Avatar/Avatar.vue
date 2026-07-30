<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { AvatarRootProps } from 'reka-ui'
import { AvatarRoot } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<AvatarRootProps>()
const attrs = useAttrs()
const rootProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...props }
})
</script>

<template>
  <AvatarRoot
    v-bind="rootProps"
    data-slot="avatar"
    :class="cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', attrs.class)"
  >
    <slot />
  </AvatarRoot>
</template>
