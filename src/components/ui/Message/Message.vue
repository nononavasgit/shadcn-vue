<script setup lang="ts">
import { Bubble } from '@/components/ui/Bubble'
import type { MessageProps, MessageSlots } from '.'
import { messageDefaults } from './defaults'

const props = withDefaults(defineProps<MessageProps>(), messageDefaults)
defineSlots<MessageSlots>()
</script>

<template>
  <div>
    <slot name="header" />
    <Bubble v-bind="props.bubble">
      <slot />
      <template v-if="$slots.reaction" #reactions>
        <slot name="reaction" />
      </template>
    </Bubble>
    <slot name="footer" />
  </div>
</template>
