<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui'
import { AccordionRoot, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<AccordionRootProps>()
const emits = defineEmits<AccordionRootEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const rootProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <AccordionRoot v-slot="slotProps" v-bind="rootProps" data-slot="accordion">
    <slot v-bind="slotProps" />
  </AccordionRoot>
</template>
