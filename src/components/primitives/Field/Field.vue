<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { fieldVariants, type FieldVariants } from './index'

defineOptions({ inheritAttrs: false })

interface Props extends PrimitiveProps {
  orientation?: FieldVariants['orientation']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  orientation: 'vertical',
})
const attrs = useAttrs()
const rootProps = computed(() => {
  const rest = { ...attrs }
  delete rest.class
  return { ...rest, as: props.as, asChild: props.asChild }
})
</script>

<template>
  <Primitive
    v-bind="rootProps"
    data-slot="field"
    :data-orientation="orientation"
    :class="cn(fieldVariants({ orientation }), attrs.class)"
  >
    <slot />
  </Primitive>
</template>
