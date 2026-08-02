import type { HTMLAttributes, SVGAttributes } from 'vue'
import type { ProgressRootProps } from 'reka-ui'

export { default as ProgressCircular } from './ProgressCircular.vue'

export interface ProgressCircularUI {
  root?: HTMLAttributes
  svg?: SVGAttributes
  track?: SVGAttributes
  indicator?: SVGAttributes
  label?: HTMLAttributes
}

export interface ProgressCircularProps extends ProgressRootProps {
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
