<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Message } from '@/components/ui/Message'
import ComponentPlayground from '../../ComponentPlayground.vue'
import { computed } from 'vue'

const state = ref({
  messageAlign: 'start',
  message: 'Mensaje de ejemplo',
  variant: 'soft',
  severity: 'secondary',
  sideReaction: 'bottom',
  alignReaction: 'end',
})
const bubbleCode = computed(
  () =>
    `{ variant: '${state.value.variant}', severity: '${state.value.severity}', sideReaction: '${state.value.sideReaction}', alignReaction: '${state.value.alignReaction}' }`,
)

const playgroundCode = computed(
  () => `<Message align="${state.value.messageAlign}" message="${state.value.message}" :avatar="{ label: 'AL', size: 'sm' }" :bubble="${bubbleCode.value}">
  <template #header>Asistente</template>
  <template #reaction>👍</template>
  <template #footer>Hace un momento</template>
</Message>`,
)
const editorCode = ref(playgroundCode.value)
const appliedCode = ref(playgroundCode.value)
const editorError = ref('')
const Preview = shallowRef()

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(editorCode.value)
    Preview.value = markRaw(
      defineComponent({ name: 'MessagePlaygroundPreview', components: { Message }, render }),
    )
    appliedCode.value = editorCode.value
  } catch (error) {
    editorError.value = error instanceof Error ? error.message : String(error)
  }
}

function reset() {
  state.value = {
    messageAlign: 'start',
    message: 'Mensaje de ejemplo',
    variant: 'soft',
    severity: 'secondary',
    sideReaction: 'bottom',
    alignReaction: 'end',
  }
  editorCode.value = playgroundCode.value
  applyCode()
}

watch(
  playgroundCode,
  (value) => {
    editorCode.value = value
    applyCode()
  },
  { immediate: true },
)
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    filename="MessagePlayground.vue"
    description="Prueba los slots default, reaction y footer de Message."
    :applied-code="appliedCode"
    :error="editorError"
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-48 place-items-center p-8">
        <component :is="Preview" v-if="Preview" />
      </div>
    </template>
    <template #controls>
      <div class="grid gap-4">
        <h3 class="text-sm font-semibold">Message / Bubble</h3>
        <label class="grid gap-1 text-xs"
          >Message
          <input
            v-model="state.message"
            class="rounded-md border bg-background px-3 py-2 text-sm"
          />
        </label>
        <label class="grid gap-1 text-xs"
          >Message align
          <select
            v-model="state.messageAlign"
            class="rounded-md border bg-background px-2 py-2 text-sm"
          >
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
