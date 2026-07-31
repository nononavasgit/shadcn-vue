<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { RadioGroupItemProps } from 'reka-ui'
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<RadioGroupItemProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const itemProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <RadioGroupItem
    v-slot="slotProps"
    v-bind="itemProps"
    data-slot="radio-group-item"
    :class="attrs.class"
  >
    <RadioGroupIndicator data-slot="radio-group-indicator">
      <slot v-bind="slotProps" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
