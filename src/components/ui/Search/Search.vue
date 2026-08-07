<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
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

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, searchContext.value))
  const formUI = normalizeHTMLAttributes(useResolve(props.ui?.form, searchContext.value))

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: rootUI.class,
      style: [attrs.style, rootUI.style],
    },
    form: {
      ...formUI,
      class: formUI.class,
      style: formUI.style,
    },
  }
})
</script>

<template>
  <search v-bind="calculatedUI.root" data-slot="search" role="search">
    <form v-bind="calculatedUI.form" data-slot="search-form">
      <slot v-bind="searchContext" />
    </form>
  </search>
</template>
