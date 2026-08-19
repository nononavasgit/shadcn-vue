<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  attachmentActionsVariants,
  attachmentContentVariants,
  attachmentDescriptionVariants,
  attachmentLabelVariants,
  attachmentMediaVariants,
  attachmentVariants,
  createAttachmentContext,
  type AttachmentContext,
  type AttachmentProps,
  type AttachmentSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AttachmentProps>(), {
  label: undefined,
  description: undefined,
  icon: undefined,
  orientation: 'horizontal',
  size: 'md',
  state: 'idle',
  mediaVariant: 'icon',
  ui: undefined,
})
defineSlots<AttachmentSlots>()

const attrs = useAttrs()
const slots = useSlots()
const attachmentContext = computed<AttachmentContext>(() => createAttachmentContext(props))

const rootProps = computed(() => {
  return {
    ...attrs,
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
    ),
    style: attrs.style,
  }
})

const mediaProps = computed(() => {
  const ui = useUi(props.ui?.media, attachmentContext.value)

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

const mediaIconProps = computed(() => {
  const icon = props.icon
  const size = props.size

  if (props.state === 'uploading') {
    return {
      ...icon,
      name: 'spinner' as const,
      size,
      class: cn(icon?.class, 'animate-spin'),
    }
  }

  return { ...icon, size, name: icon?.name }
})

const hasMedia = computed(() => {
  if (props.mediaVariant === 'image') return Boolean(slots.media)
  return props.state === 'uploading' || Boolean(mediaIconProps.value.name)
})

const contentProps = computed(() => {
  const ui = useUi(props.ui?.content, attachmentContext.value)
  return {
    ...ui,
    class: cn(attachmentContentVariants({ orientation: props.orientation }), ui.class),
  }
})

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, attachmentContext.value)
  return {
    ...ui,
    class: cn(attachmentLabelVariants({ size: props.size, state: props.state }), ui.class),
  }
})

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, attachmentContext.value)
  return {
    ...ui,
    class: cn(attachmentDescriptionVariants({ size: props.size, state: props.state }), ui.class),
  }
})

const actionsProps = computed(() => {
  const ui = useUi(props.ui?.actions, attachmentContext.value)
  return {
    ...ui,
    class: cn(
      attachmentActionsVariants({ orientation: props.orientation, size: props.size }),
      ui.class,
    ),
  }
})
</script>

<template>
  <div v-bind="rootProps" data-slot="attachment" data-test-attachment-root>
    <div
      v-if="hasMedia"
      v-bind="mediaProps"
      data-slot="attachment-media"
      data-test-attachment-media
      :data-variant="props.mediaVariant"
    >
      <slot v-if="props.mediaVariant === 'image'" name="media" v-bind="attachmentContext" />
      <Icon v-else-if="mediaIconProps?.name" v-bind="mediaIconProps" data-test-attachment-icon />
    </div>

    <div
      v-if="props.label || props.description || $slots.label || $slots.description"
      v-bind="contentProps"
      data-slot="attachment-content"
      data-test-attachment-content
    >
      <div
        v-if="props.label || $slots.label"
        v-bind="labelProps"
        data-slot="attachment-title"
        data-test-attachment-label
      >
        <slot name="label" v-bind="attachmentContext">{{ props.label }}</slot>
      </div>
      <div
        v-if="props.description || $slots.description"
        v-bind="descriptionProps"
        data-slot="attachment-description"
        data-test-attachment-description
      >
        <slot name="description" v-bind="attachmentContext">{{ props.description }}</slot>
      </div>
    </div>

    <div
      v-if="$slots.actions"
      v-bind="actionsProps"
      data-slot="attachment-actions"
      data-test-attachment-actions
    >
      <slot name="actions" v-bind="attachmentContext" />
    </div>
  </div>
</template>
