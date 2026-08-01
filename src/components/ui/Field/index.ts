import type { HTMLAttributes } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import type { FieldVariants } from '@/components/primitives/Field'

export { default as Field } from './Field.vue'

export type FieldErrorValue = string | { message?: string }

export interface FieldUI {
  root?: HTMLAttributes
  top?: HTMLAttributes
  wrapper?: HTMLAttributes
  labelWrapper?: HTMLAttributes
  label?: HTMLAttributes
  description?: HTMLAttributes
  hint?: HTMLAttributes
  help?: HTMLAttributes
  error?: HTMLAttributes
}

export interface FieldProps {
  as?: PrimitiveProps['as']
  name?: string
  errorPattern?: RegExp
  id?: string
  label?: string
  description?: string
  help?: string
  hint?: string
  error?: FieldErrorValue | boolean
  errors?: FieldErrorValue[]
  invalid?: boolean
  required?: boolean
  orientation?: Exclude<FieldVariants['orientation'], 'responsive'>
  controlPosition?: 'start' | 'end'
  ui?: FieldUI
}

export interface FieldControlSlotProps {
  id: string
  invalid: boolean
  error?: FieldErrorValue | boolean
  a11yAttrs: HTMLAttributes
}

export interface FieldErrorSlotProps {
  error: FieldErrorValue | boolean | undefined
  errors: FieldErrorValue[]
}

export interface FieldSlots {
  default?(props: FieldControlSlotProps): unknown
  label?(props: { label?: string }): unknown
  hint?(props: { hint?: string }): unknown
  description?(props: { description?: string }): unknown
  help?(props: { help?: string }): unknown
  error?(props: FieldErrorSlotProps): unknown
}
