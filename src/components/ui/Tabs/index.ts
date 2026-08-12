import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type {
  TabsContentProps as RekaTabsContentProps,
  TabsListProps as RekaTabsListProps,
  TabsRootProps as RekaTabsRootProps,
  TabsTriggerProps as RekaTabsTriggerProps,
} from 'reka-ui'
import type { NormalizeIconProps } from '@/components/ui/Icon'

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
export type TabsRootProps = Pick<
  RekaTabsRootProps<TabsValue>,
  'orientation' | 'dir' | 'activationMode' | 'unmountOnHide' | 'as' | 'asChild'
>
export type TabsListProps = Pick<RekaTabsListProps, 'as' | 'asChild'>
export type TabsTriggerProps = Pick<RekaTabsTriggerProps, 'as' | 'asChild'>
export type TabsContentProps = Pick<RekaTabsContentProps, 'as' | 'asChild' | 'forceMount'>

export interface TabItem {
  id: string | number
  value: TabsValue
  label?: string
  content?: string
  icon?: NormalizeIconProps
  trailingIcon?: NormalizeIconProps
  disabled?: boolean
  forceMount?: boolean
  trigger?: TabsTriggerProps
  contentProps?: TabsContentProps
}

// Fn
export type TabsFn<T> = (context: TabsContext) => T
export type TabsItemFn<T> = (context: TabsItemContext) => T

// Props
export interface TabsProps extends TabsRootProps {
  value?: TabsValue
  loop?: boolean
  variant?: TabsVariants['variant']
  list?: TabsListProps
  tabs?: TabItem[]
  ui?: TabsUI
}

// UI
export interface TabsUI {
  root?: TabsFn<HTMLAttributes>
  list?: TabsFn<HTMLAttributes>
  contentWrapper?: TabsFn<HTMLAttributes>
  trigger?: TabsItemFn<HTMLAttributes>
  label?: TabsItemFn<HTMLAttributes>
  content?: TabsItemFn<HTMLAttributes>
}

// Context
export interface TabsContext {
  props: Omit<TabsProps, 'ui'>
  value: TabsValue | undefined
}

export interface TabsItemContext extends TabsContext {
  tab: TabItem
  index: number
  active: boolean
  first: boolean
  last: boolean
}

// Emits
export interface TabsEmits {
  'update:value': [value: TabsValue | undefined]
  valueChange: [value: TabsValue | undefined]
}

// Slots
export type TabsSlots = {
  trigger?(props: TabsItemContext): unknown
  leading?(props: TabsItemContext): unknown
  label?(props: TabsItemContext): unknown
  trailing?(props: TabsItemContext): unknown
  content?(props: TabsItemContext): unknown
} & {
  [name: `trigger-${string}`]: ((props: TabsItemContext) => unknown) | undefined
  [name: `leading-${string}`]: ((props: TabsItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: TabsItemContext) => unknown) | undefined
  [name: `trailing-${string}`]: ((props: TabsItemContext) => unknown) | undefined
  [name: `content-${string}`]: ((props: TabsItemContext) => unknown) | undefined
}
