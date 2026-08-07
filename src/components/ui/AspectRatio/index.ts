import type { HTMLAttributes } from 'vue'
import type { AspectRatioProps as AspectRatioPropsReka } from 'reka-ui'

export { default as AspectRatio } from './AspectRatio.vue'

// Fn
export type AspectRatioFn<T> = T | ((context: AspectRatioContext) => T)

// Props
export interface AspectRatioProps extends Pick<AspectRatioPropsReka, 'as' | 'asChild' | 'ratio'> {
  ui?: AspectRatioUI
}

// UI
export interface AspectRatioUI {
  root?: AspectRatioFn<HTMLAttributes>
}

// Context
export interface AspectRatioContext {
  props: Omit<AspectRatioProps, 'ui'>
  aspect: number
}

// Slots
export interface AspectRatioSlots {
  default?(props: AspectRatioContext): unknown
}
