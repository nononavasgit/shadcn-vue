import type { Component, HTMLAttributes } from 'vue'

export { default as Accordeon } from './Accordeon.vue'

export type AccordeonValue = string | string[] | undefined

export type AccordeonNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export type AccordeonContentUI = AccordeonNodeUI & { forceMount?: boolean }
export type AccordeonUIValue<T> = T | ((context: AccordeonUIContext) => T)

export interface AccordeonUI {
  root?: AccordeonNodeUI
  item?: AccordeonUIValue<AccordeonNodeUI>
  trigger?: AccordeonUIValue<AccordeonNodeUI>
  content?: AccordeonUIValue<AccordeonContentUI>
}

export interface AccordeonElement {
  value: string
  label?: string
  content?: string
  disabled?: boolean
  forceMount?: boolean
}

export interface AccordeonUIContext {
  element: AccordeonElement
  index: number
  open: boolean
  first: boolean
  last: boolean
}

export interface AccordeonProps {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: string | string[]
  disabled?: boolean
  dir?: 'ltr' | 'rtl'
  orientation?: 'horizontal' | 'vertical'
  unmountOnHide?: boolean
  elements?: AccordeonElement[]
  ui?: AccordeonUI
}

export interface AccordeonEmits {
  'update:modelValue': [value: AccordeonValue]
  change: [value: AccordeonValue]
}

export interface AccordeonSlotProps {
  element: AccordeonElement
  index: number
  open: boolean
}

export interface AccordeonSlots {
  trigger?(props: AccordeonSlotProps): unknown
  default?(props: AccordeonSlotProps): unknown
}
