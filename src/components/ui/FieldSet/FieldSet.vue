<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  FieldGroup,
  FieldLegend,
  FieldDescription,
  FieldSet as FieldSetBase,
} from '@/components/primitives/Field'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { FieldSetProps, FieldSetSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FieldSetProps>(), {
  legend: undefined,
  description: undefined,
  legendVariant: 'legend',
  orientation: 'vertical',
  ui: undefined,
})
defineSlots<FieldSetSlots>()

const attrs = useAttrs()
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const legendUI = normalizeHTMLAttributes(props.ui?.legend)
  const descriptionUI = normalizeHTMLAttributes(props.ui?.description)
  const groupUI = normalizeHTMLAttributes(props.ui?.group)

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    legend: {
      ...legendUI,
      class: cn(legendUI.class),
      style: legendUI.style,
    },
    description: {
      ...descriptionUI,
      class: cn(descriptionUI.class),
      style: descriptionUI.style,
    },
    group: {
      ...groupUI,
      class: cn(groupUI.class),
      style: groupUI.style,
    },
  }
})
</script>

<template>
  <FieldSetBase v-bind="calculatedUI.root">
    <FieldLegend
      v-if="props.legend || $slots.legend"
      v-bind="calculatedUI.legend"
      :variant="props.legendVariant"
    >
      <slot name="legend">{{ props.legend }}</slot>
    </FieldLegend>

    <FieldDescription
      v-if="props.description || $slots.description"
      v-bind="calculatedUI.description"
    >
      <slot name="description">{{ props.description }}</slot>
    </FieldDescription>

    <FieldGroup v-bind="calculatedUI.group" :data-orientation="props.orientation">
      <slot />
    </FieldGroup>
  </FieldSetBase>
</template>
