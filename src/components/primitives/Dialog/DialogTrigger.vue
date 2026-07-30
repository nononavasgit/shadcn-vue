<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { DialogTriggerProps } from 'reka-ui'
import { DialogTrigger as RekaDialogTrigger } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<DialogTriggerProps>()
const attrs = useAttrs()
const triggerProps = computed(() => ({ ...attrs, ...props }))
</script>

<template>
  <RekaDialogTrigger v-bind="triggerProps" data-slot="dialog-trigger">
    <slot />
  </RekaDialogTrigger>
</template>
