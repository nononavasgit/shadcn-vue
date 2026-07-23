<script setup lang="ts">
import { useAttrs } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'span',
})

const attrs = useAttrs()
</script>

<template>
  <Primitive
    v-bind="attrs"
    data-slot="badge"
    :as="props.as"
    :as-child="props.asChild"
    :class="
      cn(
        'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none',
        attrs.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
