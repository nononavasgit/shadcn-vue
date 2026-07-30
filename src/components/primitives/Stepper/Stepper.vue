<script setup lang="ts">
import type { StepperRootEmits, StepperRootProps } from 'reka-ui'
import { StepperRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, mergeProps, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<StepperRootProps>()
const emits = defineEmits<StepperRootEmits>()

const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const rootProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <StepperRoot
    v-slot="slotProps"
    v-bind="rootProps"
    data-slot="stepper"
    :class="cn('flex gap-2', attrs.class)"
  >
    <slot v-bind="slotProps" />
  </StepperRoot>
</template>
