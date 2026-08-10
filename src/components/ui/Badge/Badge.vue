<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { badgeVariants, createBadgeContext, type BadgeProps, type BadgeSlots } from '.'
import { Primitive } from 'reka-ui'

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
    as: props.as,
    asChild: props.asChild,
    class: cn(calculatedVariants, attrs.class, rootUI.class),
    style: [colorStyle.value, attrs.style, rootUI.style],
  }
})

const iconProps = computed(() => normalizeIconProps(props.icon))
const trailingIconProps = computed(() => normalizeIconProps(props.trailingIcon))
</script>

<template>
  <Primitive v-bind="rootProps" data-badge-ui="root">
    <span data-badge-slot="leading">
      <slot name="leading" v-bind="badgeContext">
        <Icon v-if="iconProps?.name" v-bind="iconProps" data-badge="icon" />
      </slot>
    </span>

    <span data-badge-slot="default">
      <slot v-bind="badgeContext">{{ props.label }}</slot>
    </span>

    <span data-badge-slot="trailing">
      <slot name="trailing" v-bind="badgeContext">
        <Icon
          v-if="trailingIconProps?.name"
          v-bind="trailingIconProps"
          data-badge="trailing-icon"
        />
      </slot>
    </span>
  </Primitive>
</template>
