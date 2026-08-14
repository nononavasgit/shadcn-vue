<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { badgeVariants, createBadgeContext, type BadgeProps, type BadgeSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BadgeProps>(), {
  label: undefined,
  size: 'md',
  variant: 'solid',
  severity: 'primary',
  color: undefined,
  icon: undefined,
  trailingIcon: undefined,
  ui: undefined,
})
defineSlots<BadgeSlots>()

const badgeContext = computed(() => createBadgeContext(props))

const attrs = useAttrs()
const { colorStyle } = useColor(
  computed(() => props.color),
  'badge',
)
const rootProps = computed(() => {
  const calculatedVariants = badgeVariants({
    size: props.size,
    variant: props.variant,
    severity: props.severity,
    color: Boolean(props.color),
  })

  const rootUI = useUi(props.ui?.root, badgeContext.value)
  return {
    ...attrs,
    ...rootUI,
    class: cn(calculatedVariants, attrs.class, rootUI.class),
    style: [colorStyle.value, attrs.style, rootUI.style],
  }
})

const iconProps = computed(() => {
  const icon = normalizeIconProps(props.icon)

  return { ...icon, size: icon?.size ?? props.size }
})
const trailingIconProps = computed(() => {
  const icon = normalizeIconProps(props.trailingIcon)

  return { ...icon, size: icon?.size ?? props.size }
})
</script>

<template>
  <span v-bind="rootProps" data-test-badge-root>
    <slot name="leading" v-bind="badgeContext">
      <Icon v-if="iconProps?.name" v-bind="iconProps" data-test-badge-icon />
    </slot>

    <slot v-bind="badgeContext">{{ props.label }}</slot>

    <slot name="trailing" v-bind="badgeContext">
      <Icon
        v-if="trailingIconProps?.name"
        v-bind="trailingIconProps"
        data-test-badge-trailing-icon
      />
    </slot>
  </span>
</template>
