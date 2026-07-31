<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { RadioGroupItem } from '@/components/primitives/RadioGroup'
import { cn } from '@/lib/utils'
import type { RadioGroupItemProps, RadioGroupItemSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<RadioGroupItemProps>()
defineSlots<RadioGroupItemSlots>()
const attrs = useAttrs()
const calculatedUI = computed(() => ({
  ...attrs,
  as: props.as,
  asChild: props.asChild,
  disabled: props.disabled,
  id: props.id,
  name: props.name,
  required: props.required,
  value: props.value,
  class: cn(
    'aspect-square size-4 shrink-0 rounded-full border border-primary text-primary shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
    attrs.class,
  ),
}))
</script>

<template>
  <RadioGroupItem v-bind="calculatedUI">
    <template #default="slotProps">
      <slot v-bind="slotProps">
        <span class="flex items-center justify-center">
          <span class="size-2 rounded-full bg-current" />
        </span>
      </slot>
    </template>
  </RadioGroupItem>
</template>
