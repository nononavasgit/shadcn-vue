import type { HTMLAttributes } from 'vue'
import type { FieldVariants } from '@/components/primitives/Field'

export { default as FieldSet } from './FieldSet.vue'

export interface FieldSetUI {
  root?: HTMLAttributes
  legend?: HTMLAttributes
  description?: HTMLAttributes
  group?: HTMLAttributes
}

export interface FieldSetProps {
  legend?: string
  description?: string
  legendVariant?: 'legend' | 'label'
  orientation?: FieldVariants['orientation']
  ui?: FieldSetUI
}

export interface FieldSetSlots {
  default?(): unknown
  legend?(): unknown
  description?(): unknown
}
