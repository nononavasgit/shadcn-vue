<script setup lang="ts">
import Autocomplete from '@/components/ui/Autocomplete/Autocomplete.vue'
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <h2 class="text-xl font-semibold">Playground</h2>
    <div class="grid min-h-80 place-items-center"><Autocomplete /></div>
  </section>
</template>
