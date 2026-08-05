import type {
  StepperItemProps as RekaStepperItemProps,
  StepperRootEmits,
  StepperRootProps as RekaStepperRootProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/ui/Icon'

export { default as Stepper } from './Stepper.vue'

export type StepperState = 'completed' | 'active' | 'inactive'

export type StepperRootProps = Pick<
  RekaStepperRootProps,
  'as' | 'asChild' | 'orientation' | 'dir' | 'linear'
>
export type StepperItemProps = Pick<
  RekaStepperItemProps,
  'as' | 'asChild' | 'step' | 'disabled' | 'completed'
>

export function normalizeStepperItemProps(source: StepperItemProps): StepperItemProps {
  const { step, disabled, completed, as, asChild } = source
  return { step, disabled, completed, as, asChild }
}

export function resolveStepperUIValue<T>(
  value: StepperUIValue<T> | undefined,
  context: StepperUIContext,
): T | undefined {
  return typeof value === 'function' ? (value as (context: StepperUIContext) => T)(context) : value
}

export interface StepperStep extends StepperItemProps {
  key?: string | number
  label?: string
  description?: string
  icon?: IconName | IconProps
  content?: string
}

// Props
export interface StepperProps extends StepperRootProps {
  steps?: StepperStep[]
  color?: string
  ui?: StepperUI
}

// Function StepperUIValue
export type StepperUIValue<T> = T | ((context: StepperUIContext) => T)

// UI
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

// Context
export interface StepperUIContext {
  value: number | undefined
  totalSteps: number
  step: StepperStep
  index: number
  state: StepperState
  active: boolean
  first: boolean
  last: boolean
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

// Emits
export type StepperEmits = StepperRootEmits

// Slots
export type StepperSlots = {
  default?(props: StepperUIContext): unknown
  item?(props: StepperUIContext): unknown
  header?(props: StepperUIContext): unknown
  indicator?(props: StepperUIContext): unknown
  icon?(props: StepperUIContext): unknown
  title?(props: StepperUIContext): unknown
  description?(props: StepperUIContext): unknown
  separator?(props: StepperUIContext): unknown
  content?(props: StepperUIContext): unknown
} & {
  [name: `item-${string}`]: ((props: StepperUIContext) => unknown) | undefined
  [name: `header-${string}`]: ((props: StepperUIContext) => unknown) | undefined
  [name: `indicator-${string}`]: ((props: StepperUIContext) => unknown) | undefined
  [name: `icon-${string}`]: ((props: StepperUIContext) => unknown) | undefined
  [name: `title-${string}`]: ((props: StepperUIContext) => unknown) | undefined
  [name: `description-${string}`]: ((props: StepperUIContext) => unknown) | undefined
  [name: `separator-${string}`]: ((props: StepperUIContext) => unknown) | undefined
  [name: `content-${string}`]: ((props: StepperUIContext) => unknown) | undefined
}
