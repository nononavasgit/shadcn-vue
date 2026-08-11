<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { createKbdGroupContext, type KbdGroupProps, type KbdGroupSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<KbdGroupProps>(), {
  ui: undefined,
})
defineSlots<KbdGroupSlots>()

const kbdGroupContext = computed(() => createKbdGroupContext())

const attrs = useAttrs()
const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, kbdGroupContext.value)

  return {
    ...attrs,
    ...rootUI,
    class: cn('inline-flex items-center gap-1', attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})
</script>

<template>
  <kbd v-bind="rootProps" data-kbd-group-ui="root" data-kbd-group-slot="default">
    <slot v-bind="kbdGroupContext" />
  </kbd>
</template>
