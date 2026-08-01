<script setup lang="ts">
import { useAttrs } from 'vue'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>

<template>
  <Label
    v-bind="attrs"
    data-slot="field-label"
    :class="
      cn('flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50', attrs.class)
    "
    ><slot
  /></Label>
</template>
