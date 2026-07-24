import type { Component, HTMLAttributes, ImgHTMLAttributes } from 'vue'

export { default as Avatar } from './Avatar.vue'

export type AvatarLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

export type AvatarNodeUI = HTMLAttributes & {
  as?: string | Component
  asChild?: boolean
}

export type AvatarImageUI = Omit<ImgHTMLAttributes, 'src'> & {
  as?: string | Component
  asChild?: boolean
}

export type AvatarFallbackUI = AvatarNodeUI & {
  delayMs?: number
}

export interface AvatarUI {
  root?: AvatarNodeUI
  image?: AvatarImageUI
  fallback?: AvatarFallbackUI
}

export interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  delayMs?: number
  ui?: AvatarUI
}

export interface AvatarEmits {
  loadingStatusChange: [value: AvatarLoadingStatus]
}

export interface AvatarSlotProps {
  src?: string
  alt?: string
  fallback?: string
}
