<script setup lang="ts">
import type { StepperItemProps } from 'reka-ui'
import { StepperItem as StepperItemPrimitive, useForwardProps } from 'reka-ui'
import { computed, mergeProps, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<StepperItemProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const itemProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <StepperItemPrimitive
    v-slot="slotProps"
    v-bind="itemProps"
    :step="props.step"
    data-slot="stepper-item"
    :class="cn('group flex items-center gap-2 data-[disabled]:pointer-events-none', attrs.class)"
  >
    <slot v-bind="slotProps" />
  </StepperItemPrimitive>
</template>
