<script setup lang="ts">
import type { ProgressRootProps } from 'reka-ui'
import { ProgressRoot } from 'reka-ui'
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import ProgressIndicator from './ProgressIndicator.vue'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(props: { value: number | null; max: number; percentage: number }): unknown
  indicator?(props: { value: number | null; max: number; percentage: number }): unknown
}>()

const props = withDefaults(defineProps<ProgressRootProps>(), {
  modelValue: 0,
  max: 100,
})

const attrs = useAttrs()

const percentage = computed(() => {
  if (props.modelValue === null) return 0

  return Math.min(100, Math.max(0, (props.modelValue / props.max) * 100))
})
</script>

<template>
  <ProgressRoot
    v-bind="attrs"
    :model-value="props.modelValue"
    :max="props.max"
    :get-value-label="props.getValueLabel"
    :get-value-text="props.getValueText"
    data-slot="progress"
    :class="cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', attrs.class)"
  >
    <slot name="indicator" :value="props.modelValue" :max="props.max" :percentage="percentage">
      <ProgressIndicator :style="`transform: translateX(-${100 - percentage}%);`" />
    </slot>

    <slot :value="props.modelValue" :max="props.max" :percentage />
  </ProgressRoot>
</template>
