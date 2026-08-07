<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { AvatarImageEmits } from 'reka-ui'
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type { AvatarContext, AvatarEmits, AvatarLoadingState, AvatarProps, AvatarSlots } from '.'
import { normalizeImageProps, normalizeFallbackProps } from '.'
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
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, avatarContext.value))
  const imageUI = normalizeHTMLAttributes(useResolve(props.ui?.image, avatarContext.value))
  const fallbackUI = normalizeHTMLAttributes(useResolve(props.ui?.fallback, avatarContext.value))

  return {
    root: {
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
    },
    image: props.src
      ? {
          ...imageUI,
          ...normalizeImageProps(props.image),
          src: props.src,
          alt: props.alt,
          class: cn('aspect-square size-full', imageUI.class),
        }
      : undefined,
    fallback: {
      ...fallbackUI,
      ...normalizeFallbackProps(props.fallback),
      delayMs: props.delayMs,
      class: cn(
        'flex size-full items-center justify-center rounded-full bg-muted',
        fallbackUI.class,
      ),
    },
    icon: {
      ...normalizeIconProps(props.icon),
    },
  }
})

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
  <AvatarRoot v-bind="calculatedUI.root" data-slot="avatar">
    <AvatarImage
      v-if="calculatedUI.image"
      v-bind="calculatedUI.image"
      data-slot="avatar-image"
      @loading-status-change="handleLoadingStateChange"
    />

    <AvatarFallback v-bind="calculatedUI.fallback" data-slot="avatar-fallback">
      <slot name="fallback" v-bind="avatarContext">
        <Icon
          v-if="calculatedUI.icon.name"
          v-bind="calculatedUI.icon"
          :name="calculatedUI.icon.name"
        />
        <template v-else>{{ props.label }}</template>
      </slot>
    </AvatarFallback>
  </AvatarRoot>
</template>
