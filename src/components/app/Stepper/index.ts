import type { StepperRootProps, StepperSeparatorProps } from 'reka-ui'
import type { Component, HTMLAttributes, SVGAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/app/Icon'

export { default as Stepper } from './Stepper.vue'

export type StepperState = 'completed' | 'active' | 'inactive'
export type StepperIcon = IconName | (IconProps & SVGAttributes)
export type StepperSeparatorUI = Omit<HTMLAttributes, 'orientation'> & StepperSeparatorProps
export type StepperUIValue<T> = T | ((context: StepperUIContext) => T)

export interface StepperEntry {
  key?: string | number
  step: number
  title?: string
  description?: string
  icon?: StepperIcon
  content?: string
  disabled?: boolean
  completed?: boolean
}

export interface StepperUIContext {
  stepper: StepperEntry
  index: number
  state: StepperState
  active: boolean
  first: boolean
  last: boolean
}

export interface StepperUI {
  list?: HTMLAttributes
  item?: StepperUIValue<HTMLAttributes>
  trigger?: StepperUIValue<HTMLAttributes>
  indicator?: StepperUIValue<HTMLAttributes>
  header?: StepperUIValue<HTMLAttributes>
  icon?: StepperUIValue<SVGAttributes>
  title?: StepperUIValue<HTMLAttributes>
  description?: StepperUIValue<HTMLAttributes>
  separator?: StepperUIValue<StepperSeparatorUI>
  content?: StepperUIValue<HTMLAttributes>
}

export interface StepperProps {
  modelValue?: number
  defaultValue?: number
  steppers: StepperEntry[]
  orientation?: StepperRootProps['orientation']
  dir?: StepperRootProps['dir']
  linear?: boolean
  as?: string | Component
  asChild?: boolean
  ui?: StepperUI
}

export interface StepperEmits {
  'update:modelValue': [value: number | undefined]
}

export interface StepperRootSlotProps {
  modelValue: number | undefined
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
}

export interface StepperSlotProps extends StepperRootSlotProps {
  stepper: StepperEntry
  index: number
  state: StepperState
  active: boolean
  first: boolean
  last: boolean
}
