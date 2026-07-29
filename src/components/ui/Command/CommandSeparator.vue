<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import type { SeparatorProps } from 'reka-ui'
import { Separator } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SeparatorProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = computed(() => {
  const delegated = { ...props }
  delete delegated.class
  return delegated
})
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    data-slot="command-separator"
    :class="cn('-mx-1 h-px bg-border', props.class)"
  >
    <slot />
  </Separator>
</template>
