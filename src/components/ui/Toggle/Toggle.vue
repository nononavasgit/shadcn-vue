<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Toggle as RekaToggle } from 'reka-ui'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { toggleVariants, type ToggleProps, type ToggleSlots } from '.'

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
      disabled: props.disabled,
      name: props.name,
      required: props.required,
      class: cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
        calculatedVariants,
        attrs.class,
        rootUI.class,
      ),
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
  <RekaToggle v-slot="slotProps" v-bind="calculatedUI.root" v-model="model" data-slot="toggle">
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
  </RekaToggle>
</template>
