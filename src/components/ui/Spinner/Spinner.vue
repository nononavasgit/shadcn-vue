<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useUi } from '@/composables/useUi'
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

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useUi(props.ui?.root, spinnerContext.value))

  return {
    ...attrs,
    ...rootUI,
    role: 'status',
    'aria-busy': props.loading,
    'aria-label': rootUI['aria-label'] ?? attrs['aria-label'] ?? t('loading'),
    class: cn('w-full', attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})

const loadingProps = computed(() => {
  const loadingUI = normalizeHTMLAttributes(useUi(props.ui?.loading, spinnerContext.value))

  return {
    ...loadingUI,
    class: cn('flex w-full items-center justify-center', loadingUI.class),
  }
})

const iconProps = computed(() => ({
  ...normalizeIconProps(props.icon),
  class: 'animate-spin',
}))

const contentProps = computed(() => {
  const contentUI = normalizeHTMLAttributes(useUi(props.ui?.content, spinnerContext.value))

  return {
    ...contentUI,
    class: cn('w-full', contentUI.class),
  }
})
</script>

<template>
  <div v-bind="rootProps" data-slot="spinner">
    <div v-show="props.loading" v-bind="loadingProps" data-slot="spinner-loading">
      <slot name="loading" v-bind="spinnerContext">
        <Icon v-if="iconProps.name" v-bind="iconProps" :name="iconProps.name" />
      </slot>
    </div>

    <div v-show="!props.loading" v-bind="contentProps" data-slot="spinner-content">
      <slot v-bind="spinnerContext" />
    </div>
  </div>
</template>
