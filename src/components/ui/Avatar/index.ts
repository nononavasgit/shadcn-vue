import type { HTMLAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/ui/Icon'

export { default as Avatar } from './Avatar.vue'

export type AvatarLoadingState = boolean

export interface AvatarUI {
  root?: HTMLAttributes
  image?: HTMLAttributes
  fallback?: HTMLAttributes
  icon?: HTMLAttributes
}

export interface AvatarProps {
  src?: string
  alt?: string
  icon?: IconName | IconProps
  label?: string
  ui?: AvatarUI
}

export interface AvatarEmits {
  loadingStateChange: [value: AvatarLoadingState]
}

export interface AvatarSlots {
  fallback?(): unknown
}
