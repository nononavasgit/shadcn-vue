<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import type { ButtonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'

defineOptions({ inheritAttrs: false })

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}

withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
  class: undefined,
})
</script>

<template>
  <Button
    v-bind="$attrs"
    :as="as"
    :as-child="asChild"
    :variant="variant"
    :size="size"
    :class="$props.class"
  >
    <slot />
  </Button>
</template>
