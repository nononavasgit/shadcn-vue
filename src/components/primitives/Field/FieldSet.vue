<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<PrimitiveProps>(), { as: 'fieldset' })
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
    data-slot="field-set"
    :class="cn('flex flex-col gap-6', attrs.class)"
    ><slot
  /></Primitive>
</template>
