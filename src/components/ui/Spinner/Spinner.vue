<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import type { SpinnerProps, SpinnerSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SpinnerProps>(), {
  loading: true,
  ui: undefined,
})
defineSlots<SpinnerSlots>()

const attrs = useAttrs()
const { t } = useI18n()

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const loadingUI = normalizeHTMLAttributes(props.ui?.loading)
  const iconUI = normalizeHTMLAttributes(props.ui?.icon)
  const contentUI = normalizeHTMLAttributes(props.ui?.content)

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
      ...iconUI,
      name: 'spinner' as const,
      class: cn('animate-spin', iconUI.class),
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
      <slot name="loading">
        <Icon v-bind="calculatedUI.icon" />
      </slot>
    </div>

    <div v-show="!props.loading" v-bind="calculatedUI.content" data-slot="spinner-content">
      <slot />
    </div>
  </div>
</template>
