<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

interface TypePart {
  text: string
  link?: string
}

const props = withDefaults(
  defineProps<{
    type: string
    typeParts?: TypePart[]
    block?: boolean
  }>(),
  {
    typeParts: undefined,
    block: false,
  },
)

const parts = computed(() => props.typeParts ?? [{ text: props.type }])

function formatPart(text: string) {
  if (!props.block) return [{ text }]

  return text
    .replace(/\{\s*/g, '{\n  ')
    .replace(/;\s*/g, ';\n  ')
    .replace(/\s*}/g, '\n}')
    .split('\n')
    .map((line) => ({ text: line }))
}
</script>

<template>
  <component
    :is="block ? 'pre' : 'code'"
    class="rounded bg-muted px-1.5 py-0.5 text-xs"
    :class="block ? 'block overflow-x-auto text-left leading-relaxed' : undefined"
  >
    <template v-for="(part, partIndex) in parts" :key="partIndex">
      <template v-for="(line, lineIndex) in formatPart(part.text)" :key="lineIndex">
        <a v-if="part.link?.startsWith('#')" :href="part.link" class="text-primary hover:underline">
          {{ line.text }}
        </a>
        <RouterLink v-else-if="part.link" :to="part.link" class="text-primary hover:underline">
          {{ line.text }}
        </RouterLink>
        <template v-else>{{ line.text }}</template>
        <br v-if="block && lineIndex < formatPart(part.text).length - 1" />
      </template>
    </template>
  </component>
</template>
