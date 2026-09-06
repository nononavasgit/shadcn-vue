<script setup lang="ts">
import { computed } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Bubble } from '@/components/ui/Bubble'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { MessageProps, MessageSlots } from '.'
import { messageDefaults } from './defaults'

const props = withDefaults(defineProps<MessageProps>(), messageDefaults)
defineSlots<MessageSlots>()

const bubbleProps = computed(() => ({ ...props.bubble, align: props.align }))
const headerProps = computed(() => {
  const ui = useUi(props.ui?.header, undefined)
  return { ...ui, class: cn('mb-2', ui.class) }
})
const footerProps = computed(() => {
  const ui = useUi(props.ui?.footer, undefined)
  return { ...ui, class: cn('mt-2', ui.class) }
})
</script>

<template>
  <div :class="props.align === 'end' ? 'justify-end' : 'justify-start'" class="flex w-full">
    <div class="flex flex-col">
      <div v-if="$slots.header" v-bind="headerProps">
        <slot name="header" />
      </div>
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
            <slot>{{ props.message }}</slot>
            <template v-if="$slots.reaction" #reactions>
              <slot name="reaction" />
            </template>
          </Bubble>
          <div v-if="$slots.footer" v-bind="footerProps">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
