<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui'
import { RadioGroupRoot, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<RadioGroupRootProps>()
const emits = defineEmits<RadioGroupRootEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)

const rootProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <RadioGroupRoot
    v-slot="slotProps"
    v-bind="rootProps"
    data-slot="radio-group"
    :class="attrs.class"
  >
    <slot v-bind="slotProps" />
  </RadioGroupRoot>
</template>
