<script setup lang="ts">
import { useAttrs } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div',
  asChild: false,
})
const attrs = useAttrs()
</script>

<template>
  <Primitive
    v-bind="attrs"
    data-slot="button-group-text"
    :as="props.as"
    :as-child="props.asChild"
    :class="
      cn(
        'flex items-center gap-2 rounded-md border bg-muted px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4',
        attrs.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
