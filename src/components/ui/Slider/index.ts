import type { Component, HTMLAttributes } from 'vue'

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
export interface SliderProps {
  modelValue?: number[] | null
  defaultValue?: number[]
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  dir?: 'ltr' | 'rtl'
  inverted?: boolean
  min?: number
  max?: number
  step?: number
  minStepsBetweenThumbs?: number
  thumbAlignment?: 'contain' | 'overflow'
  as?: string | Component
  asChild?: boolean
  name?: string
  required?: boolean
  ui?: SliderUI
}

// Emits Slider
export interface SliderEmits {
  'update:modelValue': [value: number[] | null | undefined]
  valueCommit: [value: number[]]
}

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
