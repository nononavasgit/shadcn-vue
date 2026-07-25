<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Badge as BadgeBase } from '@/components/ui/Badge'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { badgeVariants, type BadgeProps, type BadgeSlots } from '.'

defineOptions({ inheritAttrs: false })
defineSlots<BadgeSlots>()

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

const attrs = useAttrs()

const iconLeading = computed(() =>
  typeof props.icon === 'string' ? { name: props.icon } : props.icon,
)
const iconTrailing = computed(() =>
  typeof props.trailingIcon === 'string' ? { name: props.trailingIcon } : props.trailingIcon,
)

const { colorStyle } = useColor(
  computed(() => props.color),
  'badge',
)

const uiCalculado = computed(() => ({
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
    ...iconLeading.value,
    class: cn(props.ui?.icon?.class, iconLeading.value?.class),
  },
  trailingIcon: {
    ...props.ui?.trailingIcon,
    ...iconTrailing.value,
    class: cn(props.ui?.trailingIcon?.class, iconTrailing.value?.class),
  },
}))
</script>

<template>
  <BadgeBase v-bind="uiCalculado.root">
    <slot name="leading">
      <Icon v-if="iconLeading" v-bind="uiCalculado.icon" :name="iconLeading.name" />
    </slot>

    <slot>{{ props.label }}</slot>

    <slot name="trailing">
      <Icon v-if="iconTrailing" v-bind="uiCalculado.trailingIcon" :name="iconTrailing.name" />
    </slot>
  </BadgeBase>
</template>
