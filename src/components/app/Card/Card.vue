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
import type { CardProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(): unknown
  header?(): unknown
  title?(): unknown
  description?(): unknown
  action?(): unknown
  footer?(): unknown
}>()

const props = defineProps<CardProps>()
const attrs = useAttrs()

const rootProps = computed(() => ({
  ...props.ui?.root,
  ...attrs,
  class: cn(props.ui?.root?.class, attrs.class),
}))
</script>

<template>
  <CardBase v-bind="rootProps">
    <CardHeader
      v-if="
        props.label ||
        props.description ||
        $slots.header ||
        $slots.title ||
        $slots.description ||
        $slots.action
      "
      v-bind="props.ui?.header"
    >
      <slot name="header">
        <CardTitle v-if="props.label || $slots.title" v-bind="props.ui?.title">
          <slot name="title">{{ props.label }}</slot>
        </CardTitle>

        <CardDescription
          v-if="props.description || $slots.description"
          v-bind="props.ui?.description"
        >
          <slot name="description">{{ props.description }}</slot>
        </CardDescription>
      </slot>

      <CardAction v-if="$slots.action" v-bind="props.ui?.action">
        <slot name="action" />
      </CardAction>
    </CardHeader>

    <CardContent v-if="$slots.default" v-bind="props.ui?.content">
      <slot />
    </CardContent>

    <CardFooter v-if="$slots.footer" v-bind="props.ui?.footer">
      <slot name="footer" />
    </CardFooter>
  </CardBase>
</template>
