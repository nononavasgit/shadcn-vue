import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type {
  TabsContentProps as RekaTabsContentProps,
  TabsListProps as RekaTabsListProps,
  TabsRootEmits,
  TabsRootProps,
  TabsTriggerProps as RekaTabsTriggerProps,
} from 'reka-ui'
import type { IconName, IconProps } from '@/components/ui/Icon'

export { default as Tabs } from './Tabs.vue'

export const tabsVariants = {
  root: cva('', {
    variants: {
      orientation: {
        horizontal: '',
        vertical: 'flex-row items-start',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }),
  list: cva('', {
    variants: {
      variant: {
        default: '',
        line: 'relative h-auto gap-1 rounded-none bg-transparent p-0',
      },
      orientation: {
        horizontal: '',
        vertical: 'shrink-0',
      },
    },
    compoundVariants: [
      {
        variant: 'line',
        orientation: 'vertical',
        class: 'items-stretch',
      },
    ],
    defaultVariants: {
      variant: 'default',
      orientation: 'horizontal',
    },
  }),
  trigger: cva('', {
    variants: {
      variant: {
        default: '',
        line: 'relative h-9 flex-none rounded-none border-0 bg-transparent px-3 text-muted-foreground shadow-none after:absolute after:bg-foreground after:opacity-0 after:transition-opacity data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:after:opacity-100 dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent',
      },
      orientation: {
        horizontal: '',
        vertical: 'w-full justify-start',
      },
    },
    compoundVariants: [
      {
        variant: 'line',
        orientation: 'horizontal',
        class: 'after:inset-x-0 after:bottom-0 after:h-0.5',
      },
      {
        variant: 'line',
        orientation: 'vertical',
        class: 'after:inset-y-0 after:left-0 after:w-0.5',
      },
    ],
    defaultVariants: {
      variant: 'default',
      orientation: 'horizontal',
    },
  }),
}

export type TabsVariants = VariantProps<typeof tabsVariants.list>
export type TabsValue = string | number
export type TabsListProps = Pick<RekaTabsListProps, 'as' | 'asChild'>
export type TabsTriggerProps = Pick<RekaTabsTriggerProps, 'as' | 'asChild'>
export type TabsContentProps = Pick<RekaTabsContentProps, 'as' | 'asChild'>

export function normalizeTabsListProps(
  source: TabsListProps | null | undefined,
): TabsListProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeTabsTriggerProps(
  source: TabsTriggerProps | null | undefined,
): TabsTriggerProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeTabsContentProps(
  source: TabsContentProps | null | undefined,
): TabsContentProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export interface TabItem {
  id: string | number
  value: TabsValue
  label?: string
  content?: string
  icon?: IconName | IconProps
  trailingIcon?: IconName | IconProps
  disabled?: boolean
  forceMount?: boolean
  trigger?: TabsTriggerProps
  contentProps?: TabsContentProps
}

// Context
export interface TabsUIContext {
  tab: TabItem
  index: number
  active: boolean
  first: boolean
  last: boolean
}

export type TabsUIValue<T> = T | ((context: TabsUIContext) => T)

// UI
export interface TabsUI {
  root?: HTMLAttributes
  list?: HTMLAttributes
  contentWrapper?: HTMLAttributes
  trigger?: TabsUIValue<HTMLAttributes>
  icon?: TabsUIValue<HTMLAttributes>
  label?: TabsUIValue<HTMLAttributes>
  trailingIcon?: TabsUIValue<HTMLAttributes>
  content?: TabsUIValue<HTMLAttributes>
}

// Props
export interface TabsProps extends TabsRootProps<TabsValue> {
  loop?: boolean
  variant?: TabsVariants['variant']
  list?: TabsListProps
  tabs?: TabItem[]
  ui?: TabsUI
}

// Emits
export type TabsEmits = TabsRootEmits<TabsValue>

// Slots
export type TabsSlots = {
  trigger?(props: TabsUIContext): unknown
  leading?(props: TabsUIContext): unknown
  label?(props: TabsUIContext): unknown
  trailing?(props: TabsUIContext): unknown
  content?(props: TabsUIContext): unknown
} & {
  [name: `trigger-${string}`]: ((props: TabsUIContext) => unknown) | undefined
  [name: `leading-${string}`]: ((props: TabsUIContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: TabsUIContext) => unknown) | undefined
  [name: `trailing-${string}`]: ((props: TabsUIContext) => unknown) | undefined
  [name: `content-${string}`]: ((props: TabsUIContext) => unknown) | undefined
}
