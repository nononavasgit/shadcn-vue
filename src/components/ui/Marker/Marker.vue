<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { markerVariants, type MarkerProps, type MarkerSlots } from '.'
import { markerDefaults } from './default'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<MarkerProps>(), markerDefaults)
defineSlots<MarkerSlots>()
</script>

<template>
  <Primitive
    v-bind="$attrs"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(markerVariants({ variant: props.variant }), $attrs.class)"
    data-test-marker-root
  >
    <slot />
  </Primitive>
</template>
