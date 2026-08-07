<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type { KbdContext, KbdProps, KbdSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<KbdProps>(), {
  label: undefined,
  ui: undefined,
})
defineSlots<KbdSlots>()

const kbdContext = computed<KbdContext>(() => {
  const { ui, ...kbdProps } = props
  void ui

  return {
    props: kbdProps,
  }
})

const attrs = useAttrs()
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, kbdContext.value))

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: cn(
        'pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none',
        `[&_svg:not([class*='size-'])]:size-3`,
        '[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10',
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <kbd v-bind="calculatedUI.root" data-slot="kbd">
    <slot v-bind="kbdContext">{{ props.label }}</slot>
  </kbd>
</template>
