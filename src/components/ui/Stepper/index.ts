import type { StepperSeparatorProps } from 'reka-ui'
import type { Component, HTMLAttributes } from 'vue'
import type { NormalizeIconProps, NormalizedIconProps } from '@/components/ui/Icon'

export { default as Stepper } from './Stepper.vue'

export type StepperState = 'completed' | 'active' | 'inactive'
export type StepperNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}
export type StepperSeparatorUI = Omit<HTMLAttributes, 'orientation'> & StepperSeparatorProps

export interface StepperStep {
  key?: string | number
  step: number
  label?: string
  description?: string
  icon?: NormalizeIconProps
  content?: string
  disabled?: boolean
  completed?: boolean
}

// Context UI
export interface StepperUIContext {
  step: StepperStep
  index: number
  state: StepperState
  active: boolean
  first: boolean
  last: boolean
}

// UI
export type StepperUIValue<T> = T | ((context: StepperUIContext) => T)
export interface StepperUI {
  list?: HTMLAttributes
  item?: StepperUIValue<HTMLAttributes>
  trigger?: StepperUIValue<HTMLAttributes>
  indicator?: StepperUIValue<HTMLAttributes>
  header?: StepperUIValue<HTMLAttributes>
  icon?: StepperUIValue<NormalizedIconProps>
  title?: StepperUIValue<HTMLAttributes>
  description?: StepperUIValue<HTMLAttributes>
  separator?: StepperUIValue<StepperSeparatorUI>
  content?: StepperUIValue<HTMLAttributes>
}

// Props
export interface StepperProps {
  steps?: StepperStep[]
  orientation?: 'vertical' | 'horizontal'
  dir?: 'ltr' | 'rtl'
  linear?: boolean
  color?: string
  as?: string | Component
  asChild?: boolean
  ui?: StepperUI
}

export interface StepperEmits {
  'update:modelValue': [value: number | undefined]
}

// SlotProps
export interface StepperSlotProps {
  value: number | undefined
  totalSteps: number
  isNextDisabled: boolean
  isPrevDisabled: boolean
  isFirstStep: boolean
  isLastStep: boolean
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  hasNext: () => boolean
  hasPrev: () => boolean
  step: StepperStep
  index: number
  state: StepperState
  active: boolean
  first: boolean
  last: boolean
}

// Slots
export type StepperSlots = {
  default?(props: StepperSlotProps): unknown
  item?(props: StepperSlotProps): unknown
  header?(props: StepperSlotProps): unknown
  indicator?(props: StepperSlotProps): unknown
  icon?(props: StepperSlotProps): unknown
  title?(props: StepperSlotProps): unknown
  description?(props: StepperSlotProps): unknown
  separator?(props: StepperSlotProps): unknown
  content?(props: StepperSlotProps): unknown
} & {
  [name: `item-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [name: `header-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [name: `indicator-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [name: `icon-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [name: `title-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [name: `description-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [name: `separator-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [name: `content-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
}
