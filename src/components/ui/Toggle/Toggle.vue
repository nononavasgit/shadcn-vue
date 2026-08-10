<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { Toggle as RekaToggle } from 'reka-ui'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import {
  toggleVariants,
  type ToggleContext,
  type ToggleProps,
  type ToggleSlots,
  type ToggleValue,
} from '.'

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
const emit = defineEmits<{ valueChange: [value: ToggleValue] }>()

const attrs = useAttrs()
const value = defineModel<ToggleValue>('value', { default: false })
const { colorStyle } = useColor(
  computed(() => props.color),
  'toggle',
)

watch(value, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const toggleContext = computed<ToggleContext>(() => {
  const { ui, ...toggleProps } = props
  void ui

  const currentValue = value.value
  const pressed = currentValue === true

  return {
    props: toggleProps,
    value: currentValue,
    state: pressed ? 'on' : 'off',
    pressed,
  }
})

const rootProps = computed(() => {
  const calculatedVariants = toggleVariants({
    variant: props.variant,
    severity: props.severity,
    size: props.size,
    color: Boolean(props.color),
  })
  const rootUI = normalizeHTMLAttributes(useUi(props.ui?.root, toggleContext.value))

  return {
    ...attrs,
    ...rootUI,
    as: props.as,
    asChild: props.asChild,
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
  }
})

const iconProps = computed(() => ({ ...normalizeIconProps(props.icon) }))
const trailingIconProps = computed(() => ({ ...normalizeIconProps(props.trailingIcon) }))
</script>

<template>
  <RekaToggle v-bind="rootProps" v-model="value" data-slot="toggle">
    <slot name="leading" v-bind="toggleContext">
      <Icon v-if="iconProps.name" v-bind="iconProps" :name="iconProps.name" />
    </slot>

    <slot v-bind="toggleContext">{{ props.label }}</slot>

    <slot name="trailing" v-bind="toggleContext">
      <Icon
        v-if="trailingIconProps.name"
        v-bind="trailingIconProps"
        :name="trailingIconProps.name"
      />
    </slot>
  </RekaToggle>
</template>
