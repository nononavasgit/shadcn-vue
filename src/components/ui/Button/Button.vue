<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Primitive } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useNormalizeIconProps } from '@/composables/useNormalizeIconProps'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import {
  buttonVariants,
  createButtonContext,
  type ButtonEmits,
  type ButtonProps,
  type ButtonSlots,
} from '.'

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
})
const emit = defineEmits<ButtonEmits>()
defineSlots<ButtonSlots>()

const buttonContext = computed(() => createButtonContext(props))

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

const rootProps = computed(() => {
  return {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    'aria-busy': ariaBusy.value,
    'aria-disabled': ariaDisabled.value,
    class: cn(
      'inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
      calculatedVariants.value,
      attrs.class,
    ),
    style: [colorStyle.value, attrs.style],
  }
})

const iconProps = computed(() => {
  const icon = useNormalizeIconProps(props.icon)

  return { ...icon, size: icon?.size ?? props.size }
})

const trailingIconProps = computed(() => {
  const icon = useNormalizeIconProps(props.trailingIcon)

  return { ...icon, size: icon?.size ?? props.size }
})

const loadingIconProps = computed(() => {
  return {
    name: 'spinner' as const,
    size: props.size,
    class: 'animate-spin',
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
  <Primitive v-bind="rootProps" data-button-ui="root" data-test-button-root @click="handleClick">
    <slot v-if="props.asChild" v-bind="buttonContext" />
    <template v-else>
      <template v-if="props.loading">
        <slot name="loading" v-bind="buttonContext">
          <Icon v-bind="loadingIconProps" data-test-button-loading-icon />
        </slot>
      </template>
      <template v-else>
        <slot name="leading" v-bind="buttonContext">
          <Icon v-if="iconProps.name" v-bind="iconProps" data-test-button-icon />
        </slot>
      </template>

      <slot v-bind="buttonContext">{{ props.label }}</slot>

      <slot name="trailing" v-bind="buttonContext">
        <Icon
          v-if="trailingIconProps.name"
          v-bind="trailingIconProps"
          data-test-button-trailing-icon
        />
      </slot>
    </template>
  </Primitive>
</template>
