<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { DialogTriggerProps } from 'reka-ui'
import { DialogTrigger } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<DialogTriggerProps>()
const attrs = useAttrs()
const triggerProps = computed(() => ({ ...attrs, ...props }))
</script>

<template>
  <DialogTrigger v-bind="triggerProps" data-slot="sheet-trigger">
    <slot />
  </DialogTrigger>
</template>
