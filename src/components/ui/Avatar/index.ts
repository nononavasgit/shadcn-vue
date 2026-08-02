import type { HTMLAttributes } from 'vue'
import type {
  AvatarRootProps as RekaAvatarProps,
  AvatarImageProps as RekaAvatarImageProps,
  AvatarFallbackProps as RekaAvatarFallbackProps,
} from 'reka-ui'
import type { IconName, IconProps } from '@/components/ui/Icon'

export { default as Avatar } from './Avatar.vue'

export type AvatarLoadingState = boolean

export type AvatarRootProps = Pick<RekaAvatarProps, 'as' | 'asChild'>
export type AvatarImageProps = Pick<
  RekaAvatarImageProps,
  'as' | 'asChild' | 'crossOrigin' | 'referrerPolicy'
>
export type AvatarFallbackProps = Pick<RekaAvatarFallbackProps, 'as' | 'asChild'>

export function normalizeImageProps(
  source: AvatarImageProps | null | undefined,
): AvatarImageProps | undefined {
  if (!source) return undefined

  const { as, asChild, crossOrigin, referrerPolicy } = source
  return { as, asChild, crossOrigin, referrerPolicy }
}

export function normalizeFallbackProps(
  source: AvatarFallbackProps | null | undefined,
): AvatarFallbackProps | undefined {
  if (!source) return undefined

  const { as, asChild } = source
  return { as, asChild }
}

// UI
export interface AvatarUI {
  root?: HTMLAttributes
  image?: HTMLAttributes
  fallback?: HTMLAttributes
  icon?: HTMLAttributes
}

// Props
export interface AvatarProps extends AvatarRootProps {
  delayMs?: number
  src?: string
  alt?: string
  icon?: IconName | IconProps
  label?: string
  image?: AvatarImageProps
  fallback?: AvatarFallbackProps
  ui?: AvatarUI
}

export interface AvatarEmits {
  loadingStateChange: [value: AvatarLoadingState]
}

export interface AvatarSlots {
  fallback?(): unknown
}
