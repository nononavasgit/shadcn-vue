<script setup lang="ts">
import { ConfigProvider as RekaConfigProvider, useDirection } from 'reka-ui'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getTextDirection } from '@/i18n'

const { locale } = useI18n({ useScope: 'global' })
const localeDirection = computed(() => getTextDirection(locale.value))
const dir = useDirection(localeDirection)

watch(
  locale,
  (value) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = value
      document.documentElement.dir = getTextDirection(value)
    }
  },
  { immediate: true },
)
</script>

<template>
  <RekaConfigProvider :dir="dir" :locale="locale">
    <slot />
  </RekaConfigProvider>
</template>
