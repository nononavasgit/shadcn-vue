<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Badge as BadgeBase } from '@/components/ui/Badge'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { badgeVariants, type BadgeProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(): unknown
  leading?(): unknown
  trailing?(): unknown
}>()

const props = withDefaults(defineProps<BadgeProps>(), {
  as: 'span',
  label: undefined,
  size: 'md',
  variant: 'solid',
  severity: 'primary',
  color: undefined,
  icon: undefined,
  trailingIcon: undefined,
})

const attrs = useAttrs()

const iconLeading = computed(() =>
  typeof props.icon === 'string' ? { name: props.icon } : props.icon,
)
const iconTrailing = computed(() =>
  typeof props.trailingIcon === 'string' ? { name: props.trailingIcon } : props.trailingIcon,
)

const { colorStyle } = useColor(computed(() => props.color), 'badge')
</script>

<template>
  <BadgeBase
    v-bind="attrs"
    :as="props.as"
    :as-child="props.asChild"
    :class="
      cn(
        badgeVariants({
          size: props.size,
          variant: props.variant,
          severity: props.severity,
          color: Boolean(props.color),
        }),
        attrs.class,
      )
    "
    :style="[colorStyle, attrs.style]"
  >
    <slot name="leading">
      <Icon v-if="iconLeading" v-bind="iconLeading" />
    </slot>

    <slot>{{ props.label }}</slot>

    <slot name="trailing">
      <Icon v-if="iconTrailing" v-bind="iconTrailing" />
    </slot>
  </BadgeBase>
</template>
