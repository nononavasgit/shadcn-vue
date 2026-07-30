<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { HTMLAttributes } from 'vue'
import type { TabsRootEmits, TabsRootProps } from 'reka-ui'
import { TabsRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

export interface TabsProps extends TabsRootProps {
  class?: HTMLAttributes['class']
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TabsProps>(), {
  class: undefined,
})
const emits = defineEmits<TabsRootEmits>()
const attrs = useAttrs()

const delegatedProps = computed(() => {
  const delegated = { ...props }
  delete delegated.class
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
const rootProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <TabsRoot
    v-slot="slotProps"
    v-bind="rootProps"
    data-slot="tabs"
    :class="cn('flex flex-col gap-2', props.class, attrs.class)"
  >
    <slot v-bind="slotProps" />
  </TabsRoot>
</template>
