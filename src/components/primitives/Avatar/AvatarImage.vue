<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { AvatarImageEmits, AvatarImageProps } from 'reka-ui'
import { AvatarImage as RekaAvatarImage, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<AvatarImageProps>()
const emits = defineEmits<AvatarImageEmits>()

const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const imageProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...forwarded.value }
})
</script>

<template>
  <RekaAvatarImage
    v-bind="imageProps"
    data-slot="avatar-image"
    :class="cn('aspect-square size-full', attrs.class)"
  >
    <slot />
  </RekaAvatarImage>
</template>
