import type { SVGAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/app/Icon'

export { default as Avatar } from './Avatar.vue'

export type AvatarLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'
export type AvatarIcon = IconName | (IconProps & SVGAttributes)

export interface AvatarProps {
  src?: string
  alt?: string
  icon?: AvatarIcon
  label?: string
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
