import type { HTMLAttributes } from 'vue'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Loading } from './Loading.vue'

// Fn
export type LoadingFn<T> = (context: LoadingContext) => T

// UI
export interface LoadingUI {
  loading?: LoadingFn<HTMLAttributes>
  content?: LoadingFn<HTMLAttributes>
}

// Props
export interface LoadingProps {
  loading?: boolean
  icon?: IconConfig
  ui?: LoadingUI
}

// Context
export interface LoadingContext {
  loading: boolean
}

// Slots
export interface LoadingSlots {
  default?(props: LoadingContext): unknown
  loading?(props: LoadingContext): unknown
}
