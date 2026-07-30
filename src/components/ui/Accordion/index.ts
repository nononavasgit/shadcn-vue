import type { Component, HTMLAttributes } from 'vue'

export { default as Accordion } from './Accordion.vue'

export type AccordionValue = string | string[] | undefined

export type AccordionNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export type AccordionContentUI = AccordionNodeUI & { forceMount?: boolean }
export type AccordionUIValue<T> = T | ((context: AccordionUIContext) => T)

export interface AccordionUI {
  item?: AccordionUIValue<AccordionNodeUI>
  trigger?: AccordionUIValue<AccordionNodeUI>
  content?: AccordionUIValue<AccordionContentUI>
}

export interface AccordionItem {
  value: string
  title?: string
  content?: string
  disabled?: boolean
  forceMount?: boolean
}

export interface AccordionUIContext {
  item: AccordionItem
  index: number
  open: boolean
  first: boolean
  last: boolean
}

export interface AccordionProps {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: string | string[]
  disabled?: boolean
  dir?: 'ltr' | 'rtl'
  orientation?: 'horizontal' | 'vertical'
  unmountOnHide?: boolean
  items?: AccordionItem[]
  ui?: AccordionUI
}

export interface AccordionEmits {
  'update:modelValue': [value: AccordionValue]
}

export interface AccordionSlotProps {
  item: AccordionItem
  index: number
  open: boolean
}

export type AccordionSlots = {
  trigger?(props: AccordionSlotProps): unknown
  default?(props: AccordionSlotProps): unknown
} & {
  [name: `trigger-${string}`]: ((props: AccordionSlotProps) => unknown) | undefined
  [name: `content-${string}`]: ((props: AccordionSlotProps) => unknown) | undefined
}
