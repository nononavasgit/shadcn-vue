import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'

export { default as FieldSet } from './FieldSet.vue'

export type FieldSetLegend = string
export type FieldSetDescription = string

export const fieldSetLegendVariants = cva('mb-3 font-medium', {
  variants: {
    legendVariant: {
      legend: 'text-base',
      label: 'text-sm',
    },
  },
  defaultVariants: {
    legendVariant: 'legend',
  },
})

export type FieldSetVariants = VariantProps<typeof fieldSetLegendVariants>
export type FieldSetLegendVariant = NonNullable<FieldSetVariants['legendVariant']>

export type FieldSetFn<T> = (context: FieldSetContext) => T

export interface FieldSetUI {
  legend?: FieldSetFn<HTMLAttributes>
  description?: FieldSetFn<HTMLAttributes>
  group?: FieldSetFn<HTMLAttributes>
}

export interface FieldSetProps {
  legend?: FieldSetLegend
  description?: FieldSetDescription
  legendVariant?: FieldSetLegendVariant
  ui?: FieldSetUI
}

export interface FieldSetContext {
  legend: FieldSetLegend | undefined
  description: FieldSetDescription | undefined
  legendVariant: FieldSetLegendVariant
}

export function createFieldSetContext(props: FieldSetProps): FieldSetContext {
  return {
    legend: props.legend,
    description: props.description,
    legendVariant: props.legendVariant ?? 'legend',
  }
}

export interface FieldSetSlots {
  default?(props: FieldSetContext): unknown
  legend?(props: FieldSetContext): unknown
  description?(props: FieldSetContext): unknown
}
