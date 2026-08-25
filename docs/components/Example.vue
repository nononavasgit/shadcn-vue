<script setup lang="ts">
import { Check, Clipboard } from '@lucide/vue'
import { ref } from 'vue'

const props = defineProps<{
  title: string
  description?: string
  code: string
}>()

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <article class="overflow-hidden rounded-lg border">
    <div class="grid gap-1 border-b p-4">
      <h3 class="font-medium">{{ title }}</h3>
      <p v-if="description" class="text-sm text-muted-foreground">{{ description }}</p>
    </div>

    <div class="grid min-h-32 place-items-center p-6">
      <slot />
    </div>

    <div class="relative border-t bg-muted/40">
      <button
        type="button"
        class="absolute top-2 right-2 inline-flex size-8 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-accent"
        :aria-label="copied ? 'Código copiado' : 'Copiar código'"
        :title="copied ? 'Copiado' : 'Copiar código'"
        @click="copyCode"
      >
        <Check v-if="copied" class="size-4" aria-hidden="true" />
        <Clipboard v-else class="size-4" aria-hidden="true" />
      </button>
      <pre class="overflow-x-auto p-4 pr-12 text-sm"><code>{{ code }}</code></pre>
    </div>
  </article>
</template>
