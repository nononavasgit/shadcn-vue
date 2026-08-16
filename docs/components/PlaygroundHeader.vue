<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'
import { useI18n, type SupportedLocale } from '@/i18n'

const props = defineProps<{ dark: boolean }>()
const emit = defineEmits<{ 'update:dark': [value: boolean] }>()
const { locale } = useI18n()

const locales: Array<{ value: SupportedLocale; label: string }> = [
  { value: 'es', label: 'Espanol' },
  { value: 'en', label: 'English' },
  { value: 'pt-BR', label: 'Portugues (BR)' },
  { value: 'pt-PT', label: 'Portugues (PT)' },
  { value: 'ar', label: 'العربية' },
]
</script>

<template>
  <header class="flex justify-end gap-2 border-b pb-4">
    <label class="sr-only" for="playground-language">Idioma</label>
    <select
      id="playground-language"
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
      :aria-label="props.dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
      :title="props.dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
      @click="emit('update:dark', !props.dark)"
    >
      <Sun v-if="props.dark" class="size-4" aria-hidden="true" />
      <Moon v-else class="size-4" aria-hidden="true" />
    </button>
  </header>
</template>
