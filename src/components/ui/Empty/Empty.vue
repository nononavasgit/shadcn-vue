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
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { EmptyProps, EmptySlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<EmptyProps>(), {
  label: undefined,
  description: undefined,
  mediaVariant: 'default',
  ui: undefined,
})
defineSlots<EmptySlots>()

const attrs = useAttrs()
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const headerUI = normalizeHTMLAttributes(props.ui?.header)
  const mediaUI = normalizeHTMLAttributes(props.ui?.media)
  const labelUI = normalizeHTMLAttributes(props.ui?.label)
  const descriptionUI = normalizeHTMLAttributes(props.ui?.description)
  const contentUI = normalizeHTMLAttributes(props.ui?.content)

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    header: {
      ...headerUI,
      class: cn(headerUI.class),
    },
    media: {
      ...mediaUI,
      class: cn(mediaUI.class),
    },
    label: {
      ...labelUI,
      class: cn(labelUI.class),
    },
    description: {
      ...descriptionUI,
      class: cn(descriptionUI.class),
    },
    content: {
      ...contentUI,
      class: cn(contentUI.class),
    },
  }
})
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
