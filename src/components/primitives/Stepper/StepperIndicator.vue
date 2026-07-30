<script setup lang="ts">
import type { StepperIndicatorProps } from 'reka-ui'
import { StepperIndicator as StepperIndicatorPrimitive, useForwardProps } from 'reka-ui'
import { computed, mergeProps, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<StepperIndicatorProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const indicatorProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <StepperIndicatorPrimitive
    v-slot="slotProps"
    v-bind="indicatorProps"
    data-slot="stepper-indicator"
    :class="
      cn(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors',
        'group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground',
        'group-data-[state=completed]:bg-primary group-data-[state=completed]:text-primary-foreground',
        'group-data-[disabled]:opacity-50',
        attrs.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </StepperIndicatorPrimitive>
</template>
