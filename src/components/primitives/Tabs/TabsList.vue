<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { HTMLAttributes } from 'vue'
import type { TabsListProps } from 'reka-ui'
import { TabsList, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

export interface TabsListUIProps extends TabsListProps {
  class?: HTMLAttributes['class']
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TabsListUIProps>(), {
  class: undefined,
})
const attrs = useAttrs()

const delegatedProps = computed(() => {
  const delegated = { ...props }
  delete delegated.class
  return delegated
})
const forwarded = useForwardProps(delegatedProps)
const listProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <TabsList
    v-bind="listProps"
    data-slot="tabs-list"
    :class="
      cn(
        'inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground aria-[orientation=vertical]:h-fit aria-[orientation=vertical]:flex-col',
        props.class,
        attrs.class,
      )
    "
  >
    <slot />
  </TabsList>
</template>
