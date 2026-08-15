<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { cn } from '@/lib/utils'
import {
  createAnnouncerContext,
  type AnnouncerContext,
  type AnnouncerProps,
  type AnnouncerSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AnnouncerProps>(), {
  atomic: true,
  message: '',
  politeness: 'polite',
})
defineSlots<AnnouncerSlots>()

const attrs = useAttrs()
const slots = useSlots()
const hasDefaultSlot = computed(() => Boolean(slots.default))

const announcerContext = computed<AnnouncerContext>(() => {
  return createAnnouncerContext(props)
})

const ariaLive = computed(() => props.politeness)
const role = computed(() => {
  if (props.politeness === 'assertive') return 'alert'
  if (props.politeness === 'polite') return 'status'
  return undefined
})
const rootProps = computed(() => {
  return {
    ...attrs,
    'aria-atomic': props.atomic,
    'aria-live': ariaLive.value,
    role: role.value,
    class: cn(!hasDefaultSlot.value && 'sr-only', attrs.class),
    style: [attrs.style],
  }
})
</script>

<template>
  <span v-bind="rootProps" data-test-announcer-root>
    <slot v-bind="announcerContext">{{ props.message }}</slot>
  </span>
</template>
