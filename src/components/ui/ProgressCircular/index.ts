import type { HTMLAttributes, SVGAttributes } from 'vue'
import type {
  ProgressEmits,
  ProgressIndicatorProps,
  ProgressRootProps,
  ProgressValue,
} from '@/components/ui/Progress'

export { default as ProgressCircular } from './ProgressCircular.vue'

export type ProgressCircularFn<T> = T | ((context: ProgressCircularContext) => T)

export interface ProgressCircularUI {
  root?: ProgressCircularFn<HTMLAttributes>
  svg?: ProgressCircularFn<SVGAttributes>
  track?: ProgressCircularFn<SVGAttributes>
  indicator?: ProgressCircularFn<SVGAttributes>
  label?: ProgressCircularFn<HTMLAttributes>
}

export interface ProgressCircularProps extends ProgressRootProps {
  label?: string
  color?: string
  trackColor?: string
  size?: number | string
  thickness?: number
  indicator?: ProgressIndicatorProps
  ui?: ProgressCircularUI
}

export interface ProgressCircularContext {
  props: Omit<ProgressCircularProps, 'ui'>
  value: ProgressValue
  max: number
  percentage: number
  radius: number
  circumference: number
  dashOffset: number
}

export type ProgressCircularEmits = ProgressEmits

export interface ProgressCircularSlots {
  svg?(props: ProgressCircularContext): unknown
  track?(props: ProgressCircularContext): unknown
  indicator?(props: ProgressCircularContext): unknown
  label?(props: ProgressCircularContext): unknown
}
