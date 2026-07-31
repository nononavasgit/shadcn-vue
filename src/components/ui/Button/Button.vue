<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { button as ButtonBase } from '@/components/primitives/Button'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { buttonVariants, type ButtonEmits, type ButtonProps, type ButtonSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  asChild: false,
  label: undefined,
  variant: 'solid',
  severity: 'primary',
  size: 'md',
  rounded: false,
  square: false,
  loading: false,
  color: undefined,
  icon: undefined,
  trailingIcon: undefined,
  ui: undefined,
})
const emit = defineEmits<ButtonEmits>()
defineSlots<ButtonSlots>()

const attrs = useAttrs()
const { colorStyle } = useColor(
  computed(() => props.color),
  'button',
)
const ariaDisabled = computed(() => props.loading || attrs['aria-disabled'])
const ariaBusy = computed(() => props.loading || attrs['aria-busy'])
const calculatedVariants = computed(() => {
  const classes = buttonVariants({
    variant: props.variant,
    severity: props.severity,
    size: props.size,
    rounded: props.rounded,
    square: props.square,
    color: Boolean(props.color),
  })

  if (props.as === 'button' || props.as === 'a') return classes

  return classes
    .split(/\s+/)
    .filter((className) => !className.startsWith('hover:') && !className.startsWith('active:'))
    .join(' ')
})
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const iconUI = normalizeHTMLAttributes(props.ui?.icon)
  const trailingIconUI = normalizeHTMLAttributes(props.ui?.trailingIcon)
  const loadingIconUI = normalizeHTMLAttributes(props.ui?.loadingIcon)

  return {
    root: {
      ...attrs,
      ...rootUI,
      as: props.as,
      asChild: props.asChild,
      'aria-busy': ariaBusy.value,
      'aria-disabled': ariaDisabled.value,
      class: cn(calculatedVariants.value, attrs.class, rootUI.class),
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
    loadingIcon: {
      ...loadingIconUI,
      name: 'spinner' as const,
      class: cn('animate-spin', loadingIconUI.class),
    },
  }
})

function handleClick(event: PointerEvent) {
  if (ariaDisabled.value === true || ariaDisabled.value === 'true') {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  emit('click', event)
}
</script>

<template>
  <ButtonBase v-bind="calculatedUI.root" @click="handleClick">
    <slot v-if="props.asChild" />
    <template v-else>
      <template v-if="props.loading">
        <slot name="loading">
          <Icon v-bind="calculatedUI.loadingIcon" />
        </slot>
      </template>
      <slot v-else name="leading">
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
    </template>
  </ButtonBase>
</template>
