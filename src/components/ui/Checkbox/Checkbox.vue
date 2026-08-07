<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type { CheckboxContext, CheckboxProps, CheckboxSlots, CheckboxValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CheckboxProps>(), {
  trueValue: true,
  falseValue: false,
  ui: undefined,
})
defineSlots<CheckboxSlots>()

const modelValue = defineModel<CheckboxValue | 'indeterminate' | null>()
const value = computed<CheckboxValue | 'indeterminate' | null>({
  get: () =>
    modelValue.value !== undefined
      ? modelValue.value
      : (props.defaultValue ?? props.falseValue ?? false),
  set: (nextValue) => {
    modelValue.value = nextValue
  },
})

const checkboxContext = computed<CheckboxContext>(() => {
  const { ui, ...checkboxProps } = props
  void ui

  const currentValue = value.value
  const state =
    currentValue === 'indeterminate' ? 'indeterminate' : currentValue === props.trueValue

  return {
    props: checkboxProps,
    value: currentValue as CheckboxValue | 'indeterminate',
    state,
  }
})

const attrs = useAttrs()
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, checkboxContext.value))

  return {
    root: {
      ...attrs,
      ...rootUI,
      as: props.as,
      asChild: props.asChild,
      defaultValue: props.defaultValue,
      falseValue: props.falseValue,
      trueValue: props.trueValue,
      disabled: props.disabled,
      id: props.id,
      name: props.name,
      required: props.required,
      value: props.value,
      class: cn(
        'peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:aria-invalid:ring-destructive/40',
        'focus-visible:border-primary focus-visible:ring-primary/50',
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <CheckboxRoot v-bind="calculatedUI.root" v-model="value" data-slot="checkbox">
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="grid place-content-center text-current"
    >
      <slot v-if="$slots.indicator" name="indicator" v-bind="checkboxContext" />
      <Icon v-else name="check" class="size-3.5" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
