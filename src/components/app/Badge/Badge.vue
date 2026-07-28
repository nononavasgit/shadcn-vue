<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Badge as BadgeBase } from '@/components/ui/Badge'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { badgeVariants, type BadgeProps, type BadgeSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BadgeProps>(), {
  as: 'span',
  title: undefined,
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
const leadingIcon = computed(() =>
  typeof props.icon === 'string' ? { name: props.icon } : props.icon,
)
const trailingIcon = computed(() =>
  typeof props.trailingIcon === 'string' ? { name: props.trailingIcon } : props.trailingIcon,
)
const { colorStyle } = useColor(
  computed(() => props.color),
  'badge',
)
const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    class: cn(
      badgeVariants({
        size: props.size,
        variant: props.variant,
        severity: props.severity,
        color: Boolean(props.color),
      }),
      attrs.class,
    ),
    style: [colorStyle.value, attrs.style],
  },
  icon: {
    ...props.ui?.icon,
    ...leadingIcon.value,
    class: cn(props.ui?.icon?.class, leadingIcon.value?.class),
  },
  trailingIcon: {
    ...props.ui?.trailingIcon,
    ...trailingIcon.value,
    class: cn(props.ui?.trailingIcon?.class, trailingIcon.value?.class),
  },
}))
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

    <slot>{{ props.title }}</slot>

    <slot name="trailing">
      <Icon
        v-if="calculatedUI.trailingIcon.name"
        v-bind="calculatedUI.trailingIcon"
        :name="calculatedUI.trailingIcon.name"
      />
    </slot>
  </BadgeBase>
</template>
