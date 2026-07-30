import type { ProgressRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as Progress } from './Progress.vue'

export interface ProgressUI {
  indicator?: HTMLAttributes
  label?: HTMLAttributes
}

export interface ProgressProps {
  value?: number | null
  max?: number
  getValueLabel?: ProgressRootProps['getValueLabel']
  getValueText?: ProgressRootProps['getValueText']
  label?: string
  color?: string
  trackColor?: string
  ui?: ProgressUI
}

export interface ProgressLabelSlotProps {
  value: number | null
  max: number
  percentage: number
}

export interface ProgressSlots {
  label?(props: ProgressLabelSlotProps): unknown
}
