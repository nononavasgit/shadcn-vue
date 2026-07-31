<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Badge as BadgeBase } from '@/components/primitives/Badge'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { badgeVariants, type BadgeProps, type BadgeSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BadgeProps>(), {
  as: 'span',
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

const attrs = useAttrs()
const { colorStyle } = useColor(
  computed(() => props.color),
  'badge',
)
const calculatedUI = computed(() => {
  const calculatedVariants = badgeVariants({
    size: props.size,
    variant: props.variant,
    severity: props.severity,
    color: Boolean(props.color),
  })

  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const iconUI = normalizeHTMLAttributes(props.ui?.icon)
  const trailingIconUI = normalizeHTMLAttributes(props.ui?.trailingIcon)

  return {
    root: {
      ...attrs,
      ...rootUI,
      as: props.as,
      asChild: props.asChild,
      class: cn(calculatedVariants, attrs.class, rootUI.class),
      style: [colorStyle.value, attrs.style, rootUI.style],
    },
    icon: {
      ...iconUI,
      ...normalizeIconProps(props.icon),
      class: cn(iconUI.class),
    },
    trailingIcon: {
      ...trailingIconUI,
      ...normalizeIconProps(props.trailingIcon),
      class: cn(trailingIconUI.class),
    },
  }
})
</script>

<template>
  <BadgeBase v-bind="calculatedUI.root">
    <slot name="leading">
      <Icon
        v-if="calculatedUI.icon.name"
        v-bind="calculatedUI.icon"
        :name="calculatedUI.icon.name"
      />
    </slot>

    <slot>{{ props.label }}</slot>

    <slot name="trailing">
      <Icon
        v-if="calculatedUI.trailingIcon.name"
        v-bind="calculatedUI.trailingIcon"
        :name="calculatedUI.trailingIcon.name"
      />
    </slot>
  </BadgeBase>
</template>
