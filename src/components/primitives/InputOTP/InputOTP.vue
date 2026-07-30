<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { OTPInputEmits, OTPInputProps } from 'vue-input-otp'
import { OTPInput } from 'vue-input-otp'
import { useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<OTPInputProps>()
const emits = defineEmits<OTPInputEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const inputProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <OTPInput
    v-slot="slotProps"
    v-bind="inputProps"
    data-slot="input-otp"
    class="disabled:cursor-not-allowed"
    :container-class="
      cn('flex items-center gap-2 has-disabled:opacity-50', props.containerClass, attrs.class)
    "
  >
    <slot v-bind="slotProps" />
  </OTPInput>
</template>
