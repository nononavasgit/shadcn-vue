<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { SwitchProps, SwitchSlots, SwitchValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SwitchProps>(), {
  trueValue: true,
  falseValue: false,
  ui: undefined,
})
defineSlots<SwitchSlots>()

const attrs = useAttrs()
const modelValue = defineModel<SwitchValue>()
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)

  return {
    root: {
      ...attrs,
      ...rootUI,
      as: props.as,
      asChild: props.asChild,
      defaultValue: props.defaultValue,
      disabled: props.disabled,
      id: props.id,
      name: props.name,
      value: props.value,
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
    },
  }
})
</script>

<template>
  <SwitchRoot v-slot="slotProps" v-bind="calculatedUI.root" v-model="modelValue" data-slot="switch">
    <SwitchThumb
      data-slot="switch-thumb"
      :class="
        cn(
          'pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground',
        )
      "
    >
      <slot name="thumb" :checked="slotProps.checked" :value="slotProps.modelValue" />
    </SwitchThumb>
  </SwitchRoot>
</template>
