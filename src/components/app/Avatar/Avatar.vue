<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { Avatar as AvatarBase, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import type { AvatarEmits, AvatarProps, AvatarSlotProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  image?(props: AvatarSlotProps): unknown
  fallback?(props: AvatarSlotProps): unknown
}>()

const props = defineProps<AvatarProps>()
const emits = defineEmits<AvatarEmits>()
const attrs = useAttrs()

const slotProps = computed<AvatarSlotProps>(() => ({
  src: props.src,
  alt: props.alt,
  fallback: props.fallback,
}))

const rootProps = computed(() => ({
  ...props.ui?.root,
  ...attrs,
  class: cn(props.ui?.root?.class, attrs.class),
}))
</script>

<template>
  <AvatarBase v-bind="rootProps">
    <slot name="image" v-bind="slotProps">
      <AvatarImage
        v-if="props.src"
        v-bind="props.ui?.image"
        :src="props.src"
        :alt="props.alt"
        @loading-status-change="emits('loadingStatusChange', $event)"
      />
    </slot>

    <AvatarFallback
      v-bind="props.ui?.fallback"
      :delay-ms="props.delayMs ?? props.ui?.fallback?.delayMs"
    >
      <slot name="fallback" v-bind="slotProps">{{ props.fallback }}</slot>
    </AvatarFallback>
  </AvatarBase>
</template>
