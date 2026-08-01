<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })
interface Props extends PrimitiveProps {
  variant?: 'legend' | 'label'
}
const props = withDefaults(defineProps<Props>(), { as: 'legend', variant: 'legend' })
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
    data-slot="field-legend"
    :data-variant="variant"
    :class="
      cn(
        'mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base',
        attrs.class,
      )
    "
    ><slot
  /></Primitive>
</template>
