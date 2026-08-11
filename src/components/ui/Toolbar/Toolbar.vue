<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ToolbarRoot } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { createToolbarContext, type ToolbarProps, type ToolbarSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ToolbarProps>(), {
  as: 'div',
  asChild: false,
  orientation: 'horizontal',
  loop: true,
  ui: undefined,
})
defineSlots<ToolbarSlots>()

const toolbarContext = computed(() => createToolbarContext(props))

const attrs = useAttrs()
const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, toolbarContext.value)

  return {
    ...attrs,
    ...rootUI,
    as: props.as,
    asChild: props.asChild,
    dir: props.dir,
    orientation: props.orientation,
    loop: props.loop,
    'data-orientation': props.orientation,
    class: cn(
      'inline-flex w-fit items-center gap-1 rounded-lg border bg-background p-1 shadow-sm data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})
</script>

<template>
  <ToolbarRoot v-bind="rootProps" data-toolbar-ui="root" data-toolbar-slot="default">
    <slot v-bind="toolbarContext" />
  </ToolbarRoot>
</template>
