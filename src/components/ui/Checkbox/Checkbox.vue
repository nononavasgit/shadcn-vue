<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  createCheckboxContext,
  type CheckboxModelValue,
  type CheckboxProps,
  type CheckboxSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CheckboxProps>(), {
  trueValue: true,
  falseValue: false,
  ui: undefined,
})
defineSlots<CheckboxSlots>()
const emit = defineEmits<{ valueChange: [value: CheckboxModelValue] }>()

const value = defineModel<CheckboxModelValue>('value', {
  default: false,
})

watch(value, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const checkboxContext = computed(() => createCheckboxContext(value.value, props.trueValue))

const attrs = useAttrs()
const rootProps = computed(() => {
  return {
    ...attrs,
    as: 'button',
    asChild: false,
    falseValue: props.falseValue,
    trueValue: props.trueValue,
    class: cn(
      'peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:aria-invalid:ring-destructive/40',
      'focus-visible:border-primary focus-visible:ring-primary/50',
      attrs.class,
    ),
    style: attrs.style,
  }
})

const indicatorProps = computed(() => {
  const ui = useUi(props.ui?.indicator, checkboxContext.value)
  return { ...ui, class: cn('grid place-content-center', ui.class) }
})
</script>

<template>
  <CheckboxRoot v-bind="rootProps" v-model="value" data-test-checkbox-root>
    <CheckboxIndicator v-bind="indicatorProps" data-test-checkbox-indicator>
      <slot v-if="$slots.indicator" name="indicator" v-bind="checkboxContext" />
      <Icon v-else name="check" class="size-3.5" data-test-checkbox-icon />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
