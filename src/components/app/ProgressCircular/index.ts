import type { ProgressRootProps } from 'reka-ui'
import type { HTMLAttributes, SVGAttributes } from 'vue'

export { default as ProgressCircular } from './ProgressCircular.vue'

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
  label?: string
  color?: string
  trackColor?: string
  size?: number | string
  strokeWidth?: number
  getValueLabel?: ProgressRootProps['getValueLabel']
  getValueText?: ProgressRootProps['getValueText']
  ui?: ProgressCircularUI
}

export interface ProgressCircularLabelSlotProps {
  value: number | null
  max: number
  percentage: number
}
