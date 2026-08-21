<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Label } from 'reka-ui'
import { cn } from '@/lib/utils'
import { type LabelProps, type LabelSlots } from '.'
import { labelDefaults } from './default'

defineOptions({ inheritAttrs: false })

defineSlots<LabelSlots>()

const props = withDefaults(defineProps<LabelProps>(), labelDefaults)
const attrs = useAttrs()

const rootProps = computed(() => {
  return {
    ...attrs,
    for: props.for,
    class: cn(
      'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      attrs.class,
    ),
    style: attrs.style,
  }
})
</script>

<template>
  <Label v-bind="rootProps" data-test-label-root>
    <slot />
  </Label>
</template>
