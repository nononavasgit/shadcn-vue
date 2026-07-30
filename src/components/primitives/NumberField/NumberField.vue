<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui'
import { NumberFieldRoot as RekaNumberFieldRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<NumberFieldRootProps>()
const emits = defineEmits<NumberFieldRootEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const rootProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <RekaNumberFieldRoot
    v-slot="slotProps"
    v-bind="rootProps"
    data-slot="number-field"
    :class="cn('grid gap-1.5', attrs.class)"
  >
    <slot v-bind="slotProps" />
  </RekaNumberFieldRoot>
</template>
