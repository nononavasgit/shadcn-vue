import type { HTMLAttributes, SVGAttributes } from 'vue'
import type { ProgressRootProps, ProgressValue } from '@/components/ui/Progress'

export { default as ProgressCircular } from './ProgressCircular.vue'

export type ProgressCircularFn<T> = (context: ProgressCircularContext) => T

export interface ProgressCircularUI {
  svg?: ProgressCircularFn<SVGAttributes>
  track?: ProgressCircularFn<SVGAttributes>
  indicator?: ProgressCircularFn<SVGAttributes>
  label?: ProgressCircularFn<HTMLAttributes>
}

export interface ProgressCircularProps extends ProgressRootProps {
  value?: ProgressValue
  label?: string
  color?: string
  trackColor?: string
  size?: number | string
  thickness?: number
  ui?: ProgressCircularUI
}

export interface ProgressCircularContext {
  value: ProgressValue
  max: number
  percentage: number
}

export interface ProgressCircularSlots {
  label?(props: ProgressCircularContext): unknown
}
