import type { HTMLAttributes } from 'vue'
import type { AspectRatioProps as AspectRatioPropsReka } from 'reka-ui'

export { default as AspectRatio } from './AspectRatio.vue'

// Fn
export type AspectRatioFn<T> = (context: AspectRatioContext) => T

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
  as: AspectRatioProps['as']
  asChild: AspectRatioProps['asChild']
  ratio: AspectRatioProps['ratio']
  aspect: number
}

export function createAspectRatioContext(props: AspectRatioProps): AspectRatioContext {
  const { as, asChild, ratio } = props

  return {
    as,
    asChild,
    ratio,
    aspect: ratio ?? 1,
  }
}

// Slots
export interface AspectRatioSlots {
  default?(props: AspectRatioContext): unknown
}
