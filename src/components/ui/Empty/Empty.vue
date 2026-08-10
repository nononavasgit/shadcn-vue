<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useUi } from '@/composables/useUi'
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

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useUi(props.ui?.root, emptyContext.value))
  return {
    ...attrs,
    ...rootUI,
    class: cn(
      'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center md:p-12',
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})

const headerProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.header, emptyContext.value))
  return { ...ui, class: cn('flex max-w-sm flex-col items-center gap-2 text-center', ui.class) }
})
const mediaProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.media, emptyContext.value))
  return {
    ...ui,
    class: cn(
      props.mediaVariant === 'icon' &&
        'flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*=size-])]:size-6',
      ui.class,
    ),
  }
})
const labelProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.label, emptyContext.value))
  return { ...ui, class: cn('text-lg font-medium tracking-tight', ui.class) }
})
const descriptionProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.description, emptyContext.value))
  return {
    ...ui,
    class: cn(
      'text-sm/relaxed text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary',
      ui.class,
    ),
  }
})
const contentProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.content, emptyContext.value))
  return {
    ...ui,
    class: cn('flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm', ui.class),
  }
})
</script>

<template>
  <div v-bind="rootProps" data-slot="empty">
    <div
      v-if="$slots.media || props.label || $slots.label || props.description || $slots.description"
      v-bind="headerProps"
      data-slot="empty-header"
    >
      <div
        v-if="$slots.media"
        v-bind="mediaProps"
        data-slot="empty-media"
        :data-variant="props.mediaVariant"
      >
        <slot name="media" v-bind="emptyContext" />
      </div>

      <div v-if="props.label || $slots.label" v-bind="labelProps" data-slot="empty-title">
        <slot name="label" v-bind="emptyContext">{{ props.label }}</slot>
      </div>

      <div
        v-if="props.description || $slots.description"
        v-bind="descriptionProps"
        data-slot="empty-description"
      >
        <slot name="description" v-bind="emptyContext">{{ props.description }}</slot>
      </div>
    </div>

    <div v-if="$slots.default" v-bind="contentProps" data-slot="empty-content">
      <slot v-bind="emptyContext" />
    </div>
  </div>
</template>
