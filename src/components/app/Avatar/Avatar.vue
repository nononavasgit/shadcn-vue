<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { ImgHTMLAttributes } from 'vue'
import { Avatar as AvatarBase, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Icon } from '@/components/app/Icon'
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
</script>

<template>
  <AvatarBase>
    <AvatarImage
      v-if="attrs.src"
      v-bind="attrs"
      :src="attrs.src"
      :alt="attrs.alt"
      @loading-status-change="emits('loadingStatusChange', $event)"
    />

    <AvatarFallback v-bind="attrs">
      <slot name="fallback" v-bind="slotProps">
        <Icon v-if="icon" v-bind="icon" />
        <template v-else>{{ props.label }}</template>
      </slot>
    </AvatarFallback>
  </AvatarBase>
</template>
