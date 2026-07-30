<script setup lang="ts">
import type { StepperTitleProps } from 'reka-ui'
import { StepperTitle as StepperTitlePrimitive, useForwardProps } from 'reka-ui'
import { computed, mergeProps, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<StepperTitleProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const titleProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <StepperTitlePrimitive
    v-bind="titleProps"
    data-slot="stepper-title"
    :class="cn('text-base font-semibold whitespace-nowrap', attrs.class)"
  >
    <slot />
  </StepperTitlePrimitive>
</template>
