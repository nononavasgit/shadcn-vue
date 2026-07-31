import type { HTMLAttributes } from 'vue'

export { default as Spinner } from './Spinner.vue'

export interface SpinnerUI {
  root?: HTMLAttributes
  loading?: HTMLAttributes
  icon?: HTMLAttributes
  content?: HTMLAttributes
}

export interface SpinnerProps {
  loading?: boolean
  ui?: SpinnerUI
}

export interface SpinnerSlots {
  default?(): unknown
  loading?(): unknown
}
