<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { HTMLAttributes } from 'vue'
import type { TabsContentProps } from 'reka-ui'
import { TabsContent, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

export interface TabsContentUIProps extends TabsContentProps {
  class?: HTMLAttributes['class']
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TabsContentUIProps>(), {
  class: undefined,
})
const attrs = useAttrs()

const delegatedProps = computed(() => {
  const delegated = { ...props }
  delete delegated.class
  return delegated
})
const forwarded = useForwardProps(delegatedProps)
const contentProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <TabsContent
    v-bind="contentProps"
    data-slot="tabs-content"
    :class="cn('flex-1 outline-none', props.class, attrs.class)"
  >
    <slot />
  </TabsContent>
</template>
