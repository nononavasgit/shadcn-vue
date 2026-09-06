<script setup lang="ts">
import { computed } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Bubble } from '@/components/ui/Bubble'
import type { MessageProps, MessageSlots } from '.'
import { messageDefaults } from './defaults'

const props = withDefaults(defineProps<MessageProps>(), messageDefaults)
defineSlots<MessageSlots>()

const bubbleProps = computed(() => ({ ...props.bubble, align: props.align }))
</script>

<template>
  <div :class="props.align === 'end' ? 'justify-end' : 'justify-start'" class="flex w-full">
    <div class="flex flex-col">
      <slot name="header" />
      <div class="flex items-start gap-2">
        <div
          v-if="$slots.avatar || props.avatar"
          :class="props.align === 'end' ? 'order-2' : 'order-1'"
        >
          <slot name="avatar">
            <Avatar v-bind="props.avatar" />
          </slot>
        </div>
        <div :class="props.align === 'end' ? 'order-1' : 'order-2'" class="flex flex-col">
          <Bubble v-bind="bubbleProps">
            <slot />
            <template v-if="$slots.reaction" #reactions>
              <slot name="reaction" />
            </template>
          </Bubble>
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
