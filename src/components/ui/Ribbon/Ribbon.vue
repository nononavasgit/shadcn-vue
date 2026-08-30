<script setup lang="ts">
import { computed, useAttrs, type CSSProperties } from 'vue'
import { getColorStyle } from '@/composables/useColor'
import { cn } from '@/lib/utils'
import {
  ribbonRotations,
  ribbonVariants,
  type RibbonItem,
  type RibbonPosition,
  type RibbonProps,
  type RibbonSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<RibbonProps>(), {
  ribbons: () => [],
})
defineSlots<RibbonSlots>()

const attrs = useAttrs()

const getBandPosition = (ribbon: RibbonItem): RibbonPosition => ribbon.position ?? 'top-right'

const getBandClass = (ribbon: RibbonItem) =>
  ribbonVariants({
    position: getBandPosition(ribbon),
    severity: ribbon.severity ?? 'primary',
    color: Boolean(ribbon.color),
  })

const getBandStyle = (ribbon: RibbonItem, index: number): CSSProperties => ({
  ...getColorStyle(ribbon.color, 'ribbon'),
  zIndex: ribbon.zIndex ?? 20 + index,
  transform: `rotate(${ribbon.rotate ?? ribbonRotations[getBandPosition(ribbon)]}deg)`,
})

const rootProps = computed(() => ({
  ...attrs,
  class: cn('relative isolate block overflow-hidden', attrs.class),
  style: attrs.style,
}))
</script>

<template>
  <div v-bind="rootProps" data-test-ribbon-root>
    <div
      v-for="(ribbon, index) in props.ribbons"
      :key="`${ribbon.label}-${index}`"
      :class="getBandClass(ribbon)"
      :style="getBandStyle(ribbon, index)"
      aria-hidden="true"
      :data-test-ribbon-band="index"
    >
      <span>{{ ribbon.label }}</span>
    </div>

    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
