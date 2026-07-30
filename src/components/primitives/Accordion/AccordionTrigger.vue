<script setup lang="ts">
import { useAttrs } from 'vue'
import type { AccordionTriggerProps } from 'reka-ui'
import { AccordionHeader, AccordionTrigger } from 'reka-ui'
import { ChevronDown } from '@lucide/vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<AccordionTriggerProps>()
const attrs = useAttrs()
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="attrs"
      data-slot="accordion-trigger"
      :as="props.as"
      :as-child="props.asChild"
      :class="
        cn(
          'flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          attrs.class,
        )
      "
    >
      <slot />
      <ChevronDown
        class="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200"
      />
    </AccordionTrigger>
  </AccordionHeader>
</template>
