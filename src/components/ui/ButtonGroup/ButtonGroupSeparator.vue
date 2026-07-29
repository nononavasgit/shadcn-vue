<script setup lang="ts">
import { useAttrs } from 'vue'
import type { SeparatorProps } from 'reka-ui'
import { Separator } from '@/components/ui/Separator'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'vertical',
  decorative: true,
})
const attrs = useAttrs()
</script>

<template>
  <Separator
    v-bind="attrs"
    data-slot="button-group-separator"
    :orientation="props.orientation"
    :decorative="props.decorative"
    :class="
      cn('relative m-0! self-stretch bg-input data-[orientation=vertical]:h-auto', attrs.class)
    "
  />
</template>
