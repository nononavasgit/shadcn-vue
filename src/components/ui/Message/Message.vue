<script setup lang="ts">
import { computed } from 'vue'
import { Bubble } from '@/components/ui/Bubble'
import type { MessageProps, MessageSlots } from '.'
import { messageDefaults } from './defaults'

const props = withDefaults(defineProps<MessageProps>(), messageDefaults)
defineSlots<MessageSlots>()

const bubbleProps = computed(() => ({ ...props.bubble, align: props.align }))
</script>

<template>
  <div :class="props.align === 'end' ? 'items-end' : 'items-start'" class="flex flex-col">
    <slot name="header" />
    <Bubble v-bind="bubbleProps">
      <slot />
      <template v-if="$slots.reaction" #reactions>
        <slot name="reaction" />
      </template>
    </Bubble>
    <slot name="footer" />
  </div>
</template>
