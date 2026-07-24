<script setup lang="ts">
import type { StepperDescriptionProps } from 'reka-ui'
import { StepperDescription as StepperDescriptionPrimitive, useForwardProps } from 'reka-ui'
import { computed, mergeProps, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<StepperDescriptionProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const descriptionProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <StepperDescriptionPrimitive
    v-bind="descriptionProps"
    data-slot="stepper-description"
    :class="cn('text-sm text-muted-foreground', attrs.class)"
  >
    <slot />
  </StepperDescriptionPrimitive>
</template>
