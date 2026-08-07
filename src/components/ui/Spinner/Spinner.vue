<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import type { SpinnerContext, SpinnerProps, SpinnerSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SpinnerProps>(), {
  loading: true,
  icon: 'spinner',
  ui: undefined,
})
defineSlots<SpinnerSlots>()

const attrs = useAttrs()
const { t } = useI18n()

const spinnerContext = computed<SpinnerContext>(() => {
  const { ui, ...spinnerProps } = props
  void ui

  return {
    props: spinnerProps,
  }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, spinnerContext.value))
  const loadingUI = normalizeHTMLAttributes(useResolve(props.ui?.loading, spinnerContext.value))
  const contentUI = normalizeHTMLAttributes(useResolve(props.ui?.content, spinnerContext.value))

  return {
    root: {
      ...attrs,
      ...rootUI,
      role: 'status',
      'aria-busy': props.loading,
      'aria-label': rootUI['aria-label'] ?? attrs['aria-label'] ?? t('loading'),
      class: cn('w-full', attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    loading: {
      ...loadingUI,
      class: cn('flex w-full items-center justify-center', loadingUI.class),
    },
    icon: {
      ...normalizeIconProps(props.icon),
      class: 'animate-spin',
    },
    content: {
      ...contentUI,
      class: cn('w-full', contentUI.class),
    },
  }
})
</script>

<template>
  <div v-bind="calculatedUI.root" data-slot="spinner">
    <div v-show="props.loading" v-bind="calculatedUI.loading" data-slot="spinner-loading">
      <slot name="loading" v-bind="spinnerContext">
        <Icon
          v-if="calculatedUI.icon?.name"
          v-bind="calculatedUI.icon"
          :name="calculatedUI.icon.name"
        />
      </slot>
    </div>

    <div v-show="!props.loading" v-bind="calculatedUI.content" data-slot="spinner-content">
      <slot v-bind="spinnerContext" />
    </div>
  </div>
</template>
