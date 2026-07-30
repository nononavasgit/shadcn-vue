<script setup lang="ts">
import { computed, mergeProps, provide, toRef, useAttrs } from 'vue'
import type { CSSProperties, HTMLAttributes } from 'vue'
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from 'reka-ui'
import { ToggleGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

export interface ToggleGroupProps extends ToggleGroupRootProps {
  class?: HTMLAttributes['class']
  spacing?: number
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  class: undefined,
  spacing: 0,
})
const emits = defineEmits<ToggleGroupRootEmits>()
const attrs = useAttrs()

const delegatedProps = computed(() => {
  const delegated = { ...props }
  delete delegated.class
  delete delegated.spacing
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
const rootProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  delete restAttrs.style
  return mergeProps(restAttrs, forwarded.value)
})
const spacingStyle = computed(
  () =>
    ({
      '--toggle-group-gap': `calc(var(--spacing) * ${props.spacing})`,
    }) as CSSProperties,
)

provide(
  'toggle-group-orientation',
  toRef(() => props.orientation ?? 'horizontal'),
)
provide(
  'toggle-group-spacing',
  toRef(() => props.spacing),
)
</script>

<template>
  <ToggleGroupRoot
    v-slot="slotProps"
    v-bind="rootProps"
    data-slot="toggle-group"
    :data-orientation="props.orientation ?? 'horizontal'"
    :data-spacing="props.spacing"
    :style="[spacingStyle, attrs.style]"
    :class="
      cn(
        'group/toggle-group flex w-fit items-center gap-(--toggle-group-gap) data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        props.spacing === 0 &&
          (props.orientation ?? 'horizontal') === 'horizontal' &&
          '[&>*]:rounded-none [&>*+*]:border-l-0 [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md',
        props.spacing === 0 &&
          props.orientation === 'vertical' &&
          '[&>*]:rounded-none [&>*+*]:border-t-0 [&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md',
        props.class,
        attrs.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </ToggleGroupRoot>
</template>
