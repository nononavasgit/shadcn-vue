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
  type AttachmentProps,
  type AttachmentSlots,
} from '.'
import { attachmentDefaults } from './default'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AttachmentProps>(), attachmentDefaults)
defineSlots<AttachmentSlots>()

const attrs = useAttrs()
const slots = useSlots()

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
  const ui = useUi(props.ui?.media, undefined)

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
  const ui = useUi(props.ui?.content, undefined)
  return {
    ...ui,
    class: cn(attachmentContentVariants({ orientation: props.orientation }), ui.class),
  }
})

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, undefined)
  return {
    ...ui,
    class: cn(attachmentLabelVariants({ size: props.size, state: props.state }), ui.class),
  }
})

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, undefined)
  return {
    ...ui,
    class: cn(attachmentDescriptionVariants({ size: props.size, state: props.state }), ui.class),
  }
})

const actionsProps = computed(() => {
  const ui = useUi(props.ui?.actions, undefined)
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
  <div v-bind="rootProps" data-test-attachment-root>
    <div
      v-if="hasMedia"
      v-bind="mediaProps"
      data-test-attachment-media
      :data-variant="props.mediaVariant"
    >
      <slot v-if="props.mediaVariant === 'image'" name="media" />
      <Icon v-else-if="mediaIconProps?.name" v-bind="mediaIconProps" data-test-attachment-icon />
    </div>

    <div
      v-if="props.label || props.description || $slots.label || $slots.description"
      v-bind="contentProps"
      data-test-attachment-content
    >
      <div v-if="props.label || $slots.label" v-bind="labelProps" data-test-attachment-label>
        <slot name="label">{{ props.label }}</slot>
      </div>
      <div
        v-if="props.description || $slots.description"
        v-bind="descriptionProps"
        data-test-attachment-description
      >
        <slot name="description">{{ props.description }}</slot>
      </div>
    </div>

    <div v-if="$slots.actions" v-bind="actionsProps" data-test-attachment-actions>
      <slot name="actions" />
    </div>
  </div>
</template>
