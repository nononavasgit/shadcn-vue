import type { HTMLAttributes } from 'vue'
import type { ProgressRootProps } from 'reka-ui'

export { default as Progress } from './Progress.vue'

export interface ProgressUI {
  root?: HTMLAttributes
  indicator?: HTMLAttributes
  label?: HTMLAttributes
}

export interface ProgressProps extends ProgressRootProps {
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
  indicator?(props: ProgressLabelSlotProps): unknown
  label?(props: ProgressLabelSlotProps): unknown
}
