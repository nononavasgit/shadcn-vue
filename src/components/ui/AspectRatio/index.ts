import type { Component, HTMLAttributes } from 'vue'

export { default as AspectRatio } from './AspectRatio.vue'

export interface AspectRatioUI {
  root?: HTMLAttributes
}

export interface AspectRatioProps {
  ratio?: number
  as?: string | Component
  asChild?: boolean
  ui?: AspectRatioUI
}

export interface AspectRatioSlotProps {
  aspect: number
}

export interface AspectRatioSlots {
  default?(props: AspectRatioSlotProps): unknown
}
