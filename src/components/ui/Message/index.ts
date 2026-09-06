import type { BubbleAlign, BubbleProps } from '@/components/ui/Bubble'
import type { AvatarProps } from '@/components/ui/Avatar'

export { default as Message } from './Message.vue'

export type BubbleConfig = BubbleProps
export type AvatarConfig = AvatarProps

export type MessageAlign = BubbleAlign

export interface MessageProps {
  align?: MessageAlign
  avatar?: AvatarConfig
  bubble?: BubbleConfig
}

export interface MessageSlots {
  avatar?(): unknown
  header?(): unknown
  default?(): unknown
  reaction?(): unknown
  footer?(): unknown
}
