<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { LabelProps } from 'reka-ui'
import { Label as RekaLabel } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<LabelProps>()
const attrs = useAttrs()

const rootProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, props)
})
</script>

<template>
  <RekaLabel
    v-bind="rootProps"
    data-slot="label"
    :class="
      cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        attrs.class,
      )
    "
  >
    <slot />
  </RekaLabel>
</template>
