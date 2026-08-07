import type { HTMLAttributes } from 'vue'
import type {
  SliderRangeProps as RekaSliderRangeProps,
  SliderRootEmits as RekaSliderRootEmits,
  SliderRootProps as RekaSliderRootProps,
  SliderThumbProps as RekaSliderThumbProps,
  SliderTrackProps as RekaSliderTrackProps,
} from 'reka-ui'

export { default as Slider } from './Slider.vue'

export type SliderValue = number[] | null
export type SliderRootProps = Pick<
  RekaSliderRootProps,
  | 'as'
  | 'asChild'
  | 'modelValue'
  | 'defaultValue'
  | 'disabled'
  | 'orientation'
  | 'dir'
  | 'inverted'
  | 'min'
  | 'max'
  | 'step'
  | 'minStepsBetweenThumbs'
  | 'thumbAlignment'
  | 'name'
  | 'required'
>
export type SliderTrackProps = Pick<RekaSliderTrackProps, 'as' | 'asChild'>
export type SliderRangeProps = Pick<RekaSliderRangeProps, 'as' | 'asChild'>
export type SliderThumbProps = Pick<RekaSliderThumbProps, 'as' | 'asChild'>

export function normalizeSliderRootProps(
  source: SliderRootProps | null | undefined,
): SliderRootProps | undefined {
  if (!source) return undefined
  const {
    as,
    asChild,
    modelValue,
    defaultValue,
    disabled,
    orientation,
    dir,
    inverted,
    min,
    max,
    step,
    minStepsBetweenThumbs,
    thumbAlignment,
    name,
    required,
  } = source
  return {
    as,
    asChild,
    modelValue,
    defaultValue,
    disabled,
    orientation,
    dir,
    inverted,
    min,
    max,
    step,
    minStepsBetweenThumbs,
    thumbAlignment,
    name,
    required,
  }
}

export function normalizeSliderTrackProps(
  source: SliderTrackProps | null | undefined,
): SliderTrackProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeSliderRangeProps(
  source: SliderRangeProps | null | undefined,
): SliderRangeProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeSliderThumbProps(
  source: SliderThumbProps | null | undefined,
): SliderThumbProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export type SliderFn<T> = T | ((context: SliderContext) => T)
export type SliderThumbFn<T> = T | ((context: SliderThumbContext) => T)

export interface SliderUI {
  root?: SliderFn<HTMLAttributes>
  track?: SliderFn<HTMLAttributes>
  range?: SliderFn<HTMLAttributes>
  thumb?: SliderThumbFn<HTMLAttributes>
}

export interface SliderProps extends SliderRootProps {
  track?: SliderTrackProps
  range?: SliderRangeProps
  thumb?: SliderThumbProps
  ui?: SliderUI
}

export interface SliderContext {
  props: Omit<SliderProps, 'ui'>
  values: number[]
}

export interface SliderThumbContext extends SliderContext {
  index: number
  value: number
  first: boolean
  last: boolean
}

export type SliderEmits = RekaSliderRootEmits

export interface SliderSlots {
  track?(props: SliderContext): unknown
  range?(props: SliderContext): unknown
  thumb?(props: SliderThumbContext): unknown
}
