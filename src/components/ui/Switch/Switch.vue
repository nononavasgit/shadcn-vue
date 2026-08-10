<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { SwitchContext, SwitchProps, SwitchSlots, SwitchValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SwitchProps>(), {
  trueValue: true,
  falseValue: false,
  ui: undefined,
})
defineSlots<SwitchSlots>()
const emit = defineEmits<{ valueChange: [value: SwitchValue] }>()

const value = defineModel<SwitchValue>('value', { default: false })

watch(value, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const switchContext = computed<SwitchContext>(() => {
  const { ui, ...switchProps } = props
  void ui

  return {
    props: switchProps,
    value: value.value,
    checked: value.value === props.trueValue,
  }
})

const attrs = useAttrs()
const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, switchContext.value)

  return {
    ...attrs,
    ...rootUI,
    as: props.as,
    asChild: props.asChild,
    disabled: props.disabled,
    id: props.id,
    name: props.name,
    trueValue: props.trueValue,
    falseValue: props.falseValue,
    required: props.required,
    class: cn(
      'peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
      'focus-visible:border-primary focus-visible:ring-primary/50',
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})

const thumbProps = computed(() => {
  const thumbUI = useUi(props.ui?.thumb, switchContext.value)

  return {
    ...thumbUI,
    class: cn(
      'pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground',
      thumbUI.class,
    ),
    style: thumbUI.style,
  }
})
</script>

<template>
  <SwitchRoot v-bind="rootProps" v-model="value" data-slot="switch">
    <SwitchThumb v-bind="thumbProps" data-slot="switch-thumb">
      <slot name="thumb" v-bind="switchContext" />
    </SwitchThumb>
  </SwitchRoot>
</template>
