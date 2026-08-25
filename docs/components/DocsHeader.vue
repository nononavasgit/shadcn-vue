<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n, type SupportedLocale } from '@/i18n'

const { locale } = useI18n()
const storedTheme = localStorage.getItem('docs-theme')
const isDark = ref(
  storedTheme === 'dark' ||
    (storedTheme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches),
)

const locales: Array<{ value: SupportedLocale; label: string }> = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'pt-BR', label: 'Português (BR)' },
  { value: 'pt-PT', label: 'Português (PT)' },
  { value: 'ar', label: 'العربية' },
]

watch(
  isDark,
  (value) => {
    document.documentElement.classList.toggle('dark', value)
    localStorage.setItem('docs-theme', value ? 'dark' : 'light')
  },
  { immediate: true },
)
</script>

<template>
  <header class="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
    <RouterLink to="/" class="text-sm font-semibold tracking-tight">Componentes</RouterLink>

    <div class="flex items-center gap-2">
      <label class="sr-only" for="docs-language">Idioma</label>
      <select
        id="docs-language"
        v-model="locale"
        class="h-9 rounded-md border bg-background px-2 text-sm text-foreground"
      >
        <option v-for="item in locales" :key="item.value" :value="item.value">
          {{ item.label }}
        </option>
      </select>

      <button
        type="button"
        class="inline-flex size-9 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
        :title="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
        @click="isDark = !isDark"
      >
        <Sun v-if="isDark" class="size-4" aria-hidden="true" />
        <Moon v-else class="size-4" aria-hidden="true" />
      </button>
    </div>
  </header>
</template>
