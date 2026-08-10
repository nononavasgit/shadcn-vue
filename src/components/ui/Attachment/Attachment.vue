<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  attachmentActionsVariants,
  attachmentContentVariants,
  attachmentDescriptionVariants,
  attachmentLabelVariants,
  attachmentMediaVariants,
  attachmentVariants,
  type AttachmentContext,
  type AttachmentProps,
  type AttachmentSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AttachmentProps>(), {
  label: undefined,
  description: undefined,
  orientation: 'horizontal',
  size: 'default',
  state: 'idle',
  mediaVariant: 'default',
  ui: undefined,
})
defineSlots<AttachmentSlots>()

const attrs = useAttrs()
const attachmentContext = computed<AttachmentContext>(() => {
  const { ui, ...attachmentProps } = props
  void ui

  return { props: attachmentProps }
})

const rootProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.root, attachmentContext.value))

  return {
    ...attrs,
    ...ui,
    'data-orientation': props.orientation,
    'data-size': props.size,
    'data-state': props.state,
    class: cn(
      attachmentVariants({
        orientation: props.orientation,
        size: props.size,
        state: props.state,
      }),
      attrs.class,
      ui.class,
    ),
    style: [attrs.style, ui.style],
  }
})

const mediaProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.media, attachmentContext.value))

  return {
    ...ui,
    class: cn(
      attachmentMediaVariants({
        orientation: props.orientation,
        size: props.size,
        variant: props.mediaVariant,
        state: props.state,
      }),
      ui.class,
    ),
  }
})

const contentProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.content, attachmentContext.value))
  return {
    ...ui,
    class: cn(attachmentContentVariants({ orientation: props.orientation }), ui.class),
  }
})

const labelProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.label, attachmentContext.value))
  return {
    ...ui,
    class: cn(attachmentLabelVariants({ size: props.size, state: props.state }), ui.class),
  }
})

const descriptionProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.description, attachmentContext.value))
  return {
    ...ui,
    class: cn(attachmentDescriptionVariants({ size: props.size, state: props.state }), ui.class),
  }
})

const actionsProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.actions, attachmentContext.value))
  return {
    ...ui,
    class: cn(
      attachmentActionsVariants({ orientation: props.orientation, size: props.size }),
      ui.class,
    ),
  }
})

const triggerProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.trigger, attachmentContext.value))
  return {
    ...ui,
    class: cn(
      'contents [&>*]:absolute [&>*]:inset-0 [&>*]:z-0 [&>*]:rounded-[inherit] [&>*]:outline-none [&>*:hover]:bg-accent/50 [&>*:focus-visible]:ring-[3px] [&>*:focus-visible]:ring-ring/50',
      ui.class,
    ),
  }
})
</script>

<template>
  <div v-bind="rootProps" data-slot="attachment">
    <div
      v-if="$slots.media"
      v-bind="mediaProps"
      data-slot="attachment-media"
      :data-variant="props.mediaVariant"
    >
      <slot name="media" v-bind="attachmentContext" />
    </div>

    <div
      v-if="props.label || props.description || $slots.label || $slots.description"
      v-bind="contentProps"
      data-slot="attachment-content"
    >
      <div v-if="props.label || $slots.label" v-bind="labelProps" data-slot="attachment-title">
        <slot name="label" v-bind="attachmentContext">{{ props.label }}</slot>
      </div>
      <div
        v-if="props.description || $slots.description"
        v-bind="descriptionProps"
        data-slot="attachment-description"
      >
        <slot name="description" v-bind="attachmentContext">{{ props.description }}</slot>
      </div>
    </div>

    <div v-if="$slots.actions" v-bind="actionsProps" data-slot="attachment-actions">
      <slot name="actions" v-bind="attachmentContext" />
    </div>

    <div v-if="$slots.trigger" v-bind="triggerProps" data-slot="attachment-trigger">
      <slot name="trigger" v-bind="attachmentContext" />
    </div>
  </div>
</template>
