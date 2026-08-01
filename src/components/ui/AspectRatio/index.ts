import type { HTMLAttributes } from 'vue'
import type { AspectRatioProps as AspectRatioPropsReka } from 'reka-ui'

export { default as AspectRatio } from './AspectRatio.vue'

export interface AspectRatioUI {
  root?: HTMLAttributes
}

export interface AspectRatioProps extends AspectRatioPropsReka {
  ui?: AspectRatioUI
}

export interface AspectRatioSlotProps {
  aspect: number
}

export interface AspectRatioSlots {
  default?(props: AspectRatioSlotProps): unknown
}
