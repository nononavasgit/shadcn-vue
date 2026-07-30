import type { HTMLAttributes, ImgHTMLAttributes } from 'vue'
import type { NormalizeIconProps, NormalizedIconProps } from '@/components/ui/Icon'

export { default as Avatar } from './Avatar.vue'

export type AvatarLoadingState = boolean

export interface AvatarUI {
  root?: HTMLAttributes
  image?: ImgHTMLAttributes
  fallback?: HTMLAttributes
  icon?: NormalizedIconProps
}

export interface AvatarProps {
  src?: string
  alt?: string
  icon?: NormalizeIconProps
  title?: string
  ui?: AvatarUI
}

export interface AvatarEmits {
  loadingStateChange: [value: AvatarLoadingState]
}

export interface AvatarSlots {
  fallback?(): unknown
}
