<script setup lang="ts">
import { useAttrs } from 'vue'
import type { AccordionItemProps } from 'reka-ui'
import { AccordionItem } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<AccordionItemProps>()
const attrs = useAttrs()
</script>

<template>
  <AccordionItem
    v-bind="attrs"
    data-slot="accordion-item"
    :value="props.value"
    :disabled="props.disabled"
    :class="cn('border-b last:border-b-0', attrs.class)"
  >
    <slot />
  </AccordionItem>
</template>
