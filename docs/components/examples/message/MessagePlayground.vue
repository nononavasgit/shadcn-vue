<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentPlayground from '../../ComponentPlayground.vue'
import { computed, ref } from 'vue'

const state = ref({
  align: 'start',
  variant: 'soft',
  severity: 'secondary',
  sideReaction: 'bottom',
  alignReaction: 'end',
})
const bubble = computed(() => ({ ...state.value }))

const playgroundCode = computed(
  () => `<Message :bubble="${JSON.stringify(state.value)}">
  Mensaje de ejemplo
  <template #reaction>👍</template>
  <template #footer>Hace un momento</template>
</Message>`,
)
</script>

<template>
  <ComponentPlayground
    filename="MessagePlayground.vue"
    description="Prueba los slots default, reaction y footer de Message."
    :code="playgroundCode"
  >
    <template #preview>
      <div class="grid min-h-48 place-items-center p-8">
        <Message class="w-full max-w-md" :bubble="bubble">
          Mensaje de ejemplo
          <template #reaction>👍</template>
          <template #footer>
            <span class="mt-2 block text-xs text-muted-foreground">Hace un momento</span>
          </template>
        </Message>
      </div>
    </template>
    <template #controls>
      <div class="grid gap-4">
        <h3 class="text-sm font-semibold">Bubble</h3>
        <label class="grid gap-1 text-xs"
          >Align
          <select v-model="state.align" class="rounded-md border bg-background px-2 py-2 text-sm">
            <option value="start">start</option>
            <option value="end">end</option>
          </select></label
        >
        <label class="grid gap-1 text-xs"
          >Variant
          <select v-model="state.variant" class="rounded-md border bg-background px-2 py-2 text-sm">
            <option
              v-for="value in ['solid', 'outline', 'plain', 'subtle', 'soft', 'muted']"
              :key="value"
              :value="value"
            >
              {{ value }}
            </option>
          </select></label
        >
        <label class="grid gap-1 text-xs"
          >Severity
          <select
            v-model="state.severity"
            class="rounded-md border bg-background px-2 py-2 text-sm"
          >
            <option
              v-for="value in ['primary', 'secondary', 'warning', 'success', 'error']"
              :key="value"
              :value="value"
            >
              {{ value }}
            </option>
          </select></label
        >
        <label class="grid gap-1 text-xs"
          >Side reaction
          <select
            v-model="state.sideReaction"
            class="rounded-md border bg-background px-2 py-2 text-sm"
          >
            <option value="top">top</option>
            <option value="bottom">bottom</option>
          </select></label
        >
        <label class="grid gap-1 text-xs"
          >Align reaction
          <select
            v-model="state.alignReaction"
            class="rounded-md border bg-background px-2 py-2 text-sm"
          >
            <option value="start">start</option>
            <option value="end">end</option>
          </select></label
        >
      </div>
    </template>
  </ComponentPlayground>
</template>
