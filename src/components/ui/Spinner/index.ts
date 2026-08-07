import type { HTMLAttributes } from 'vue'
import type { NormalizeIconProps } from '@/components/ui/Icon'

export { default as Spinner } from './Spinner.vue'

// Fn
export type SpinnerFn<T> = T | ((context: SpinnerContext) => T)

// UI
export interface SpinnerUI {
  root?: SpinnerFn<HTMLAttributes>
  loading?: SpinnerFn<HTMLAttributes>
  content?: SpinnerFn<HTMLAttributes>
}

// Props
export interface SpinnerProps {
  loading?: boolean
  icon?: NormalizeIconProps
  ui?: SpinnerUI
}

// Context
export interface SpinnerContext {
  props: Omit<SpinnerProps, 'ui'>
}

// Slots
export interface SpinnerSlots {
  default?(props: SpinnerContext): unknown
  loading?(props: SpinnerContext): unknown
}
