import type { HTMLAttributes } from 'vue'

export { default as Progress } from './Progress.vue'

export type ProgressValueFormatter = (
  value: number | null | undefined,
  max: number,
) => string | undefined

export interface ProgressUI {
  root?: HTMLAttributes
  indicator?: HTMLAttributes
  label?: HTMLAttributes
}

export interface ProgressProps {
  value?: number | null
  max?: number
  getValueLabel?: ProgressValueFormatter
  getValueText?: ProgressValueFormatter
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
