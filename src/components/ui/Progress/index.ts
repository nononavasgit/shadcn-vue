import type { HTMLAttributes } from 'vue'
import type { ProgressRootProps as RekaProgressRootProps } from 'reka-ui'

export { default as Progress } from './Progress.vue'

export type ProgressValue = number | null
export type ProgressRootProps = Pick<
  RekaProgressRootProps,
  'max' | 'getValueLabel' | 'getValueText'
>

export type ProgressFn<T> = (context: ProgressContext) => T

export interface ProgressUI {
  indicator?: ProgressFn<HTMLAttributes>
  label?: ProgressFn<HTMLAttributes>
}

export interface ProgressProps extends ProgressRootProps {
  value?: ProgressValue
  label?: string
  color?: string
  trackColor?: string
  ui?: ProgressUI
}

export interface ProgressContext {
  value: ProgressValue
  max: number
  percentage: number
}

export interface ProgressSlots {
  label?(props: ProgressContext): unknown
}
