<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { ToggleEmits, ToggleProps } from 'reka-ui'
import { Toggle as RekaToggle, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<ToggleProps>()
const emits = defineEmits<ToggleEmits>()
const attrs = useAttrs()

const forwarded = useForwardPropsEmits(props, emits)
const rootProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <RekaToggle
    v-slot="slotProps"
    v-bind="rootProps"
    data-slot="toggle"
    :class="
      cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
        attrs.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </RekaToggle>
</template>
