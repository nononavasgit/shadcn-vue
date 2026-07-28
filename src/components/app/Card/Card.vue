<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Card as CardBase,
  CardAction,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import type { CardProps, CardSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<CardProps>()
defineSlots<CardSlots>()

const attrs = useAttrs()
const calculatedUI = computed(() => ({
  root: {
    ...props.ui?.root,
    ...attrs,
    class: cn(props.ui?.root?.class, attrs.class),
  },
  header: props.ui?.header,
  label: props.ui?.label,
  description: props.ui?.description,
  action: props.ui?.action,
  content: props.ui?.content,
  footer: props.ui?.footer,
}))
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
