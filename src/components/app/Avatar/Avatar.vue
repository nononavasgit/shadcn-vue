<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { ImgHTMLAttributes } from 'vue'
import { Avatar as AvatarBase, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import type { AvatarEmits, AvatarProps, AvatarSlotProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  fallback?(props: AvatarSlotProps): unknown
}>()

const props = defineProps<AvatarProps>()
const emits = defineEmits<AvatarEmits>()
const attrs = useAttrs() as ImgHTMLAttributes

const icon = computed(() => (typeof props.icon === 'string' ? { name: props.icon } : props.icon))
const slotProps = computed<AvatarSlotProps>(() => ({
  icon: props.icon,
  label: props.label,
  src: attrs?.src,
  alt: attrs?.alt,
}))

const uiCalculado = computed(() => ({
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
</script>

<template>
  <AvatarBase v-bind="uiCalculado.root">
    <AvatarImage
      v-if="uiCalculado.image"
      v-bind="uiCalculado.image"
      @loading-status-change="emits('loadingStatusChange', $event)"
    />

    <AvatarFallback v-bind="uiCalculado.fallback">
      <slot name="fallback" v-bind="slotProps">
        <Icon
          v-if="uiCalculado?.icon?.name"
          v-bind="{ name: uiCalculado?.icon?.name, ...uiCalculado.icon }"
        />
        <template v-else>{{ props.label }}</template>
      </slot>
    </AvatarFallback>
  </AvatarBase>
</template>
