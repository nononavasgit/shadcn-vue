<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import type { SpinnerProps, SpinnerSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SpinnerProps>(), {
  loading: true,
})
defineSlots<SpinnerSlots>()

const attrs = useAttrs()
const { t } = useI18n()

const root = computed(() => ({
  ...attrs,
  role: 'status',
  'aria-busy': props.loading,
  'aria-label': attrs['aria-label'] ?? t('loading'),
  class: cn('w-full', attrs.class),
}))
</script>

<template>
  <div v-bind="root" data-slot="spinner">
    <div
      v-show="props.loading"
      data-slot="spinner-loading"
      class="flex w-full items-center justify-center"
    >
      <slot name="loading">
        <Icon name="spinner" class="animate-spin" />
      </slot>
    </div>

    <div v-show="!props.loading" data-slot="spinner-content" class="w-full">
      <slot />
    </div>
  </div>
</template>
