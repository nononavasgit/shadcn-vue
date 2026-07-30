<script setup lang="ts">
import { computed, inject, mergeProps, useAttrs, type Ref } from 'vue'
import type { ToggleGroupItemProps } from 'reka-ui'
import { ToggleGroupItem, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<ToggleGroupItemProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const orientation = inject<Ref<'horizontal' | 'vertical'>>(
  'toggle-group-orientation',
  computed(() => 'horizontal'),
)
const spacing = inject<Ref<number>>(
  'toggle-group-spacing',
  computed(() => 0),
)
const itemProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <ToggleGroupItem
    v-slot="slotProps"
    v-bind="itemProps"
    data-slot="toggle-group-item"
    :data-orientation="orientation"
    :data-spacing="spacing"
    :class="
      cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
        attrs.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </ToggleGroupItem>
</template>
