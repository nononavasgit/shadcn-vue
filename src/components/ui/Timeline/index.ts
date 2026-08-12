import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { NormalizeIconProps } from '@/components/ui/Icon'

export { default as Timeline } from './Timeline.vue'

export type TimelineValue = string | number
export type TimelineAlign = 'left' | 'right' | 'alternate'

export const timelineVariants = cva('group/timeline m-0 flex w-full list-none p-0', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row items-stretch overflow-x-auto py-6',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})

export const timelineItemVariants = cva('group/timeline-item relative min-w-0', {
  variants: {
    orientation: {
      vertical: 'flex flex-col gap-0.5 not-last:pb-6',
      horizontal: 'flex min-w-48 flex-1 shrink-0 flex-col gap-0.5 not-last:pe-8',
    },
    align: {
      left: '',
      right: '',
      alternate: '',
    },
  },
  compoundVariants: [
    { orientation: 'vertical', align: 'left', class: 'me-5 items-end pe-8 text-end' },
    { orientation: 'vertical', align: 'right', class: 'ms-5 ps-8' },
    {
      orientation: 'vertical',
      align: 'alternate',
      class: 'w-1/2 odd:self-start odd:items-end odd:pe-8 odd:text-end even:self-end even:ps-8',
    },
    { orientation: 'horizontal', align: 'left', class: 'mb-5 pb-8' },
    { orientation: 'horizontal', align: 'right', class: 'mt-5 pt-8' },
    {
      orientation: 'horizontal',
      align: 'alternate',
      class: 'grid grid-rows-[minmax(0,1fr)_minmax(0,1fr)]',
    },
  ],
  defaultVariants: {
    orientation: 'vertical',
    align: 'right',
  },
})

export const timelineContentVariants = cva('flex min-w-0 flex-col gap-0.5', {
  variants: {
    orientation: {
      vertical: '',
      horizontal: 'w-full',
    },
    align: {
      left: '',
      right: '',
      alternate: '',
    },
    side: {
      left: '',
      right: '',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      align: 'alternate',
      side: 'left',
      class: 'row-start-1 self-end pb-8',
    },
    {
      orientation: 'horizontal',
      align: 'alternate',
      side: 'right',
      class: 'row-start-2 self-start pt-8',
    },
  ],
  defaultVariants: {
    orientation: 'vertical',
    align: 'right',
    side: 'right',
  },
})

export const timelineIndicatorVariants = cva(
  'absolute z-10 flex items-center justify-center rounded-full border-2 font-medium transition-colors',
  {
    variants: {
      orientation: {
        vertical: 'top-0',
        horizontal: 'start-0',
      },
      align: {
        left: '',
        right: '',
        alternate: '',
      },
      side: {
        left: '',
        right: '',
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
    compoundVariants: [
      { orientation: 'vertical', side: 'left', class: 'end-0 translate-x-1/2' },
      { orientation: 'vertical', side: 'right', class: 'start-0 -translate-x-1/2' },
      { orientation: 'horizontal', align: 'left', class: 'bottom-0 translate-y-1/2' },
      { orientation: 'horizontal', align: 'right', class: 'top-0 -translate-y-1/2' },
      { orientation: 'horizontal', align: 'alternate', class: 'top-1/2 -translate-y-1/2' },
    ],
    defaultVariants: {
      orientation: 'vertical',
      align: 'right',
      side: 'right',
      sizeIndicator: 'md',
      severity: 'primary',
      color: false,
    },
  },
)

export const timelineSeparatorVariants = cva(
  'pointer-events-none absolute z-0 transition-colors group-last/timeline-item:hidden',
  {
    variants: {
      orientation: {
        vertical: 'top-0 bottom-0 w-0.5',
        horizontal: 'start-0 h-0.5 w-full',
      },
      align: {
        left: '',
        right: '',
        alternate: '',
      },
      side: {
        left: '',
        right: '',
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
      { orientation: 'vertical', side: 'left', class: 'end-0 translate-x-1/2' },
      { orientation: 'vertical', side: 'right', class: 'start-0 -translate-x-1/2' },
      { orientation: 'horizontal', align: 'left', class: 'bottom-0 translate-y-1/2' },
      { orientation: 'horizontal', align: 'right', class: 'top-0 -translate-y-1/2' },
      { orientation: 'horizontal', align: 'alternate', class: 'top-1/2 -translate-y-1/2' },
      { completed: true, severity: 'primary', class: 'bg-primary/40' },
      { completed: true, severity: 'secondary', class: 'bg-secondary-foreground/40' },
      { completed: true, severity: 'warning', class: 'bg-warning/40' },
      { completed: true, severity: 'success', class: 'bg-success/40' },
      { completed: true, severity: 'error', class: 'bg-error/40' },
      { completed: true, color: true, class: 'bg-(--timeline-color)/40' },
    ],
    defaultVariants: {
      orientation: 'vertical',
      align: 'right',
      side: 'right',
      completed: false,
      severity: 'primary',
      color: false,
    },
  },
)

export type TimelineIndicatorVariants = VariantProps<typeof timelineIndicatorVariants>
export type TimelineItemVariants = VariantProps<typeof timelineItemVariants>
export type TimelineVariants = VariantProps<typeof timelineVariants>
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
  align?: TimelineAlign
  sizeIndicator?: TimelineIndicatorVariants['sizeIndicator']
  color?: string
  severity?: TimelineIndicatorVariants['severity']
  reverse?: boolean
  ui?: TimelineUI
}

// Fn
export type TimelineFn<T> = (context: TimelineContext) => T
export type TimelineItemFn<T> = (context: TimelineItemContext) => T

// UI
export interface TimelineUI {
  root?: TimelineFn<HTMLAttributes>
  item?: TimelineItemFn<HTMLAttributes>
  content?: TimelineItemFn<HTMLAttributes>
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
  itemAlign: Exclude<TimelineAlign, 'alternate'>
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

export type TimelineEmits = {
  valueChange: [value: TimelineValue]
}
