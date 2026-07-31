import type { Component, HTMLAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/ui/Icon'

export { default as Stepper } from './Stepper.vue'

export type StepperState = 'completed' | 'active' | 'inactive'
export interface StepperPrimitiveProps {
  as?: string | Component
  asChild?: boolean
}
export interface StepperItemProps extends StepperPrimitiveProps {
  step: number
  disabled?: boolean
  completed?: boolean
}
export type StepperTriggerProps = StepperPrimitiveProps
export type StepperIndicatorProps = StepperPrimitiveProps
export type StepperTitleProps = StepperPrimitiveProps
export type StepperDescriptionProps = StepperPrimitiveProps
export type StepperSeparatorProps = StepperPrimitiveProps

export function normalizeStepperItemProps(source: StepperItemProps): StepperItemProps {
  const { step, disabled, completed, as, asChild } = source
  return { step, disabled, completed, as, asChild }
}
export function normalizeStepperPrimitiveProps<T extends StepperPrimitiveProps>(
  source: T | null | undefined,
): StepperPrimitiveProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export interface StepperStep extends StepperItemProps {
  key?: string | number
  label?: string
  description?: string
  icon?: IconName | IconProps
  content?: string
  trigger?: StepperTriggerProps
  indicator?: StepperIndicatorProps
  titleProps?: StepperTitleProps
  descriptionProps?: StepperDescriptionProps
  separator?: StepperSeparatorProps
}

export interface StepperUIContext {
  step: StepperStep
  index: number
  state: StepperState
  active: boolean
  first: boolean
  last: boolean
}

export type StepperUIValue<T> = T | ((context: StepperUIContext) => T)
export interface StepperUI {
  root?: HTMLAttributes
  list?: HTMLAttributes
  item?: StepperUIValue<HTMLAttributes>
  trigger?: StepperUIValue<HTMLAttributes>
  indicator?: StepperUIValue<HTMLAttributes>
  header?: StepperUIValue<HTMLAttributes>
  icon?: StepperUIValue<HTMLAttributes>
  title?: StepperUIValue<HTMLAttributes>
  description?: StepperUIValue<HTMLAttributes>
  separator?: StepperUIValue<HTMLAttributes>
  content?: StepperUIValue<HTMLAttributes>
}

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
