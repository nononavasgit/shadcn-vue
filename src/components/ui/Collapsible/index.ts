import type {
  CollapsibleContentProps as RekaCollapsibleContentProps,
  CollapsibleRootEmits,
  CollapsibleRootProps as RekaCollapsibleRootProps,
  CollapsibleTriggerProps as RekaCollapsibleTriggerProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { useResolve } from '@/composables/useResolve'

export { default as Collapsible } from './Collapsible.vue'

export type CollapsibleRootProps = Pick<
  RekaCollapsibleRootProps,
  'as' | 'asChild' | 'defaultOpen' | 'disabled' | 'unmountOnHide'
>
export type CollapsibleTriggerProps = Pick<RekaCollapsibleTriggerProps, 'as' | 'asChild'>
export type CollapsibleContentProps = Pick<
  RekaCollapsibleContentProps,
  'as' | 'asChild' | 'forceMount'
>

export function normalizeCollapsibleTriggerProps(
  source: CollapsibleTriggerProps | null | undefined,
): CollapsibleTriggerProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeCollapsibleContentProps(
  source: CollapsibleContentProps | null | undefined,
): CollapsibleContentProps | undefined {
  if (!source) return undefined
  const { as, asChild, forceMount } = source
  return { as, asChild, forceMount }
}

// Props
export interface CollapsibleProps extends CollapsibleRootProps {
  open?: boolean
  trigger?: CollapsibleTriggerProps
  content?: CollapsibleContentProps
  ui?: CollapsibleUI
}

export type CollapsibleUIValue<T> = T | ((context: CollapsibleContext) => T)

// UI
export interface CollapsibleUI {
  root?: HTMLAttributes
  trigger?: CollapsibleUIValue<HTMLAttributes>
  content?: CollapsibleUIValue<HTMLAttributes>
}

export function resolveCollapsibleUIValue<T>(
  value: CollapsibleUIValue<T> | undefined,
  context: CollapsibleContext,
): T | undefined {
  return useResolve(value, context)
}

// Context
export interface CollapsibleContext {
  open: boolean
}

// Emits
export type CollapsibleEmits = CollapsibleRootEmits

// Slots
export interface CollapsibleSlots {
  default?(props: CollapsibleContext): unknown
  content?(props: CollapsibleContext): unknown
}
