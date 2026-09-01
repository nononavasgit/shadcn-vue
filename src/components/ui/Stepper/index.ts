import type { HTMLAttributes } from 'vue'
import type {
  StepperDescriptionProps as RekaStepperDescriptionProps,
  StepperIndicatorProps as RekaStepperIndicatorProps,
  StepperItemProps as RekaStepperItemProps,
  StepperRootProps as RekaStepperRootProps,
  StepperSeparatorProps as RekaStepperSeparatorProps,
  StepperTitleProps as RekaStepperTitleProps,
  StepperTriggerProps as RekaStepperTriggerProps,
} from 'reka-ui'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Stepper } from './Stepper.vue'

export type StepperRootProps = Pick<RekaStepperRootProps, 'orientation' | 'linear'>
export type StepperItemProps = Pick<RekaStepperItemProps, 'step' | 'disabled' | 'completed'>
export type StepperTriggerProps = Pick<RekaStepperTriggerProps, 'as' | 'asChild'>
export type StepperIndicatorProps = Pick<RekaStepperIndicatorProps, 'as' | 'asChild'>
export type StepperLabelProps = Pick<RekaStepperTitleProps, 'as' | 'asChild'>
export type StepperDescriptionProps = Pick<RekaStepperDescriptionProps, 'as' | 'asChild'>
export type StepperSeparatorProps = Pick<
  RekaStepperSeparatorProps,
  'as' | 'asChild' | 'orientation' | 'decorative'
>

export function normalizeStepperRootProps(
  source: StepperRootProps | null | undefined,
): StepperRootProps | undefined {
  if (!source) return undefined
  const { orientation, linear } = source
  return { orientation, linear }
}

export function normalizeStepperItemProps(source: StepperItemProps): StepperItemProps {
  const { step, disabled, completed } = source
  return { step, disabled, completed }
}

export function normalizeStepperTriggerProps(
  source: StepperTriggerProps | null | undefined,
): StepperTriggerProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeStepperIndicatorProps(
  source: StepperIndicatorProps | null | undefined,
): StepperIndicatorProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeStepperLabelProps(
  source: StepperLabelProps | null | undefined,
): StepperLabelProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeStepperDescriptionProps(
  source: StepperDescriptionProps | null | undefined,
): StepperDescriptionProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeStepperSeparatorProps(
  source: StepperSeparatorProps | null | undefined,
): StepperSeparatorProps | undefined {
  if (!source) return undefined
  const { as, asChild, orientation, decorative } = source
  return { as, asChild, orientation, decorative }
}

export interface StepperStep extends StepperItemProps {
  slot?: string | number
  label?: string
  description?: string
  icon?: IconConfig
  content?: string
  trigger?: StepperTriggerProps
  indicator?: StepperIndicatorProps
  labelProps?: StepperLabelProps
  descriptionProps?: StepperDescriptionProps
  separator?: StepperSeparatorProps
}

export interface StepperProps extends StepperRootProps {
  value?: number
  steps?: StepperStep[]
  color?: string
  ui?: StepperUI
}

export type StepperFn<T> = (context: StepperContext) => T
export type StepperItemFn<T> = (context: StepperItemContext) => T

export interface StepperUI {
  root?: StepperFn<HTMLAttributes>
  list?: StepperFn<HTMLAttributes>
  item?: StepperItemFn<HTMLAttributes>
  trigger?: StepperItemFn<HTMLAttributes>
  indicator?: StepperItemFn<HTMLAttributes>
  wrapper?: StepperItemFn<HTMLAttributes>
  label?: StepperItemFn<HTMLAttributes>
  description?: StepperItemFn<HTMLAttributes>
  separator?: StepperItemFn<HTMLAttributes>
  content?: StepperItemFn<HTMLAttributes>
}

export interface StepperContext {
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
}

export interface StepperItemContext extends StepperContext {
  item: StepperStep
  index: number
  completed: boolean
  active: boolean
  first: boolean
  last: boolean
}

export interface StepperEmits {
  'update:value': [value: number | undefined]
}

export type StepperSlots = {
  default?(props: StepperItemContext): unknown
  indicator?(props: StepperItemContext): unknown
  label?(props: StepperItemContext): unknown
  description?(props: StepperItemContext): unknown
  content?(props: StepperItemContext): unknown
} & {
  [name: `indicator-${string}`]: ((props: StepperItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: StepperItemContext) => unknown) | undefined
  [name: `description-${string}`]: ((props: StepperItemContext) => unknown) | undefined
  [name: `content-${string}`]: ((props: StepperItemContext) => unknown) | undefined
}
