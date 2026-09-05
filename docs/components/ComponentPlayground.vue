<script setup lang="ts">
import { Check, Clipboard, Play, RotateCcw } from '@lucide/vue'
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    code: string
    appliedCode?: string
    error?: string
    filename?: string
    title?: string
    description?: string
  }>(),
  {
    appliedCode: '',
    error: '',
    filename: 'Playground.vue',
    title: 'Playground',
    description: 'Configura el componente o edita directamente su template.',
  },
)

const emit = defineEmits<{
  'update:code': [value: string]
  apply: []
  reset: []
}>()

const copied = ref(false)
const editableCode = computed({
  get: () => props.code,
  set: (value: string) => emit('update:code', value),
})

async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  window.setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <section class="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
    <header class="flex flex-wrap items-center justify-between gap-3 border-b p-5">
      <div>
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <p class="text-sm text-muted-foreground">{{ description }}</p>
      </div>
      <button
        class="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
        @click="emit('reset')"
      >
        <RotateCcw class="size-4" /> Restablecer
      </button>
    </header>

    <div class="grid min-h-150 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div
        class="relative min-h-100 overflow-hidden border-b bg-muted/20 p-8 lg:border-r lg:border-b-0"
      >
        <slot name="preview" />
      </div>
      <aside class="max-h-150 overflow-y-auto p-4">
        <slot name="controls" />
      </aside>
    </div>

    <div class="border-t bg-[#0d1117] text-[#e6edf3]">
      <div
        class="flex items-center justify-between border-b border-white/10 bg-[#161b22] px-4 py-2"
      >
        <div class="flex items-center gap-3 text-xs">
          <span class="text-[#ff7b72]">●</span><span>{{ filename }}</span
          ><span v-if="appliedCode !== code" class="text-[#d29922]">Sin aplicar</span>
        </div>
        <div class="flex gap-2">
          <button
            class="inline-flex items-center gap-1 rounded px-2 py-1 text-xs hover:bg-white/10"
            @click="copyCode"
          >
            <Check v-if="copied" class="size-3" /><Clipboard v-else class="size-3" />
            {{ copied ? 'Copiado' : 'Copiar' }}
          </button>
          <button
            class="inline-flex items-center gap-1 rounded bg-[#238636] px-3 py-1 text-xs text-white hover:bg-[#2ea043]"
            @click="emit('apply')"
          >
            <Play class="size-3" /> Aplicar código
          </button>
        </div>
      </div>
      <div class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 w-12 border-r border-white/10 bg-[#0d1117] py-4 text-right font-mono text-xs leading-6 text-[#6e7681]"
        >
          <div v-for="line in code.split('\n').length" :key="line" class="pr-3">{{ line }}</div>
        </div>
        <textarea
          v-model="editableCode"
          spellcheck="false"
          aria-label="Código editable del playground"
          class="min-h-90 w-full resize-y bg-transparent py-4 pr-4 pl-16 font-mono text-sm leading-6 text-[#e6edf3] outline-none"
        />
      </div>
      <p
        v-if="error"
        class="border-t border-[#f85149]/40 bg-[#f85149]/10 px-4 py-3 font-mono text-xs text-[#ff7b72]"
      >
        {{ error }}
      </p>
    </div>
  </section>
</template>
