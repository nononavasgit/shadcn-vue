<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { CheckboxProps, CheckboxSlots, CheckboxValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CheckboxProps>(), {
  trueValue: true,
  falseValue: false,
  ui: undefined,
})
defineSlots<CheckboxSlots>()

const attrs = useAttrs()
const modelValue = defineModel<CheckboxValue | 'indeterminate' | null>()
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)

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
  <CheckboxRoot
    v-slot="slotProps"
    v-bind="calculatedUI.root"
    v-model="modelValue"
    data-slot="checkbox"
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="grid place-content-center text-current"
    >
      <slot
        v-if="$slots.indicator"
        name="indicator"
        :state="slotProps.state"
        :value="slotProps.modelValue"
      />
      <Icon v-else name="check" class="size-3.5" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
