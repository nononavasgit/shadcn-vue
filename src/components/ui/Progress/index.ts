import type { HTMLAttributes } from 'vue'
import type {
  ProgressIndicatorProps as RekaProgressIndicatorProps,
  ProgressRootEmits as RekaProgressRootEmits,
  ProgressRootProps as RekaProgressRootProps,
} from 'reka-ui'

export { default as Progress } from './Progress.vue'

export type ProgressValue = number | null
export type ProgressRootProps = Pick<
  RekaProgressRootProps,
  'as' | 'asChild' | 'modelValue' | 'max' | 'getValueLabel' | 'getValueText'
>
export type ProgressIndicatorProps = Pick<RekaProgressIndicatorProps, 'as' | 'asChild'>

export function normalizeProgressRootProps(
  source: ProgressRootProps | null | undefined,
): ProgressRootProps | undefined {
  if (!source) return undefined
  const { as, asChild, modelValue, max, getValueLabel, getValueText } = source
  return { as, asChild, modelValue, max, getValueLabel, getValueText }
}

export function normalizeProgressIndicatorProps(
  source: ProgressIndicatorProps | null | undefined,
): ProgressIndicatorProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export type ProgressFn<T> = T | ((context: ProgressContext) => T)

export interface ProgressUI {
  root?: ProgressFn<HTMLAttributes>
  indicator?: ProgressFn<HTMLAttributes>
  label?: ProgressFn<HTMLAttributes>
}

export interface ProgressProps extends ProgressRootProps {
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

export type ProgressEmits = RekaProgressRootEmits

export interface ProgressSlots {
  indicator?(props: ProgressContext): unknown
  label?(props: ProgressContext): unknown
}
