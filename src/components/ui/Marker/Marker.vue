<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
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
    <template v-if="props.asChild">
      <slot />
    </template>
    <template v-else>
      <slot name="icon">
        <Icon
          v-if="props.icon?.name"
          v-bind="props.icon"
          aria-hidden="true"
          data-test-marker-icon
        />
      </slot>
      <slot />
    </template>
  </Primitive>
</template>
