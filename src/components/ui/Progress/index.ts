import type { HTMLAttributes } from 'vue'
import type {
  ProgressIndicatorProps as RekaProgressIndicatorProps,
  ProgressRootProps as RekaProgressRootProps,
} from 'reka-ui'

export { default as Progress } from './Progress.vue'

export type ProgressValue = number | null
export type ProgressRootProps = Pick<
  RekaProgressRootProps,
  'as' | 'asChild' | 'max' | 'getValueLabel' | 'getValueText'
>
export type ProgressIndicatorProps = Pick<RekaProgressIndicatorProps, 'as' | 'asChild'>

export type ProgressFn<T> = (context: ProgressContext) => T

export interface ProgressUI {
  root?: ProgressFn<HTMLAttributes>
  indicator?: ProgressFn<HTMLAttributes>
  label?: ProgressFn<HTMLAttributes>
}

export interface ProgressProps extends ProgressRootProps {
  value?: ProgressValue
  label?: string
  color?: string
  trackColor?: string
  indicator?: ProgressIndicatorProps
  ui?: ProgressUI
}

export interface ProgressContext {
  props: Omit<ProgressProps, 'ui'>
  value: ProgressValue
  max: number
  percentage: number
}

export interface ProgressEmits {
  'update:value': [value: ProgressValue]
  valueChange: [value: ProgressValue]
}

export interface ProgressSlots {
  indicator?(props: ProgressContext): unknown
  label?(props: ProgressContext): unknown
}
