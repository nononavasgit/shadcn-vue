<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { AccordionContentProps } from 'reka-ui'
import { AccordionContent } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<AccordionContentProps>()
const attrs = useAttrs()
const rootAttrs = computed(() => {
  const { class: _, ...rest } = attrs
  void _
  return rest
})
</script>

<template>
  <AccordionContent
    v-bind="rootAttrs"
    data-slot="accordion-content"
    :as="props.as"
    :as-child="props.asChild"
    :force-mount="props.forceMount"
    class="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  >
    <div :class="cn('pt-0 pb-4', attrs.class)">
      <slot />
    </div>
  </AccordionContent>
</template>
