<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { RadioGroupIndicator, RadioGroupItem } from 'reka-ui'
import { cn } from '@/lib/utils'
import type { RadioGroupItemProps, RadioGroupItemSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<RadioGroupItemProps>()
defineSlots<RadioGroupItemSlots>()
const attrs = useAttrs()
const rootProps = computed(() => ({
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
  <RadioGroupItem v-bind="rootProps" data-slot="radio-group-item">
    <template #default="slotProps">
      <RadioGroupIndicator data-slot="radio-group-indicator">
        <slot v-bind="slotProps">
          <span class="flex items-center justify-center">
            <span class="size-2 rounded-full bg-current" />
          </span>
        </slot>
      </RadioGroupIndicator>
    </template>
  </RadioGroupItem>
</template>
