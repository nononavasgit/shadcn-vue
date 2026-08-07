<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type { EmptyContext, EmptyProps, EmptySlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<EmptyProps>(), {
  label: undefined,
  description: undefined,
  mediaVariant: 'default',
  ui: undefined,
})
defineSlots<EmptySlots>()

const attrs = useAttrs()
const emptyContext = computed<EmptyContext>(() => {
  const { ui, ...emptyProps } = props
  void ui

  return { props: emptyProps }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, emptyContext.value))
  const headerUI = normalizeHTMLAttributes(useResolve(props.ui?.header, emptyContext.value))
  const mediaUI = normalizeHTMLAttributes(useResolve(props.ui?.media, emptyContext.value))
  const labelUI = normalizeHTMLAttributes(useResolve(props.ui?.label, emptyContext.value))
  const descriptionUI = normalizeHTMLAttributes(
    useResolve(props.ui?.description, emptyContext.value),
  )
  const contentUI = normalizeHTMLAttributes(useResolve(props.ui?.content, emptyContext.value))

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center md:p-12',
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
    header: {
      ...headerUI,
      class: cn('flex max-w-sm flex-col items-center gap-2 text-center', headerUI.class),
    },
    media: {
      ...mediaUI,
      class: cn(
        props.mediaVariant === 'icon' &&
          'flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*=size-])]:size-6',
        mediaUI.class,
      ),
    },
    label: {
      ...labelUI,
      class: cn('text-lg font-medium tracking-tight', labelUI.class),
    },
    description: {
      ...descriptionUI,
      class: cn(
        'text-sm/relaxed text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary',
        descriptionUI.class,
      ),
    },
    content: {
      ...contentUI,
      class: cn(
        'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm',
        contentUI.class,
      ),
    },
  }
})
</script>

<template>
  <div v-bind="calculatedUI.root" data-slot="empty">
    <div
      v-if="$slots.media || props.label || $slots.label || props.description || $slots.description"
      v-bind="calculatedUI.header"
      data-slot="empty-header"
    >
      <div
        v-if="$slots.media"
        v-bind="calculatedUI.media"
        data-slot="empty-media"
        :data-variant="props.mediaVariant"
      >
        <slot name="media" v-bind="emptyContext" />
      </div>

      <div v-if="props.label || $slots.label" v-bind="calculatedUI.label" data-slot="empty-title">
        <slot name="label" v-bind="emptyContext">{{ props.label }}</slot>
      </div>

      <div
        v-if="props.description || $slots.description"
        v-bind="calculatedUI.description"
        data-slot="empty-description"
      >
        <slot name="description" v-bind="emptyContext">{{ props.description }}</slot>
      </div>
    </div>

    <div v-if="$slots.default" v-bind="calculatedUI.content" data-slot="empty-content">
      <slot v-bind="emptyContext" />
    </div>
  </div>
</template>
