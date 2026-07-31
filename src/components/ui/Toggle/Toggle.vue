<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Toggle as ToggleBase } from '@/components/primitives/Toggle'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { toggleVariants, type ToggleEmits, type ToggleProps, type ToggleSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ToggleProps>(), {
  as: 'button',
  asChild: false,
  label: undefined,
  icon: undefined,
  trailingIcon: undefined,
  variant: 'plain',
  severity: 'default',
  size: 'md',
  color: undefined,
  ui: undefined,
})
defineEmits<ToggleEmits>()
defineSlots<ToggleSlots>()

const attrs = useAttrs()
const model = defineModel<boolean | null>()
const { colorStyle } = useColor(
  computed(() => props.color),
  'toggle',
)

const calculatedUI = computed(() => {
  const calculatedVariants = toggleVariants({
    variant: props.variant,
    severity: props.severity,
    size: props.size,
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
      defaultValue: props.defaultValue,
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
  <ToggleBase v-slot="slotProps" v-model="model" v-bind="calculatedUI.root">
    <slot name="leading" v-bind="slotProps">
      <Icon
        v-if="calculatedUI.icon.name"
        v-bind="calculatedUI.icon"
        :name="calculatedUI.icon.name"
      />
    </slot>

    <slot v-bind="slotProps">{{ props.label }}</slot>

    <slot name="trailing" v-bind="slotProps">
      <Icon
        v-if="calculatedUI.trailingIcon.name"
        v-bind="calculatedUI.trailingIcon"
        :name="calculatedUI.trailingIcon.name"
      />
    </slot>
  </ToggleBase>
</template>
