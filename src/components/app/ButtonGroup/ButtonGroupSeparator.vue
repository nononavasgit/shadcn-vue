<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ButtonGroupSeparator as ButtonGroupSeparatorBase } from '@/components/ui/ButtonGroup'
import type { ButtonGroupSeparatorProps } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonGroupSeparatorProps>(), {
  orientation: 'vertical',
  decorative: true,
})
const attrs = useAttrs()
const calculatedProps = computed(() => ({
  ...attrs,
  orientation: props.orientation,
  decorative: props.decorative,
}))
</script>

<template>
  <ButtonGroupSeparatorBase v-bind="calculatedProps" />
</template>
