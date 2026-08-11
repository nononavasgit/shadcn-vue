<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Label } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { createLabelContext, type LabelProps, type LabelSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<LabelSlots>()

const props = withDefaults(defineProps<LabelProps>(), {
  for: undefined,
  ui: undefined,
})
const attrs = useAttrs()
const labelContext = computed(() => createLabelContext(props))

const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, labelContext.value)

  return {
    ...attrs,
    ...rootUI,
    for: props.for,
    class: cn(
      'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})
</script>

<template>
  <Label v-bind="rootProps" data-label-ui="root" data-label-slot="default">
    <slot v-bind="labelContext" />
  </Label>
</template>
