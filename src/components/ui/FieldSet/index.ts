import type { HTMLAttributes } from 'vue'

export { default as FieldSet } from './FieldSet.vue'

export type FieldSetOrientation = 'vertical' | 'horizontal' | 'responsive'
export type FieldSetLegendVariant = 'legend' | 'label'

export type FieldSetFn<T> = T | ((context: FieldSetContext) => T)

export interface FieldSetUI {
  root?: FieldSetFn<HTMLAttributes>
  legend?: FieldSetFn<HTMLAttributes>
  description?: FieldSetFn<HTMLAttributes>
  group?: FieldSetFn<HTMLAttributes>
}

export interface FieldSetProps {
  legend?: string
  description?: string
  legendVariant?: FieldSetLegendVariant
  orientation?: FieldSetOrientation
  ui?: FieldSetUI
}

export interface FieldSetContext {
  props: Omit<FieldSetProps, 'ui'>
}

export interface FieldSetSlots {
  default?(props: FieldSetContext): unknown
  legend?(props: FieldSetContext): unknown
  description?(props: FieldSetContext): unknown
}
