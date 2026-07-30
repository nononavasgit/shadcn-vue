<script setup lang="ts">
import { computed, watch } from 'vue'
import { Announcer as AnnouncerBase } from '@/components/primitives/Announcer'
import { useAnnouncer } from '@/composables/useAnnouncer'
import type { AnnouncerProps, AnnouncerSlots } from '.'

const props = withDefaults(defineProps<AnnouncerProps>(), {
  atomic: true,
  politeness: 'polite',
})
defineSlots<AnnouncerSlots>()

const { message, politeness, set, polite, assertive } = useAnnouncer({
  politeness: props.politeness,
})

watch(
  () => props.politeness,
  (value) => {
    politeness.value = value
  },
)

const ariaLive = computed(() => politeness.value)
const role = computed(() => {
  if (politeness.value === 'assertive') return 'alert'
  if (politeness.value === 'polite') return 'status'
  return undefined
})

defineExpose({ message, politeness, set, polite, assertive })
</script>

<template>
  <AnnouncerBase :aria-atomic="props.atomic" :aria-live="ariaLive" :role="role">
    <slot :message="message">{{ message }}</slot>
  </AnnouncerBase>
</template>
