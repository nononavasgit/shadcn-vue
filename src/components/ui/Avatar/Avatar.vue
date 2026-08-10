<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { AvatarImageEmits } from 'reka-ui'
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { AvatarContext, AvatarEmits, AvatarLoadingState, AvatarProps, AvatarSlots } from '.'
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AvatarProps>(), {
  src: undefined,
  alt: undefined,
  icon: undefined,
  label: undefined,
  ui: undefined,
})
const emit = defineEmits<AvatarEmits>()
defineSlots<AvatarSlots>()

const avatarContext = computed<AvatarContext>(() => {
  const { ui, ...avatarProps } = props
  void ui

  return {
    props: avatarProps,
  }
})

const attrs = useAttrs()
const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, avatarContext.value)
  return {
    ...attrs,
    ...rootUI,
    as: props.as,
    asChild: props.asChild,
    class: cn(
      'relative flex size-8 shrink-0 overflow-hidden rounded-full',
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})

const imageProps = computed(() => {
  if (!props.src) return undefined
  const imageUI = useUi(props.ui?.image, avatarContext.value)
  return {
    ...imageUI,
    as: props.image?.as,
    asChild: props.image?.asChild,
    crossOrigin: props.image?.crossOrigin,
    referrerPolicy: props.image?.referrerPolicy,
    src: props.src,
    alt: props.alt,
    class: cn('aspect-square size-full', imageUI.class),
  }
})

const fallbackProps = computed(() => {
  const fallbackUI = useUi(props.ui?.fallback, avatarContext.value)
  return {
    ...fallbackUI,
    as: props.fallback?.as,
    asChild: props.fallback?.asChild,
    delayMs: props.delayMs,
    class: cn('flex size-full items-center justify-center rounded-full bg-muted', fallbackUI.class),
  }
})

const iconProps = computed(() => normalizeIconProps(props.icon))

type OriginalLoadingState = AvatarImageEmits['loadingStatusChange'][0]

const loadingStates: Record<OriginalLoadingState, AvatarLoadingState> = {
  idle: false,
  loading: true,
  loaded: false,
  error: false,
}

function handleLoadingStateChange(state: OriginalLoadingState) {
  emit('loadingStateChange', loadingStates[state])
}
</script>

<template>
  <AvatarRoot v-bind="rootProps" data-slot="avatar">
    <AvatarImage
      v-if="imageProps"
      v-bind="imageProps"
      data-slot="avatar-image"
      @loading-status-change="handleLoadingStateChange"
    />

    <AvatarFallback v-bind="fallbackProps" data-slot="avatar-fallback">
      <slot name="fallback" v-bind="avatarContext">
        <Icon v-if="iconProps?.name" v-bind="iconProps" />
        <template v-else>{{ props.label }}</template>
      </slot>
    </AvatarFallback>
  </AvatarRoot>
</template>
