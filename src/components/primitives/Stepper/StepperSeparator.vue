<script setup lang="ts">
import type { StepperSeparatorProps } from 'reka-ui'
import { StepperSeparator as StepperSeparatorPrimitive, useForwardProps } from 'reka-ui'
import { computed, mergeProps, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<StepperSeparatorProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const separatorProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <StepperSeparatorPrimitive
    v-bind="separatorProps"
    data-slot="stepper-separator"
    :class="
      cn(
        'bg-muted transition-colors',
        'group-data-[disabled]:bg-muted group-data-[disabled]:opacity-50',
        'group-data-[state=completed]:bg-primary',
        attrs.class,
      )
    "
  />
</template>
