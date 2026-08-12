import type { HTMLAttributes } from 'vue'
import type {
  AvatarRootProps as RekaAvatarProps,
  AvatarImageProps as RekaAvatarImageProps,
  AvatarFallbackProps as RekaAvatarFallbackProps,
} from 'reka-ui'
import type { NormalizeIconProps } from '@/components/ui/Icon'

export { default as Avatar } from './Avatar.vue'

// Types
export type AvatarLoadingState = boolean

// Props Reka
export type AvatarRootProps = Pick<RekaAvatarProps, 'as' | 'asChild'>
export type AvatarImageProps = Pick<
  RekaAvatarImageProps,
  'as' | 'asChild' | 'crossOrigin' | 'referrerPolicy'
>
export type AvatarFallbackProps = Pick<RekaAvatarFallbackProps, 'as' | 'asChild'>

// Props
export interface AvatarProps extends AvatarRootProps {
  delayMs?: number
  src?: string
  alt?: string
  icon?: NormalizeIconProps
  label?: string
  image?: AvatarImageProps
  fallback?: AvatarFallbackProps
  ui?: AvatarUI
}

// Fn
export type AvatarFn<T> = (context: AvatarContext) => T

// UI
export interface AvatarUI {
  root?: AvatarFn<HTMLAttributes>
  image?: AvatarFn<HTMLAttributes>
  fallback?: AvatarFn<HTMLAttributes>
}

export interface AvatarEmits {
  loadingStateChange: [value: AvatarLoadingState]
}

// Context
export interface AvatarContext {
  props: Omit<AvatarProps, 'ui'>
}

// Slots
export interface AvatarSlots {
  fallback?(props: AvatarContext): unknown
}
