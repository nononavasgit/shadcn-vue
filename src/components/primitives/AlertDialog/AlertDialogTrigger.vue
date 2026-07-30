<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { AlertDialogTriggerProps } from 'reka-ui'
import { AlertDialogTrigger as RekaAlertDialogTrigger } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<AlertDialogTriggerProps>()
const attrs = useAttrs()
const triggerProps = computed(() => ({ ...attrs, ...props }))
</script>

<template>
  <RekaAlertDialogTrigger v-bind="triggerProps" data-slot="alert-dialog-trigger">
    <slot />
  </RekaAlertDialogTrigger>
</template>
