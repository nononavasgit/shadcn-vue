<script setup lang="ts">
import { computed, useAttrs } from 'vue'
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
      class: cn(
        'flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm',
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
    header: {
      ...headerUI,
      class: cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        headerUI.class,
      ),
    },
    label: {
      ...labelUI,
      class: cn('leading-none font-semibold', labelUI.class),
    },
    description: {
      ...descriptionUI,
      class: cn('text-sm text-muted-foreground', descriptionUI.class),
    },
    action: {
      ...actionUI,
      class: cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', actionUI.class),
    },
    content: {
      ...contentUI,
      class: cn('px-6', contentUI.class),
    },
    footer: {
      ...footerUI,
      class: cn('flex items-center px-6 [.border-t]:pt-6', footerUI.class),
    },
  }
})
</script>

<template>
  <div v-bind="calculatedUI.root" data-slot="card">
    <div
      v-if="
        props.label ||
        props.description ||
        $slots.header ||
        $slots.label ||
        $slots.description ||
        $slots.action
      "
      v-bind="calculatedUI.header"
      data-slot="card-header"
    >
      <slot name="header">
        <h3 v-if="props.label || $slots.label" v-bind="calculatedUI.label" data-slot="card-title">
          <slot name="label">{{ props.label }}</slot>
        </h3>

        <p
          v-if="props.description || $slots.description"
          v-bind="calculatedUI.description"
          data-slot="card-description"
        >
          <slot name="description">{{ props.description }}</slot>
        </p>
      </slot>

      <div v-if="$slots.action" v-bind="calculatedUI.action" data-slot="card-action">
        <slot name="action" />
      </div>
    </div>

    <div v-if="$slots.default" v-bind="calculatedUI.content" data-slot="card-content">
      <slot />
    </div>

    <div v-if="$slots.footer" v-bind="calculatedUI.footer" data-slot="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
