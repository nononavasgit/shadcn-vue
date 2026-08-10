<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { SearchContext, SearchProps, SearchSlots } from '.'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const props = withDefaults(defineProps<SearchProps>(), {
  ui: undefined,
})
defineSlots<SearchSlots>()

const searchContext = computed<SearchContext>(() => {
  const { ui, ...searchProps } = props
  void ui

  return { props: searchProps }
})

const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, searchContext.value)

  return {
    ...attrs,
    ...rootUI,
    class: cn(attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})
</script>

<template>
  <form v-bind="rootProps" data-slot="search" role="search">
    <slot v-bind="searchContext" />
  </form>
</template>
