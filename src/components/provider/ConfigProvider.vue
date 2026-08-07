<script setup lang="ts">
import { useTextDirection } from '@vueuse/core'
import { ConfigProvider as RekaConfigProvider } from 'reka-ui'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getTextDirection } from '@/i18n'

const { locale } = useI18n({ useScope: 'global' })
const dir = useTextDirection({
  initialValue: getTextDirection(locale.value),
})

watch(
  locale,
  (value) => {
    dir.value = getTextDirection(value)

    if (typeof document !== 'undefined') {
      document.documentElement.lang = value
    }
  },
  { immediate: true },
)
</script>

<template>
  <RekaConfigProvider :dir="dir">
    <slot />
  </RekaConfigProvider>
</template>
