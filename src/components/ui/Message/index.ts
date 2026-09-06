import type { BubbleAlign, BubbleProps } from '@/components/ui/Bubble'
import type { AvatarProps } from '@/components/ui/Avatar'
import type { HTMLAttributes } from 'vue'

export { default as Message } from './Message.vue'

export type BubbleConfig = BubbleProps
export type AvatarConfig = AvatarProps

export type MessageAlign = BubbleAlign
export type MessageFn<T> = () => T

export interface MessageUI {
  header?: MessageFn<HTMLAttributes>
  footer?: MessageFn<HTMLAttributes>
}

export interface MessageProps {
  align?: MessageAlign
  avatar?: AvatarConfig
  bubble?: BubbleConfig
  message?: string
  ui?: MessageUI
}

export interface MessageSlots {
  avatar?(): unknown
  header?(): unknown
  default?(): unknown
  reaction?(): unknown
  footer?(): unknown
}
