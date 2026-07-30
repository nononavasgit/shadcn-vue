import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes, Component, HTMLAttributes } from 'vue'
import type { NormalizeIconProps, NormalizedIconProps } from '@/components/app/Icon'

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

export interface TabItem {
  id: string | number
  value: TabsValue
  label?: string
  content?: string
  icon?: NormalizeIconProps
  trailingIcon?: NormalizeIconProps
  disabled?: boolean
  forceMount?: boolean
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

export type TabsNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export type TabsTriggerUI = Omit<ButtonHTMLAttributes, 'value'> & {
  as?: string | Component
  asChild?: boolean
}

// UI
export interface TabsUI {
  list?: TabsNodeUI
  contentWrapper?: HTMLAttributes
  trigger?: TabsUIValue<TabsTriggerUI>
  icon?: TabsUIValue<NormalizedIconProps>
  label?: TabsUIValue<HTMLAttributes>
  trailingIcon?: TabsUIValue<NormalizedIconProps>
  content?: TabsUIValue<TabsNodeUI>
}

// Props
export interface TabsProps {
  modelValue?: TabsValue
  defaultValue?: TabsValue
  orientation?: 'horizontal' | 'vertical'
  dir?: 'ltr' | 'rtl'
  activationMode?: 'automatic' | 'manual'
  unmountOnHide?: boolean
  loop?: boolean
  variant?: TabsVariants['variant']
  as?: string | Component
  asChild?: boolean
  tabs?: TabItem[]
  ui?: TabsUI
}

// Emits
export interface TabsEmits {
  'update:modelValue': [value: TabsValue]
}

// SlotProps
export type TabsSlotProps = TabsUIContext

// Slots
export type TabsSlots = {
  trigger?(props: TabsSlotProps): unknown
  leading?(props: TabsSlotProps): unknown
  label?(props: TabsSlotProps): unknown
  trailing?(props: TabsSlotProps): unknown
  content?(props: TabsSlotProps): unknown
} & {
  [name: `trigger-${string}`]: ((props: TabsSlotProps) => unknown) | undefined
  [name: `leading-${string}`]: ((props: TabsSlotProps) => unknown) | undefined
  [name: `label-${string}`]: ((props: TabsSlotProps) => unknown) | undefined
  [name: `trailing-${string}`]: ((props: TabsSlotProps) => unknown) | undefined
  [name: `content-${string}`]: ((props: TabsSlotProps) => unknown) | undefined
}
