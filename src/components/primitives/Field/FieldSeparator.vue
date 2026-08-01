<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import { Separator } from '@/components/primitives/Separator'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<PrimitiveProps>(), { as: 'div' })
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
    data-slot="field-separator"
    :class="cn('relative -my-2 h-5 text-sm', attrs.class)"
  >
    <Separator class="absolute inset-x-0 top-1/2" />
    <span
      v-if="$slots.default"
      class="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
      ><slot
    /></span>
  </Primitive>
</template>
