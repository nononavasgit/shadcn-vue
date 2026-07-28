import type { HTMLAttributes, ImgHTMLAttributes, SVGAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/app/Icon'

export { default as Avatar } from './Avatar.vue'

export type AvatarLoadingState = boolean

export interface AvatarUI {
  root?: HTMLAttributes
  image?: ImgHTMLAttributes
  fallback?: HTMLAttributes
  icon?: IconProps & SVGAttributes
}

export interface AvatarProps {
  src?: string
  alt?: string
  icon?: IconName | (IconProps & SVGAttributes)
  title?: string
  ui?: AvatarUI
}

export interface AvatarEmits {
  loadingStateChange: [value: AvatarLoadingState]
}

export interface AvatarSlots {
  fallback?(): unknown
}
