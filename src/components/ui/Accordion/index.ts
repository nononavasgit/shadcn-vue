import type {
  AccordionItemProps as RekaAccordionItemProps,
  AccordionRootProps as RekaAccordionRootProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { NormalizeIconProps } from '@/components/ui/Icon'

export { default as Accordion } from './Accordion.vue'

export type AccordionItemValue = string
export type AccordionValue = AccordionItemValue | AccordionItemValue[] | undefined

export type AccordionRootProps = Pick<
  RekaAccordionRootProps,
  'type' | 'collapsible' | 'disabled' | 'unmountOnHide'
>
export type AccordionType = NonNullable<AccordionRootProps['type']>
export type AccordionItemProps = Pick<
  RekaAccordionItemProps,
  'value' | 'disabled' | 'unmountOnHide'
>
export interface AccordionItem extends AccordionItemProps {
  label?: string
  description?: string
  icon?: NormalizeIconProps
}

// Props
export interface AccordionProps extends AccordionRootProps {
  value?: AccordionValue
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
  value: AccordionValue
  type: AccordionType
  collapsible: boolean
  disabled: boolean
  unmountOnHide: boolean
}

export function createAccordionContext(
  props: AccordionProps,
  value: AccordionValue,
): AccordionContext {
  return {
    value,
    type: props.type ?? 'single',
    collapsible: props.collapsible ?? false,
    disabled: props.disabled ?? false,
    unmountOnHide: props.unmountOnHide ?? true,
  }
}

export interface AccordionItemContext {
  item: AccordionItem
  index: number
  open: boolean
  first: boolean
  last: boolean
}

export function createAccordionItemContext(
  item: AccordionItem,
  index: number,
  value: AccordionValue,
  itemCount: number,
): AccordionItemContext {
  return {
    item,
    index,
    open: Array.isArray(value) ? value.includes(item.value) : value === item.value,
    first: index === 0,
    last: index === itemCount - 1,
  }
}

// Emits
export interface AccordionEmits {
  'update:value': [value: AccordionValue]
  valueChange: [value: AccordionValue]
}

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
