import type {
  AccordionContentProps as RekaAccordionContentProps,
  AccordionItemProps as RekaAccordionItemProps,
  AccordionRootEmits,
  AccordionRootProps as RekaAccordionRootProps,
  AccordionTriggerProps as RekaAccordionTriggerProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { NormalizeIconProps } from '@/components/ui/Icon'

export { default as Accordion } from './Accordion.vue'

export type AccordionValue = string | string[] | undefined

export type AccordionRootProps = Pick<
  RekaAccordionRootProps,
  | 'type'
  | 'collapsible'
  | 'modelValue'
  | 'disabled'
  | 'dir'
  | 'orientation'
  | 'unmountOnHide'
  | 'as'
  | 'asChild'
>
export type AccordionItemProps = Pick<
  RekaAccordionItemProps,
  'value' | 'disabled' | 'unmountOnHide'
>
export type AccordionTriggerProps = Pick<RekaAccordionTriggerProps, 'as' | 'asChild'>
export type AccordionContentProps = Pick<RekaAccordionContentProps, 'as' | 'asChild' | 'forceMount'>

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

export function normalizeAccordionItemProps(source: AccordionItemProps): AccordionItemProps {
  const { value, disabled, unmountOnHide } = source
  return { value, disabled, unmountOnHide }
}

export interface AccordionItem extends AccordionItemProps {
  label?: string
  description?: string
  icon?: NormalizeIconProps
  trigger?: AccordionTriggerProps
  content?: AccordionContentProps
}

// Props
export interface AccordionProps extends AccordionRootProps {
  items?: AccordionItem[]
  iconDropDownOpen?: NormalizeIconProps
  iconDropDownClose?: NormalizeIconProps
  ui?: AccordionUI
}

// Fn
export type AccordionFn<T> = (context: AccordionContext) => T
export type AccordionItemFn<T> = (context: AccordionItemContext) => T

// UI
export interface AccordionUI {
  root?: AccordionFn<HTMLAttributes>
  item?: AccordionItemFn<HTMLAttributes>
  trigger?: AccordionItemFn<HTMLAttributes>
  content?: AccordionItemFn<HTMLAttributes>
}

// Context
export interface AccordionContext {
  props: Omit<AccordionProps, 'ui'>
  value: AccordionValue
}

export interface AccordionItemContext extends AccordionContext {
  item: AccordionItem
  index: number
  open: boolean
  first: boolean
  last: boolean
}

// Emits
export type AccordionEmits = AccordionRootEmits

// Slots
export type AccordionSlots = {
  trigger?(props: AccordionItemContext): unknown
  content?(props: AccordionItemContext): unknown
  icon?(props: AccordionItemContext): unknown
  label?(props: AccordionItemContext): unknown
  iconDropdown?(props: AccordionItemContext): unknown
} & {
  [name: `trigger-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
  [name: `icon-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
  [name: `iconDropdown-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
  [name: `content-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
}
