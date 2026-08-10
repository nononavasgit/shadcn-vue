<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { KbdGroupContext, KbdGroupProps, KbdGroupSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<KbdGroupProps>(), {
  ui: undefined,
})
defineSlots<KbdGroupSlots>()

const kbdGroupContext = computed<KbdGroupContext>(() => {
  const { ui, ...kbdGroupProps } = props
  void ui

  return {
    props: kbdGroupProps,
  }
})

const attrs = useAttrs()
const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useUi(props.ui?.root, kbdGroupContext.value))

  return {
    ...attrs,
    ...rootUI,
    class: cn('inline-flex items-center gap-1', attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})
</script>

<template>
  <kbd v-bind="rootProps" data-slot="kbd-group">
    <slot v-bind="kbdGroupContext" />
  </kbd>
</template>
