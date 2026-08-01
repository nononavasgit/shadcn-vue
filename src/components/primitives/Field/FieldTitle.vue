<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
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
    data-slot="field-title"
    :class="cn('flex w-fit items-center gap-2 text-sm leading-snug font-medium', attrs.class)"
    ><slot
  /></Primitive>
</template>
