<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import type { ListboxContentProps } from 'reka-ui'
import { ListboxContent, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<ListboxContentProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = computed(() => {
  const delegated = { ...props }
  delete delegated.class
  return delegated
})
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <ListboxContent
    v-bind="forwarded"
    data-slot="command-list"
    :class="cn('max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto', props.class)"
  >
    <div role="presentation">
      <slot />
    </div>
  </ListboxContent>
</template>
