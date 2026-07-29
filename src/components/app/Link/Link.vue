<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { Button } from '@/components/app/Button'
import type { LinkEmits, LinkProps, LinkSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'a',
  variant: 'link',
  to: undefined,
})
const emit = defineEmits<LinkEmits>()
defineSlots<LinkSlots>()

const attrs = useAttrs()
const slots = useSlots()
const calculatedProps = computed(() => {
  const { to, ...buttonProps } = props
  const destination =
    to === undefined ? {} : props.as === 'a' ? (typeof to === 'string' ? { href: to } : {}) : { to }

  return {
    ...attrs,
    ...buttonProps,
    ...destination,
  }
})
</script>

<template>
  <Button v-bind="calculatedProps" @click="emit('click', $event)">
    <template v-for="(_, slotName) in slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </Button>
</template>
