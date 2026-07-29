export { default as Spinner } from './Spinner.vue'

export interface SpinnerProps {
  loading?: boolean
}

export interface SpinnerSlots {
  default?(): unknown
  loading?(): unknown
}
