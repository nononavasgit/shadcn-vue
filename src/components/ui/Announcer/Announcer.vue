<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { Announcer as AnnouncerBase } from '@/components/primitives/Announcer'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useAnnouncer } from '@/composables/useAnnouncer'
import { cn } from '@/lib/utils'
import type { AnnouncerProps, AnnouncerSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AnnouncerProps>(), {
  atomic: true,
  politeness: 'polite',
  ui: undefined,
})
defineSlots<AnnouncerSlots>()

const attrs = useAttrs()
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
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)

  return {
    root: {
      ...attrs,
      ...rootUI,
      'aria-atomic': props.atomic,
      'aria-live': ariaLive.value,
      role: role.value,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
  }
})

defineExpose({ message, politeness, set, polite, assertive })
</script>

<template>
  <AnnouncerBase v-bind="calculatedUI.root">
    <slot :message="message">{{ message }}</slot>
  </AnnouncerBase>
</template>
