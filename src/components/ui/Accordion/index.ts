import type {
  AccordionItemProps as RekaAccordionItemProps,
  AccordionRootProps as RekaAccordionRootProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { IconConfig } from '@/components/ui/Icon'

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
  slot?: string
  label?: string
  description?: string
  icon?: IconConfig
}

// Props
export interface AccordionProps extends AccordionRootProps {
  value?: AccordionValue
  items?: AccordionItem[]
  iconDropDownOpen?: IconConfig
  iconDropDownClose?: IconConfig
  ui?: AccordionUI
}

// Fn
export type AccordionItemFn<T> = (context: AccordionItemContext) => T

// UI
export interface AccordionUI {
  item?: AccordionItemFn<HTMLAttributes>
  trigger?: AccordionItemFn<HTMLAttributes>
  content?: AccordionItemFn<HTMLAttributes>
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
}

// Slots
export type AccordionSlots = {
  trigger?(props: AccordionItemContext): unknown
  leading?(props: AccordionItemContext): unknown
  label?(props: AccordionItemContext): unknown
  content?(props: AccordionItemContext): unknown
  iconDropdown?(props: AccordionItemContext): unknown
} & {
  [name: `trigger-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
  [name: `leading-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
  [name: `content-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
}
