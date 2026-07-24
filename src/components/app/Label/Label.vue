<script setup lang="ts">
import { useAttrs } from 'vue'
import { Label as LabelBase } from '@/components/ui/Label'
import type { LabelProps } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<LabelProps>()
const attrs = useAttrs()
</script>

<template>
  <LabelBase v-bind="attrs" :as="props.as" :as-child="props.asChild" :for="props.for">
    <slot />
  </LabelBase>
</template>
