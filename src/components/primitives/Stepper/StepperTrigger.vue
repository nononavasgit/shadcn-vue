<script setup lang="ts">
import type { StepperTriggerProps } from 'reka-ui'
import { StepperTrigger as StepperTriggerPrimitive, useForwardProps } from 'reka-ui'
import { computed, mergeProps, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<StepperTriggerProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const triggerProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <StepperTriggerPrimitive
    v-bind="triggerProps"
    data-slot="stepper-trigger"
    :class="cn('flex flex-col items-center gap-1 rounded-md p-1 text-center', attrs.class)"
  >
    <slot />
  </StepperTriggerPrimitive>
</template>
