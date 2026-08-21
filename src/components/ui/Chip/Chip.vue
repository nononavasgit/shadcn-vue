<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { useColor } from '@/composables'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { chipBaseVariants, chipRootVariants, type ChipProps, type ChipSlots } from '.'
import { chipDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChipProps>(), chipDefaults)
defineSlots<ChipSlots>()

const show = defineModel<boolean>('show', { default: true })
const attrs = useAttrs()
const slots = useSlots()
const hasDefaultSlot = computed(() => Boolean(slots.default))

const { colorStyle } = useColor(
  computed(() => props.color),
  'chip',
)

const rootProps = computed(() => {
  const ui = useUi(props.ui?.root, undefined)

  return {
    ...attrs,
    ...ui,
    class: cn(
      chipRootVariants({
        position: hasDefaultSlot.value ? undefined : props.position,
        inset: hasDefaultSlot.value ? true : props.inset,
        standalone: hasDefaultSlot.value ? true : props.standalone,
      }),
      ui.class,
      attrs.class,
    ),
    style: [colorStyle.value, ui.style, attrs.style],
  }
})

const baseProps = computed(() => {
  const ui = useUi(props.ui?.base, undefined)

  return {
    ...ui,
    class: cn(
      chipBaseVariants({
        size: props.size,
        color: Boolean(props.color),
        position: hasDefaultSlot.value && !props.standalone ? props.position : undefined,
        inset: hasDefaultSlot.value ? props.inset : undefined,
        standalone: hasDefaultSlot.value ? props.standalone : undefined,
      }),
      ui.class,
    ),
    style: ui.style,
  }
})
</script>

<template>
  <div v-bind="rootProps" data-test-chip-root>
    <slot />

    <span v-if="show" v-bind="baseProps" data-test-chip-base>
      <slot name="content">{{ props.text }}</slot>
    </span>
  </div>
</template>
