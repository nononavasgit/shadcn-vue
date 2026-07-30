<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Empty as EmptyBase,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/primitives/Empty'
import { cn } from '@/lib/utils'
import type { EmptyProps, EmptySlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<EmptyProps>(), {
  mediaVariant: 'default',
})
defineSlots<EmptySlots>()

const attrs = useAttrs()
const calculatedUI = computed(() => ({
  root: {
    ...props.ui?.root,
    ...attrs,
    class: cn(props.ui?.root?.class, attrs.class),
  },
  header: props.ui?.header,
  media: props.ui?.media,
  label: props.ui?.label,
  description: props.ui?.description,
  content: props.ui?.content,
}))
</script>

<template>
  <EmptyBase v-bind="calculatedUI.root">
    <EmptyHeader
      v-if="$slots.media || props.label || $slots.label || props.description || $slots.description"
      v-bind="calculatedUI.header"
    >
      <EmptyMedia v-if="$slots.media" v-bind="calculatedUI.media" :variant="props.mediaVariant">
        <slot name="media" />
      </EmptyMedia>

      <EmptyTitle v-if="props.label || $slots.label" v-bind="calculatedUI.label">
        <slot name="label">{{ props.label }}</slot>
      </EmptyTitle>

      <EmptyDescription
        v-if="props.description || $slots.description"
        v-bind="calculatedUI.description"
      >
        <slot name="description">{{ props.description }}</slot>
      </EmptyDescription>
    </EmptyHeader>

    <EmptyContent v-if="$slots.default" v-bind="calculatedUI.content">
      <slot />
    </EmptyContent>
  </EmptyBase>
</template>
