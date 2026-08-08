import type { HTMLAttributes } from 'vue'
import type {
  CollapsibleContentProps as RekaCollapsibleContentProps,
  CollapsibleRootEmits as RekaCollapsibleRootEmits,
  CollapsibleRootProps as RekaCollapsibleRootProps,
  CollapsibleTriggerProps as RekaCollapsibleTriggerProps,
} from 'reka-ui'

export { default as Collapsible } from './Collapsible.vue'

// Props Reka
export type CollapsibleRootProps = Pick<
  RekaCollapsibleRootProps,
  'as' | 'asChild' | 'defaultOpen' | 'disabled' | 'unmountOnHide'
>
export type CollapsibleTriggerProps = Pick<RekaCollapsibleTriggerProps, 'as' | 'asChild'>
export type CollapsibleContentProps = Pick<
  RekaCollapsibleContentProps,
  'as' | 'asChild' | 'forceMount'
>

// Props
export interface CollapsibleProps extends CollapsibleRootProps {
  open?: boolean
  trigger?: CollapsibleTriggerProps
  content?: CollapsibleContentProps
  ui?: CollapsibleUI
}

// Fn
export type CollapsibleFn<T> = T | ((context: CollapsibleContext) => T)

// UI
export interface CollapsibleUI {
  root?: CollapsibleFn<HTMLAttributes>
  trigger?: CollapsibleFn<HTMLAttributes>
  content?: CollapsibleFn<HTMLAttributes>
}

// Context
export interface CollapsibleContext {
  props: Omit<CollapsibleProps, 'ui'>
  open: boolean
}

// Emits
export type CollapsibleEmits = RekaCollapsibleRootEmits

// Slots
export interface CollapsibleSlots {
  default?(props: CollapsibleContext): unknown
  trigger?(props: CollapsibleContext): unknown
  content?(props: CollapsibleContext): unknown
}
