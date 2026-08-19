<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView } from 'vue-router'

import { Input } from '@/components/ui/Input'

const floatingValue = ref('')
const floatingLabelActive = computed(() => Boolean(floatingValue.value))
</script>

<template>
  <RouterView />

  <section class="mx-auto grid w-full max-w-3xl gap-4 px-6 py-10">
    <div>
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Prueba</p>
      <h2 class="text-xl font-semibold">Input con floating label</h2>
      <p class="text-sm text-muted-foreground">
        El label sube al enfocar el campo o cuando ya tiene contenido.
      </p>
    </div>

    <div class="group relative max-w-sm">
      <Input id="floating-label-input" v-model:value="floatingValue" class="h-12" />

      <label
        for="floating-label-input"
        class="pointer-events-none absolute start-3 top-1/2 z-10 -translate-y-1/2 bg-transparent text-sm text-muted-foreground transition-all duration-200 group-focus-within:top-0 group-focus-within:bg-background group-focus-within:px-1 group-focus-within:text-xs group-focus-within:text-foreground"
        :class="floatingLabelActive && 'top-0 bg-background px-1 text-xs text-foreground'"
      >
        Nombre
      </label>
    </div>

    <p class="text-sm text-muted-foreground">
      Valor: <span class="font-medium text-foreground">{{ floatingValue || 'vacío' }}</span>
    </p>
  </section>
</template>
