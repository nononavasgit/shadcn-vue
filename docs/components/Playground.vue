<script setup lang="ts">
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
import { onMounted, ref, watch } from 'vue'
import PlaygroundHeader from './PlaygroundHeader.vue'

const isDark = ref(false)

onMounted(() => {
  document.documentElement.classList.remove('dark')

  const storedTheme = localStorage.getItem('docs-theme')

  if (storedTheme === 'dark' || storedTheme === 'light') {
    isDark.value = storedTheme === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
})

watch(isDark, (value) => {
  localStorage.setItem('docs-theme', value ? 'dark' : 'light')
})
</script>

<template>
  <div :class="['mb-4 h-full w-full rounded-lg p-4']">
    <PlaygroundHeader v-model:dark="isDark" />

    <ConfigProvider>
      <div
        :class="[
          'flex h-full flex-wrap content-center justify-center bg-background text-foreground',
          { dark: isDark },
        ]"
      >
        <slot />
      </div>
    </ConfigProvider>
  </div>
</template>
