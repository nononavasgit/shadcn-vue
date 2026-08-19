<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { useNormalizeIconProps } from '@/composables/useNormalizeIconProps'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import type { LoadingContext, LoadingProps, LoadingSlots } from '.'
import { loadingDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LoadingProps>(), loadingDefaults)
defineSlots<LoadingSlots>()

const attrs = useAttrs()
const { t } = useI18n()

const loadingContext = computed<LoadingContext>(() => ({
  loading: props.loading,
}))

const rootProps = computed(() => ({
  ...attrs,
  role: 'status',
  'aria-busy': props.loading,
  'aria-label': attrs['aria-label'] ?? t('loading'),
  class: cn('w-full', attrs.class),
  style: attrs.style,
}))

const loadingProps = computed(() => {
  const loadingUI = useUi(props.ui?.loading, loadingContext.value)

  return {
    ...loadingUI,
    class: cn('flex w-full items-center justify-center', loadingUI.class),
  }
})

const iconProps = computed(() => ({
  ...useNormalizeIconProps(props.icon),
  class: 'animate-spin',
}))

const contentProps = computed(() => {
  const contentUI = useUi(props.ui?.content, loadingContext.value)

  return {
    ...contentUI,
    class: cn('w-full', contentUI.class),
  }
})
</script>

<template>
  <div v-bind="rootProps" data-slot="loading" data-test-loading-root>
    <div
      v-show="props.loading"
      v-bind="loadingProps"
      data-slot="loading-loading"
      data-test-loading-loading
    >
      <slot name="loading" v-bind="loadingContext">
        <Icon
          v-if="iconProps.name"
          v-bind="iconProps"
          :name="iconProps.name"
          data-test-loading-icon
        />
      </slot>
    </div>

    <div
      v-show="!props.loading"
      v-bind="contentProps"
      data-slot="loading-content"
      data-test-loading-content
    >
      <slot v-bind="loadingContext" />
    </div>
  </div>
</template>
