import type { HTMLAttributes, ImgHTMLAttributes, SVGAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/app/Icon'

export { default as Avatar } from './Avatar.vue'

export type AvatarLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'
export type AvatarIcon = IconName | (IconProps & SVGAttributes)
export type AvatarIconUI = IconProps & SVGAttributes

export interface AvatarUI {
  root?: HTMLAttributes
  image?: ImgHTMLAttributes
  fallback?: HTMLAttributes
  icon?: AvatarIconUI
}

export interface AvatarProps {
  src?: string
  alt?: string
  icon?: AvatarIcon
  label?: string
  ui?: AvatarUI
}

export interface AvatarEmits {
  loadingStatusChange: [value: AvatarLoadingStatus]
}

export interface AvatarSlotProps {
  src?: string
  alt?: string
  icon?: AvatarIcon
  label?: string
}
