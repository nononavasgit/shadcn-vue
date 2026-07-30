import type { Component } from 'vue'

export { default as AspectRatio } from './AspectRatio.vue'

export interface AspectRatioProps {
  ratio?: number
  as?: string | Component
  asChild?: boolean
}

export interface AspectRatioSlotProps {
  aspect: number
}

export interface AspectRatioSlots {
  default?(props: AspectRatioSlotProps): unknown
}
