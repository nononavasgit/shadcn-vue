import type { HTMLAttributes, SVGAttributes } from 'vue'

export { default as ProgressCircular } from './ProgressCircular.vue'

export type ProgressCircularValueFormatter = (
  value: number | null | undefined,
  max: number,
) => string | undefined

export interface ProgressCircularUI {
  root?: HTMLAttributes
  svg?: SVGAttributes
  track?: SVGAttributes
  indicator?: SVGAttributes
  label?: HTMLAttributes
}

export interface ProgressCircularProps {
  value?: number | null
  max?: number
  getValueLabel?: ProgressCircularValueFormatter
  getValueText?: ProgressCircularValueFormatter
  label?: string
  color?: string
  trackColor?: string
  size?: number | string
  thickness?: number
  ui?: ProgressCircularUI
}

export interface ProgressCircularLabelSlotProps {
  value: number | null
  max: number
  percentage: number
}

export interface ProgressCircularSlots {
  label?(props: ProgressCircularLabelSlotProps): unknown
}
