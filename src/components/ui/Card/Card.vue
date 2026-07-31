<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Card as CardBase,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/primitives/Card'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { CardProps, CardSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CardProps>(), {
  label: undefined,
  description: undefined,
  ui: undefined,
})
defineSlots<CardSlots>()

const attrs = useAttrs()
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const headerUI = normalizeHTMLAttributes(props.ui?.header)
  const labelUI = normalizeHTMLAttributes(props.ui?.label)
  const descriptionUI = normalizeHTMLAttributes(props.ui?.description)
  const actionUI = normalizeHTMLAttributes(props.ui?.action)
  const contentUI = normalizeHTMLAttributes(props.ui?.content)
  const footerUI = normalizeHTMLAttributes(props.ui?.footer)

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
    label: {
      ...labelUI,
      class: cn(labelUI.class),
    },
    description: {
      ...descriptionUI,
      class: cn(descriptionUI.class),
    },
    action: {
      ...actionUI,
      class: cn(actionUI.class),
    },
    content: {
      ...contentUI,
      class: cn(contentUI.class),
    },
    footer: {
      ...footerUI,
      class: cn(footerUI.class),
    },
  }
})
</script>

<template>
  <CardBase v-bind="calculatedUI.root">
    <CardHeader
      v-if="
        props.label ||
        props.description ||
        $slots.header ||
        $slots.label ||
        $slots.description ||
        $slots.action
      "
      v-bind="calculatedUI.header"
    >
      <slot name="header">
        <CardTitle v-if="props.label || $slots.label" v-bind="calculatedUI.label">
          <slot name="label">{{ props.label }}</slot>
        </CardTitle>

        <CardDescription
          v-if="props.description || $slots.description"
          v-bind="calculatedUI.description"
        >
          <slot name="description">{{ props.description }}</slot>
        </CardDescription>
      </slot>

      <CardAction v-if="$slots.action" v-bind="calculatedUI.action">
        <slot name="action" />
      </CardAction>
    </CardHeader>

    <CardContent v-if="$slots.default" v-bind="calculatedUI.content">
      <slot />
    </CardContent>

    <CardFooter v-if="$slots.footer" v-bind="calculatedUI.footer">
      <slot name="footer" />
    </CardFooter>
  </CardBase>
</template>
