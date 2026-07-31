import type { Component, HTMLAttributes } from 'vue'

export { default as Accordion } from './Accordion.vue'

export type AccordionValue = string | string[] | undefined
export type AccordionUIValue<T> = T | ((context: AccordionUIContext) => T)

export interface AccordionTriggerProps {
  as?: string | Component
  asChild?: boolean
}

export interface AccordionContentProps extends AccordionTriggerProps {
  forceMount?: boolean
}

export function normalizeAccordionTriggerProps(
  source: AccordionTriggerProps | null | undefined,
): AccordionTriggerProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeAccordionContentProps(
  source: AccordionContentProps | null | undefined,
): AccordionContentProps | undefined {
  if (!source) return undefined
  const { as, asChild, forceMount } = source
  return { as, asChild, forceMount }
}

export interface AccordionUI {
  root?: HTMLAttributes
  item?: AccordionUIValue<HTMLAttributes>
  trigger?: AccordionUIValue<HTMLAttributes>
  content?: AccordionUIValue<HTMLAttributes>
}

export interface AccordionItemProps {
  value: string
  disabled?: boolean
  unmountOnHide?: boolean
}

export function normalizeAccordionItemProps(source: AccordionItemProps): AccordionItemProps {
  const { value, disabled, unmountOnHide } = source
  return { value, disabled, unmountOnHide }
}

export interface AccordionItem extends AccordionItemProps {
  label?: string
  content?: string
  trigger?: AccordionTriggerProps
  contentProps?: AccordionContentProps
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
  as?: string | Component
  asChild?: boolean
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
