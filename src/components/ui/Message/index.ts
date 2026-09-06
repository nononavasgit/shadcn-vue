import type { BubbleProps } from '@/components/ui/Bubble'

export { default as Message } from './Message.vue'

export type BubbleConfig = BubbleProps

export interface MessageProps {
  bubble?: BubbleConfig
}

export interface MessageSlots {
  header?(): unknown
  default?(): unknown
  reaction?(): unknown
  footer?(): unknown
}
