<script setup lang="ts">
import { useAttrs } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

type Props = PrimitiveProps

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    v-bind="attrs"
    data-slot="boton"
    :as="props.as"
    :as-child="props.asChild"
    :class="
      cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
        attrs.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
