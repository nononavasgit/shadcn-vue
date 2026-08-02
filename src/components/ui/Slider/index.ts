import type { HTMLAttributes } from 'vue'
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'

export { default as Slider } from './Slider.vue'

// UI Slider
export interface SliderUI {
  root?: HTMLAttributes
  track?: HTMLAttributes
  range?: HTMLAttributes
  thumb?: SliderUIValue<HTMLAttributes, SliderThumbUIContext>
}

export interface SliderThumbUIContext {
  index: number
  value: number
  values: number[]
  first: boolean
  last: boolean
}

export type SliderUIValue<T, C> = T | ((context: C) => T)

// Props Slider
export interface SliderProps extends SliderRootProps {
  ui?: SliderUI
}

// Emits Slider
export type SliderEmits = SliderRootEmits

// SlotProps SlideThumb
export interface SliderThumbSlotProps {
  index: number
  value: number
  values: number[]
}

// Slots Slider
export interface SliderSlots {
  thumb?(props: SliderThumbSlotProps): unknown
}
