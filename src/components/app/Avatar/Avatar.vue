<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { ImgHTMLAttributes } from 'vue'
import type { AvatarImageEmits } from 'reka-ui'
import { Avatar as AvatarBase, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import type { AvatarEmits, AvatarLoadingState, AvatarProps, AvatarSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<AvatarProps>()
const emit = defineEmits<AvatarEmits>()
defineSlots<AvatarSlots>()

const attrs = useAttrs() as ImgHTMLAttributes
const icon = computed(() => (typeof props.icon === 'string' ? { name: props.icon } : props.icon))
const calculatedUI = computed(() => ({
  root: props.ui?.root,
  image: props.src
    ? {
        ...props.ui?.image,
        ...attrs,
        src: props.src,
        alt: props.alt,
        class: cn(props.ui?.image?.class, attrs.class),
      }
    : undefined,
  fallback: {
    ...props.ui?.fallback,
    ...attrs,
    class: cn(props.ui?.fallback?.class, attrs.class),
  },
  icon: {
    ...props.ui?.icon,
    ...icon.value,
    class: cn(props.ui?.icon?.class, icon.value?.class),
  },
}))

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
  <AvatarBase v-bind="calculatedUI.root">
    <AvatarImage
      v-if="calculatedUI.image"
      v-bind="calculatedUI.image"
      @loading-status-change="handleLoadingStateChange"
    />

    <AvatarFallback v-bind="calculatedUI.fallback">
      <slot name="fallback">
        <Icon
          v-if="calculatedUI.icon.name"
          v-bind="calculatedUI.icon"
          :name="calculatedUI.icon.name"
        />
        <template v-else>{{ props.title }}</template>
      </slot>
    </AvatarFallback>
  </AvatarBase>
</template>
