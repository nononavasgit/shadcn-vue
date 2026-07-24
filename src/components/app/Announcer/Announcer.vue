<script setup lang="ts">
import { computed, watch } from 'vue'
import { Announcer as AnnouncerBase } from '@/components/ui/Announcer'
import { useAnnouncer } from '@/composables/useAnnouncer'
import type { AnnouncerProps, AnnouncerSlotProps } from '.'

defineSlots<{
  default?(props: AnnouncerSlotProps): unknown
}>()

const props = withDefaults(defineProps<AnnouncerProps>(), {
  atomic: true,
  politeness: 'polite',
})
const { message, politeness, set, polite, assertive } = useAnnouncer({
  politeness: props.politeness,
})

watch(
  () => props.politeness,
  (value) => {
    politeness.value = value
  },
)

const role = computed(() => {
  if (politeness.value === 'assertive') return 'alert'
  if (politeness.value === 'polite') return 'status'
  return undefined
})

defineExpose({ message, politeness, set, polite, assertive })
</script>

<template>
  <AnnouncerBase :aria-atomic="props.atomic" :aria-live="politeness" :role="role">
    <slot :message="message">{{ message }}</slot>
  </AnnouncerBase>
</template>
