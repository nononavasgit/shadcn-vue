import type { HTMLAttributes } from 'vue'
import type { SliderRootProps as RekaSliderRootProps } from 'reka-ui'

export { default as Slider } from './Slider.vue'

export type SliderValue = number[] | null
export type SliderRootProps = Pick<
  RekaSliderRootProps,
  | 'disabled'
  | 'orientation'
  | 'inverted'
  | 'min'
  | 'max'
  | 'step'
  | 'minStepsBetweenThumbs'
  | 'thumbAlignment'
  | 'name'
  | 'required'
>
export type SliderFn<T> = (context: SliderContext) => T
export type SliderThumbFn<T> = (context: SliderThumbContext) => T

export interface SliderUI {
  track?: SliderFn<HTMLAttributes>
  range?: SliderFn<HTMLAttributes>
  thumb?: SliderThumbFn<HTMLAttributes>
}

export interface SliderProps extends SliderRootProps {
  value?: SliderValue
  ui?: SliderUI
}

export interface SliderContext {
  values: number[]
}

export interface SliderThumbContext extends SliderContext {
  index: number
  value: number
  first: boolean
  last: boolean
}

export interface SliderSlots {
  track?(props: SliderContext): unknown
  range?(props: SliderContext): unknown
  thumb?(props: SliderThumbContext): unknown
}
