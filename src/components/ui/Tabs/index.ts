import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type {
  TabsRootProps as RekaTabsRootProps,
  TabsTriggerProps as RekaTabsTriggerProps,
} from 'reka-ui'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Tabs } from './Tabs.vue'
export { tabsDefaults } from './defaults'

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
export type TabsRootProps = Partial<
  Pick<RekaTabsRootProps<TabsValue>, 'orientation' | 'activationMode' | 'unmountOnHide'>
>
export type TabsTriggerProps = Partial<Pick<RekaTabsTriggerProps, 'as' | 'asChild'>>

export interface TabItem {
  slot: string
  value: TabsValue
  label?: string
  icon?: IconConfig
  trailingIcon?: IconConfig
  disabled?: boolean
  forceMount?: boolean
}

// Fn
export type TabsFn<T> = () => T
export type TabsItemFn<T> = (context: TabsItemContext) => T

// Props
export interface TabsProps extends TabsRootProps {
  value?: TabsValue
  loop?: boolean
  variant?: TabsVariants['variant']
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
  tabs: TabItem[]
}

export interface TabsItemContext {
  tab: TabItem
  index: number
  active: boolean
  first: boolean
  last: boolean
}

// Emits
export interface TabsEmits {
  'update:value': [value: TabsValue | undefined]
}

// Slots
export type TabsSlots = {
  trigger?(props: TabsContext): unknown
  leading?(props: TabsContext): unknown
  label?(props: TabsContext): unknown
  trailing?(props: TabsContext): unknown
  content?(props: TabsContext): unknown
} & {
  [name: `trigger-${string}`]: ((props: TabsItemContext) => unknown) | undefined
  [name: `leading-${string}`]: ((props: TabsItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: TabsItemContext) => unknown) | undefined
  [name: `trailing-${string}`]: ((props: TabsItemContext) => unknown) | undefined
  [name: `content-${string}`]: ((props: TabsItemContext) => unknown) | undefined
}
