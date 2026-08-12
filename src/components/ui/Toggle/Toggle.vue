<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { Toggle as RekaToggle } from 'reka-ui'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import {
  createToggleContext,
  toggleVariants,
  type ToggleProps,
  type ToggleSlots,
  type ToggleValue,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ToggleProps>(), {
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

const toggleContext = computed(() => createToggleContext(props, value.value))

const rootProps = computed(() => {
  const calculatedVariants = toggleVariants({
    variant: props.variant,
    severity: props.severity,
    size: props.size,
    color: Boolean(props.color),
  })
  const rootUI = useUi(props.ui?.root, toggleContext.value)

  return {
    ...attrs,
    ...rootUI,
    as: 'button' as const,
    disabled: props.disabled,
    asChild: false,
    class: cn(
      'inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
      calculatedVariants,
      attrs.class,
      rootUI.class,
    ),
    style: [colorStyle.value, attrs.style, rootUI.style],
  }
})

const iconProps = computed(() => {
  const icon = normalizeIconProps(props.icon)

  return { ...icon, size: icon?.size ?? props.size }
})
const trailingIconProps = computed(() => {
  const icon = normalizeIconProps(props.trailingIcon)

  return { ...icon, size: icon?.size ?? props.size }
})
</script>

<template>
  <RekaToggle v-bind="rootProps" v-model="value" data-toggle-ui="root">
    <div v-if="$slots.leading" data-toggle-slot="leading">
      <slot name="leading" v-bind="toggleContext" />
    </div>
    <Icon
      v-else-if="iconProps.name"
      v-bind="iconProps"
      :name="iconProps.name"
      data-toggle="leadingIcon"
    />

    <div data-toggle-slot="default">
      <slot v-bind="toggleContext">{{ props.label }}</slot>
    </div>

    <div v-if="$slots.trailing" data-toggle-slot="trailing">
      <slot name="trailing" v-bind="toggleContext" />
    </div>
    <Icon
      v-else-if="trailingIconProps.name"
      v-bind="trailingIconProps"
      :name="trailingIconProps.name"
      data-toggle="trailingIcon"
    />
  </RekaToggle>
</template>
