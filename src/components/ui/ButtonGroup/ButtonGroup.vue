<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { buttonGroupVariants, type ButtonGroupVariants } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    orientation?: ButtonGroupVariants['orientation']
  }>(),
  {
    orientation: 'horizontal',
  },
)
const attrs = useAttrs()
</script>

<template>
  <div
    v-bind="attrs"
    role="group"
    data-slot="button-group"
    :data-orientation="props.orientation"
    :class="cn(buttonGroupVariants({ orientation: props.orientation }), attrs.class)"
  >
    <slot />
  </div>
</template>
