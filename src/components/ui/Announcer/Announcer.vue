<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { useAnnouncer } from '@/composables/useAnnouncer'
import { cn } from '@/lib/utils'
import type { AnnouncerContext, AnnouncerProps, AnnouncerSlots } from '.'

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

const announcerContext = computed<AnnouncerContext>(() => {
  const { ui, ...announcerProps } = props
  void ui

  return {
    props: announcerProps,
    message: message.value,
  }
})

const ariaLive = computed(() => politeness.value)
const role = computed(() => {
  if (politeness.value === 'assertive') return 'alert'
  if (politeness.value === 'polite') return 'status'
  return undefined
})
const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, announcerContext.value))

  return {
    ...attrs,
    ...rootUI,
    'aria-atomic': props.atomic,
    'aria-live': ariaLive.value,
    role: role.value,
    class: cn('sr-only', attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})

defineExpose({ message, politeness, set, polite, assertive })
</script>

<template>
  <span v-bind="rootProps" data-slot="announcer">
    <slot v-bind="announcerContext">{{ message }}</slot>
  </span>
</template>
