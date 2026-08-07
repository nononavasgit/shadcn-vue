import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { NormalizeIconProps } from '@/components/ui/Icon'

export { default as Timeline } from './Timeline.vue'

export type TimelineValue = string | number

export const timelineVariants = cva('group/timeline m-0 flex w-full list-none p-0', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row items-start overflow-x-auto pt-4 pb-2',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})

export type TimelineVariants = VariantProps<typeof timelineVariants>

export const timelineIndicatorVariants = cva(
  'absolute z-10 flex items-center justify-center rounded-full border-2 font-medium transition-colors',
  {
    variants: {
      orientation: {
        vertical: '-start-6 top-0 -translate-x-1/2',
        horizontal: 'left-0 -top-6 -translate-y-1/2',
      },
      sizeIndicator: {
        sm: 'size-7 text-sm',
        md: 'size-8 text-base',
        lg: 'size-9 text-sm',
        xl: 'size-10 text-lg',
      },
      severity: {
        primary:
          'border-primary/20 text-primary data-[completed=true]:bg-primary data-[completed=true]:text-primary-foreground',
        secondary:
          'border-secondary-foreground/20 text-secondary-foreground data-[completed=true]:bg-secondary data-[completed=true]:text-secondary-foreground',
        warning:
          'border-warning/20 text-warning data-[completed=true]:bg-warning data-[completed=true]:text-warning-foreground',
        success:
          'border-success/20 text-success data-[completed=true]:bg-success data-[completed=true]:text-success-foreground',
        error:
          'border-error/20 text-error data-[completed=true]:bg-error data-[completed=true]:text-error-foreground',
      },
      color: {
        true: 'border-(--timeline-color)/20 text-(--timeline-color) data-[completed=true]:bg-(--timeline-color) data-[completed=true]:text-(--timeline-color-foreground)',
        false: '',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
      sizeIndicator: 'md',
      severity: 'primary',
      color: false,
    },
  },
)

export type TimelineIndicatorVariants = VariantProps<typeof timelineIndicatorVariants>

export const timelineSeparatorVariants = cva(
  'pointer-events-none absolute z-0 transition-colors group-last/timeline-item:hidden',
  {
    variants: {
      orientation: {
        vertical: '-start-6 top-4.5 bottom-0 w-0.5',
        horizontal:
          'start-0 -top-6 h-0.5 w-[calc(100%-1rem-0.25rem)] -translate-y-1/2 translate-x-4.5',
      },
      completed: {
        true: '',
        false: 'bg-border',
      },
      severity: {
        primary: '',
        secondary: '',
        warning: '',
        success: '',
        error: '',
      },
      color: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { completed: true, severity: 'primary', class: 'bg-primary/40' },
      { completed: true, severity: 'secondary', class: 'bg-secondary-foreground/40' },
      { completed: true, severity: 'warning', class: 'bg-warning/40' },
      { completed: true, severity: 'success', class: 'bg-success/40' },
      { completed: true, severity: 'error', class: 'bg-error/40' },
      { completed: true, color: true, class: 'bg-(--timeline-color)/40' },
    ],
    defaultVariants: {
      orientation: 'vertical',
      completed: false,
      severity: 'primary',
      color: false,
    },
  },
)

export type TimelineSeparatorVariants = VariantProps<typeof timelineSeparatorVariants>

// Item
export interface TimelineItem {
  value: TimelineValue
  label?: string
  description?: string
  icon?: NormalizeIconProps
}

// Props
export interface TimelineProps {
  value?: TimelineValue
  items: TimelineItem[]
  orientation?: TimelineVariants['orientation']
  sizeIndicator?: TimelineIndicatorVariants['sizeIndicator']
  color?: string
  severity?: TimelineIndicatorVariants['severity']
  reverse?: boolean
  ui?: TimelineUI
}

// Fn
export type TimelineFn<T> = T | ((context: TimelineContext) => T)
export type TimelineItemFn<T> = T | ((context: TimelineItemContext) => T)

// UI
export interface TimelineUI {
  root?: TimelineFn<HTMLAttributes>
  item?: TimelineItemFn<HTMLAttributes>
  header?: TimelineItemFn<HTMLAttributes>
  separator?: TimelineItemFn<HTMLAttributes>
  indicator?: TimelineItemFn<HTMLAttributes>
  label?: TimelineItemFn<HTMLAttributes>
  description?: TimelineItemFn<HTMLAttributes>
}

// Context
export interface TimelineContext {
  props: Omit<TimelineProps, 'ui'>
  value?: TimelineValue
}

export interface TimelineItemContext extends TimelineContext {
  item: TimelineItem
  index: number
  active: boolean
  completed: boolean
  first: boolean
  last: boolean
}

// Slots
export type TimelineSlots = {
  header?(props: TimelineItemContext): unknown
  label?(props: TimelineItemContext): unknown
  description?(props: TimelineItemContext): unknown
  indicator?(props: TimelineItemContext): unknown
  separator?(props: TimelineItemContext): unknown
} & {
  [name: `header-${string}`]: ((props: TimelineItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: TimelineItemContext) => unknown) | undefined
  [name: `indicator-${string}`]: ((props: TimelineItemContext) => unknown) | undefined
  [name: `separator-${string}`]: ((props: TimelineItemContext) => unknown) | undefined
  [name: `description-${string}`]: ((props: TimelineItemContext) => unknown) | undefined
}
