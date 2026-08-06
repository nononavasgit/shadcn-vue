import type {
  AccordionContentProps as RekaAccordionContentProps,
  AccordionItemProps as RekaAccordionItemProps,
  AccordionRootEmits,
  AccordionRootProps as RekaAccordionRootProps,
  AccordionTriggerProps as RekaAccordionTriggerProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/ui/Icon'
import { useResolve } from '@/composables/useResolve'

export { default as Accordion } from './Accordion.vue'

export type AccordionValue = string | string[] | undefined
export type AccordionUIValue<T> = T | ((context: AccordionUIContext) => T)

export type AccordionRootProps = Pick<
  RekaAccordionRootProps,
  | 'type'
  | 'collapsible'
  | 'defaultValue'
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
  icon?: IconName | IconProps
  trigger?: AccordionTriggerProps
  content?: AccordionContentProps
}

export function resolveAccordionUIValue<T>(
  value: AccordionUIValue<T> | undefined,
  context: AccordionUIContext,
): T | undefined {
  return useResolve(value, context)
}

// Props
export interface AccordionProps extends AccordionRootProps {
  items?: AccordionItem[]
  iconDropDownOpen?: IconName | IconProps
  iconDropDownClose?: IconName | IconProps
  ui?: AccordionUI
}

// UI
export interface AccordionUI {
  root?: HTMLAttributes
  item?: AccordionUIValue<HTMLAttributes>
  trigger?: AccordionUIValue<HTMLAttributes>
  icon?: AccordionUIValue<HTMLAttributes>
  iconDropdown?: AccordionUIValue<HTMLAttributes>
  content?: AccordionUIValue<HTMLAttributes>
}

// Context
export interface AccordionUIContext {
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
  trigger?(props: AccordionUIContext): unknown
  default?(props: AccordionUIContext): unknown
} & {
  [name: `trigger-${string}`]: ((props: AccordionUIContext) => unknown) | undefined
  [name: `content-${string}`]: ((props: AccordionUIContext) => unknown) | undefined
}
