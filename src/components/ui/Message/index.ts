import type { BubbleAlign, BubbleProps } from '@/components/ui/Bubble'

export { default as Message } from './Message.vue'

export type BubbleConfig = BubbleProps

export type MessageAlign = BubbleAlign

export interface MessageProps {
  align?: MessageAlign
  bubble?: BubbleConfig
}

export interface MessageSlots {
  header?(): unknown
  default?(): unknown
  reaction?(): unknown
  footer?(): unknown
}
