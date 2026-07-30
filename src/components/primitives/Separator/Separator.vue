<script setup lang="ts">
import { useAttrs } from 'vue'
import type { SeparatorProps } from 'reka-ui'
import { Separator as RekaSeparator } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: true,
})

const attrs = useAttrs()
</script>

<template>
  <RekaSeparator
    v-bind="attrs"
    data-slot="separator"
    :orientation="props.orientation"
    :decorative="props.decorative"
    :class="
      cn(
        'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        attrs.class,
      )
    "
  />
</template>
